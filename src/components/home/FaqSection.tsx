'use client';

import { useState } from 'react';
import { KiliMark } from '@/components/Logo';
import styles from './FaqSection.module.css';

export type FaqEntry = { question: string; answer: string };

const DEFAULT_FAQS: readonly FaqEntry[] = [
  {
    question: 'How does Kili help my AI app earn revenue?',
    answer:
      'Kili matches a relevant sponsor to the intent in a conversation and places the ad during a natural wait state. Your app earns whenever an eligible placement is served.',
  },
  {
    question: "Will ads interrupt the user's work?",
    answer:
      'No. Kili is designed for moments when an agent is already thinking or loading, so a sponsor placement never covers or competes with active work.',
  },
  {
    question: 'Does Kili rely on cookies or personal profiles?',
    answer:
      'Kili matches against the context of the current conversation, using only what is required to find a relevant sponsor instead of following users around the web.',
  },
  {
    question: 'How do payouts work?',
    answer:
      'Choose stablecoin settlement or a direct payout through Stripe - whichever route fits your business.',
  },
  {
    question: 'Why can Kili deliver higher CPMs?',
    answer:
      'Questions inside AI conversations express immediate intent. That makes the placement more valuable to advertisers and can support higher CPMs on average.',
  },
  {
    question: 'How do I add Kili to my app?',
    answer:
      'Run the Kili install command, connect your account, and choose the natural loading state where an approved sponsor can appear.',
  },
];

export function FaqSection({
  items = DEFAULT_FAQS,
  eyebrow = 'Frequenty Asked Questions',
  heading = 'FAQ',
}: {
  items?: readonly FaqEntry[];
  eyebrow?: string;
  heading?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} aria-labelledby='faq-heading'>
      <header className={styles.headingColumn}>
        <span className={styles.sectionIndex}>{eyebrow}</span>
        <h2 id='faq-heading'>{heading}</h2>
      </header>

      <div className={styles.faqPanel}>
        <div className={styles.questionList}>
          {items.map((faq, index) => {
            const isActive = index === activeIndex;
            const answerId = `faq-answer-${index}`;

            return (
              <div className={styles.faqItem} key={faq.question}>
                <button
                  type='button'
                  className={`${styles.questionButton} ${
                    isActive ? styles.questionButtonActive : ''
                  }`}
                  aria-expanded={isActive}
                  aria-controls={answerId}
                  onClick={() => setActiveIndex(index)}
                >
                  {faq.question}
                </button>

                {isActive && (
                  <div className={styles.answerRow} id={answerId}>
                    <p className={styles.answer}>{faq.answer}</p>
                    <span className={styles.answerMark} aria-hidden='true'>
                      <KiliMark size={28} />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
