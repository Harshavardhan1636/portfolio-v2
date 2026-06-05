"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LINKS = [
  {
    label: "Email",
    value: "dpharshavardhan.1636@gmail.com",
    href: "mailto:dpharshavardhan.1636@gmail.com",
    icon: "✉️",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harshavardhan",
    href: "https://linkedin.com/in/harshavardhan-dyavanapelli",
    icon: "💼",
  },
  {
    label: "GitHub",
    value: "github.com/harshavardhan",
    href: "https://github.com/harshavardhan-dyavanapelli",
    icon: "🐙",
  },
  {
    label: "Phone",
    value: "+91 7981248113",
    href: "tel:+917981248113",
    icon: "📱",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan/[0.02] blur-[150px]" />

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
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-cream mb-6">
            Let&apos;s Build Something
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
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="group bg-noir-card border border-noir-border p-5 text-center hover:border-cyan/30 transition-all duration-500"
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan text-noir font-display font-bold text-sm tracking-wide uppercase hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] transition-all duration-300"
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
