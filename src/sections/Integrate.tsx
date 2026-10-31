import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Laptop, Phone } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';
import { integrate } from '../assets';

const beats = ['Your product, as it is today', 'A tap on “Messages”', 'The full chat opens inside it'];

const Ico = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

const steps = [
  { t: 'Create a project', d: 'Pick Normal or Workspaces in the admin console and copy your project key.', icon: 'M3 7h18v12H3zM3 7l3-3h6l2 3', file: 'admin console',
    code: `Projects  ›  New project\n\n  Name         Passengers\n  Product      Chat · Workspaces\n  Environment  Development\n\n  ✓ Project key   caas_pk_live_••••••••\n  ✓ API key       caas_sk_••••••••••••` },
  { t: 'Install the SDK', d: 'One package for your front end, one for your server.', icon: 'M12 3v12M7 11l5 5 5-5M4 20h16', file: 'terminal',
    code: `$ npm i @caas/sdk-react\n$ npm i @caas/sdk-node-ts\n\n✔ added 2 packages in 3s` },
  { t: 'Sign your users in', d: 'Your server hands out sessions — your users never see us.', icon: 'M5 11h14v9H5zM8 11V8a4 4 0 0 1 8 0v3', file: 'server.ts',
    code: `import { createCaasSessionKit } from '@caas/sdk-node-ts';\n\nconst kit = createCaasSessionKit({\n  apiKey: process.env.CAAS_KEY,\n  projectId: 'your-project',\n});\n\napp.use('/caas', kit.handlers({\n  resolveUser: (req) => req.user,\n}));` },
  { t: 'Mount the chat', d: 'Drop one component into any page or route of your app.', icon: 'M4 5h16v11H9l-5 4z', file: 'Messages.tsx',
    code: `import { CaasShell } from '@caas/sdk-react';\n\nexport const Messages = () => <CaasShell />;\n\n// that's it — chat, calls, feeds and\n// workspaces now live inside your app.` },
];

export function Integrate() {
  const [i, setI] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  React.useEffect(() => {
    if (!auto) return undefined;
    const t = window.setInterval(() => setI((x) => (x + 1) % steps.length), 4200);
    return () => window.clearInterval(t);
  }, [auto]);
  const s = steps[i];
  return (
    <section id="integrate" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper via-white to-paper" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow">Built to live inside your product</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Your app first. Our chat on a tap." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] leading-relaxed text-ink-2">CaaS is not another messenger to send people to. It is the chat layer <b>inside</b> your application — your login, your design, your users — with the servers, encryption and admin tools already done.</p></Reveal>
        </div>

        <Reveal y={50} className="mt-14 flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-center lg:gap-12">
          <div className="w-full max-w-[820px]"><Laptop glow media={{ video: integrate.desktop, image: '' }} /></div>
          <div className="w-[200px] shrink-0 lg:mb-3"><Phone glow media={{ video: integrate.phone, image: '' }} /></div>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {beats.map((b, k) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-medium text-ink-2 shadow-soft"><i className="grid h-5 w-5 place-items-center rounded-full bg-iris text-[10.5px] font-semibold not-italic text-white">{k + 1}</i>{b}</span>
          ))}
        </div>

        {/* How it plugs in: four steps, each with the real code behind it */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center"><span className="eyebrow">Four steps to live</span><h3 className="h-display mt-4 text-[clamp(1.5rem,2.6vw,2.2rem)]">From zero to chat in your app</h3></div>
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <ol className="relative space-y-3">
              <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-iris/40 via-iris/20 to-transparent" aria-hidden />
              {steps.map((st, k) => (
                <li key={st.t}>
                  <button onClick={() => { setI(k); setAuto(false); }} className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${k === i ? 'border-iris/30 bg-white shadow-lift' : 'border-transparent hover:bg-white/70'}`}>
                    <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${k === i ? 'bg-iris text-white' : k < i ? 'bg-iris/15 text-iris' : 'bg-white text-ink-3 ring-1 ring-ink/10'}`}><Ico d={st.icon} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2"><b className="text-[15.5px]">{st.t}</b><span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10.5px] font-semibold text-ink-3">STEP {k + 1}</span></span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-3">{st.d}</span>
                      {k === i && auto ? <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-iris/10"><motion.i key={i} className="block h-full origin-left rounded-full bg-iris" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.2, ease: 'linear' }} /></span> : null}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-night shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
                <span className="ml-3 font-mono text-[12px] text-white/50">{s.file}</span>
                <span className="ml-auto rounded-full bg-mint/15 px-2 py-0.5 text-[10.5px] font-semibold text-mint">{i === steps.length - 1 ? 'LIVE ✓' : `${i + 1} / ${steps.length}`}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="min-h-[300px] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-aqua/90"><code>{s.code}</code></motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
