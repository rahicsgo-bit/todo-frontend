export type TodoStatus = "todo" | "in-progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  priority: "low" | "medium" | "high";
  assignees: string[];
  dueDate: string | null;
  createdAt: Date;
}

export type FilterType = "all" | "todo" | "in-progress" | "completed";

export const PRIORITY_COLORS: Record<Todo["priority"], string> = {
  low: "green",
  medium: "yellow",
  high: "red",
};

export const PRIORITY_LABELS: Record<Todo["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const STATUS_COLORS: Record<TodoStatus, string> = {
  todo: "blue",
  "in-progress": "orange",
  completed: "green",
};

export const STATUS_LABELS: Record<TodoStatus, string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  completed: "Completed",
};
