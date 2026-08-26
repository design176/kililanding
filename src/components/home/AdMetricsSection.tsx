'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AdMetricsSection.module.css';

const METRICS = [
  { label: 'Ads shown', value: '1824' },
  { label: 'Rewards Distributed', value: '6749' },
] as const;

const DIGIT_COUNT = 10;

function createWheel(finalDigit: string, digitIndex: number) {
  // More rotations on the less-significant wheels creates the familiar
  // cadence of a number increasing instead of four unrelated reels moving.
  const rotations = digitIndex + 1;
  const stopIndex = rotations * DIGIT_COUNT + Number(finalDigit);
  const digits = Array.from(
    { length: stopIndex + 1 },
    (_, index) => index % DIGIT_COUNT,
  );

  return { digits, stopIndex };
}

/** Placeholder figures until the live metrics endpoint is connected. */
export function AdMetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

        METRICS.forEach(({ value }, metricIndex) => {
          for (
            let digitIndex = value.length - 1;
            digitIndex >= 0;
            digitIndex -= 1
          ) {
            const wheel =
              wheelRefs.current[metricIndex * value.length + digitIndex];

            if (!wheel) {
              continue;
            }

            const { digits, stopIndex } = createWheel(
              value[digitIndex],
              digitIndex,
            );
            const rightToLeftOrder = value.length - 1 - digitIndex;

            gsap.set(wheel, { yPercent: 0 });
            activeTimeline.to(
              wheel,
              {
                yPercent: -(stopIndex / digits.length) * 100,
                duration: 1.45 + rightToLeftOrder * 0.2,
                ease: 'power3.out',
              },
              rightToLeftOrder * 0.08,
            );
          }
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
  }, []);

  return (
    <div className={styles.metricsInner} ref={sectionRef}>
      <div className={styles.metricsGrid}>
        <p className={styles.intro}>
          Our ads are not annoying. They show up only while you wait.
        </p>

        {METRICS.map(({ label, value }, metricIndex) => (
          <section className={styles.metric} key={label} aria-label={label}>
            <h2 className={styles.metricLabel}>{label}</h2>
            <div className={styles.ticker} aria-label={`${label}: ${value}`}>
              {value.split('').map((digit, digitIndex) => {
                const { digits } = createWheel(digit, digitIndex);

                return (
                  <span
                    className={styles.tickerDigit}
                    key={digitIndex}
                    aria-hidden='true'
                  >
                    <span
                      className={styles.digitStrip}
                      ref={(element) => {
                        wheelRefs.current[
                          metricIndex * value.length + digitIndex
                        ] = element;
                      }}
                    >
                      {digits.map((wheelDigit, wheelIndex) => (
                        <span className={styles.digitValue} key={wheelIndex}>
                          {wheelDigit}
                        </span>
                      ))}
                    </span>
                  </span>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
