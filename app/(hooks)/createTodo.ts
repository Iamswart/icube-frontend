import { useMutation } from "@tanstack/react-query";
import APIClient from "@/app/(services)/api-client";
import { useAuthStore } from "../store";

const createTodoClient = new APIClient("/api/todo/");

export interface CreateTodoInput {
  title: string;
  description: string;
}

interface CreateTodoResponse {
  id: number;
  user: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  created_at: string;
  updated_at: string;
}

export const useCreateTodo = () => {
  const accessToken = useAuthStore.getState().accessToken;
  return useMutation<CreateTodoResponse, Error, CreateTodoInput>(
    ["createTodo"],
    (input: CreateTodoInput) =>
      createTodoClient.post<CreateTodoInput, CreateTodoResponse>(
        input,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
  );
};
