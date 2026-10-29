import * as React from 'react';

/** An image that degrades to a soft gradient while the capture is missing. */
export function Shot({ src, alt = '', className = '', style, eager }: { src: string; alt?: string; className?: string; style?: React.CSSProperties; eager?: boolean }) {
  const [ok, setOk] = React.useState(true);
  return ok ? (
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} onError={() => setOk(false)} className={className} style={style} />
  ) : (
    <div className={className} style={{ background: 'linear-gradient(135deg,#e4e4ff,#f4f0ff 55%,#e0f7fb)', ...style }} aria-hidden />
  );
}

export interface ClipSrc { mp4: string; webm?: string; poster?: string }

/** Looping, muted, inline video (mp4 + webm). Plays only while on screen. */
export const Clip = React.forwardRef<HTMLVideoElement, ClipSrc & { className?: string; style?: React.CSSProperties; loop?: boolean; onEnded?: () => void; playbackRate?: number }>(
  function Clip({ mp4, webm, poster, className = '', style, loop = true, onEnded, playbackRate = 1 }, ref) {
    const inner = React.useRef<HTMLVideoElement>(null);
    React.useImperativeHandle(ref, () => inner.current as HTMLVideoElement);
    React.useEffect(() => {
      const v = inner.current; if (!v) return undefined;
      v.playbackRate = playbackRate;
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) void v.play().catch(() => undefined); else v.pause(); }, { threshold: 0.15 });
      io.observe(v);
      return () => io.disconnect();
    }, [playbackRate]);
    return (
      <video ref={inner} className={className} style={style} poster={poster} muted loop={loop} playsInline preload="auto" onEnded={onEnded}>
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
    );
  },
);
