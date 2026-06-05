"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
                AI/ML Engineer &bull; B.Tech CS
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
