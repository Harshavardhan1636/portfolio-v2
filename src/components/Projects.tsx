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
