import { useQuery } from "@tanstack/react-query";
import APIClient from "@/app/(services)/api-client";
import { useAuthStore } from "../store";

const getAllTodoClient = new APIClient("/api/todo/");

interface getAllTodoResponse {
  id: number;
  user: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  created_at: string;
  updated_at: string;
}

export const useAllTodo = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<getAllTodoResponse[], Error>(["getAllTodo"], () => {
    return getAllTodoClient.getAll<getAllTodoResponse[]>({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
};
