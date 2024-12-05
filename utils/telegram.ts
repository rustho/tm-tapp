import { WebApp } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: WebApp;
  }
}

export const tg = typeof window !== "undefined" ? window.Telegram : null;

export const initTelegramApp = () => {
  if (tg) {
    tg.ready();
    tg.expand();
  }
};

export const getUserData = () => {
  if (tg && tg.initDataUnsafe?.user) {
    return tg.initDataUnsafe.user;
  }
  return null;
};
