"use client";

import { TRPCProvider } from "@/trpc/client";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  );
}
