import type { ReactNode } from "react";
import styles from "./WindowChrome.module.css";

/**
 * Shared macOS-style title bar wrapper for the ported app mockups
 * (ChatGPT / Claude Code / Miro / Scribble). Each app keeps its own
 * authentic chrome colors inside `children` — this only provides the
 * outer window frame + traffic-light dots + title.
 */
export function WindowChrome({
  app,
  title,
  children,
}: {
  app: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.window} data-app={app} aria-label={`${title} demo`}>
      <div className={styles.bar}>
        <div className={styles.controls}>
          <span className={`${styles.dot} ${styles.close}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.minimize}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.expand}`} aria-hidden="true" />
        </div>
        <strong>{title}</strong>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
