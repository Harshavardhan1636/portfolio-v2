"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;
    setVisible(true);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-interactive]")
      ) {
        setHovering(true);
      }
    };

    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  // Smooth ring follow
  useEffect(() => {
    if (!visible) return;
    let ringX = ring.x;
    let ringY = ring.y;
    let animId: number;

    const smoothFollow = () => {
      ringX += (pos.x - ringX) * 0.15;
      ringY += (pos.y - ringY) * 0.15;
      setRing({ x: ringX, y: ringY });
      animId = requestAnimationFrame(smoothFollow);
    };
    animId = requestAnimationFrame(smoothFollow);

    return () => cancelAnimationFrame(animId);
  }, [pos.x, pos.y, visible]); // ring intentionally excluded to avoid loop

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[10000] rounded-full bg-cyan mix-blend-difference"
        style={{
          left: pos.x - 3,
          top: pos.y - 3,
          width: 6,
          height: 6,
        }}
      />
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[10000] rounded-full border border-cyan/50 mix-blend-difference"
        style={{
          left: ring.x - (hovering ? 24 : 16),
          top: ring.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          transition: "width 0.3s, height 0.3s",
          opacity: 0.5,
        }}
      />
    </>
  );
}
