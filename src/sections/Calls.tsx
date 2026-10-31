import { Laptop } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';

const clip = (id: string) => ({ mp4: `/media/clips/${id}.mp4`, webm: `/media/clips/${id}.webm`, poster: `/media/clips/${id}.jpg` });
const features = [
  ['Video & voice', 'One tap from any chat. Mute, camera, device menu and picture-in-picture.'],
  ['Group calls', 'A responsive grid with pinning, filmstrip and pages for big rooms.'],
  ['Screen share & whiteboard', 'Present a window or sketch together on a call board.'],
  ['In-call chat', 'Keep typing without leaving the call — messages land in the thread.'],
  ['Voice spaces', 'A drop-in audio room for any chat — nobody is rung, people join when ready.'],
];

export function Calls() {
  return (
    <section id="calls" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper via-iris-50/50 to-paper" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow">Calls &amp; live spaces</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Talk face to face, right inside the chat." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] text-ink-2">Voice and video calls with the same identity, privacy and brand as your messages — no separate app, no meeting links.</p></Reveal>
        </div>

        <Reveal y={50} className="mt-14 grid gap-10 md:grid-cols-2">
          <div><Laptop glow media={{ video: clip('c-video') }} /><p className="mt-7 text-center text-[13px] font-medium text-ink-3">Caller</p></div>
          <div><Laptop glow media={{ video: clip('c-video-recv') }} /><p className="mt-7 text-center text-[13px] font-medium text-ink-3">Recipient</p></div>
          <div className="md:col-span-2 md:mx-auto md:w-[62%]"><Laptop glow media={{ video: clip('c-whiteboard') }} /><p className="mt-7 text-center text-[13px] font-medium text-ink-3">Call whiteboard — everyone draws at once</p></div>
        </Reveal>

        <Reveal stagger={0.08} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(([t, d]) => (
            <div key={t} className="card p-4"><i className="block h-2 w-2 rounded-full bg-iris" /><b className="mt-3 block text-[14.5px]">{t}</b><span className="mt-1 block text-[13px] leading-relaxed text-ink-3">{d}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
