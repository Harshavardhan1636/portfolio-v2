"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
            <span className="font-mono text-sm text-cyan">06.</span>
            <div className="hr-accent flex-1 max-w-[200px]" />
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
                  className="flex items-start gap-4 bg-noir-card border border-noir-border p-5 hover:border-amber/20 transition-all duration-500 group"
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
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-3 py-2.5 border-b border-noir-border/50 group"
                >
                  <span className="text-cyan text-xs mt-1 flex-shrink-0">
                    ▸
                  </span>
                  <span className="text-muted-light text-sm group-hover:text-cream transition-colors duration-300">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
