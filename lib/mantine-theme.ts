"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "indigo",
  fontFamily: "Geist, sans-serif",
  headings: {
    fontFamily: "Geist, sans-serif",
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  defaultRadius: "md",
  colors: {
    indigo: [
      "#eef2ff",
      "#e0e7ff",
      "#c7d2fe",
      "#a5b4fc",
      "#818cf8",
      "#6366f1",
      "#4f46e5",
      "#4338ca",
      "#3730a3",
      "#312e81",
    ],
  },
});
