import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Button, Callout, TextField } from "@radix-ui/themes"; 
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { useCreateTodo } from "@/app/(hooks)/createTodo";
import { useUpdateTodo } from "@/app/(hooks)/updateTodo";

interface TodosFormProps {
  todoId?: number; 
}

type TodoFormData = z.infer<typeof todoSchema>;

const TodosForm = ({ todoId }: TodosFormProps) => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();

  const { register, control, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      if (todoId) {
        
        await updateMutation.mutateAsync({ ...data, id: todoId });
      } else {
        await createMutation.mutateAsync(data);
      }
      router.push("/todos");
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred.");
    }
  };

  const isSubmitting = createMutation.isLoading || updateMutation.isLoading;

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root>
        <Callout.Text style={{ color: 'red' }}> 
          <strong>Error: </strong> 
          {error}
        </Callout.Text>
      </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} options={{ placeholder: "Description" }} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          {todoId ? "Update Todo" : "Create Todo"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};


export default TodosForm;
