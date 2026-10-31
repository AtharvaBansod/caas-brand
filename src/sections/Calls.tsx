import { Laptop } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';

const call = { mp4: '/media/clips/c-video.mp4', webm: '/media/clips/c-video.webm', poster: '/media/clips/c-video.jpg' };
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

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal y={50}><Laptop glow media={{ video: call }} /></Reveal>
          <Reveal stagger={0.1} className="space-y-3">
            {[['Video & voice', 'One tap from any chat. Mute, camera, device menu and picture-in-picture.'], ['Group calls', 'A responsive grid with pinning, filmstrip and pages for big rooms.'], ['Screen share & whiteboard', 'Present a window or sketch together on a call board.'], ['In-call chat', 'Keep typing without leaving the call — messages land in the thread.'], ['Voice spaces', 'A drop-in audio room for any chat — nobody is rung, people join when ready.']].map(([t, d]) => (
              <div key={t} className="card flex gap-3 p-4"><i className="mt-1 h-2 w-2 shrink-0 rounded-full bg-iris" /><span><b className="block text-[15px]">{t}</b><span className="text-[13.5px] leading-relaxed text-ink-3">{d}</span></span></div>
            ))}
          </Reveal>
        </div>

      </div>
    </section>
  );
}
