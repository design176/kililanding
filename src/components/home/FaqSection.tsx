'use client';

import { useState } from 'react';
import styles from './FaqSection.module.css';

const FAQS = [
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
      'Choose stablecoin settlement or a direct payout through Stripe—whichever route fits your business.',
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
] as const;

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} aria-labelledby='faq-heading'>
      <header className={styles.headingColumn}>
        <span className={styles.sectionIndex}>Frequenty Asked Questions</span>
        <h2 id='faq-heading'>FAQ</h2>
      </header>

      <div className={styles.faqPanel}>
        <div className={styles.questionList}>
          {FAQS.map((faq, index) => {
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
                      <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M0 1.18419C0 0.530178 0.543461 0 1.21385 0H6.87992C7.55031 0 8.09377 0.530178 8.09377 1.18419V6.71179C8.09377 7.36579 7.55031 7.89597 6.87992 7.89597H1.21385C0.54346 7.89597 0 7.36579 0 6.71179V1.18419Z" fill="#71717A"/>
                        <path d="M10.3011 1.18419C10.3011 0.530178 10.8446 0 11.515 0H17.1811C17.8515 0 18.3949 0.530178 18.3949 1.18419V6.71179C18.3949 7.36579 17.8515 7.89597 17.1811 7.89597H11.515C10.8446 7.89597 10.3011 7.36579 10.3011 6.71179V1.18419Z" fill="#71717A"/>
                        <path d="M20.6023 1.18419C20.6023 0.530178 21.1458 0 21.8162 0H27.4823C28.1526 0 28.6961 0.530178 28.6961 1.18419V6.71179C28.6961 7.36579 28.1526 7.89597 27.4823 7.89597H21.8162C21.1458 7.89597 20.6023 7.36579 20.6023 6.71179V1.18419Z" fill="#16A34A"/>
                        <path d="M0 11.2336C0 10.5796 0.543461 10.0494 1.21385 10.0494H6.87992C7.55031 10.0494 8.09377 10.5796 8.09377 11.2336V16.7612C8.09377 17.4152 7.55031 17.9454 6.87992 17.9454H1.21385C0.54346 17.9454 0 17.4152 0 16.7612V11.2336Z" fill="#71717A"/>
                        <path d="M10.3011 11.2336C10.3011 10.5796 10.8446 10.0494 11.515 10.0494H17.1811C17.8515 10.0494 18.3949 10.5796 18.3949 11.2336V16.7612C18.3949 17.4152 17.8515 17.9454 17.1811 17.9454H11.515C10.8446 17.9454 10.3011 17.4152 10.3011 16.7612V11.2336Z" fill="#71717A"/>
                        <path d="M20.6023 11.2336C20.6023 10.5796 21.1458 10.0494 21.8162 10.0494H27.4823C28.1526 10.0494 28.6961 10.5796 28.6961 11.2336V16.7612C28.6961 17.4152 28.1526 17.9454 27.4823 17.9454H21.8162C21.1458 17.9454 20.6023 17.4152 20.6023 16.7612V11.2336Z" fill="#71717A"/>
                        <path d="M0 21.2831C0 20.629 0.543461 20.0989 1.21385 20.0989H6.87992C7.55031 20.0989 8.09377 20.629 8.09377 21.2831V26.8106C8.09377 27.4647 7.55031 27.9948 6.87992 27.9948H1.21385C0.54346 27.9948 0 27.4647 0 26.8106V21.2831Z" fill="#71717A"/>
                        <path d="M10.3011 21.2831C10.3011 20.629 10.8446 20.0989 11.515 20.0989H17.1811C17.8515 20.0989 18.3949 20.629 18.3949 21.2831V26.8106C18.3949 27.4647 17.8515 27.9948 17.1811 27.9948H11.515C10.8446 27.9948 10.3011 27.4647 10.3011 26.8106V21.2831Z" fill="#71717A"/>
                        <path d="M20.6023 21.2831C20.6023 20.629 21.1458 20.0989 21.8162 20.0989H27.4823C28.1526 20.0989 28.6961 20.629 28.6961 21.2831V26.8106C28.6961 27.4647 28.1526 27.9948 27.4823 27.9948H21.8162C21.1458 27.9948 20.6023 27.4647 20.6023 26.8106V21.2831Z" fill="#71717A"/>
                      </svg>
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
