import { Box, Grid } from "@radix-ui/themes";
import { useRouter } from "next/router";
import EditTodoButton from "./EditTodoButton";
import TodoDetails from "./TodoDetails";


const TodoDetailPage = () => {
  const router = useRouter();
  const { todoId } = router.query;

  if (!todoId || Array.isArray(todoId)) {
    return <p>Invalid Todo ID</p>;
  }

  const numericTodoId = parseInt(todoId, 10);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <TodoDetails todoId={numericTodoId} />
      </Box>
      <Box>
        <EditTodoButton todoId={numericTodoId} />
      </Box>
    </Grid>
  );
};

export default TodoDetailPage;