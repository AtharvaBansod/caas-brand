import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Environment, Lightformer, Float, Sparkles, ContactShadows } from '@react-three/drei';

const W = 1;          // phone width
const H = 2.08;       // phone height
const D = 0.12;       // depth
const R = 0.15;       // corner radius

/** Rounded-rectangle geometry whose UVs span 0‥1 (so a video maps cleanly onto it). */
function roundedPlane(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2; const y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 16);
  const pos = g.attributes.position; const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  return g;
}

/** A video (or, failing that, a still) as a texture; a soft gradient while nothing has loaded. */
function useScreenTexture(video?: { mp4: string; webm?: string }, still?: string) {
  const [tex, setTex] = React.useState<THREE.Texture | null>(null);
  React.useEffect(() => {
    let disposed = false; let el: HTMLVideoElement | null = null; let t: THREE.Texture | null = null;
    const fromStill = () => {
      if (!still) return;
      new THREE.TextureLoader().load(still, (img) => { if (disposed) return; img.colorSpace = THREE.SRGBColorSpace; img.minFilter = THREE.LinearFilter; img.generateMipmaps = false; img.needsUpdate = true; t = img; setTex(img); });
    };
    fromStill();
    if (video) {
      el = document.createElement('video');
      el.crossOrigin = 'anonymous'; el.loop = true; el.muted = true; el.playsInline = true; el.autoplay = true; el.preload = 'auto';
      el.src = el.canPlayType('video/webm') && video.webm ? video.webm : video.mp4;
      el.addEventListener('error', () => { /* the still is already showing */ });
      el.addEventListener('playing', () => {
        if (disposed || !el) return;
        const v = new THREE.VideoTexture(el); v.colorSpace = THREE.SRGBColorSpace; v.minFilter = THREE.LinearFilter; v.generateMipmaps = false;
        t = v; setTex(v); void el.play().catch(() => undefined);
      });
      el.load();
    }
    return () => { disposed = true; if (el) { el.pause(); el.removeAttribute('src'); el.load(); } t?.dispose(); };
  }, [video?.mp4, video?.webm, still]);
  return tex;
}

function Phone({ video, still, pointer }: { video?: { mp4: string; webm?: string }; still?: string; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = React.useRef<THREE.Group>(null);
  const tex = useScreenTexture(video, still);
  const screenGeo = React.useMemo(() => roundedPlane(W - 0.07, H - 0.07, R - 0.03), []);
  const intro = React.useRef(0);
  const { viewport } = useThree();
  useFrame((_, dt) => {
    const g = group.current; if (!g) return;
    intro.current = Math.min(1, intro.current + dt * 0.7);
    const e = 1 - Math.pow(1 - intro.current, 4);
    // Ease in from a turned-away pose, then follow the pointer.
    const ty = THREE.MathUtils.lerp(-0.9, -0.28, e) + pointer.current.x * 0.35;
    const tx = THREE.MathUtils.lerp(0.35, 0.08, e) - pointer.current.y * 0.22;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3.2, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3.2, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, 0.04 - pointer.current.x * 0.05, 3, dt);
    const s = THREE.MathUtils.lerp(0.82, 1, e) * Math.min(1.18, viewport.height / 3.3);
    g.scale.setScalar(s);
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <RoundedBox args={[W, H, D]} radius={R} smoothness={8} castShadow>
        <meshPhysicalMaterial color="#1b1e2e" metalness={0.92} roughness={0.22} clearcoat={1} clearcoatRoughness={0.18} envMapIntensity={1.4} />
      </RoundedBox>
      {/* glass + screen */}
      <mesh geometry={screenGeo} position={[0, 0, D / 2 + 0.006]} renderOrder={2}>
        {tex ? <meshBasicMaterial key={tex.uuid} map={tex} toneMapped={false} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} /> : <meshBasicMaterial color="#e9e9ff" toneMapped={false} />}
      </mesh>
      {/* side keys */}
      <mesh position={[-W / 2 - 0.008, 0.55, 0]}><boxGeometry args={[0.02, 0.2, 0.05]} /><meshStandardMaterial color="#2a2d40" metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[-W / 2 - 0.008, 0.2, 0]}><boxGeometry args={[0.02, 0.32, 0.05]} /><meshStandardMaterial color="#2a2d40" metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[W / 2 + 0.008, 0.4, 0]}><boxGeometry args={[0.02, 0.42, 0.05]} /><meshStandardMaterial color="#2a2d40" metalness={0.9} roughness={0.3} /></mesh>
    </group>
  );
}

export function HeroScene({ video, still }: { video?: { mp4: string; webm?: string }; still?: string }) {
  const pointer = React.useRef({ x: 0, y: 0 });
  const wrap = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.4], fov: 32, near: 2, far: 12 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} castShadow />
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[8, 2, 1]} color="#ffffff" />
          <Lightformer intensity={1.6} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#8b8bff" />
          <Lightformer intensity={1.4} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#6be7ff" />
          <Lightformer intensity={0.8} position={[0, -4, 2]} scale={[8, 2, 1]} color="#f0a6ff" />
        </Environment>
        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.55} floatingRange={[-0.08, 0.1]}>
          <Phone video={video} still={still} pointer={pointer} />
        </Float>
        <Sparkles count={46} scale={[5.4, 4, 2]} size={2.6} speed={0.35} opacity={0.55} color="#7c7cff" />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.28} scale={6} blur={2.8} far={3} color="#2b2b7a" />
      </Canvas>
    </div>
  );
}
