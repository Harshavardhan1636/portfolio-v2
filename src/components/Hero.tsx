"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLES = [
  "AI Systems Architect",
  "Full-Stack AI Engineer",
  "ML Platform Builder",
  "0-to-1 Builder",
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Typewriter state
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next title
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIdx]);

  // Mouse tracking — smooth springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const imgScale = useSpring(1, springConfig);
  const imgY = useSpring(0, springConfig);

  // Frame offset springs
  const frameX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const frameY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig);

  // Shine position
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springConfig);
  const shineOpacity = useSpring(0, springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(yVal);
    imgScale.set(1.04);
    imgY.set(-10);
    shineOpacity.set(0.08);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    imgScale.set(1);
    imgY.set(0);
    shineOpacity.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left — Text */}
          <motion.div style={{ y, opacity }}>
            <motion.div
              className="text-sm text-muted tracking-widest uppercase mb-4 h-6 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span>{displayed}</span>
              <span className="ml-0.5 w-[2px] h-4 bg-accent animate-pulse" />
            </motion.div>

            <motion.h1
              className="font-display font-black text-[8vw] md:text-[6vw] leading-[0.9] tracking-tighter text-text pb-4"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            >
              Harsha
              <br />
              Vardhan
              <br />
              <span className="text-accent">Dyavanapelli</span>
            </motion.h1>

            <motion.p
              className="mt-8 text-lg md:text-xl text-muted max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Hyderabad, India
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                data-interactive
                className="link-underline text-sm text-accent"
              >
                View projects →
              </a>
              <a
                href="#contact"
                data-interactive
                className="link-underline text-sm text-muted"
              >
                Get in touch →
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="flex justify-center md:justify-end [perspective:1200px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ y, opacity }}
          >
            <div
              ref={containerRef}
              className="relative"
              data-interactive
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Accent border frame — offset, follows mouse */}
              <motion.div
                className="absolute -top-3 -right-3 w-full h-full border-2 border-accent"
                style={{ x: frameX, y: frameY }}
              />

              {/* Ambient glow underneath */}
              <div className="absolute -bottom-6 left-6 right-6 h-1/2 bg-accent/15 blur-3xl rounded-full" />

              {/* Idle float animation layer */}
              <motion.div
                className="relative"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Image container with spring-driven 3D tilt */}
                <motion.div
                  className="relative w-[220px] h-[275px] sm:w-[260px] sm:h-[325px] md:w-[340px] md:h-[420px] overflow-hidden will-change-transform"
                  style={{
                    rotateX,
                    rotateY,
                    scale: imgScale,
                    y: imgY,
                    transformStyle: "preserve-3d",
                    boxShadow:
                      "0 25px 70px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(196,93,62,0.08)",
                  }}
                >
                  {/* Image */}
                  <img
                    src="/Profile.png"
                    alt="Harsha Vardhan Dyavanapelli"
                    className="w-full h-full object-cover transition-[filter] duration-500 group-hover:contrast-105 group-hover:saturate-110"
                  />

                  {/* Shine overlay — follows cursor */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: shineOpacity,
                      background: `radial-gradient(circle at calc(${shineX}% ) calc(${shineY}%), rgba(255,255,255,0.6) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Subtle top-edge highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-6 md:left-12 hidden sm:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="w-px h-12 bg-border" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
