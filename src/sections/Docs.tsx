import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal, SplitText } from '../components/Reveal';
import { Browser } from '../components/Devices';
import { admin } from '../assets';

type Lang = { id: string; label: string; sub: string; side: 'Front end' | 'Back end'; status: string; file: string; mono: string; tone: string; code: string };
const langs: Lang[] = [
  { id: 'react', label: 'React / Next.js', sub: 'Drop-in UI', side: 'Front end', status: 'Ready', file: 'app/messages/page.tsx', mono: 'Re', tone: 'from-sky-400 to-indigo-500', code: `import { CaasProvider, CaasShell } from '@caas/sdk-react';

export default function Messages() {
  return (
    <CaasProvider projectId="your-project">
      <CaasShell />
    </CaasProvider>
  );
}` },
  { id: 'angular', label: 'Angular', sub: 'Observable adapter', side: 'Front end', status: 'Alpha', file: 'messages.service.ts', mono: 'Ng', tone: 'from-rose-400 to-red-500', code: `import { CaasAngularAdapter } from '@caas/sdk-angular';

// Observable streams over the core SDK: state, errors, events.
const adapter = new CaasAngularAdapter({ sdk, autoConnect: true });
adapter.state$.subscribe((s) => console.log('chat', s));` },
  { id: 'web', label: 'Any web framework', sub: 'Vue · Svelte · plain JS', side: 'Front end', status: 'Ready', file: 'main.ts', mono: 'JS', tone: 'from-amber-300 to-orange-500', code: `import { createCaasSession } from '@caas/sdk-web-core';

// Vue, Svelte, plain JS — the core runtime works anywhere.
const session = createCaasSession({ projectId: 'your-project' });
// hand the session to your UI — or use the headless hooks.` },
  { id: 'node', label: 'Node / TypeScript', sub: 'Session kit', side: 'Back end', status: 'Ready', file: 'server.ts', mono: 'No', tone: 'from-emerald-400 to-teal-600', code: `import { createCaasSessionKit } from '@caas/sdk-node-ts';

const kit = createCaasSessionKit({ apiKey: process.env.CAAS_KEY!, projectId: 'your-project' });

// sign your users in — devices, codes & keys are handled for you
app.use('/caas', kit.handlers({ resolveUser: (req) => req.user }));` },
  { id: 'http', label: 'Python · Java · .NET · Ruby · Rust', sub: 'Starters + REST', side: 'Back end', status: 'Starters', file: 'any language', mono: '{ }', tone: 'from-violet-400 to-fuchsia-500', code: `# Every backend speaks plain HTTP with two headers.
curl https://api.yourcloud.com/api/v1/sdk/health \\
  -H "x-api-key: $CAAS_KEY" \\
  -H "x-project-id: your-project"

# Starter SDKs ship for Python, Java, .NET, Ruby and Rust.` },
];

const Ico = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const flow = [
  ['Create a project', 'Pick Normal or Workspaces in the console.', 'M3 7h18v12H3zM3 7l3-3h6l2 3'],
  ['Install the SDK', 'One package front end, one for your server.', 'M12 3v12M7 11l5 5 5-5M4 20h16'],
  ['Mount the UI', 'A single component, or the headless hooks.', 'M4 5h16v11H9l-5 4z'],
  ['Ship', 'Toggle features any time from the console.', 'M5 19c1-6 5-10 14-14-1 9-5 13-11 14zM9 15l-3 3'],
];

function Typed({ text }: { text: string }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    setN(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return undefined; }
    const id = window.setInterval(() => setN((x) => (x >= text.length ? (window.clearInterval(id), x) : x + 3)), 14);
    return () => window.clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}

export function Docs() {
  const [id, setId] = React.useState('react');
  const [copied, setCopied] = React.useState(false);
  const cur = langs.find((l) => l.id === id)!;
  const copy = () => { void navigator.clipboard?.writeText(cur.code).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 1500); }).catch(() => undefined); };
  return (
    <section id="docs" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper via-iris-50/50 to-paper" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow">Docs &amp; integration</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Fits the stack you already have." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] text-ink-2">Guides, copy-paste snippets and an SDK playground live in your admin console. Pick your framework — we show the code.</p></Reveal>
        </div>

        <Reveal stagger={0.1} className="relative mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-4">
          <span className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px border-t-2 border-dashed border-iris/25 sm:block" aria-hidden />
          {flow.map(([t, d, ic], k) => (
            <div key={t} className="relative text-center">
              <span className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-iris shadow-lift ring-1 ring-iris/15"><Ico d={ic} /><i className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-iris text-[10px] font-semibold not-italic text-white">{k + 1}</i></span>
              <b className="mt-3 block text-[14.5px]">{t}</b><p className="mx-auto mt-1 max-w-[190px] text-[12.5px] leading-relaxed text-ink-3">{d}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
          <Reveal y={40}>
            <Browser url="admin.yourapp.com/docs" media={{ image: admin.docs }} />
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-[12.5px] text-ink-2 sm:grid-cols-4">
              {['Guides', 'Snippets', 'API reference', 'SDK playground'].map((t) => <span key={t} className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-center font-medium shadow-soft">{t}</span>)}
            </div>
          </Reveal>

          <Reveal y={40} delay={0.1}>
            {(['Front end', 'Back end'] as const).map((side) => (
              <div key={side} className="mb-4">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.16em] text-ink-3">{side}</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {langs.filter((l) => l.side === side).map((l) => (
                    <button key={l.id} onClick={() => setId(l.id)} className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${l.id === id ? 'border-iris/40 bg-white shadow-lift' : 'border-ink/10 bg-white/70 hover:border-iris/30'}`}>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[12px] font-bold text-white ${l.tone}`}>{l.mono}</span>
                      <span className="min-w-0"><b className="block truncate text-[12.5px] leading-tight">{l.label}</b><span className="block truncate text-[11px] text-ink-3">{l.sub}</span></span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-night shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
                <span className="ml-3 font-mono text-[12px] text-white/50">{cur.file}</span>
                <span className="ml-auto flex items-center gap-2"><i className="rounded-full bg-mint/15 px-2 py-0.5 text-[10.5px] font-semibold not-italic text-mint">{cur.status}</i>
                  <button onClick={copy} className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white/80 transition hover:bg-white/20">{copied ? 'Copied ✓' : 'Copy'}</button></span>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre key={cur.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[250px] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-aqua/90"><code><Typed text={cur.code} /></code></motion.pre>
              </AnimatePresence>
            </div>
            <p className="mt-3 text-[12.5px] text-ink-3">React and Node are the primary SDKs; Angular is alpha; the other languages are starters over the same REST API.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
