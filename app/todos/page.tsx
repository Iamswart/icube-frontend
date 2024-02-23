import { TodoStatusBadge, Link } from "@/app/components";
import { Table } from "@radix-ui/themes";
import TodoActions from "./TodoActions";
import React from "react";
import { useAllTodo } from "../(hooks)/getAllTodo";

const TodosPage = async () => {
  const { data: todos, isError, isLoading } = useAllTodo();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos.</p>;

  return (
    <div>
      <TodoActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Todo</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((todo) => (
            <Table.Row key={todo.id}>
              <Table.Cell>
                <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TodoStatusBadge status={todo.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {new Date(todo.created_at).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TodosPage;
