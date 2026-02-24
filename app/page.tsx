"use client";

import { useState, useMemo, useCallback } from "react";
import { Container, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TodoHeader } from "@/components/todo-header";
import { AddTodoForm } from "@/components/add-todo-form";
import { TodoItem } from "@/components/todo-item";
import { TodoStats } from "@/components/todo-stats";
import { TodoFilters } from "@/components/todo-filters";
import { TodoEmpty } from "@/components/todo-empty";
import type { Todo, FilterType, TodoStatus } from "@/lib/todo-types";
import { STATUS_LABELS } from "@/lib/todo-types";
import type { AppNotification } from "@/lib/notification-types";
import type { ChatConversation, ChatMessage } from "@/lib/chat-types";
import { TEAM_MEMBERS } from "@/lib/team-members";

const INITIAL_TODOS: Todo[] = [
  {
    id: "1",
    title: "Review project requirements",
    status: "completed",
    priority: "high",
    assignees: ["alice", "bob"],
    dueDate: "2026-02-20",
    createdAt: new Date("2026-02-20"),
  },
  {
    id: "2",
    title: "Design wireframes for dashboard",
    status: "in-progress",
    priority: "high",
    assignees: ["carol"],
    dueDate: "2026-02-28",
    createdAt: new Date("2026-02-21"),
  },
  {
    id: "3",
    title: "Set up CI/CD pipeline",
    status: "todo",
    priority: "medium",
    assignees: ["dave", "eve", "alice"],
    dueDate: "2026-03-05",
    createdAt: new Date("2026-02-22"),
  },
  {
    id: "4",
    title: "Write API documentation",
    status: "todo",
    priority: "low",
    assignees: ["bob"],
    dueDate: null,
    createdAt: new Date("2026-02-23"),
  },
  {
    id: "5",
    title: "Team sync meeting",
    status: "completed",
    priority: "medium",
    assignees: ["alice", "bob", "carol", "dave"],
    dueDate: "2026-02-24",
    createdAt: new Date("2026-02-24"),
  },

];

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<FilterType>("all");
  const [appNotifications, setAppNotifications] = useState<AppNotification[]>([]);

  const addNotification = useCallback((title: string, message: string, color: string) => {
    const newNotif: AppNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      color,
      timestamp: new Date(),
      read: false,
    };
    setAppNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setAppNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }, []);

  // Chat state
  const [conversations, setConversations] = useState<ChatConversation[]>(() =>
    TEAM_MEMBERS.map((member) => ({
      id: member.id,
      memberId: member.id,
      memberName: member.name,
      memberColor: member.color,
      messages: [],
      unreadCount: 0,
    }))
  );

  const handleSendMessage = useCallback((conversationId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId,
      senderId: "user",
      text,
      timestamp: new Date(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
  }, []);

  const handleMarkConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((t) => t.status === filter);
  }, [todos, filter]);

  const handleAdd = (title: string, priority: Todo["priority"], dueDate: string | null, assignees: string[]) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      priority,
      assignees,
      dueDate,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    addNotification("Task added", `"${title}" has been added to your list.`, "indigo");
    notifications.show({
      title: "Task added",
      message: `"${title}" has been added to your list.`,
      color: "indigo",
    });
  };

  const handleStatusChange = (id: string, status: TodoStatus) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    if (todo) {
      addNotification("Status updated", `"${todo.title}" moved to ${STATUS_LABELS[status]}.`, "indigo");
      notifications.show({
        title: "Status updated",
        message: `"${todo.title}" moved to ${STATUS_LABELS[status]}.`,
        color: "indigo",
      });
    }
  };

  const handleDelete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (todo) {
      addNotification("Task deleted", `"${todo.title}" has been permanently removed.`, "red");
      notifications.show({
        title: "Task deleted",
        message: `"${todo.title}" has been permanently removed.`,
        color: "red",
      });
    }
  };

  const handleEdit = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TodoHeader
        notifications={appNotifications}
        onMarkAllRead={handleMarkAllRead}
        conversations={conversations}
        onSendMessage={handleSendMessage}
        onMarkConversationRead={handleMarkConversationRead}
      />
      <main className="flex-1 py-8">
        <Container size="md">
          <Stack gap="lg">
            <TodoStats todos={todos} />
            <AddTodoForm onAdd={handleAdd} />
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
            />
            {filteredTodos.length === 0 ? (
              <TodoEmpty filter={filter} />
            ) : (
              <Stack gap="xs">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Container>
      </main>
    </div>
  );
}
