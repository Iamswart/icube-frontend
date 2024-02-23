import { useMutation } from '@tanstack/react-query';
import APIClient from '@/app/(services)/api-client';
import { useAuthStore } from '../store';

const deleteTodoClient = new APIClient('/api/todo/');

export const useDeleteTodo = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation<void, Error, number>({
    mutationKey: ['deleteTodo'],
    mutationFn: (todoId: number) => 
    deleteTodoClient.delete(`${todoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
