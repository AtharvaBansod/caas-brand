const items = ['1:1 & group chat', 'Voice & video calls', 'Stories & reels', 'Planner & tasks', 'Whiteboards', 'Pages & notes', 'Communities', 'Org chart', 'End-to-end encryption', 'Scheduled messages', 'Push notifications', 'Webhooks'];
export function Marquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Capabilities" className="relative border-y border-ink/5 bg-white/60 py-5 backdrop-blur">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-[13px] font-medium tracking-wide text-ink-3">{t}<i className="h-1 w-1 rounded-full bg-iris/40" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
