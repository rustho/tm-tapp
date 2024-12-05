import { TelegramWebApps } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}

export const tg = typeof window !== "undefined" ? window.Telegram.WebApp : null;

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
