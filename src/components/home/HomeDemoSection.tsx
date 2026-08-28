"use client";

import { useState } from "react";
import { AudienceSwitcher } from "./AudienceSwitcher";
import { RevenueShowcase, ComingSoonMockup } from "./mockups/CodeEditorMockup";
import styles from "./HomeDemoSection.module.css";

export function HomeDemoSection() {
  const [isPlatform, setIsPlatform] = useState(false);

  return (
    <div className={styles.section}>
      <AudienceSwitcher isPlatform={isPlatform} onChange={setIsPlatform} />

      {isPlatform ? (
        <div className={styles.comingSoon}>
          <ComingSoonMockup />
        </div>
      ) : (
        <div className={styles.showcase}>
          <RevenueShowcase />
        </div>
      )}
    </div>
  );
}
