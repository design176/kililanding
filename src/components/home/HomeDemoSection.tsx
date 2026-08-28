"use client";

import { useState } from "react";
import { AudienceSwitcher } from "./AudienceSwitcher";
import { RevenueShowcase } from "./mockups/CodeEditorMockup";
import styles from "./HomeDemoSection.module.css";

export function HomeDemoSection() {
  const [isPlatform, setIsPlatform] = useState(false);

  return (
    <div className={styles.section}>
      <AudienceSwitcher isPlatform={isPlatform} onChange={setIsPlatform} />

      {isPlatform ? (
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonStrip}>Coming soon</div>
        </div>
      ) : (
        <div className={styles.showcase}>
          <RevenueShowcase />
        </div>
      )}
    </div>
  );
}
