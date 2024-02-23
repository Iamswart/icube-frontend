import { Badge } from "@radix-ui/themes";
import React from "react";

type Status = "To Do" | "In Progress" | "Completed";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  "To Do": { label: "To Do", color: "red" },
  "In Progress": { label: "In Progress", color: "violet" },
  Completed: { label: "Completed", color: "green" },
};

const TodoStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default TodoStatusBadge;
