import { Laptop, Phone } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';
import { integrate } from '../assets';

const steps = [
  { t: 'Install', d: 'One npm package and a project key from the console.' },
  { t: 'Mount', d: 'Drop the chat into any page or route of your product.' },
  { t: 'Sign users in', d: 'Your server hands out sessions — your users never see us.' },
  { t: 'It is live', d: 'Chat, calls, feeds and workspaces, in your app and your brand.' },
];

const beats = ['Your product, as it is today', 'A tap on “Messages”', 'The full chat opens inside it'];

export function Integrate() {
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
          <div className="w-[190px] shrink-0 lg:mb-3"><Phone glow media={{ video: integrate.phone, image: '' }} /></div>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {beats.map((b, i) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-medium text-ink-2 shadow-soft"><i className="grid h-5 w-5 place-items-center rounded-full bg-iris text-[10.5px] font-semibold not-italic text-white">{i + 1}</i>{b}</span>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal stagger={0.1} className="grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <div key={s.t} className="card p-5"><span className="grid h-7 w-7 place-items-center rounded-full bg-iris text-[12px] font-semibold text-white">{i + 1}</span><b className="mt-3 block text-[15px]">{s.t}</b><p className="mt-1 text-[13.5px] leading-relaxed text-ink-3">{s.d}</p></div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-night shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5"><span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span><span className="ml-3 font-mono text-[12px] text-white/50">Messages.tsx</span></div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-aqua/90"><code>{`$ npm i @caas/sdk-react\n\nimport { CaasShell } from '@caas/sdk-react';\n\nexport const Messages = () => <CaasShell />;`}</code></pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
