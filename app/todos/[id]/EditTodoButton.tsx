import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditTodoButton = ({todoId}: {todoId: number}) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/todos/${todoId}/edit`}>Edit Todo</Link>
    </Button>
  );
};

export default EditTodoButton;
