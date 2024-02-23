import { useQuery } from "@tanstack/react-query";
import APIClient from "@/app/(services)/api-client";
import { useAuthStore } from "../store";

const todoClient = new APIClient("/api/todo");

interface TodoItemResponse {
  id: number;
  user: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  created_at: string;
  updated_at: string;
}

export const useTodoItem = (todoId: number) => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<TodoItemResponse, Error>(["getTodoItem", todoId], () => 
    todoClient.get<TodoItemResponse>(`${todoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
};
