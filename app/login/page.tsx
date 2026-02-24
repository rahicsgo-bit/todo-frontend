"use client";

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Divider,
  Stack,
  Group,
  Checkbox,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { IconBrandGoogle } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    notifications.show({
      title: "Welcome back!",
      message: `Signed in as ${values.email}`,
      color: "indigo",
    });
    router.push("/");
  };

  return (
    <Box className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-[960px] overflow-hidden rounded-xl shadow-xl">
        {/* Left decorative panel */}
        <div className="hidden flex-1 flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
          <div>
            <Title order={3} className="font-sans text-primary-foreground">
              TaskFlow
            </Title>
          </div>
          <div>
            <Title order={2} className="mb-4 font-sans leading-tight text-primary-foreground">
              Organize your life, one task at a time.
            </Title>
            <Text size="md" className="text-primary-foreground/80">
              Join thousands of productive people who trust TaskFlow to manage
              their daily tasks, projects, and goals.
            </Text>
          </div>
          <Text size="sm" className="text-primary-foreground/60">
            TaskFlow 2026
          </Text>
        </div>

        {/* Right form panel */}
        <Paper
          className="flex w-full flex-col justify-center bg-card p-8 md:w-[440px] md:p-12"
          radius={0}
        >
          <Title order={2} className="mb-1 font-sans text-card-foreground" ta="center">
            Welcome back
          </Title>
          <Text c="dimmed" size="sm" ta="center" className="mb-8">
            {"Don't have an account? "}
            <Anchor size="sm" component="button" className="text-primary">
              Sign up
            </Anchor>
          </Text>

          <Button
            variant="default"
            fullWidth
            leftSection={<IconBrandGoogle size={18} />}
            className="mb-4 border-border bg-secondary text-secondary-foreground hover:bg-accent"
          >
            Continue with Google
          </Button>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            className="mb-6"
          />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email address"
                placeholder="you@example.com"
                size="md"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                size="md"
                {...form.getInputProps("password")}
              />
              <Group justify="space-between">
                <Checkbox
                  label="Remember me"
                  size="sm"
                  color="indigo"
                  {...form.getInputProps("rememberMe", { type: "checkbox" })}
                />
                <Anchor size="sm" component="button" className="text-primary">
                  Forgot password?
                </Anchor>
              </Group>
              <Button type="submit" fullWidth size="md" color="indigo">
                Sign in
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </Box>
  );
}
