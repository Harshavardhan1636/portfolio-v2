"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan/[0.03] blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-amber/[0.02] blur-[100px]" />

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
              <span className="block text-cyan text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
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
              <span className="text-cream font-medium">
                machine learning
              </span>
              ,{" "}
              <span className="text-cream font-medium">computer vision</span>,
              and{" "}
              <span className="text-cream font-medium">
                real-world automation
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-cyan text-noir font-display font-bold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
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
                className="inline-flex items-center gap-2 px-6 py-3 border border-noir-border text-cream font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:border-cyan/50 hover:text-cyan"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right side — terminal-style card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-5 hidden md:block"
          >
            <div className="relative bg-noir-card border border-noir-border rounded-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-noir-border bg-noir-light">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted">
                  harsha@portfolio ~
                </span>
              </div>
              {/* Terminal content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <div className="text-muted">
                  <span className="text-cyan">$</span> cat profile.json
                </div>
                <div className="mt-3 text-cream/80">
                  {"{"}
                </div>
                <div className="ml-4">
                  <span className="text-amber">&quot;name&quot;</span>:{" "}
                  <span className="text-green-400">
                    &quot;Harsha Vardhan&quot;
                  </span>
                  ,
                </div>
                <div className="ml-4">
                  <span className="text-amber">&quot;role&quot;</span>:{" "}
                  <span className="text-green-400">
                    &quot;AI/ML Engineer&quot;
                  </span>
                  ,
                </div>
                <div className="ml-4">
                  <span className="text-amber">&quot;location&quot;</span>:{" "}
                  <span className="text-green-400">
                    &quot;Hyderabad, IN&quot;
                  </span>
                  ,
                </div>
                <div className="ml-4">
                  <span className="text-amber">&quot;focus&quot;</span>: [
                </div>
                <div className="ml-8 text-green-400">
                  &quot;Computer Vision&quot;,
                </div>
                <div className="ml-8 text-green-400">
                  &quot;NLP&quot;,
                </div>
                <div className="ml-8 text-green-400">
                  &quot;Deep Learning&quot;,
                </div>
                <div className="ml-8 text-green-400">
                  &quot;System Automation&quot;
                </div>
                <div className="ml-4">],</div>
                <div className="ml-4">
                  <span className="text-amber">&quot;status&quot;</span>:{" "}
                  <span className="text-cyan">
                    &quot;Open to opportunities&quot;
                  </span>
                </div>
                <div className="text-cream/80">{"}"}</div>
                <div className="mt-2 text-muted">
                  <span className="text-cyan">$</span>
                  <span className="inline-block w-2 h-4 bg-cyan ml-1 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                </div>
              </div>
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
          <span className="text-muted text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
