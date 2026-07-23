'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Deterministic particles — no Math.random(), safe for SSR/hydration
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,            // golden-angle distribution
  y: (i * 97.322) % 100,
  size: 1.5 + ((i * 1.618) % 2),
  duration: 10 + ((i * 3.14159) % 14),
  delay: (i * 0.55) % 7,
  colorIndex: i % 3,
}));

const BLOB_COLORS = [
  'rgba(217, 119, 6, 0.22)',   // amber
  'rgba(14, 116, 144, 0.18)',  // teal
  'rgba(194, 65, 12, 0.15)',   // burnt orange
  'rgba(13, 148, 136, 0.14)',  // teal-green
];

const PARTICLE_COLORS = [
  'rgba(194, 65, 12, 0.70)',
  'rgba(14, 116, 144, 0.65)',
  'rgba(217, 119, 6, 0.75)',
];

export default function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(640);
  const mouseY = useMotionValue(400);
  const springX = useSpring(mouseX, { damping: 60, stiffness: 70 });
  const springY = useSpring(mouseY, { damping: 60, stiffness: 70 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── Base colour ── */}
      <div className="absolute inset-0" style={{ background: 'var(--color-bg-primary)' }} />

      {/* ── Animated drifting blobs ── */}
      <motion.div
        animate={{ x: [0, 70, -40, 20, 0], y: [0, -50, 35, -15, 0], scale: [1, 1.08, 0.96, 1.04, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          top: '-20%', left: '-12%',
          width: '60%', height: '60%',
          background: `radial-gradient(ellipse at center, ${BLOB_COLORS[0]} 0%, transparent 68%)`,
          filter: 'blur(72px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 40, -25, 0], y: [0, 55, -35, 15, 0], scale: [1, 0.92, 1.1, 0.97, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute"
        style={{
          bottom: '-18%', right: '-8%',
          width: '58%', height: '58%',
          background: `radial-gradient(ellipse at center, ${BLOB_COLORS[1]} 0%, transparent 68%)`,
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 45, -55, 15, 0], y: [0, 60, -25, 40, 0], scale: [1, 1.05, 0.94, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute"
        style={{
          top: '15%', right: '10%',
          width: '42%', height: '42%',
          background: `radial-gradient(ellipse at center, ${BLOB_COLORS[2]} 0%, transparent 70%)`,
          filter: 'blur(64px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -35, 50, -10, 0], y: [0, -45, 30, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        className="absolute"
        style={{
          bottom: '5%', left: '20%',
          width: '38%', height: '38%',
          background: `radial-gradient(ellipse at center, ${BLOB_COLORS[3]} 0%, transparent 70%)`,
          filter: 'blur(56px)',
        }}
      />

      {/* ── Mouse-following glow (client only) ── */}
      {mounted && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            width: 680,
            height: 680,
            background: 'radial-gradient(circle, rgba(14,116,144,0.13) 0%, rgba(217,119,6,0.08) 45%, transparent 70%)',
            filter: 'blur(48px)',
          }}
        />
      )}

      {/* ── Floating dust particles (client only) ── */}
      {mounted && PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -28, 0], opacity: [0.3, 0.85, 0.3] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: PARTICLE_COLORS[p.colorIndex],
          }}
        />
      ))}

      {/* ── SVG grain / paper texture ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '260px 260px',
        }}
      />

      {/* ── Refined dot grid ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.055,
          backgroundImage: 'radial-gradient(circle, rgba(44,20,0,0.9) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
    </div>
  );
}
