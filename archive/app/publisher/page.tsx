import type { Metadata } from "next";
import { LoopingPlacementMockup } from "@/components/home/mockups/LoopingPlacementMockup";
import { ScribbleMockup } from "@/components/home/mockups/ScribbleMockup";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Band,
  CellGrid,
  Faq,
  MarketingHero,
  MARKETING_CLOSE,
  Panel,
  Split,
  StepPreview,
  type Cell,
  type FaqItem,
} from "@/components/marketing/MarketingSection";
import styles from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "For publishers — Kili",
  description:
    "Run a free tier profitably. One SDK adds labelled, intent-triggered ads to your AI product. You keep 50%.",
};

const MATHS: Cell[] = [
  {
    kicker: "Now",
    title: "Offset the bill",
    body: "At minimum, Kili covers the inference cost of the users who were never going to subscribe.",
  },
  {
    kicker: "Next",
    title: "Fund a real free tier",
    body: "At scale, a high-traffic app runs a free tier profitably instead of rationing it.",
  },
  {
    kicker: "Or",
    title: "Hand it to your users",
    body: "Pass your share back as credits, the way Kickback pays the developer watching the ad.",
  },
];

const FORMATS = [
  {
    media: <LoopingPlacementMockup kind="claude" />,
    title: "In-answer text",
    body: "A labelled card beneath the response, where the user has just described what they need.",
  },
  {
    media: <LoopingPlacementMockup kind="miro" />,
    title: "Loading placement",
    body: "The wait becomes inventory instead of dead space. Latency you were already spending, now earning.",
  },
  {
    media: <LoopingPlacementMockup kind="chatgpt" />,
    title: "Display card",
    body: "A richer unit for bots and agents living inside a chat platform your users are already in.",
  },
];

const STEPS: Cell[] = [
  {
    kicker: "01",
    visual: <StepPreview variant="install" />,
    title: "Install the SDK",
    body: "Add your publisher ID and the ad slot where it fits your interface.",
  },
  {
    kicker: "02",
    visual: <StepPreview variant="context" />,
    title: "Pass the context",
    body: "Send the conversation turn. Kili scores sponsors against the intent and returns one, or nothing.",
  },
  {
    kicker: "03",
    visual: <StepPreview variant="render" />,
    title: "Render and earn",
    body: "Drop the unit into your own components. Impressions and clicks appear in your dashboard in real time.",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "Will this make my users trust my product less?",
    answer:
      "Only if the ad is irrelevant or hidden. Kili serves at most one suggestion, always labelled, only when the query carries buying intent and a relevant sponsor is available. When nothing fits, nothing appears — which is most turns. You also set the relevancy floor yourself.",
  },
  {
    question: "Does it change what my model says?",
    answer:
      "No. Kili never edits, biases or re-ranks your model's output. The ad request runs in parallel with your model call and returns a separate unit that you render yourself.",
  },
  {
    question: "Will it slow my product down?",
    answer:
      "The ad request runs alongside your model call rather than after it, so user-perceived latency doesn't move.",
  },
  {
    question: "What counts as an eligible surface?",
    answer:
      "Chat apps, agents, MCP servers and coding assistants — anywhere a human reads a model's output and you carry the inference cost.",
  },
  {
    question: "Who are the advertisers?",
    answer:
      "Brands already buying AI visibility through Scribble Network, plus a demand pipeline built for Kili. You approve the categories that can appear in your product before anything serves.",
  },
];

export default function PublisherPage() {
  return (
    <div className={styles.skin}>
      <SiteNav />

      <main>
        <MarketingHero
          eyebrow="For publishers"
          title="Run a free tier profitably."
          lede="Under 5% of your users ever pay. The rest cost you inference on every query. Kili turns those conversations into revenue without changing the answer your model gives."
          doors={[
            { label: "Integrate Kili", href: "/get-started", modal: true },
          ]}
          note="Set up in an afternoon. You keep 50% of what the advertiser pays."
          media={<ScribbleMockup />}
        />

        <Band
          eyebrow="Accessibility is supply"
          title="Ads offset inference. Cheaper AI grows usage."
          lede="Ads funded the free web for five billion people. Same model, new surface — and the next billion AI users are not paying $20 a month."
        >
          <CellGrid cells={MATHS} />
        </Band>

        <Band
          eyebrow="Serve"
          title="Three placements. Use one or all three."
          lede="Buying intent in the query, relevant sponsor available: one labelled suggestion. Otherwise, nothing."
        >
          <div className={styles.formatRows}>
            {FORMATS.map(({ media, title, body }, index) => (
              <article
                className={`${styles.formatRow} ${index % 2 === 1 ? styles.formatRowReverse : ""}`}
                key={title}
              >
                <div className={styles.formatMedia}>{media}</div>
                <div className={styles.formatCopy}>
                  <span className={styles.formatNumber}>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </Band>

        <Band
          id="docs"
          eyebrow="Integration"
          title="Three steps in your request handler."
          lede="The ad request runs alongside your model call, so your users never wait longer for an answer. Prefer to own the rendering? Hit the API directly — same engine."
        >
          <CellGrid cells={STEPS} />
        </Band>

        <Band
          eyebrow="Terms and control"
          title="Published, not negotiated."
          lede="Advertisers buy impressions. Kili takes its cut. You keep half — the same half every publisher keeps."
        >
          <Split>
            <Panel
              title="What you earn"
              lede="No tiers to negotiate into and no rate that changes once you’ve integrated."
              items={[
                "50% revenue share, published",
                "Revenue accrues when a relevant placement serves",
                "Campaign availability follows matched advertiser demand",
                "Impressions, clicks and CTR in your dashboard",
              ]}
            />
            <Panel
              title="What you control"
              lede="Kili holds the safety policy. You hold everything about how it shows up in your product."
              items={[
                "Approve or block advertiser categories",
                "No sponsor ever runs against a brand you compete with",
                "Set the relevancy floor — below it, nothing serves",
                "Every unit labelled as sponsored, always",
              ]}
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
