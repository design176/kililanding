'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

/**
 * Staggers the hero's direct children in from a blur on first paint. The
 * children start at opacity 0 via CSS (`.hero > *` in page.module.css) so
 * there's nothing to flash before this effect attaches.
 */
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 16, filter: 'blur(14px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.1,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={className} ref={ref}>
      {children}
    </section>
  );
}
