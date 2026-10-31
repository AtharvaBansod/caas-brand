import * as React from 'react';

/**
 * A tab row that sticks just under the floating nav until `fraction` of its section has been scrolled, then scrolls
 * away with the page like any normal element. The sticky range is the wrapper's height; a negative bottom margin
 * means the wrapper takes no extra room in the layout.
 */
export function StickyTabs({ section, fraction = 0.5, className = '', children }: { section: React.RefObject<HTMLElement>; fraction?: number; className?: string; children: React.ReactNode }) {
  const wrap = React.useRef<HTMLDivElement>(null);
  const row = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState({ range: 0, row: 0 });
  React.useEffect(() => {
    const measure = () => {
      const s = section.current, w = wrap.current, r = row.current; if (!s || !w || !r) return;
      const offset = w.getBoundingClientRect().top - s.getBoundingClientRect().top;   // where the row starts inside its section
      setH({ range: Math.round(s.offsetHeight * fraction - offset), row: r.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (section.current) ro.observe(section.current);
    if (row.current) ro.observe(row.current);
    return () => ro.disconnect();
  }, [section, fraction]);
  const range = Math.max(h.range, h.row);
  return (
    <div ref={wrap} className="pointer-events-none" style={{ height: range || undefined, marginBottom: range ? -(range - h.row) : 0 }}>
      <div ref={row} className={`stick-nav pointer-events-auto ${className}`}>{children}</div>
    </div>
  );
}
