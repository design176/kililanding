"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";

const ITEMS = [
  { value: "chat", label: "Chat tools" },
  { value: "mcp", label: "MCP Servers" },
  { value: "creative", label: "Creative Tools" },
  { value: "web", label: "Web Apps" },
];

export function HomeTabs() {
  const [value, setValue] = useState("chat");
  return <Tabs items={ITEMS} value={value} onChange={setValue} size="lg" pill />;
}
