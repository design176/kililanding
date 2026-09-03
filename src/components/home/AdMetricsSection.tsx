'use client';

import { useEffect, useMemo, useRef } from 'react';
import { animate, type AnimationPlaybackControls } from 'motion/react';
import { DotMatrixCounter } from './DotMatrixCounter';
import styles from './AdMetricsSection.module.css';

const COUNT_EASE = [0.33, 1, 0.68, 1] as const;

export function AdMetricsSection({
  adsShown,
  adSpend,
}: {
  adsShown: number;
  adSpend: number;
}) {
  const METRICS = useMemo(
    () =>
      [
        { label: 'Ads shown', value: String(Math.round(adsShown)), prefix: '' },
        { label: 'Ads Spend', value: String(Math.round(adSpend)), prefix: '$' },
      ] as const,
    [adsShown, adSpend],
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  // Plain mutable containers (not React refs) so DotMatrixCounter's rAF loop
  // can read the latest text without a re-render - safe to read in JSX since
  // it's a stable object identity from useMemo, not a ref's `.current`.
  const textBoxes = useMemo(
    () => METRICS.map(({ prefix }) => ({ current: `${prefix}0` })),
    [METRICS],
  );
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const controls: AnimationPlaybackControls[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();

        METRICS.forEach(({ value, prefix }, metricIndex) => {
          const textRef = textBoxes[metricIndex];
          const canvasEl = canvasRefs.current[metricIndex];
          const delay = 0.24 + metricIndex * 0.15;

          if (canvasEl) {
            controls.push(
              animate(canvasEl, { opacity: 1 }, { duration: 0.6, delay, ease: 'easeOut' }),
            );
          }

          controls.push(
            animate(0, Number(value), {
              duration: 1.4,
              delay,
              ease: COUNT_EASE,
              onUpdate: (latest) => {
                textRef.current = `${prefix}${Math.round(latest)}`;
              },
            }),
          );
        });
      },
      {
        threshold: 0.6,
        rootMargin: '0px 0px -12% 0px',
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      controls.forEach((control) => control.stop());
    };
  }, [textBoxes, METRICS]);

  return (
    <div className={styles.metricsInner} ref={sectionRef}>
      <div className={styles.metricsGrid}>
        <p className={styles.intro}>
          Kili ads are gently placed in and around answers, without ever touching the core AI experience
        </p>

        {METRICS.map(({ label, value, prefix }, metricIndex) => (
          <section className={styles.metric} key={label} aria-label={label}>
            <h2 className={styles.metricLabel}>{label}</h2>
            <div className={styles.ticker}>
              <DotMatrixCounter
                textRef={textBoxes[metricIndex]}
                maxChars={`${prefix}${value}`.length}
                className={styles.tickerCanvas}
                ariaLabel={`${label}: ${prefix}${value}`}
                onCanvasReady={(element) => {
                  canvasRefs.current[metricIndex] = element;
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
