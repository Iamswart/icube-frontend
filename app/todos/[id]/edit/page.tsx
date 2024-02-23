import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import TodoFormSkeleton from "./loading";

const TodosForm = dynamic(() => import("@/app/todos/_components/TodosForm"), {
  ssr: false,
  loading: () => <TodoFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;

 
  const todoId = id ? parseInt(id as string, 10) : null;

 
  if (!todoId) {
  
    console.error("Invalid Todo ID"); 
    return <p>Invalid Todo ID</p>; 
  }

  return <TodosForm todoId={todoId} />;
};

export default EditTodoPage;
