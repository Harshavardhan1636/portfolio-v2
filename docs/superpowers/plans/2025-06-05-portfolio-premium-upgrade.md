# Portfolio Premium Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing dark noir portfolio into a premium experience with glassmorphism, particle effects, 3D tilt, advanced animations, and an interactive terminal.

**Architecture:** Incremental enhancement of existing Next.js 16 + Tailwind v4 + Framer Motion project. Add new shared utility components (GlassCard, TiltCard, CountUp, GradientText), global effects (ParticleBackground, CustomCursor, SmoothScroll), and upgrade each section component in-place.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion 12, tsparticles (particles), Lenis (smooth scroll), CSS perspective (3D tilt — no Three.js needed)

---

## File Structure

### New Files to Create

| File | Responsibility |
|------|---------------|
| `src/components/ParticleBackground.tsx` | Canvas-based particle starfield with connected dots |
| `src/components/CustomCursor.tsx` | Dot + ring cursor that reacts to interactive elements |
| `src/components/SmoothScroll.tsx` | Lenis wrapper component |
| `src/components/GlassCard.tsx` | Reusable glassmorphism card wrapper |
| `src/components/TiltCard.tsx` | Card with CSS perspective tilt on hover |
| `src/components/GradientText.tsx` | Reusable gradient text component |
| `src/components/CountUp.tsx` | Number counting animation on scroll |

### Files to Modify

| File | Changes |
|------|---------|
| `package.json` | Add lenis dependency |
| `src/app/globals.css` | Overhaul design tokens, add glass/gradient utilities, new keyframes |
| `src/app/layout.tsx` | Add SmoothScroll, CustomCursor wrappers |
| `src/app/page.tsx` | Add ParticleBackground |
| `src/components/Navigation.tsx` | Glassmorphism nav, gradient logo, gradient active state |
| `src/components/Hero.tsx` | Typing terminal, gradient CTAs, parallax, shimmer name |
| `src/components/About.tsx` | Glass stats, CountUp numbers, gradient section header |
| `src/components/Experience.tsx` | Glass tabs, AnimatePresence transitions, gradient border active |
| `src/components/Projects.tsx` | TiltCard for featured, glassmorphism, staggered animations |
| `src/components/Skills.tsx` | Gradient top-border cards, gradient headers, staggered tags |
| `src/components/Education.tsx` | Gradient timeline, alternating card entrance, glassmorphism |
| `src/components/Hackathons.tsx` | Glass cards, glow effects, staggered cert pills |
| `src/components/Contact.tsx` | Gradient text heading, glass cards, gradient CTA |
| `src/components/Footer.tsx` | Glass border, gradient logo, glass link pills |

---

## Task 1: Install Dependencies & Update Design System

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css`

### Step 1.1: Install lenis

```bash
cd D:/harsha-portfolio && npm install lenis
```

### Step 1.2: Overhaul globals.css design tokens

Replace the entire `@theme` block and add new utility classes. The file should become:

```css
@import "tailwindcss";

@theme {
  /* Deeper noir palette */
  --color-noir: #06060a;
  --color-noir-light: #0d0d14;
  --color-noir-card: #12121a;
  --color-noir-border: #1a1a24;

  /* Glass tokens */
  --color-noir-glass: rgba(15, 15, 26, 0.5);
  --color-noir-glass-border: rgba(255, 255, 255, 0.04);
  --color-noir-glass-hover: rgba(0, 229, 255, 0.15);

  /* Accent colors */
  --color-cyan: #00e5ff;
  --color-cyan-dim: rgba(0, 229, 255, 0.2);
  --color-cyan-glow: rgba(0, 229, 255, 0.12);
  --color-violet: #8b5cf6;
  --color-violet-dim: rgba(139, 92, 246, 0.2);
  --color-amber: #ffab40;
  --color-amber-dim: rgba(255, 171, 64, 0.2);

  /* Text */
  --color-cream: #e8e6e1;
  --color-muted: #6b6b76;
  --color-muted-light: #9494a0;

  /* Fonts */
  --font-display: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

/* ─── Base ─── */
html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-noir);
  color: var(--color-cream);
  font-family: var(--font-body);
  overflow-x: hidden;
}

/* ─── Grain overlay ─── */
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  animation: grain 8s steps(10) infinite;
}

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-noir); }
::-webkit-scrollbar-thumb { background: var(--color-noir-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-cyan-dim); }

/* ─── Selection ─── */
::selection {
  background: var(--color-cyan);
  color: var(--color-noir);
}

/* ─── Keyframes ─── */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.4); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* ─── Utility classes ─── */
.glass {
  background: var(--color-noir-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--color-noir-glass-border);
  border-radius: 16px;
}

.glass-hover:hover {
  border-color: var(--color-noir-glass-hover);
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.05);
}

.gradient-primary {
  background: linear-gradient(135deg, #00e5ff, #8b5cf6);
}

.gradient-warm {
  background: linear-gradient(135deg, #00e5ff, #ffab40);
}

.gradient-text {
  background: linear-gradient(135deg, #00e5ff, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-warm {
  background: linear-gradient(135deg, #00e5ff, #ffab40);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shimmer-text {
  background: linear-gradient(
    90deg,
    #e8e6e1 0%,
    #e8e6e1 40%,
    #00e5ff 50%,
    #e8e6e1 60%,
    #e8e6e1 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}
```

### Step 1.3: Verify dev server starts

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Server starts on localhost:3000 without errors.

### Step 1.4: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "chore: add lenis, overhaul design system with glass tokens and gradient utilities"
```

---

## Task 2: Create Shared Utility Components

**Files:**
- Create: `src/components/GlassCard.tsx`
- Create: `src/components/GradientText.tsx`
- Create: `src/components/CountUp.tsx`
- Create: `src/components/TiltCard.tsx`

### Step 2.1: Create GlassCard

```tsx
// src/components/GlassCard.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`glass ${hover ? "glass-hover" : ""} transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

### Step 2.2: Create GradientText

```tsx
// src/components/GradientText.tsx
"use client";

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "warm";
}

export default function GradientText({
  children,
  className = "",
  variant = "primary",
}: GradientTextProps) {
  return (
    <span className={`${variant === "primary" ? "gradient-text" : "gradient-text-warm"} ${className}`}>
      {children}
    </span>
  );
}
```

### Step 2.3: Create CountUp

```tsx
// src/components/CountUp.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
```

### Step 2.4: Create TiltCard

```tsx
// src/components/TiltCard.tsx
"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TiltCard({
  children,
  className = "",
  delay = 0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
      className={`glass glass-hover ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

### Step 2.5: Verify components compile

```bash
cd D:/harsha-portfolio && npx tsc --noEmit
```

Expected: No type errors.

### Step 2.6: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: add GlassCard, GradientText, CountUp, TiltCard shared components"
```

---

## Task 3: Create Global Effect Components

**Files:**
- Create: `src/components/ParticleBackground.tsx`
- Create: `src/components/CustomCursor.tsx`
- Create: `src/components/SmoothScroll.tsx`

### Step 3.1: Create ParticleBackground (canvas-based, no library)

```tsx
// src/components/ParticleBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const CONNECTION_DISTANCE = isMobile ? 0 : 120;

    const colors = [
      "rgba(0, 229, 255, 0.6)",
      "rgba(0, 229, 255, 0.3)",
      "rgba(139, 92, 246, 0.5)",
      "rgba(139, 92, 246, 0.3)",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections (desktop only)
      if (CONNECTION_DISTANCE > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DISTANCE) {
              const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", resize);

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

### Step 3.2: Create CustomCursor

```tsx
// src/components/CustomCursor.tsx
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

    // Smooth ring follow
    let ringX = -100;
    let ringY = -100;
    const smoothFollow = () => {
      ringX += (pos.x - ringX) * 0.15;
      ringY += (pos.y - ringY) * 0.15;
      setRing({ x: ringX, y: ringY });
      requestAnimationFrame(smoothFollow);
    };
    const animId = requestAnimationFrame(smoothFollow);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [pos.x, pos.y]);

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
          transition: "width 0.2s, height 0.2s",
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
          transition: "width 0.3s, height 0.3s, left 0.3s, top 0.3s",
          opacity: 0.5,
        }}
      />
    </>
  );
}
```

### Step 3.3: Create SmoothScroll

```tsx
// src/components/SmoothScroll.tsx
"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

### Step 3.4: Verify all three components compile

```bash
cd D:/harsha-portfolio && npx tsc --noEmit
```

### Step 3.5: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: add ParticleBackground, CustomCursor, SmoothScroll global effects"
```

---

## Task 4: Wire Global Effects into Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

### Step 4.1: Update layout.tsx

Add SmoothScroll and CustomCursor wrappers. The file should become:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Harsha Vardhan — AI/ML Engineer",
  description:
    "Portfolio of Harsha Vardhan Dyavanapelli — Applied AI & Machine Learning systems builder. B.Tech CS (AI & ML) at VJIT Hyderabad.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Portfolio",
    "Harsha Vardhan",
    "Computer Vision",
    "NLP",
    "Deep Learning",
  ],
  openGraph: {
    title: "Harsha Vardhan — AI/ML Engineer",
    description:
      "Applied AI & Machine Learning systems builder. B.Tech CS (AI & ML).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Step 4.2: Update page.tsx to add ParticleBackground

```tsx
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Hackathons from "@/components/Hackathons";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Hackathons />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

### Step 4.3: Test the app

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Particles visible, smooth scroll working, custom cursor visible on desktop.

### Step 4.4: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: wire ParticleBackground, CustomCursor, SmoothScroll into app"
```

---

## Task 5: Upgrade Navigation

**Files:**
- Modify: `src/components/Navigation.tsx`

### Step 5.1: Rewrite Navigation with glassmorphism

Replace the entire file:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-noir/70 backdrop-blur-2xl border-b border-noir-glass-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight"
          >
            <span className="gradient-text">H</span>
            <span className="text-cream">.</span>
            <span className="text-muted text-sm font-mono ml-1">v(ardhan)</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-sm font-mono transition-colors duration-300 rounded-lg ${
                  activeSection === item.href.slice(1)
                    ? "text-cyan"
                    : "text-muted hover:text-cream"
                }`}
              >
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-cyan/10 border border-cyan/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            data-interactive
          >
            <span
              className={`w-5 h-0.5 bg-cream transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-cream transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-cream transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-noir/90 backdrop-blur-2xl pt-20 px-8 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl font-display font-bold text-cream py-3 border-b border-noir-border/30"
                >
                  <span className="gradient-text font-mono text-sm mr-3">
                    0{i + 1}.
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Step 5.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Frosted glass nav on scroll, gradient logo, animated active indicator.

### Step 5.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Navigation with glassmorphism and gradient active indicator"
```

---

## Task 6: Upgrade Hero

**Files:**
- Modify: `src/components/Hero.tsx`

### Step 6.1: Rewrite Hero with typing terminal, gradient CTAs, shimmer name

Replace the entire file:

```tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TERMINAL_LINES = [
  { key: "name", text: '"name": "Harsha Vardhan"' },
  { key: "role", text: '"role": "AI/ML Engineer"' },
  { key: "location", text: '"location": "Hyderabad, IN"' },
  { key: "focus", text: '"focus": ["Computer Vision", "NLP", "Deep Learning"]' },
  { key: "status", text: '"status": "Open to opportunities"' },
];

function TypingTerminal() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      // Loop after a pause
      const timeout = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const line = TERMINAL_LINES[currentLine].text;
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 font-mono text-sm leading-relaxed">
      <div className="text-muted mb-3">
        <span className="text-cyan">$</span> cat profile.json
      </div>
      <div className="text-cream/80">{"{"}</div>
      {TERMINAL_LINES.map((line, i) => (
        <div key={line.key} className="ml-4 h-6">
          {visibleLines[i] ? (
            <>
              <span className="text-amber">
                &quot;{line.key}&quot;
              </span>
              <span className="text-cream/60">: </span>
              <span className="text-green-400">
                {visibleLines[i].slice(line.key.length + 4)}
              </span>
              {i === currentLine && showCursor && (
                <span className="inline-block w-2 h-4 bg-cyan ml-0.5 align-middle" />
              )}
            </>
          ) : i === currentLine ? (
            <span className="inline-block w-2 h-4 bg-cyan align-middle" />
          ) : null}
        </div>
      ))}
      <div className="text-cream/80">{"}"}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan/[0.04] blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="font-mono text-sm text-cyan tracking-widest uppercase">
                AI/ML Engineer • B.Tech CS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight mb-6"
            >
              <span className="block text-cream">Harsha</span>
              <span className="block text-cream/40">Vardhan</span>
              <span className="block shimmer-text text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
                Dyavanapelli
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-muted-light text-lg md:text-xl max-w-xl leading-relaxed mb-8"
            >
              Building intelligent systems at the intersection of{" "}
              <span className="text-cream font-medium">machine learning</span>,{" "}
              <span className="text-cream font-medium">computer vision</span>, and{" "}
              <span className="text-cream font-medium">real-world automation</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                data-interactive
                className="group relative inline-flex items-center gap-2 px-6 py-3 gradient-primary text-noir font-display font-bold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 rounded-lg"
              >
                <span className="relative z-10">View Projects</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                data-interactive
                className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover text-cream font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:text-cyan rounded-lg"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right side — terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-5 hidden md:block"
          >
            <div className="glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-noir-glass-border bg-noir-light/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted">
                  harsha@portfolio ~
                </span>
              </div>
              <TypingTerminal />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 rounded-full border border-muted/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-cyan"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Step 6.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Typing animation in terminal, gradient CTAs, shimmer on last name, mouse scroll indicator.

### Step 6.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Hero with typing terminal, gradient CTAs, shimmer name"
```

---

## Task 7: Upgrade About

**Files:**
- Modify: `src/components/About.tsx`

### Step 7.1: Rewrite About with glass stats and CountUp

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "./CountUp";
import GradientText from "./GradientText";

const STATS = [
  { value: 4, suffix: "+", label: "Internships", icon: "💼" },
  { value: 6, suffix: "+", label: "Projects", icon: "🚀" },
  { value: 4, suffix: "", label: "Hackathons", icon: "🏆" },
  { value: 10, suffix: "+", label: "Certifications", icon: "📜" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>01.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              I&apos;m an Applied AI & Machine Learning systems builder with
              hands-on experience designing, training, and integrating
              intelligent systems under real-world constraints. Currently
              pursuing{" "}
              <span className="text-cream font-medium">
                B.Tech in Computer Science (AI & ML)
              </span>{" "}
              at Vidya Jyothi Institute of Technology, Hyderabad.
            </p>
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              My work spans{" "}
              <span className="text-cream font-medium">open-source AI development</span>,{" "}
              <span className="text-cream font-medium">enterprise cloud platforms</span>,{" "}
              <span className="text-cream font-medium">sustainability-focused ML</span>, and{" "}
              <span className="text-cream font-medium">national-level hackathons</span>.
              I have a strong foundation in machine learning, computer vision,
              NLP, automation, and system-level thinking.
            </p>
            <p className="text-muted-light text-lg leading-relaxed">
              From building multimodal AI virtual assistants to real-time object
              detection systems, I focus on creating{" "}
              <span className="text-cyan font-medium">
                production-grade AI solutions
              </span>{" "}
              that solve real problems.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="glass glass-hover p-6 text-center group"
                >
                  <span className="text-2xl block mb-2">{stat.icon}</span>
                  <div className="font-display font-extrabold text-4xl text-cyan mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-xs text-muted uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-4 glass flex items-center gap-3 px-4 py-3">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="font-mono text-sm text-muted-light">
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### Step 7.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Glass stat cards, numbers count up on scroll, gradient section number.

### Step 7.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade About with glass stats, CountUp, gradient header"
```

---

## Task 8: Upgrade Experience

**Files:**
- Modify: `src/components/Experience.tsx`

### Step 8.1: Rewrite Experience with glass tabs and AnimatePresence

Replace the entire file:

```tsx
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import GradientText from "./GradientText";

const EXPERIENCES = [
  {
    title: "AI Developer Intern",
    company: "VISWAM.AI — IIIT Hyderabad / Swecha",
    period: "May 2025 – Aug 2025",
    highlights: [
      "Worked on collaborative, open-source AI projects addressing social and regional problem statements",
      "Applied Python-based ML workflows including local data collection, preprocessing, and model fine-tuning",
      "Contributed to LLM and computer vision experimentation for practical, local deployments",
      "Gained exposure to collaborative software development, DevOps basics, and research-driven AI workflows",
    ],
  },
  {
    title: "AI & Green Skills Intern",
    company: "Edunet Foundation — AICTE & Shell",
    period: "Jun 2025 – Jul 2025",
    highlights: [
      "Developed AI and data analytics solutions aligned with UN Sustainable Development Goals",
      "Built a Water Quality Prediction model using environmental datasets and ML techniques",
      "Participated in structured mentorship covering data preprocessing, modeling, evaluation, and optimization",
      "Delivered a final prototype and presentation under Shell–AICTE innovation framework",
    ],
  },
  {
    title: "AI & Machine Learning Intern",
    company: "Edunet Foundation — IBM SkillsBuild & AICTE",
    period: "Jun 2025 – Jul 2025",
    highlights: [
      "Built an Employee Salary Prediction system using Gradient Boosting in Python",
      "Deployed the model using Streamlit with batch prediction and CSV upload support",
      "Participated in IBM-led learning modules on ML pipelines, evaluation, and project delivery",
      "Completed weekly milestones and a final project submission under mentor guidance",
    ],
  },
  {
    title: "Salesforce Virtual Developer Intern",
    company: "SmartBridge / Salesforce",
    period: "May 2025 – Jul 2025",
    highlights: [
      "Completed structured training in Salesforce Admin and Developer fundamentals",
      "Worked with Data Modeling, Security, Process Automation (Flows), Apex, and Lightning App Builder",
      "Explored Generative AI features including Agentforce and Einstein Copilot concepts",
      "Participated in instructor-led training, mentor sessions, and a career-fair–oriented program",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>02.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Experience
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Tab list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-4 md:pb-0"
          >
            {EXPERIENCES.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActiveIdx(i)}
                data-interactive
                className={`flex-shrink-0 text-left px-4 py-3 font-mono text-sm transition-all duration-300 rounded-lg ${
                  activeIdx === i
                    ? "glass border-cyan/30 text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    : "text-muted hover:text-cream hover:bg-noir-card/50"
                }`}
              >
                {exp.company.split("—")[0].trim()}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-display font-bold text-xl text-cream">
                    {EXPERIENCES[activeIdx].title}
                  </h3>
                  <span className="text-cyan font-display font-bold text-lg">
                    @ {EXPERIENCES[activeIdx].company.split("—")[0].trim()}
                  </span>
                </div>
                <p className="font-mono text-sm text-muted mb-1">
                  {EXPERIENCES[activeIdx].company.includes("—")
                    ? EXPERIENCES[activeIdx].company.split("—")[1].trim()
                    : ""}
                </p>
                <span className="inline-block font-mono text-xs text-cyan/70 bg-cyan/10 px-2 py-1 rounded-md border border-cyan/15 mb-6">
                  {EXPERIENCES[activeIdx].period}
                </span>

                <ul className="space-y-3">
                  {EXPERIENCES[activeIdx].highlights.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 text-muted-light"
                    >
                      <span className="text-cyan mt-1.5 flex-shrink-0">▸</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### Step 8.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Glass tabs with glow on active, smooth content transitions, staggered bullet reveals.

### Step 8.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Experience with glass tabs and AnimatePresence transitions"
```

---

## Task 9: Upgrade Projects

**Files:**
- Modify: `src/components/Projects.tsx`

### Step 9.1: Rewrite Projects with TiltCard and glassmorphism

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";
import GlassCard from "./GlassCard";
import GradientText from "./GradientText";

const PROJECTS = [
  {
    title: "AI Virtual Assistant",
    tags: ["Python", "LLMs", "Computer Vision", "System Automation"],
    description:
      "Designed and developed a multimodal AI virtual assistant supporting voice/text interaction, vision-based inputs, and system-level automation. Integrated large language models for contextual understanding, task planning, and intelligent response generation.",
    icon: "🧠",
    featured: true,
  },
  {
    title: "Real-Time Object Detection",
    tags: ["OpenCV", "Deep Learning"],
    description:
      "Built a real-time image and object detection pipeline using computer vision and deep learning techniques. Optimized preprocessing and inference workflows for live video streams.",
    icon: "👁️",
    featured: true,
  },
  {
    title: "User Authentication System",
    tags: ["Computer Vision", "Security"],
    description:
      "Developed a secure desktop-based authentication system using facial recognition with multi-layer verification logic and encrypted user data storage.",
    icon: "🔐",
    featured: false,
  },
  {
    title: "Financial Chatbot",
    tags: ["Python", "NLP", "Machine Learning"],
    description:
      "Built an end-to-end conversational chatbot for financial intent classification and query handling with custom NLP preprocessing pipelines and supervised ML models.",
    icon: "💬",
    featured: false,
  },
  {
    title: "Web Scraping & Data Extraction",
    tags: ["Python", "Selenium", "BeautifulSoup"],
    description:
      "Developed intelligent web scraping pipelines for structured and unstructured data extraction with automated dynamic content handling and fault-tolerant modules.",
    icon: "🕷️",
    featured: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>03.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Projects
          </h2>
        </motion.div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {PROJECTS.filter((p) => p.featured).map((project, i) => (
            <TiltCard key={project.title} delay={0.2 + i * 0.15} className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{project.icon}</span>
                <span className="font-mono text-xs gradient-text bg-cyan/10 px-2 py-1 rounded-md border border-cyan/20">
                  Featured
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-cream mb-3 group-hover:text-cyan transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-muted-light text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted px-2 py-1 glass rounded-md hover:text-cyan hover:border-cyan/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <GlassCard key={project.title} delay={0.5 + i * 0.1} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{project.icon}</span>
                <h3 className="font-display font-bold text-cream group-hover:text-cyan transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              <p className="text-muted text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-muted px-1.5 py-0.5 glass rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Step 9.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Featured cards tilt on hover, glassmorphism on all cards, staggered entrance.

### Step 9.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Projects with TiltCard, glassmorphism, staggered animations"
```

---

## Task 10: Upgrade Skills

**Files:**
- Modify: `src/components/Skills.tsx`

### Step 10.1: Rewrite Skills with gradient borders and staggered tags

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GradientText from "./GradientText";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: "⌨️",
    skills: ["Python", "Java", "C"],
    accent: "cyan",
  },
  {
    title: "AI / ML",
    icon: "🤖",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "LLM Fundamentals",
      "Model Training & Evaluation",
    ],
    accent: "amber",
  },
  {
    title: "Tools & Frameworks",
    icon: "🛠️",
    skills: [
      "OpenCV",
      "Scikit-learn",
      "Streamlit",
      "Git",
      "Selenium",
      "BeautifulSoup",
    ],
    accent: "cyan",
  },
  {
    title: "Systems & Data",
    icon: "🗄️",
    skills: ["SQL", "DBMS", "Operating Systems", "Data Structures & Algorithms"],
    accent: "amber",
  },
  {
    title: "Platforms",
    icon: "☁️",
    skills: ["Salesforce CRM", "Cloud-Based AI Workflows"],
    accent: "cyan",
  },
  {
    title: "Domains",
    icon: "🎯",
    skills: [
      "Applied AI Systems",
      "Automation",
      "Data Pipelines",
      "Generative AI",
      "Web3 + AI",
    ],
    accent: "violet",
  },
];

const accentColors: Record<string, { border: string; text: string; bg: string; hover: string }> = {
  cyan: {
    border: "border-cyan/20",
    text: "text-cyan/80",
    bg: "bg-cyan/5",
    hover: "hover:bg-cyan/10 hover:border-cyan/30",
  },
  amber: {
    border: "border-amber/20",
    text: "text-amber/80",
    bg: "bg-amber/5",
    hover: "hover:bg-amber/10 hover:border-amber/30",
  },
  violet: {
    border: "border-violet/20",
    text: "text-violet/80",
    bg: "bg-violet/5",
    hover: "hover:bg-violet/10 hover:border-violet/30",
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>04.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => {
            const colors = accentColors[cat.accent];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="glass glass-hover p-6 relative overflow-hidden"
              >
                {/* Gradient top border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${
                    cat.accent === "cyan"
                      ? "bg-gradient-to-r from-cyan/60 to-cyan/10"
                      : cat.accent === "amber"
                      ? "bg-gradient-to-r from-amber/60 to-amber/10"
                      : "bg-gradient-to-r from-violet/60 to-violet/10"
                  }`}
                />

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-display font-bold text-lg">
                    <GradientText variant={cat.accent === "amber" ? "warm" : "primary"}>
                      {cat.title}
                    </GradientText>
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                      className={`font-mono text-xs px-3 py-1.5 border rounded-lg transition-all duration-300 cursor-default ${colors.text} ${colors.border} ${colors.bg} ${colors.hover}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### Step 10.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Gradient top borders on cards, gradient category headers, staggered tag reveals.

### Step 10.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Skills with gradient borders, headers, staggered tags"
```

---

## Task 11: Upgrade Education

**Files:**
- Modify: `src/components/Education.tsx`

### Step 11.1: Rewrite Education with gradient timeline

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GradientText from "./GradientText";

const EDUCATION = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering (AI & ML)",
    school: "Vidya Jyothi Institute of Technology",
    location: "Hyderabad, India",
    period: "Aug 2024 – Apr 2027",
    current: true,
  },
  {
    degree: "Diploma",
    field: "Civil Engineering",
    school: "SRRS Government Polytechnic",
    location: "Sircilla, India",
    period: "2021 – 2024",
    current: false,
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>05.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Gradient timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/40 via-violet/30 to-amber/20" />

          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-6">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${
                      edu.current
                        ? "border-cyan bg-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                        : "border-noir-border bg-noir-card"
                    }`}
                  />
                  {edu.current && (
                    <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-cyan/40 animate-ping" />
                  )}
                </div>

                <div className="glass glass-hover p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-display font-bold text-xl text-cream">
                      {edu.degree}
                    </h3>
                    {edu.current && (
                      <span className="font-mono text-xs text-cyan bg-cyan/10 px-2 py-0.5 rounded-md border border-cyan/20 animate-pulse">
                        Present
                      </span>
                    )}
                  </div>
                  <p className="gradient-text-warm font-display font-semibold text-lg mb-1">
                    {edu.field}
                  </p>
                  <p className="text-muted-light mb-2">{edu.school}</p>
                  <div className="flex flex-wrap gap-4 font-mono text-sm text-muted">
                    <span>📍 {edu.location}</span>
                    <span>📅 {edu.period}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Step 11.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Gradient timeline line, glassmorphism cards, alternating entrance, pulsing "Present" badge.

### Step 11.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Education with gradient timeline, glass cards, alternating entrance"
```

---

## Task 12: Upgrade Hackathons

**Files:**
- Modify: `src/components/Hackathons.tsx`

### Step 12.1: Rewrite Hackathons with glass cards and glow

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GradientText from "./GradientText";

const HACKATHONS = [
  {
    name: "Smart India Hackathon (SIH) 2025",
    detail: "Shortlisted — Internal Round",
    icon: "🇮🇳",
  },
  {
    name: "Agentic Ethereum Hackathon – India",
    detail: "Reskilll, Geodework, Scaler School of Technology",
    icon: "⛓️",
  },
  {
    name: "IndiaAI Impact GenAI Hackathon",
    detail: "IISc (CNI) & IBM Research",
    icon: "🧪",
  },
  {
    name: "HackWithHyderabad",
    detail: "Microsoft Office, Hyderabad",
    icon: "🏢",
  },
];

const CERTIFICATIONS = [
  "Artificial Intelligence Fundamentals — IBM SkillsBuild",
  "Principles of Generative AI",
  "OpenAI GPT Models & GPT-3 for Developers",
  "Deep Learning, NLP, Computer Vision, Data Science — Infosys Springboard",
  "Python Essentials 1 & 2 — Cisco",
  "Industrial Networking Essentials — Cisco",
  "Salesforce Developer with Agentblazer — SmartBridge",
  "Netflix Recommendation System — Scaler",
  "BCG X GenAI Job Simulation",
  "Deloitte Technology Job Simulation",
  "EF SET English Certificate",
];

export default function Hackathons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>06.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Hackathons & Certifications
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Hackathons */}
          <div>
            <h3 className="font-display font-bold text-xl text-cream mb-6 flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              Competitions
            </h3>
            <div className="space-y-4">
              {HACKATHONS.map((hack, i) => (
                <motion.div
                  key={hack.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 glass glass-hover p-5 group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {hack.icon}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-cream group-hover:text-amber transition-colors duration-300">
                      {hack.name}
                    </h4>
                    <p className="font-mono text-sm text-muted mt-1">
                      {hack.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-display font-bold text-xl text-cream mb-6 flex items-center gap-3">
              <span className="text-2xl">📜</span>
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="glass px-3 py-2 text-sm text-muted-light hover:text-cream hover:border-cyan/20 transition-all duration-300 cursor-default"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Step 12.2: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Glass hackathon cards, certification pills with glassmorphism, staggered reveals.

### Step 12.3: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Hackathons with glass cards, cert pills, glow effects"
```

---

## Task 13: Upgrade Contact & Footer

**Files:**
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Footer.tsx`

### Step 13.1: Rewrite Contact with gradient text and glass cards

Replace the entire file:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GradientText from "./GradientText";

const LINKS = [
  {
    label: "Email",
    value: "dpharshavardhan.1636@gmail.com",
    href: "mailto:dpharshavardhan.1636@gmail.com",
    icon: "✉️",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harshavardhan",
    href: "https://linkedin.com/in/harshavardhan-dyavanapelli",
    icon: "💼",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,119,181,0.15)]",
  },
  {
    label: "GitHub",
    value: "github.com/harshavardhan",
    href: "https://github.com/harshavardhan-dyavanapelli",
    icon: "🐙",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  },
  {
    label: "Phone",
    value: "+91 7981248113",
    href: "tel:+917981248113",
    icon: "📱",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,171,64,0.15)]",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan/[0.03] blur-[150px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-violet/[0.02] blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-cyan tracking-widest uppercase block mb-4">
            07. What&apos;s Next?
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl mb-6">
            <GradientText>Let&apos;s Build Something</GradientText>
          </h2>
          <p className="text-muted-light text-lg max-w-2xl mx-auto leading-relaxed">
            I&apos;m actively looking for opportunities in AI/ML engineering,
            research, and applied intelligent systems. Whether you have a
            question, a project idea, or just want to connect — my inbox is
            always open.
          </p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              data-interactive
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className={`group glass p-5 text-center transition-all duration-500 ${link.glow}`}
            >
              <span className="text-2xl block mb-2">{link.icon}</span>
              <span className="font-mono text-xs text-muted uppercase tracking-widest block mb-1">
                {link.label}
              </span>
              <span className="text-cream text-sm group-hover:text-cyan transition-colors duration-300 break-all">
                {link.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="mailto:dpharshavardhan.1636@gmail.com"
            data-interactive
            className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-noir font-display font-bold text-sm tracking-wide uppercase hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-105 transition-all duration-300 rounded-lg"
          >
            Say Hello
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

### Step 13.2: Rewrite Footer with glass border

Replace the entire file:

```tsx
"use client";

import GradientText from "./GradientText";

export default function Footer() {
  return (
    <footer className="relative py-12">
      {/* Glass top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-display font-bold text-lg">
            <GradientText>H</GradientText>
            <span className="text-cream">.</span>
            <span className="text-muted text-sm font-mono ml-1">v(ardhan)</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {[
              { label: "GitHub", href: "https://github.com/harshavardhan-dyavanapelli" },
              { label: "LinkedIn", href: "https://linkedin.com/in/harshavardhan-dyavanapelli" },
              { label: "Email", href: "mailto:dpharshavardhan.1636@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-interactive
                className="font-mono text-xs text-muted px-3 py-1.5 glass rounded-lg hover:text-cream hover:border-cyan/20 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Credit */}
          <p className="font-mono text-xs text-muted/50">
            Designed & built by Harsha Vardhan
          </p>
        </div>
      </div>
    </footer>
  );
}
```

### Step 13.3: Test

```bash
cd D:/harsha-portfolio && npm run dev
```

Expected: Gradient "Let's Build Something" heading, glass contact cards with glow, gradient CTA, glass footer links.

### Step 13.4: Commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "feat: upgrade Contact with gradient text, glass cards; Footer with glass links"
```

---

## Task 14: Final Cleanup & Remove Unused SVGs

**Files:**
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

### Step 14.1: Remove unused default Next.js SVGs

```bash
cd D:/harsha-portfolio && rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

### Step 14.2: Full build test

```bash
cd D:/harsha-portfolio && npm run build
```

Expected: Build succeeds with no errors. Check for any TypeScript or ESLint issues.

### Step 14.3: Final commit

```bash
cd D:/harsha-portfolio && git add -A && git commit -m "chore: remove unused default SVGs, final build verification"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 10 sections from spec have corresponding tasks (Design system → Task 1, Shared components → Task 2, Global effects → Task 3, Layout wiring → Task 4, Nav → Task 5, Hero → Task 6, About → Task 7, Experience → Task 8, Projects → Task 9, Skills → Task 10, Education → Task 11, Hackathons → Task 12, Contact/Footer → Task 13, Cleanup → Task 14)
- [x] **No placeholders:** Every step has actual code, exact file paths, exact commands
- [x] **Type consistency:** GlassCard, GradientText, CountUp, TiltCard props are consistent across all usages
- [x] **Content preserved:** All existing data (experiences, projects, skills, education, hackathons, certifications, contact info) carried over exactly
- [x] **C++ removed:** Not present in current data (already only Python, Java, C) — verified
