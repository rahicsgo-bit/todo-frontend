"use client";

import { Paper, Text, RingProgress, Group, Stack, Badge } from "@mantine/core";
import type { Todo } from "@/lib/todo-types";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const todoCount = todos.filter((t) => t.status === "todo").length;
  const inProgressCount = todos.filter(
    (t) => t.status === "in-progress"
  ).length;
  const completedCount = todos.filter(
    (t) => t.status === "completed"
  ).length;
  const completedPercentage =
    total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <Paper className="border border-border bg-card p-5" radius="md">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap="md" className="flex-1">
          <Group gap="sm" align="center">
            <Text size="lg" fw={600} className="text-card-foreground">
              Overview
            </Text>
            <Badge size="lg" variant="light" color="indigo" radius="sm">
              {total} {total === 1 ? "task" : "tasks"} total
            </Badge>
          </Group>

          <Group gap="lg" wrap="wrap">
            <Stack gap={2} align="center">
              <Text size="xl" fw={700} c="blue">
                {todoCount}
              </Text>
              <Text size="xs" c="dimmed">
                Todo
              </Text>
            </Stack>
            <Stack gap={2} align="center">
              <Text size="xl" fw={700} c="orange">
                {inProgressCount}
              </Text>
              <Text size="xs" c="dimmed">
                In Progress
              </Text>
            </Stack>
            <Stack gap={2} align="center">
              <Text size="xl" fw={700} c="green">
                {completedCount}
              </Text>
              <Text size="xs" c="dimmed">
                Completed
              </Text>
            </Stack>

          </Group>
        </Stack>

        <Stack gap={4} align="center" className="shrink-0">
          <RingProgress
            size={90}
            thickness={9}
            roundCaps
            sections={[
              {
                value: completedPercentage,
                color: "green",
              },
            ]}
            label={
              <Text ta="center" fw={700} size="sm">
                {completedPercentage}%
              </Text>
            }
          />
          <Text size="xs" c="dimmed">
            Completed
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
