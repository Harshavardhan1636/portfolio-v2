"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HACKATHONS = [
  {
    name: "Smart India Hackathon (SIH) 2025",
    detail: "Shortlisted — Internal Round",
  },
  {
    name: "Agentic Ethereum Hackathon – India",
    detail: "Reskilll, Geodework, Scaler School of Technology",
  },
  {
    name: "IndiaAI Impact GenAI Hackathon",
    detail: "IISc (CNI) & IBM Research",
  },
  {
    name: "HackWithHyderabad",
    detail: "Microsoft Office, Hyderabad",
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
    <section className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Hackathons & Certifications
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-accent mb-6">
              Competitions
            </h3>
            <div className="space-y-6">
              {HACKATHONS.map((hack, i) => (
                <motion.div
                  key={hack.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  data-interactive
                  className="hover:pl-2 transition-all duration-300"
                >
                  <h4 className="font-semibold text-text">{hack.name}</h4>
                  <p className="text-sm text-muted mt-1">{hack.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-accent mb-6">
              Certifications
            </h3>
            <motion.p
              className="text-lg leading-relaxed text-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {CERTIFICATIONS.join(" · ")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
