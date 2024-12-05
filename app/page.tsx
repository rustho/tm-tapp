"use client";

import { useTelegram } from "@/context/TelegramContext";

export default function Home() {
  const { user, isLoading } = useTelegram();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please open this app through Telegram</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1>Welcome, {user.first_name}!</h1>
        <p>Your Telegram ID: {user.id}</p>
        {user.username && <p>Username: @{user.username}</p>}
      </div>
    </main>
  );
}
