import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";

const CLOUDS = [
  { position: [-8,  3, -10], scale: 3,   opacity: 0.15, color: "#6b7078", speed: 0.008 },
  { position: [ 4,  3,  -9], scale: 2.8, opacity: 0.12, color: "#70757d", speed: 0.006 },
  { position: [-6,  1,  -6], scale: 4,   opacity: 0.22, color: "#8c9198", speed: 0.012 },
  { position: [ 3,  1.5, -5], scale: 4.2, opacity: 0.2,  color: "#7e848c", speed: 0.010 },
  { position: [-5, -3,  -1], scale: 5.5, opacity: 0.5,  color: "#f3efe9", speed: 0.018 },
  { position: [ 3, -3.5, -0.5], scale: 4.5, opacity: 0.4, color: "#ebe6df", speed: 0.015 },
];

const BOUNDS = 14;

function DriftingClouds({ onReady }) {
  const refs = useRef([]);
  const readyFired = useRef(false);

  useFrame((_, delta) => {
    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.x += CLOUDS[i].speed * delta * 60;
      if (mesh.position.x > BOUNDS) mesh.position.x = -BOUNDS;
    });
  });

  return (
    <>
      {CLOUDS.map((c, i) => (
        <Cloud
          key={i}
          ref={el => (refs.current[i] = el)}
          position={c.position}
          scale={c.scale}
          opacity={c.opacity}
          color={c.color}
          transparent
          depthWrite={false}
        />
      ))}
    </>
  );
}

export default function StormScene() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#0f172a" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ fov: 42, position: [0, 0, 12] }}
        >
          <color attach="background" args={["#0f172a"]} />
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <DriftingClouds onReady={() => setReady(true)} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}