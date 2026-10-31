import * as React from 'react';
import { Reveal, SplitText } from '../components/Reveal';
import { Shot } from '../components/Media';
import { Phone } from '../components/Devices';
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

function CallCard() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-3xl">
      <video className="absolute inset-0 h-full w-full object-cover" poster="/media/clips/c-video.jpg" muted loop playsInline autoPlay preload="metadata"><source src="/media/clips/c-video.webm" type="video/webm" /><source src="/media/clips/c-video.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white"><h3 className="text-lg font-semibold">Calls</h3><p className="text-[12.5px] text-white/70">Voice &amp; video, built in.</p></div>
    </div>
  );
}

function NativeCard() {
  return (
    <div className="relative">
      <h3 className="text-lg font-semibold">Native feel</h3><p className="mt-1 text-[14px] text-ink-3">Installable, offline-first, push-ready.</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{['Add to home screen', 'Works offline', 'Push alerts'].map((t) => <span key={t} className="rounded-full bg-iris/10 px-2.5 py-1 text-[11px] font-medium text-iris-700">{t}</span>)}</div>
      <div className="relative mx-auto mt-5 h-[210px] w-[170px] overflow-hidden"><div className="absolute left-0 top-0 w-full transition-transform duration-500 group-hover:-translate-y-2"><Phone media={{ image: phone.chatlist }} /></div>
        <div className="absolute -right-1 top-5 rounded-xl bg-white px-2.5 py-1.5 text-[10.5px] font-medium shadow-lift ring-1 ring-ink/5"><b className="text-iris">New message</b><br />Sofia: landed! ✈️</div></div>
    </div>
  );
}

function ThemeCard() {
  const colors = ['#5b5bf0', '#f472b6', '#22d3ee', '#34d399', '#f59e0b'];
  const [c, setC] = React.useState(colors[0]); const [dark, setDark] = React.useState(false);
  return (
    <div>
      <h3 className="text-lg font-semibold">Themeable</h3><p className="mt-1 text-[14px] text-ink-3">Pick a colour. Flip light &amp; dark. Try it.</p>
      <div className={`mt-4 rounded-2xl p-3 transition-colors duration-500 ${dark ? 'bg-night-2' : 'bg-paper-2'}`}>
        <div className={`max-w-[75%] rounded-2xl px-3 py-1.5 text-[12px] ${dark ? 'bg-white/10 text-white' : 'bg-white text-ink'}`}>Your brand, your colour 🎨</div>
        <div className="ml-auto mt-2 w-fit max-w-[75%] rounded-2xl px-3 py-1.5 text-[12px] text-white transition-colors duration-300" style={{ background: c }}>Love it — ship it!</div>
      </div>
      <div className="mt-3 flex items-center gap-2">{colors.map((x) => <button key={x} onClick={() => setC(x)} aria-label={x} className={`h-7 flex-1 rounded-lg transition-transform ${c === x ? 'scale-110 ring-2 ring-ink/40 ring-offset-2' : 'hover:-translate-y-0.5'}`} style={{ background: x }} />)}
        <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode" className={`ml-1 grid h-7 w-12 items-center rounded-full px-1 transition-colors ${dark ? 'bg-iris' : 'bg-ink/15'}`}><i className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${dark ? 'translate-x-5' : ''}`} /></button></div>
    </div>
  );
}

const EVENTS = ['message.created', 'task.completed', 'call.ended', 'story.viewed', 'member.joined', 'ticket.created'];
function ApiCard() {
  const [n, setN] = React.useState(3);
  React.useEffect(() => { const t = window.setInterval(() => setN((x) => x + 1), 1400); return () => window.clearInterval(t); }, []);
  const rows = Array.from({ length: 4 }, (_, i) => n - 3 + i);
  return (
    <div>
      <h3 className="text-lg font-semibold">Webhooks &amp; API</h3><p className="mt-1 text-[14px] text-ink-3">Signed events, queued and retried.</p>
      <div className="mt-4 overflow-hidden rounded-xl bg-night p-3 font-mono text-[11px] leading-[1.7]">
        <div className="text-white/40">POST /hooks/caas · X-Signature: sha256=…</div>
        {rows.map((k) => (
          <div key={k} className="flex items-center justify-between text-aqua/90 animate-[fadeIn_.5s_ease]"><span>{'{ "type": "'}{EVENTS[k % EVENTS.length]}{'" }'}</span><i className="rounded bg-mint/20 px-1.5 text-[10px] not-italic text-mint">200</i></div>
        ))}
      </div>
      <pre className="mt-2 rounded-xl bg-paper-2 p-2.5 font-mono text-[10.5px] text-ink-2">GET /api/v1/conversations</pre>
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
          <Tilt className="md:col-span-2"><h3 className="text-lg font-semibold">Planner</h3><p className="mt-1 text-[14px] text-ink-3">Tasks born from chat.</p><Shot src={desktop.planner} className="mt-4 aspect-[16/10] w-full rounded-xl border border-ink/5 object-cover" /></Tilt>
          <Tilt className="md:col-span-1 !p-0"><CallCard /></Tilt>
          <Tilt className="md:col-span-3"><h3 className="text-lg font-semibold">Whiteboards</h3><p className="mt-1 text-[14px] text-ink-3">Sketch together, live.</p><Shot src={desktop.whiteboard} className="mt-4 aspect-[16/10] w-full rounded-xl border border-ink/5 object-cover" /></Tilt>
          <Tilt className="md:col-span-3"><h3 className="text-lg font-semibold">Org chart &amp; communities</h3><p className="mt-1 text-[14px] text-ink-3">Reporting lines, broadcasts and member roles.</p><Shot src={desktop.org} className="mt-4 aspect-[16/10] w-full rounded-xl border border-ink/5 object-cover" /></Tilt>
          <Tilt className="md:col-span-2 !pb-0"><NativeCard /></Tilt>
          <Tilt className="md:col-span-2"><ThemeCard /></Tilt>
          <Tilt className="md:col-span-2"><ApiCard /></Tilt>
        </Reveal>
      </div>
    </section>
  );
}
