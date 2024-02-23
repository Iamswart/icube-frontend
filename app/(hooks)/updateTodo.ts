import { useMutation } from "@tanstack/react-query";
import APIClient from "@/app/(services)/api-client";
import { useAuthStore } from "../store";

const updateTodoClient = new APIClient("/api/todo/");

export interface UpdateTodoInput {
  id: number;
  title?: string;
  description?: string;
  status?: "To Do" | "In Progress" | "Completed";
}

export interface UpdateTodoResponse {
  id: number;
  user: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  created_at: string;
  updated_at: string;
}

export const useUpdateTodo = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<UpdateTodoResponse, Error, UpdateTodoInput>(
    ["updateTodo"],
    (input: UpdateTodoInput) =>
      updateTodoClient.patch<UpdateTodoInput, UpdateTodoResponse>(
        `${input.id}`,
        input,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
  );
};
