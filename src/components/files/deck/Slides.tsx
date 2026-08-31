import styles from "./Slides.module.css";

export function TitleSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title}>
        The AI ads stack
        <br />
        for fintech.
      </h1>
      <p className={styles.edCallout} style={{ maxWidth: 760 }}>
        Building the global distribution layer for financial intent across{" "}
        <em>every AI surface.</em>
      </p>

      <div className={styles.stackDiagram}>
        <div className={styles.sideLabels}>
          <span className={styles.sideLabel}>content</span>
          <span className={styles.sideLabel}>product</span>
          <span className={styles.sideLabel}>intent</span>
        </div>

        <div className={styles.stackCenter}>
          <div className={styles.stackTags}>
            {["chat", "search", "agents", "coding", "MCP"].map((tag) => (
              <div className={styles.stackTagCol} key={tag}>
                <span className={styles.stackTag}>{tag}</span>
                <span className={styles.stackConnector} />
              </div>
            ))}
          </div>
          <div className={styles.stackLayers}>
            <div className={styles.stackLayer}>AI Surfaces</div>
            <div className={`${styles.stackLayer} ${styles.accent}`}>Kili</div>
            <div className={`${styles.stackLayer} ${styles.accent}`}>Scribble</div>
            <div className={styles.stackLayer}>Brand</div>
          </div>
        </div>

        <div className={styles.sideLabels}>
          <span className={styles.sideLabel}>mention</span>
          <span className={styles.sideLabel}>signal</span>
          <span className={styles.sideLabel}>visibility</span>
        </div>
      </div>
    </div>
  );
}

export function ResearchSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        Winning AI search is non-negotiable.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        For fintech, research <em>is</em> the purchase journey.
      </p>

      <div className={styles.compareRow} style={{ alignItems: "stretch" }}>
        <div className={styles.chatVignette} style={{ width: 560 }}>
          <div className={styles.chatBar}>
            <span className={styles.tierDots}><i /><i /><i /></span>
            <span className={styles.chatBarLabel}>institutional research session</span>
          </div>
          <div className={styles.chatBody}>
            <p className={styles.chatLine}>Best treasury platform for USD + stablecoins?</p>
            <ul className={styles.cardList}>
              <li className={styles.strong}>STRIPE - Multicurrency balances + global payouts</li>
              <li className={styles.strong}>MERCURY - Idle-cash yield + same-day liquidity</li>
              <li className={styles.strong}>FIREBLOCKS - Custody + settlement + compliance</li>
            </ul>
          </div>
        </div>

        <div className={styles.supportStats} style={{ flexDirection: "column", gap: 16, marginBottom: 0 }}>
          <div className={styles.supportStat}>
            <span className={styles.statValue} style={{ fontSize: 56 }}>73%</span>
            <span className={styles.supportLabel}>
              use their own internet research for financial guidance, more than any other source
            </span>
            <span className={styles.cardNote}>U.S. guidance-seekers · Gallup, Aug 2026</span>
          </div>
        </div>
      </div>

      <div className={styles.pointList} style={{ marginTop: 28 }}>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>01</span>
          <div>
            <div className={styles.pointTitle}>Research-led</div>
            <div className={styles.pointDesc}>Research builds the shortlist before money moves.</div>
          </div>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>02</span>
          <div>
            <div className={styles.pointTitle}>Constrained</div>
            <div className={styles.pointDesc}>Finance ads face targeting, product and geography restrictions.</div>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Miss the answer. <em>Miss the shortlist.</em>
        </p>
      </div>
    </div>
  );
}

export function AgenticSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        When finance becomes agentic, the model becomes the distribution layer.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        The answer stops informing the transaction - and starts executing it.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>01 · Intent</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Understand the need</div>
            <div className={styles.cardNote}>Objective · risk · constraints</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>02 · Recommendation</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Choose the provider</div>
            <div className={styles.cardNote}>Which fintech best fulfils it?</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>03 · Action</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Execute the workflow</div>
            <div className={styles.cardNote}>Open · route · pay · invest</div>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Today, models shape the shortlist → in an agentic world, models select and transact.{" "}
          <em>Model knowledge = commercial access.</em>
        </p>
      </div>
    </div>
  );
}

export function GeoVsAdsSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        GEO earns consideration. It does not guarantee reach.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Organic visibility compounds. It is not a controllable media channel.
      </p>

      <div className={styles.pointList} style={{ marginBottom: 32 }}>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>01</span>
          <div>
            <div className={styles.pointTitle}>Answers change</div>
            <div className={styles.pointDesc}>Visibility moves with citations, retrieval and model behavior.</div>
          </div>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>02</span>
          <div>
            <div className={styles.pointTitle}>Users stay in the answer</div>
            <div className={styles.pointDesc}>Comparison can happen without a site visit.</div>
          </div>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>03</span>
          <div>
            <div className={styles.pointTitle}>Brands need control</div>
            <div className={styles.pointDesc}>Launches and budgets need predictable reach.</div>
          </div>
        </div>
      </div>

      <div className={styles.supportStats}>
        <div className={styles.supportStat}>
          <span className={styles.statValue} style={{ fontSize: 32 }}>GEO</span>
          <span className={styles.supportLabel}>Earned · like SEO - model consideration</span>
        </div>
        <div className={styles.supportStat}>
          <span className={`${styles.statValue} ${styles.accent}`} style={{ fontSize: 32 }}>ADS</span>
          <span className={styles.supportLabel}>Paid · like search ads - guaranteed reach</span>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Dominating AI search = <em>GEO + Ads.</em> Earned and paid, like SEO + search ads.
        </p>
      </div>
    </div>
  );
}

export function ProductSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        One stack to earn and buy presence.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Two products. One enterprise bill. One view of AI discovery performance.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>01 · Creator-led GEO</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Earn recommendation</div>
            <ul className={styles.cardList}>
              <li>Agentic monitoring</li>
              <li>Agentic onsite content</li>
              <li className={styles.strong}>Creator bounties paid on sustained citation</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>02 · Kili Ad Network</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Buy guaranteed reach</div>
            <ul className={styles.cardList}>
              <li>Intent-triggered placements</li>
              <li>AI agents, IDEs, MCPs and chat assistants</li>
              <li className={styles.strong}>Attribution from impression to sale</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          One monthly bill: <em>GEO + creator payouts + ad spend.</em> Sold together or individually - clients can top up.
        </p>
      </div>
    </div>
  );
}

export function GeoProofSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        The GEO engine changes recommendations.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Three live case studies. Measured visibility gains, citations and downstream conversion.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>RocketX · 3 months</span>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardBig}>2.4×</span>
            <span className={styles.cardSub}>more visible</span>
            <span className={styles.cardNote}>9.2% → 21.8% SOV</span>
            <span className={styles.cardNote}>1,053 AI citations · 39 queries</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>Bob · 2 months</span>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardBig}>2.6×</span>
            <span className={styles.cardSub}>more visible</span>
            <span className={styles.cardNote}>11.7% → 31% SOV</span>
            <span className={styles.cardNote}>3.41% AI visitor conversion · #1 channel</span>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Seasons · first milestone</span>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardBig}>21%</span>
            <span className={styles.cardSub}>AI visibility</span>
            <span className={styles.cardNote}>+3.3 pts in one week</span>
            <span className={styles.cardNote}>Now included by top LLMs and agents</span>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Build sources → earn citations → <em>AI volunteers the brand.</em>
        </p>
      </div>
    </div>
  );
}

export function AdNetworkSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        The ad network is already live.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        We started with IDEs to bootstrap supply among the builders of tomorrow&rsquo;s AI surfaces.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 40 }}>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>Live</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Loading placement</div>
            <div className={styles.cardNote}>A sponsor appears while the model or agent prepares an answer.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Pilot</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>In-answer text</div>
            <div className={styles.cardNote}>A clearly disclosed recommendation beside a relevant answer.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Design</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Display card</div>
            <div className={styles.cardNote}>A richer comparison card with a measurable call to action.</div>
          </div>
        </div>
      </div>

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <span className={styles.statValue}>~1,000</span>
          <span className={styles.statLabel}>Extension installs</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>3 × $5k</span>
          <span className={styles.statLabel}>Paid advertiser pilots</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Design partners</span>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Next: more supply → <em>more budgets.</em>
        </p>
      </div>
    </div>
  );
}

export function FintechFocusSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        Neo-fintech is the focus.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        A large, global advertiser category with unusually high intent and unusually constrained distribution.
      </p>

      <div className={styles.compareRow} style={{ alignItems: "stretch", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 260 }}>
          <span className={styles.statValue} style={{ fontSize: 56 }}>~$100B*</span>
          <span className={styles.statLabel}>Annual fintech marketing spend</span>
          <span className={styles.cardNote}>Crypto · brokerages · payments · lending · wealth · treasury · infrastructure</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, maxWidth: 420 }}>
          <div className={styles.tagRow}>
            <span className={styles.gapTag}>Banned</span>
            <span className={styles.cardNote}>Some products</span>
          </div>
          <div className={styles.tagRow}>
            <span className={styles.gapTag}>Nerfed</span>
            <span className={styles.cardNote}>Targeting &amp; claims</span>
          </div>
          <div className={styles.tagRow}>
            <span className={`${styles.gapTag} ${styles.filled}`}>Allowed</span>
            <span className={styles.cardNote}>High-intent AI answers</span>
          </div>
        </div>

        <div className={styles.infoList} style={{ flex: 1, maxWidth: 340 }}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Supply</span>
            <span className={styles.infoValue}>Creator network + AI surfaces</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Demand</span>
            <span className={styles.infoValue}>$41k MRR + paid pilots</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Vertical data</span>
            <span className={styles.infoValue}>Intent, compliance, attribution</span>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Vertical focus = <em>density.</em>
        </p>
      </div>
    </div>
  );
}

export function PositioningSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        Fintech is the gap.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Horizontal ad networks miss restricted verticals. First-party AI ads stop at one surface.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>First-party lab ads</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNote}>AI surfaces · generalist</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Horizontal networks</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNote}>Traditional web · generalist</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Vertical publishers</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNote}>Traditional web · serves restricted fintech</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>Scribble</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardNote}>AI surfaces · serves restricted fintech</div>
          </div>
        </div>
      </div>

      <div className={styles.pointList}>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>01</span>
          <div>
            <div className={styles.pointTitle}>Supply relationships</div>
            <div className={styles.pointDesc}>Fragmented surfaces get one fintech monetization integration.</div>
          </div>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>02</span>
          <div>
            <div className={styles.pointTitle}>Concentrated demand</div>
            <div className={styles.pointDesc}>One sales motion aggregates budgets surfaces cannot win alone.</div>
          </div>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointIndex}>03</span>
          <div>
            <div className={styles.pointTitle}>Vertical infrastructure</div>
            <div className={styles.pointDesc}>Intent classification, compliance and attribution improve with scale.</div>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Ads on AI answers, <em>built for fintech.</em>
        </p>
      </div>
    </div>
  );
}

export function TeamSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        The team this problem requires.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Built distribution networks, sold to fintech advertisers and shipped infrastructure at scale.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}>
            <span className={styles.accentLabel}>Co-founder · Business</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Raghu Mohan</div>
            <div className={styles.cardNote}>Sold AI visibility to fintech brands and built the demand engine.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Co-founder · Growth</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Kaavya Prasad</div>
            <div className={styles.cardNote}>Bootstrapped creator and founder networks from zero.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}>
            <span>Co-founder · Tech</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Amruth Chundi</div>
            <div className={styles.cardNote}>Built infrastructure for millions of users · IIT Kanpur.</div>
          </div>
        </div>
      </div>

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <span className={styles.statValue}>$700k</span>
          <span className={styles.statLabel}>Paid to creators for performance</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Networks bootstrapped from zero</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>25+</span>
          <span className={styles.statLabel}>Startups helped raise $10M+</span>
        </div>
      </div>
    </div>
  );
}

export function RoundSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        Raising $2.5M.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        Turn a proven GEO demand wedge into the default fintech ad network for AI surfaces.
      </p>

      <div className={styles.fundsBar}>
        <div className={styles.fundsSegment} style={{ width: "65%", background: "var(--color-brand)", color: "var(--color-on-brand)" }}>65%</div>
        <div className={styles.fundsSegment} style={{ width: "24%", background: "var(--color-surface-3)", color: "var(--color-text-primary)" }}>24%</div>
        <div className={styles.fundsSegment} style={{ width: "11%", background: "var(--color-surface-4)", color: "var(--color-text-primary)" }}>11%</div>
      </div>
      <div className={styles.fundsLegend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--color-brand)" }} />
          Supply - integrations, publisher success, payouts
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--color-surface-3)" }} />
          Demand - sales team and advertiser budgets
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--color-surface-4)" }} />
          Product - attribution, compliance, serving stack
        </span>
      </div>

      <div className={styles.cardGrid} style={{ marginBottom: 28 }}>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}><span className={styles.accentLabel}>01</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Supply density</div>
            <div className={styles.cardNote}>Move from an IDE wedge to a repeatable portfolio of fintech-facing AI surfaces.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}><span>02</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Demand repeatability</div>
            <div className={styles.cardNote}>Convert pilots into recurring budgets through a focused enterprise sales motion.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}><span>03</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Measured outcomes</div>
            <div className={styles.cardNote}>Standardize cross-surface attribution from placement to conversion.</div>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Ads kept the web free. <em>Scribble makes AI distribution measurable.</em>
        </p>
      </div>
    </div>
  );
}

export function CapTableSlide() {
  return (
    <div className={styles.frame} data-reveal>
      <h1 className={styles.title} style={{ fontSize: 64 }}>
        The round needs more than capital.
      </h1>
      <p className={styles.edCallout} style={{ marginBottom: 32 }}>
        We are assembling a cap table that can accelerate both sides of the network.
      </p>

      <div className={styles.cardGrid} style={{ marginBottom: 32 }}>
        <div className={`${styles.card} ${styles.accent}`}>
          <div className={styles.cardBar}><span className={styles.accentLabel}>Anchor</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Fintech-native institution</div>
            <div className={styles.cardNote}>A neo-financial venture arm with category context, ecosystem access and aligned distribution interests.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}><span>Operator</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Enterprise sales builder</div>
            <div className={styles.cardNote}>An angel who has scaled products sold to marketing, growth and performance leaders.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}><span>Operator</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Ad-network builder</div>
            <div className={styles.cardNote}>An angel who understands marketplace liquidity, publisher incentives and advertiser measurement.</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBar}><span>Fund</span></div>
          <div className={styles.cardBody}>
            <div className={styles.cardHeading}>Martech micro-VC</div>
            <div className={styles.cardNote}>A specialist investor who has seen attribution, workflow and vertical-density advantages compound.</div>
          </div>
        </div>
      </div>

      <div className={styles.closeBlock}>
        <p className={styles.edCallout}>
          Strategic capital <em>without strategic capture.</em> No exclusivity · no ROFR · clean information rights.
        </p>
      </div>
    </div>
  );
}
