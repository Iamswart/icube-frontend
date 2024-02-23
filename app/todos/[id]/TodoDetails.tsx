import { useTodoItem } from "@/app/(hooks)/getEachTodo";
import { TodoStatusBadge } from "@/app/components";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

interface TodoDetailsProps {
  todoId: number;
}

const TodoDetails = ({ todoId }: TodoDetailsProps) => {
  const router = useRouter();
  const { data: todo, isError, isLoading, error } = useTodoItem(Number(todoId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  if (!todo) return null;

  return (
    <>
      <Heading>{todo.title}</Heading>
      <Flex className="space-x-3" my="2">
        <TodoStatusBadge status={todo.status} />
        <Text>{new Date(todo.created_at).toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{todo.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TodoDetails;
