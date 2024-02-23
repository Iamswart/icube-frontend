import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TodoActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/todos/new">New Todo</Link>
      </Button>
    </div>
  );
};

export default TodoActions;
