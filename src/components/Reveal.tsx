import * as React from 'react';
import { gsap } from '../lib/smooth';

/** Words rise out of a mask. `onView` = when scrolled to; otherwise on mount (hero). */
export function SplitText({ text, className = '', as: Tag = 'span', delay = 0, stagger = 0.045, onView = true, accentFrom, accentClass = '' }: {
  text: string; className?: string; as?: React.ElementType; delay?: number; stagger?: number; onView?: boolean; accentFrom?: number; accentClass?: string;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const words = text.split(' ');
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const inner = el.querySelectorAll<HTMLElement>('.split-word > span');
    gsap.set(inner, { yPercent: 115, rotate: 4 });
    const tween = gsap.to(inner, {
      yPercent: 0, rotate: 0, duration: 1.05, ease: 'expo.out', stagger, delay,
      ...(onView ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } } : {}),
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [text, delay, stagger, onView]);
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="split-word" aria-hidden><span className={accentFrom !== undefined && i >= accentFrom ? accentClass : ''}>{w}</span></span>{i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** Fade + lift children in when they scroll into view. `stagger` animates the direct children one by one. */
export function Reveal({ children, className = '', y = 36, delay = 0, as: Tag = 'div', stagger }: { children: React.ReactNode; className?: string; y?: number; delay?: number; as?: React.ElementType; stagger?: number }) {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const targets = stagger ? Array.from(el.children) : [el];
    gsap.set(targets, { y, opacity: 0 });
    const t = gsap.to(targets, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay, stagger: stagger || 0, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [y, delay, stagger]);
  return <Tag ref={ref as never} className={className}>{children}</Tag>;
}
