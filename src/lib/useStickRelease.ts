import * as React from 'react';

/** True once the section has been scrolled past `at` (default a quarter): sticky bars use it to slide away instead of overlaying the content below. */
export function useStickRelease(ref: React.RefObject<HTMLElement>, at = 0.25) {
  const [released, setReleased] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const on = () => { const r = el.getBoundingClientRect(); const done = (-r.top) / Math.max(1, r.height); setReleased(done > at); };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [ref, at]);
  return released;
}
