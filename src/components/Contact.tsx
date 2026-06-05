"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LINKS = [
  {
    label: "Email",
    value: "dpharshavardhan.1636@gmail.com",
    href: "mailto:dpharshavardhan.1636@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harshavardhandyavanapelli",
    href: "https://www.linkedin.com/in/harshavardhandyavanapelli",
  },
  {
    label: "GitHub",
    value: "github.com/Harshavardhan1636",
    href: "https://github.com/Harshavardhan1636",
  },
  {
    label: "Phone",
    value: "+91 7981248113",
    href: "tel:+917981248113",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.p
          className="text-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m actively looking for opportunities in AI/ML engineering,
          research, and applied intelligent systems. Whether you have a
          question, a project idea, or just want to connect — my inbox is
          always open.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              data-interactive
              className="link-underline text-sm text-accent"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
