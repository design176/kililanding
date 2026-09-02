import type { Metadata } from "next";
import {
  ChartLineUp,
  ChatCircleDots,
  CirclesThreePlus,
  ShieldCheck,
  Sliders,
} from "@phosphor-icons/react/dist/ssr";
import { CodeEditorMockup } from "@/components/home/mockups/CodeEditorMockup";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Band,
  CellGrid,
  Faq,
  MarketingHero,
  MARKETING_CLOSE,
  PerformancePreview,
  Panel,
  Split,
  type Cell,
  type FaqItem,
} from "@/components/marketing/MarketingSection";
import styles from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "Kili | Advertisers",
  description:
    "Brands, suggested inside the answer. Triggered by buying intent in the query, measured closed-loop with CAPI.",
  alternates: { canonical: "/advertiser" },
};

const REASONS: Cell[] = [
  {
    icon: ChartLineUp,
    title: "Closed loop, not a guess",
    body: "Server-side CAPI measurement attributes conversions back to the placement that earned them.",
  },
  {
    icon: ChatCircleDots,
    title: "Relevance no cookie can match",
    body: "Matched against what the user just said, not a profile assembled from what they did last week.",
  },
  {
    icon: CirclesThreePlus,
    title: "Inventory you can’t buy elsewhere",
    body: "Independent AI apps, agents and MCP servers - reach the labs’ surfaces don’t sell you.",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How is this different from buying AI visibility content?",
    answer:
      "Content is a bid for the model to mention you, with no guarantee and no attribution. This is a placement you buy, with reporting attached. Most brands will want both - content earns the mention, Kili buys the suggestion.",
  },
  {
    question: "Which apps will my ad run in?",
    answer:
      "Campaign inventory is selected from eligible independent AI products across chat, agents, MCP servers and coding assistants. Available surfaces are confirmed during campaign setup.",
  },
  {
    question: "How do I get started?",
    answer:
      "Tell us the intent categories you want and your budget, and we'll set the campaign up with you. Self-serve is coming; today it's a conversation.",
  },
];

export default function AdvertiserPage() {
  return (
    <div className={styles.skin}>
      <SiteNav />

      <main>
        <MarketingHero
          eyebrow="For advertisers"
          title="Brands, suggested inside the answer."
          lede="User intent now lives in chatboxes. When someone describes the problem you solve, Kili puts you in the reply - labelled, relevant, and measured."
          doors={[
            { label: "Launch a campaign", href: "/get-started", modal: true },
            { label: "See the formats", href: "#formats" },
          ]}
          note="Closed-loop measurement with CAPI."
          media={<CodeEditorMockup />}
        />

        <Band
          eyebrow="The prize"
          title="A branded AI answer meets the customer at the highest point of intent."
          lede="A search query is a keyword. A conversation is a brief - the problem, the budget, the constraint, all stated before anyone has decided anything."
        >
          <CellGrid cells={REASONS} />
        </Band>

        <Band
          id="formats"
          eyebrow="Serve"
          title="Three formats. One suggestion at a time."
          lede="Buying intent in the query, relevant sponsor available: one labelled suggestion. Otherwise, nothing - which is why the ones that do run get read."
        >
          <Split>
            <Panel
              title="Where you appear"
              lede="Placement is chosen by the publisher to fit their interface."
              items={[
                <><strong>Loading placement</strong> - while the model is working</>,
                <><strong>In-answer text</strong> - a labelled card beneath the reply</>,
                <><strong>Display card</strong> - a richer unit where there&apos;s room</>,
              ]}
            />
            <Panel
              title="How you target"
              lede="Intent first. No cookie and no third-party profile."
              items={[
                "Intent categories worth paying for",
                "Surface type: chat apps, agents, MCPs, coding assistants",
                <>Bidding: <strong>CPM at launch</strong>, with CPC and CPA to follow</>,
              ]}
            />
          </Split>
        </Band>

        <Band
          eyebrow="Measure"
          title="Buy on CPM. Judge it like CPA."
          lede="Chat interfaces have no cookie and often no browser at all, so client-side tracking was never going to work here. You buy impressions; CAPI tells you what those impressions actually produced."
        >
          <Split>
            <PerformancePreview />
            <Panel
              title="What you get back"
              lede="Reporting is the whole point of a new channel - an unmeasured one is a donation."
              items={[
                "Impressions, clicks and CTR by placement",
                "Conversions posted server-to-server from your backend",
                "Spend on a CPM basis, with cost per acquisition derived from CAPI events",
                "Which surface types convert for you",
              ]}
            />
          </Split>
        </Band>

        <Band
          eyebrow="Protect"
          title="Where you won’t appear."
          lede="Publishers opt in to run ads and approve the categories that can show up in their product. You’re a guest in a surface that chose to have you, never an injection the app didn’t agree to."
        >
          <Split>
            <Panel
              icon={ShieldCheck}
              title="Always labelled"
              lede="Every Kili unit is marked as sponsored. Kili never edits, re-ranks or biases the model’s answer to favour a sponsor - the answer is the answer, and your suggestion sits beside it."
            />
            <Panel
              icon={Sliders}
              title="Category and safety controls"
              lede="Kili enforces the safety policy across the network. Brand-safety exclusions and category controls are configured with your campaign."
            />
          </Split>
        </Band>

        <Band eyebrow="Questions we get" title="The things you’re about to ask.">
          <Faq items={FAQS} />
        </Band>
      </main>

      {/* Closing CTA is merged into the footer. */}
      <SiteFooter heading={MARKETING_CLOSE} />
    </div>
  );
}
