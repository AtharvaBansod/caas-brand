import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal, SplitText } from '../components/Reveal';
import { Browser } from '../components/Devices';
import { admin } from '../assets';

type Lang = { id: string; label: string; side: 'Frontend' | 'Backend'; status: string; file: string; code: string };
const langs: Lang[] = [
  { id: 'react', label: 'React / Next.js', side: 'Frontend', status: 'Ready', file: 'app/messages/page.tsx', code: `import { CaasProvider, CaasShell } from '@caas/sdk-react';

export default function Messages() {
  return (
    <CaasProvider projectId="your-project">
      <CaasShell />
    </CaasProvider>
  );
}` },
  { id: 'angular', label: 'Angular', side: 'Frontend', status: 'Alpha', file: 'messages.service.ts', code: `import { CaasAngularAdapter } from '@caas/sdk-angular';

// Observable streams over the core SDK: state, errors, events.
const adapter = new CaasAngularAdapter({ sdk, autoConnect: true });
adapter.state$.subscribe((s) => console.log('chat', s));` },
  { id: 'web', label: 'Any web framework', side: 'Frontend', status: 'Ready', file: 'main.ts', code: `import { createCaasSession } from '@caas/sdk-web-core';

// Vue, Svelte, plain JS — the core runtime works anywhere.
const session = createCaasSession({ projectId: 'your-project' });
// hand the session to your UI — or use the headless hooks.` },
  { id: 'node', label: 'Node / TypeScript', side: 'Backend', status: 'Ready', file: 'server.ts', code: `import { createCaasSessionKit } from '@caas/sdk-node-ts';

const kit = createCaasSessionKit({ apiKey: process.env.CAAS_KEY!, projectId: 'your-project' });

// sign your users in — devices, codes & keys are handled for you
app.use('/caas', kit.handlers({ resolveUser: (req) => req.user }));` },
  { id: 'http', label: 'Python · Java · .NET · Ruby · Rust · Go', side: 'Backend', status: 'Starters + REST', file: 'any language', code: `# Every backend speaks plain HTTP with two headers.
curl https://api.yourcloud.com/api/v1/sdk/health \\
  -H "x-api-key: $CAAS_KEY" \\
  -H "x-project-id: your-project"

# Starter SDKs ship for Python, Java, .NET, Ruby and Rust.` },
];
const flow = [['Create a project', 'In the admin console — pick Normal or Workspaces.'], ['Install the SDK', 'One package for the front end, one for your server.'], ['Mount the UI', 'A single component, or the headless hooks.'], ['Ship', 'Toggle features any time from the console.']];

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
  const cur = langs.find((l) => l.id === id)!;
  return (
    <section id="docs" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper via-iris-50/50 to-paper" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow">Docs &amp; integration</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Fits the stack you already have." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] text-ink-2">Guides, copy-paste snippets and an SDK playground live in your admin console. Pick your framework — we show the code.</p></Reveal>
        </div>

        <Reveal stagger={0.1} className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-4">
          {flow.map(([t, d], i) => (
            <div key={t} className="card relative p-4"><span className="grid h-6 w-6 place-items-center rounded-full bg-iris text-[11px] font-semibold text-white">{i + 1}</span><b className="mt-2 block text-[14px]">{t}</b><p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">{d}</p></div>
          ))}
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative">
            <Browser url="admin.yourapp.com/docs" media={{ image: admin.docs }} />          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {langs.map((l) => (
                <button key={l.id} onClick={() => setId(l.id)} className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${l.id === id ? 'border-iris bg-iris text-white shadow-glow' : 'border-ink/10 bg-white text-ink-2 hover:border-iris/40'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-night shadow-lift">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11.5px] text-white/50">
                <span className="font-mono">{cur.file}</span>
                <span className="flex gap-2"><i className="rounded-full bg-white/10 px-2 py-0.5 not-italic">{cur.side}</i><i className="rounded-full bg-mint/20 px-2 py-0.5 not-italic text-mint">{cur.status}</i></span>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre key={cur.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[290px] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-aqua/90"><code><Typed text={cur.code} /></code></motion.pre>
              </AnimatePresence>
            </div>
            <p className="mt-3 text-[12.5px] text-ink-3">React and Node are the primary SDKs; Angular is alpha; the other languages are starters over the same REST API.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
