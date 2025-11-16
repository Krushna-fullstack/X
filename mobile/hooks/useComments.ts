import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useApiClient, commentApi } from "../utils/api";

export const useComments = () => {
  const [commentText, setCommentText] = useState("");
  const api = useApiClient();

  const queryClient = useQueryClient();
  const clearRef = useRef<string | null>(null);
  const commentTextRef = useRef<string>("");

  useEffect(() => {
    commentTextRef.current = commentText;
  }, [commentText]);

  const createCommentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      const response = await commentApi.createComment(api, postId, content);
      return response.data;
    },
    onSuccess: () => {
      // Only clear the input if the user hasn't changed it since submitting
      if (clearRef.current && commentTextRef.current === clearRef.current) {
        setCommentText("");
      }
      clearRef.current = null;
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      Alert.alert("Error", "Failed to post comment. Try again.");
    },
  });

  const createComment = (postId: string) => {
    if (!commentText.trim()) {
      Alert.alert("Empty Comment", "Please write something before posting!");
      return;
    }

    const content = commentText.trim();
    // Record the exact submitted content so onSuccess can decide whether to clear
    clearRef.current = content;
    createCommentMutation.mutate({ postId, content });
  };

  return {
    commentText,
    setCommentText,
    createComment,
    isCreatingComment: createCommentMutation.isPending,
  };
};