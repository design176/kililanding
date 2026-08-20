import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import styles from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "For advertisers — Kili",
  description:
    "Brands, suggested inside the answer. Triggered by buying intent in the query, measured closed-loop with CAPI.",
};

export default function AdvertiserPage() {
  return (
    <div className={styles.skin}>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <span className={styles.eyebrow}>For advertisers</span>
              <h1>Brands, suggested inside the answer.</h1>
              <p className={styles.lede}>
                User intent now lives in chatboxes. When someone describes the
                problem you solve, Kili puts you in the reply — labelled,
                relevant, and measured.
              </p>
              <div className={styles.doors}>
                <Link href="/get-started">
                  <Button variant="primary" size="lg" pill>Launch a campaign</Button>
                </Link>
                <Link href="#formats">
                  <Button variant="secondary" size="lg" pill>See the formats</Button>
                </Link>
              </div>
              <p className={styles.note}>Closed-loop measurement with CAPI.</p>
            </div>

            <Placeholder
              label="Chat mockup — payroll copilot demo, sponsored suggestion in answer"
              height={340}
              style={{ borderRadius: 14 }}
            />
          </div>
        </section>

        {/* WHY */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>The prize</span>
              <h2>A branded AI answer meets the customer at the highest point of intent.</h2>
              <p>
                A search query is a keyword. A conversation is a brief — the
                problem, the budget, the constraint, all stated before anyone
                has decided anything.
              </p>
            </div>

            <div className={styles.tri}>
              <div className={styles.tCell}>
                <div className={styles.k}>Attributable</div>
                <h3>Closed loop, not a guess</h3>
                <p>Server-side CAPI measurement attributes conversions back to the placement that earned them.</p>
              </div>
              <div className={styles.tCell}>
                <div className={styles.k}>Conversation triggered</div>
                <h3>Relevance no cookie can match</h3>
                <p>Matched against what the user just said, not a profile assembled from what they did last week.</p>
              </div>
              <div className={styles.tCell}>
                <div className={styles.k}>A new surface</div>
                <h3>Inventory you can&apos;t buy elsewhere</h3>
                <p>Independent AI apps, agents and MCP servers — reach the labs&apos; surfaces don&apos;t sell you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORMATS */}
        <section className={styles.band} id="formats">
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Serve</span>
              <h2>Three formats. One suggestion at a time.</h2>
              <p>
                Buying intent in the query, relevant sponsor available: one
                labelled suggestion. Otherwise, nothing — which is why the
                ones that do run get read.
              </p>
            </div>

            <div className={styles.two}>
              <div className={styles.panel}>
                <h3>Where you appear</h3>
                <p>Placement is chosen by the publisher to fit their interface.</p>
                <ul className={styles.list}>
                  <li><strong>Loading placement</strong> — while the model is working</li>
                  <li><strong>In-answer text</strong> — a labelled card beneath the reply</li>
                  <li><strong>Display card</strong> — a richer unit where there&apos;s room</li>
                </ul>
              </div>
              <div className={styles.panel}>
                <h3>How you target</h3>
                <p>Intent first. No cookie, no third-party profile, no retargeting pool.</p>
                <ul className={styles.list}>
                  <li>Intent categories worth paying for</li>
                  <li>Geography — <strong>[NEEDS INPUT]</strong> confirm launch markets</li>
                  <li>Surface type: chat apps, agents, MCPs, coding assistants</li>
                  <li>Bidding: <strong>CPM at launch</strong>, with CPC and CPA to follow</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEASUREMENT */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Measure</span>
              <h2>Buy on CPM. Judge it like CPA.</h2>
              <p>
                Chat interfaces have no cookie and often no browser at all, so
                client-side tracking was never going to work here. You buy
                impressions; CAPI tells you what those impressions actually
                produced.
              </p>
            </div>

            <div className={styles.two}>
              <Placeholder
                label="Advertiser console screenshot — campaign attributed conversions"
                height={280}
                style={{ borderRadius: 13 }}
              />
              <div className={styles.panel}>
                <h3>What you get back</h3>
                <p>Reporting is the whole point of a new channel — an unmeasured one is a donation.</p>
                <ul className={styles.list}>
                  <li>Impressions, clicks and CTR by placement</li>
                  <li>Conversions posted server-to-server from your backend</li>
                  <li>Spend on a CPM basis, with cost per acquisition derived from CAPI events</li>
                  <li>Which surface types convert for you</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND SAFETY */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Protect</span>
              <h2>Where you won&apos;t appear.</h2>
              <p>
                Publishers opt in to run ads and approve the categories that
                can show up in their product. You&apos;re a guest in a surface
                that chose to have you, never an injection the app didn&apos;t
                agree to.
              </p>
            </div>

            <div className={styles.two}>
              <div className={styles.panel}>
                <h3>Always labelled</h3>
                <p>
                  Every Kili unit is marked as sponsored. Kili never edits,
                  re-ranks or biases the model&apos;s answer to favour a
                  sponsor — the answer is the answer, and your suggestion
                  sits beside it.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Category and safety controls</h3>
                <p>
                  Kili enforces the safety policy across the network, and no
                  sponsor runs against a publisher&apos;s competitor.
                  Advertiser-side exclusions — <strong>[NEEDS INPUT]</strong>{" "}
                  confirm what buyers can block.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Questions we get</span>
              <h2>The things you&apos;re about to ask.</h2>
            </div>

            <div className={styles.faq}>
              <details>
                <summary>How is this different from buying AI visibility content?</summary>
                <p>
                  Content is a bid for the model to mention you, with no
                  guarantee and no attribution. This is a placement you buy,
                  with reporting attached. Most brands will want both —
                  content earns the mention, Kili buys the suggestion.
                </p>
              </details>
              <details>
                <summary>Which apps will my ad run in?</summary>
                <p>
                  Independent AI products across chat, agents, MCP servers
                  and coding assistants. <strong>[NEEDS INPUT]</strong> — name
                  the network composition by category once the first
                  publishers are signed.
                </p>
              </details>
              <details>
                <summary>What does it cost?</summary>
                <p>
                  Campaigns are bought on a CPM basis at launch, with CPC and
                  CPA to follow once there&apos;s enough conversion history to
                  price against. <strong>[NEEDS INPUT]</strong> — rate card
                  and minimum spend still to confirm.
                </p>
              </details>
              <details>
                <summary>Can I control the creative?</summary>
                <p>
                  <strong>[NEEDS INPUT]</strong> — confirm whether creative is
                  advertiser-supplied, generated per query, or both.
                </p>
              </details>
              <details>
                <summary>How do I get started?</summary>
                <p>
                  Tell us the intent categories you want and your budget, and
                  we&apos;ll set the campaign up with you. Self-serve is
                  coming; today it&apos;s a conversation.
                </p>
              </details>
            </div>
          </div>
        </section>

      </main>

      {/* CLOSE, merged into the footer */}
      <SiteFooter
        heading={
          <>
            Ads kept the web free. <em>Kili keeps AI free.</em>
          </>
        }
      />
    </div>
  );
}
