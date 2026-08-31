import type { Metadata } from "next";
import { ScribbleDeck } from "@/components/files/deck/ScribbleDeck";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ScribbleDeckPage() {
  return <ScribbleDeck />;
}
