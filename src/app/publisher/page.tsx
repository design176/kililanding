import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import styles from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "For publishers — Kili",
  description:
    "Run a free tier profitably. One SDK adds labelled, intent-triggered ads to your AI product. You keep 50%.",
};

export default function PublisherPage() {
  return (
    <div className={styles.skin}>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <span className={styles.eyebrow}>For publishers</span>
              <h1>Run a free tier profitably.</h1>
              <p className={styles.lede}>
                Under 5% of your users ever pay. The rest cost you inference
                on every query. Kili turns those conversations into revenue
                without changing the answer your model gives.
              </p>
              <div className={styles.doors}>
                <Link href="/get-started">
                  <Button variant="primary" size="lg" pill>Integrate Kili</Button>
                </Link>
                <Link href="#docs">
                  <Button variant="secondary" size="lg" pill>Read the docs</Button>
                </Link>
              </div>
              <p className={styles.note}>
                Set up in an afternoon. You keep 50% of what the advertiser pays.
              </p>
            </div>

            <Placeholder
              label="Publisher console screenshot — earnings, sparkline + KPI grid"
              height={340}
              style={{ borderRadius: 13 }}
            />
          </div>
        </section>

        {/* THE MATHS */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Accessibility is supply</span>
              <h2>Ads offset inference. Cheaper AI grows usage.</h2>
              <p>
                Ads funded the free web for five billion people. Same model,
                new surface — and the next billion AI users are not paying
                $20 a month.
              </p>
            </div>
            <div className={styles.maths}>
              <div className={styles.mCell}>
                <div className={styles.k}>Now</div>
                <h3>Offset the bill</h3>
                <p>At minimum, Kili covers the inference cost of the users who were never going to subscribe.</p>
              </div>
              <div className={styles.mCell}>
                <div className={styles.k}>Next</div>
                <h3>Fund a real free tier</h3>
                <p>At scale, a high-traffic app runs a free tier profitably instead of rationing it.</p>
              </div>
              <div className={styles.mCell}>
                <div className={styles.k}>Or</div>
                <h3>Hand it to your users</h3>
                <p>Pass your share back as credits, the way Kickback pays the developer watching the ad.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORMATS */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Serve</span>
              <h2>Three placements. Use one or all three.</h2>
              <p>
                Buying intent in the query, relevant sponsor available: one
                labelled suggestion. Otherwise, nothing.
              </p>
            </div>

            <div className={styles.two} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div>
                <Placeholder label="Mockup — in-answer text (trip planner)" height={220} style={{ borderRadius: 11 }} />
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em", margin: "18px 0 6px" }}>
                  In-answer text
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: 15, margin: 0 }}>
                  A labelled card beneath the response, where the user has just described what they need.
                </p>
              </div>
              <div>
                <Placeholder label="Mockup — loading placement (Plan Studio)" height={220} style={{ borderRadius: 11 }} />
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em", margin: "18px 0 6px" }}>
                  Loading placement
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: 15, margin: 0 }}>
                  The wait becomes inventory instead of dead space. Latency you were already spending, now earning.
                </p>
              </div>
              <div>
                <Placeholder label="Mockup — display card (Game Night Bot)" height={220} style={{ borderRadius: 11 }} />
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em", margin: "18px 0 6px" }}>
                  Display card
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: 15, margin: 0 }}>
                  A richer unit for bots and agents living inside a chat platform your users are already in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATION */}
        <section className={styles.band} id="docs">
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Integration</span>
              <h2>A few lines in your request handler.</h2>
              <p>
                The ad request runs alongside your model call, so your users
                never wait longer for an answer. Prefer to own the
                rendering? Hit the API directly — same engine.
              </p>
            </div>

            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.n}>01</div>
                <h4>Install the SDK</h4>
                <p>Add your publisher ID and the ad slot where it fits your interface.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.n}>02</div>
                <h4>Pass the context</h4>
                <p>Send the conversation turn. Kili scores sponsors against the intent and returns one, or nothing.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.n}>03</div>
                <h4>Render and earn</h4>
                <p>Drop the unit into your own components. Impressions and clicks appear in your dashboard in real time.</p>
              </div>
            </div>

            <pre>
              <span className={styles.c}>{"// SWAP: replace with the real snippet"}</span>{"\n"}
              <span className={styles.k}>import</span> {"{ kili }"} <span className={styles.k}>from</span>{" "}
              <span className={styles.c}>&quot;@kili/sdk&quot;</span>;{"\n\n"}
              <span className={styles.k}>const</span> ad = <span className={styles.k}>await</span> kili.match({"{"}
              {"\n"}
              {"  "}publisherId: <span className={styles.c}>&quot;pub_...&quot;</span>,{"\n"}
              {"  "}messages, <span className={styles.c}>{"// the conversation so far"}</span>{"\n"}
              {"  "}placement: <span className={styles.c}>&quot;loading&quot;</span>{" "}
              <span className={styles.c}>{'// or "in_answer" | "card"'}</span>{"\n"}
              {"}"});
            </pre>
            <p className={styles.note}>
              SDK languages: <strong>[NEEDS INPUT]</strong> — Amruth to confirm the real list.
            </p>
          </div>
        </section>

        {/* EARNINGS + CONTROL */}
        <section className={styles.band}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Terms and control</span>
              <h2>Published, not negotiated.</h2>
              <p>
                Advertisers buy impressions. Kili takes its cut. You keep
                half — the same half every publisher keeps.
              </p>
            </div>

            <div className={styles.two}>
              <div className={styles.panel}>
                <h3>What you earn</h3>
                <p>No tiers to negotiate into and no rate that changes once you&apos;ve integrated.</p>
                <ul className={styles.list}>
                  <li>50% revenue share, published</li>
                  <li>Typical eCPM — <strong>[NEEDS INPUT]</strong></li>
                  <li>Payout schedule — <strong>[NEEDS INPUT]</strong></li>
                  <li>Minimum payout threshold — <strong>[NEEDS INPUT]</strong></li>
                  <li>Impressions, clicks and CTR in your dashboard</li>
                </ul>
              </div>

              <div className={styles.panel}>
                <h3>What you control</h3>
                <p>Kili holds the safety policy. You hold everything about how it shows up in your product.</p>
                <ul className={styles.list}>
                  <li>Approve or block advertiser categories</li>
                  <li>No sponsor ever runs against a brand you compete with</li>
                  <li>Set the relevancy floor — below it, nothing serves</li>
                  <li>Every unit labelled as sponsored, always</li>
                  <li>Frequency cap — <strong>[NEEDS INPUT]</strong></li>
                </ul>
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
                <summary>Will this make my users trust my product less?</summary>
                <p>
                  Only if the ad is irrelevant or hidden. Kili serves at most
                  one suggestion, always labelled, only when the query
                  carries buying intent and a relevant sponsor is available.
                  When nothing fits, nothing appears — which is most turns.
                  You also set the relevancy floor yourself.
                </p>
              </details>
              <details>
                <summary>Does it change what my model says?</summary>
                <p>
                  No. Kili never edits, biases or re-ranks your model&apos;s
                  output. The ad request runs in parallel with your model
                  call and returns a separate unit that you render yourself.
                </p>
              </details>
              <details>
                <summary>Will it slow my product down?</summary>
                <p>
                  The ad request runs alongside your model call rather than
                  after it, so user-perceived latency doesn&apos;t move.
                </p>
              </details>
              <details>
                <summary>What counts as an eligible surface?</summary>
                <p>
                  Chat apps, agents, MCP servers and coding assistants —
                  anywhere a human reads a model&apos;s output and you carry
                  the inference cost.
                </p>
              </details>
              <details>
                <summary>Who are the advertisers?</summary>
                <p>
                  Brands already buying AI visibility through Scribble
                  Network, plus a demand pipeline built for Kili. You approve
                  the categories that can appear in your product before
                  anything serves.
                </p>
              </details>
              <details>
                <summary>What data do you take?</summary>
                <p>
                  <strong>[NEEDS INPUT]</strong> — needs a precise answer
                  before launch. This is the question that decides the deal
                  for most publishers, so it should be the most specific
                  paragraph on the page.
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
