"use client";

import { TelegramProvider } from "@/context/TelegramContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TelegramProvider>{children}</TelegramProvider>;
}
