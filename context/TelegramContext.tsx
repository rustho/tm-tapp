"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initTelegramApp, tg } from "@/utils/telegram";

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

    if (tg?.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
    setIsLoading(false);
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading }}>
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => useContext(TelegramContext);
