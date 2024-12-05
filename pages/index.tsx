import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initData = window.Telegram.initData;

    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Hi, {user}!</h1>
      <p>You are awesome! 🚀</p>
    </div>
  );
}
