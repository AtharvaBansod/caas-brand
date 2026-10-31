import * as React from 'react';

const P = (d: string) => <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const items: [string, React.ReactNode][] = [
  ['1:1 & group chat', P('M4 5h16v11H9l-5 4z')],
  ['Voice & video calls', P('M3 7h12v10H3zM15 11l6-3v8l-6-3')],
  ['Stories & reels', P('M12 3a9 9 0 1 0 9 9M12 7v5l3 2')],
  ['Planner & tasks', P('M4 5h16v14H4zM8 11l2.5 2.5L16 8')],
  ['Whiteboards', P('M3 4h18v12H3zM8 20l4-4 4 4M7 11c2-3 3 2 5-1s3 2 5-1')],
  ['Pages & notes', P('M6 3h9l4 4v14H6zM9 12h7M9 16h7')],
  ['Communities', P('M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M16 7a3 3 0 0 1 0 5M18 20c0-2-1-3.5-3-4.4')],
  ['Org chart', P('M12 3v5M5 14v-3h14v3M5 14v5M12 11v8M19 14v5')],
  ['End-to-end encryption', P('M5 11h14v9H5zM8 11V8a4 4 0 0 1 8 0v3')],
  ['Scheduled messages', P('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2')],
  ['Push notifications', P('M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4')],
  ['Webhooks', P('M8 12a4 4 0 1 1 4 4M12 16l-3 5M16 12l4 3M12 8l-3-5')],
  ['Support desk', P('M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z')],
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Capabilities" className="relative border-y border-ink/5 bg-white/60 py-5 backdrop-blur">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-9 whitespace-nowrap">
          {row.map(([t, icon], i) => (
            <span key={i} className="flex items-center gap-2.5 text-[13px] font-medium tracking-wide text-ink-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-iris/10 text-iris">{icon}</span>{t}
              <i className="ml-6 h-1 w-1 rounded-full bg-iris/30" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
