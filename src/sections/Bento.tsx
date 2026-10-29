import * as React from 'react';
import { Reveal, SplitText } from '../components/Reveal';
import { Shot } from '../components/Media';
import { desktop, phone, photos } from '../assets';

function Tilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-3px)`;
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`); el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`group relative overflow-hidden rounded-3xl border border-ink/5 bg-white p-6 shadow-soft transition-transform duration-300 ease-out ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(91,91,240,.10), transparent 60%)' }} />
      {children}
    </div>
  );
}

export function Bento() {
  return (
    <section id="platform" className="relative py-24 md:py-32">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><span className="eyebrow">The platform</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Everything a conversation needs, already built." />
        </div>
        <Reveal stagger={0.08} y={40} className="mt-12 grid gap-4 md:grid-cols-6">
          <Tilt className="md:col-span-3 md:row-span-2">
            <h3 className="text-xl font-semibold">Private by default</h3>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-3">Room-key end-to-end encryption, trusted-device sign-in and recoverable keys. Not even your servers read a message.</p>
            <div className="mt-6 space-y-2.5">
              {['Hey — are we still on for Friday?', 'Locked in. 🔒 Sending the deck now.'].map((m, i) => (
                <div key={m} className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] ${i ? 'ml-auto bg-iris text-white' : 'bg-paper-2 text-ink'}`}><span className="blur-[3.5px] transition duration-500 group-hover:blur-0">{m}</span></div>
              ))}
            </div>
            <Shot src={phone.chat} className="pointer-events-none mx-auto mt-6 hidden h-64 w-52 rounded-t-[28px] border border-b-0 border-ink/10 object-cover object-top shadow-lift md:block" />
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1 text-[12px] font-medium text-emerald-700"><i className="h-1.5 w-1.5 rounded-full bg-mint" /> Encrypted on device · hover to reveal</div>
          </Tilt>
          <Tilt className="md:col-span-3">
            <h3 className="text-lg font-semibold">Stories, posts &amp; reels</h3><p className="mt-1 text-[14px] text-ink-3">A full social layer with a built-in studio.</p>
            <div className="mt-4 flex gap-3">{photos.slice(0, 4).map((p, i) => <Shot key={p} src={p} className="h-28 w-20 flex-1 rounded-2xl object-cover transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 40}ms` }} />)}</div>
          </Tilt>
          <Tilt className="md:col-span-2"><h3 className="text-lg font-semibold">Planner</h3><p className="mt-1 text-[14px] text-ink-3">Tasks born from chat.</p><Shot src={desktop.planner} className="mt-4 h-36 w-full rounded-xl border border-ink/5 object-cover object-left-top" /></Tilt>
          <Tilt className="md:col-span-1">
            <h3 className="text-lg font-semibold">Calls</h3><p className="mt-1 text-[14px] text-ink-3">Voice &amp; video.</p>
            <div className="relative mx-auto mt-5 grid h-20 w-20 place-items-center">
              {[0, 1].map((i) => <i key={i} className="absolute inset-0 rounded-full border border-iris/40 animate-pulseRing" style={{ animationDelay: `${i * 1.2}s` }} />)}
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-iris to-violet text-white"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" /></svg></span>
            </div>
          </Tilt>
          <Tilt className="md:col-span-3"><h3 className="text-lg font-semibold">Whiteboards</h3><p className="mt-1 text-[14px] text-ink-3">Sketch together, live.</p><Shot src={desktop.whiteboard} className="mt-4 h-40 w-full rounded-xl border border-ink/5 object-cover object-top" /></Tilt>
          <Tilt className="md:col-span-3"><h3 className="text-lg font-semibold">Org chart &amp; communities</h3><p className="mt-1 text-[14px] text-ink-3">Reporting lines, broadcasts and member roles.</p><Shot src={desktop.org} className="mt-4 h-40 w-full rounded-xl border border-ink/5 object-cover object-top" /></Tilt>
          <Tilt className="md:col-span-2"><h3 className="text-lg font-semibold">Native feel</h3><p className="mt-1 text-[14px] text-ink-3">Installable, offline-first, push-ready.</p><Shot src={phone.chatlist} className="mx-auto mt-4 h-40 w-auto rounded-xl object-cover object-top" /></Tilt>
          <Tilt className="md:col-span-2"><h3 className="text-lg font-semibold">Themeable</h3><p className="mt-1 text-[14px] text-ink-3">Your brand, light &amp; dark.</p><div className="mt-5 flex gap-2">{['#5b5bf0', '#f472b6', '#22d3ee', '#34d399', '#f59e0b'].map((c) => <i key={c} className="h-10 flex-1 rounded-xl transition-transform duration-300 hover:-translate-y-1" style={{ background: c }} />)}</div></Tilt>
          <Tilt className="md:col-span-2"><h3 className="text-lg font-semibold">Webhooks &amp; API</h3><p className="mt-1 text-[14px] text-ink-3">Signed events, queued and retried.</p><pre className="mt-4 rounded-xl bg-night p-3 font-mono text-[11px] leading-5 text-aqua/90">{'POST /hooks/caas\n{ "type": "message.created" }'}</pre></Tilt>
        </Reveal>
      </div>
    </section>
  );
}
