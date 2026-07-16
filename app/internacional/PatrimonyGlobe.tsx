"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { useInView, useReducedMotion } from "../_hub/scenes/sharedScene";

/* ================================================================
   PatrimonyGlobe — "A geografia do seu patrimônio".
   ----------------------------------------------------------------
   Globo com o BRASIL como origem e o dinheiro (pontos dourados)
   fluindo para praças financeiras fora do país. Auto-rotação
   (dinâmico) + leve resposta ao ponteiro (interativo). Fallback
   estático quando o usuário pede menos movimento.
   Cores calibradas para o fundo escuro (#233853) da seção.
   ================================================================ */

const RADIUS = 1.6;

const WIRE = "#5b7fa0"; // grade do globo (azul suave sobre ink)
const HUB = "#dce8f0"; // praças de destino
const MONEY = "#D9A94E"; // o "dinheiro" que sai do Brasil (dourado)
const ARC = "#8FB3D4"; // arcos de conexão

const ORIGIN = { name: "Brasil", lat: -15.8, lon: -47.9 }; // Brasília
const HUBS = [
  { name: "Nova York", lat: 40.7, lon: -74.0 },
  { name: "Ilhas Cayman", lat: 19.3, lon: -81.2 },
  { name: "Londres", lat: 51.5, lon: -0.1 },
  { name: "Zurique", lat: 47.4, lon: 8.5 },
  { name: "Cingapura", lat: 1.35, lon: 103.8 },
];

function latLonToVec(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeRig() {
  const group = useRef<THREE.Group>(null!);
  const moneyRefs = useRef<THREE.Mesh[]>([]);
  const originPulse = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  const originVec = useMemo(() => latLonToVec(ORIGIN.lat, ORIGIN.lon, RADIUS), []);

  const curves = useMemo(() => {
    return HUBS.map((h) => {
      const vb = latLonToVec(h.lat, h.lon, RADIUS);
      const mid = originVec.clone().add(vb).multiplyScalar(0.5).multiplyScalar(1.55);
      return new THREE.QuadraticBezierCurve3(originVec, mid, vb);
    });
  }, [originVec]);

  const arcPoints = useMemo(
    () => curves.map((c) => c.getPoints(48).map((p) => [p.x, p.y, p.z] as [number, number, number])),
    [curves],
  );

  const hubVecs = useMemo(() => HUBS.map((h) => latLonToVec(h.lat, h.lon, RADIUS)), []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.14; // auto-rotação contínua
      const targetX = pointer.y * 0.28;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    }
    const t = state.clock.getElapsedTime();
    // Pontos de "dinheiro" viajando do Brasil para cada praça.
    curves.forEach((curve, i) => {
      const mesh = moneyRefs.current[i];
      if (!mesh) return;
      const phase = (t * 0.28 + i / HUBS.length) % 1;
      const p = curve.getPoint(phase);
      mesh.position.set(p.x, p.y, p.z);
      const s = 0.05 + 0.05 * Math.sin(phase * Math.PI); // maior no meio do trajeto
      mesh.scale.setScalar(s / 0.06);
    });
    // Pulso do nó de origem (Brasil).
    if (originPulse.current) {
      const s = 1 + 0.25 * Math.sin(t * 2.2);
      originPulse.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Grade do globo */}
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 24]} />
        <meshBasicMaterial color={WIRE} wireframe transparent opacity={0.28} />
      </mesh>
      {/* Casca interna sutil */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 18]} />
        <meshBasicMaterial color={WIRE} transparent opacity={0.07} />
      </mesh>

      {/* Arcos de saída do Brasil */}
      {arcPoints.map((pts, i) => (
        <Line key={`arc-${i}`} points={pts} color={ARC} transparent opacity={0.55} lineWidth={1.4} />
      ))}

      {/* Praças de destino */}
      {hubVecs.map((v, i) => (
        <mesh key={`hub-${i}`} position={[v.x, v.y, v.z]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color={HUB} />
        </mesh>
      ))}

      {/* Dinheiro em trânsito */}
      {HUBS.map((_, i) => (
        <mesh
          key={`money-${i}`}
          ref={(el) => {
            if (el) moneyRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={MONEY} />
        </mesh>
      ))}

      {/* Nó de origem: Brasil */}
      <mesh position={[originVec.x, originVec.y, originVec.z]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={MONEY} />
      </mesh>
      <mesh ref={originPulse} position={[originVec.x, originVec.y, originVec.z]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={MONEY} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function StaticGlobe() {
  const cx = 300;
  const cy = 300;
  const r = 180;
  const origin = { x: cx - 60, y: cy + 90 }; // Brasil
  const hubs = [
    { x: cx - 110, y: cy - 40 },
    { x: cx - 30, y: cy + 10 },
    { x: cx + 40, y: cy - 70 },
    { x: cx + 90, y: cy - 40 },
    { x: cx + 150, y: cy + 40 },
  ];
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }} aria-hidden>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={WIRE} strokeOpacity={0.3} strokeWidth={1} />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.42} fill="none" stroke={WIRE} strokeOpacity={0.22} strokeWidth={1} />
      <ellipse cx={cx} cy={cy} rx={r * 0.55} ry={r} fill="none" stroke={WIRE} strokeOpacity={0.22} strokeWidth={1} />
      {hubs.map((h, i) => (
        <path
          key={i}
          d={`M ${origin.x} ${origin.y} Q ${(origin.x + h.x) / 2} ${Math.min(origin.y, h.y) - 90} ${h.x} ${h.y}`}
          fill="none"
          stroke={ARC}
          strokeOpacity={0.5}
          strokeDasharray="5 5"
          strokeWidth={1.4}
        />
      ))}
      {hubs.map((h, i) => (
        <circle key={`h-${i}`} cx={h.x} cy={h.y} r={4} fill={HUB} />
      ))}
      <circle cx={origin.x} cy={origin.y} r={7} fill={MONEY} />
    </svg>
  );
}

export function PatrimonyGlobe({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const reduced = useReducedMotion();

  return (
    <div ref={wrapRef} className={className} style={{ width: "100%", height: "100%" }}>
      {reduced ? (
        <StaticGlobe />
      ) : (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.4, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={inView ? "always" : "never"}
          style={{ width: "100%", height: "100%" }}
        >
          <GlobeRig />
        </Canvas>
      )}
    </div>
  );
}
