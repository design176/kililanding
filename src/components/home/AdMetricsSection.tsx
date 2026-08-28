'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { DotMatrixCounter } from './DotMatrixCounter';
import styles from './AdMetricsSection.module.css';

const METRICS = [
  { label: 'Ads shown', value: '1824', prefix: '' },
  { label: 'Rewards Distributed', value: '6749', prefix: '$' },
] as const;

/** Placeholder figures until the live metrics endpoint is connected. */
export function AdMetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Plain mutable containers (not React refs) so DotMatrixCounter's rAF loop
  // can read the latest text without a re-render — safe to read in JSX since
  // it's a stable object identity from useMemo, not a ref's `.current`.
  const textBoxes = useMemo(() => METRICS.map(({ prefix }) => ({ current: `${prefix}0` })), []);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let timeline: gsap.core.Timeline | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        const activeTimeline = gsap.timeline({ delay: 0.24 });
        timeline = activeTimeline;

        METRICS.forEach(({ value, prefix }, metricIndex) => {
          const textRef = textBoxes[metricIndex];
          const canvasEl = canvasRefs.current[metricIndex];
          const stagger = metricIndex * 0.15;
          const counter = { val: 0 };

          if (canvasEl) {
            activeTimeline.to(
              canvasEl,
              { opacity: 1, duration: 0.6, ease: 'power2.out' },
              stagger,
            );
          }

          activeTimeline.to(
            counter,
            {
              val: Number(value),
              duration: 1.4,
              ease: 'power3.out',
              onUpdate: () => {
                textRef.current = `${prefix}${Math.round(counter.val).toLocaleString('en-US')}`;
              },
            },
            stagger,
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
      timeline?.kill();
    };
  }, [textBoxes]);

  return (
    <div className={styles.metricsInner} ref={sectionRef}>
      <div className={styles.metricsGrid}>
        <p className={styles.intro}>
          Our ads are not annoying. They show up only while you wait.
        </p>

        {METRICS.map(({ label, value, prefix }, metricIndex) => (
          <section className={styles.metric} key={label} aria-label={label}>
            <h2 className={styles.metricLabel}>{label}</h2>
            <div className={styles.ticker}>
              <DotMatrixCounter
                textRef={textBoxes[metricIndex]}
                maxChars={`${prefix}${Number(value).toLocaleString('en-US')}`.length}
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
