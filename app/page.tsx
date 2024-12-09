"use client";

import { useState } from "react";
import { TabsList } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import Match from "./match/page";
import Profile from "./profile/page";
import { Page } from "@/components/Page";

export default function Home() {
  const t = useTranslations("i18n");
  const [activeTab, setActiveTab] = useState<"match" | "profile">("match");

  return (
    <Page back={false}>
      <TabsList>
        <TabsList.Item
          selected={activeTab === "match"}
          onClick={() => setActiveTab("match")}
        >
          Match
        </TabsList.Item>
        <TabsList.Item
          selected={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </TabsList.Item>
      </TabsList>

      {activeTab === "match" && <Match />}
      {activeTab === "profile" && <Profile />}
    </Page>
  );
}
