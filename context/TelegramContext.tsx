"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initTelegramApp } from "@/utils/telegram";

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

type TelegramContextType = {
  user: TelegramUser | null;
  isLoading: boolean;
};

const TelegramContext = createContext<TelegramContextType>({
  user: null,
  isLoading: true,
});

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initTelegramApp();
    const initData = window.Telegram.initData;

    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading }}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => useContext(TelegramContext);
