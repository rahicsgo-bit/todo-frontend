"use client";

import {
  Group,
  Title,
  Button,
  Text,
  Avatar,
  Menu,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconLogout, IconClipboard } from "@/components/icons";

export function TodoHeader() {
  const router = useRouter();

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <Group justify="space-between">
        <Group gap="sm">
          <IconClipboard size={28} />
          <Title order={3} className="font-sans text-card-foreground">
            TaskFlow
          </Title>
        </Group>
        <Group gap="md">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" className="px-2">
                <Group gap="xs">
                  <Avatar size="sm" color="indigo" radius="xl">
                    U
                  </Avatar>
                  <Text size="sm" className="hidden sm:block">
                    User
                  </Text>
                </Group>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                onClick={() => router.push("/login")}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </header>
  );
}
