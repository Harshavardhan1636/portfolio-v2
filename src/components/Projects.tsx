"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    title: "AI Virtual Assistant",
    tags: ["Python", "LLMs", "Computer Vision", "System Automation"],
    description:
      "Designed and developed a multimodal AI virtual assistant supporting voice/text interaction, vision-based inputs, and system-level automation. Integrated large language models for contextual understanding, task planning, and intelligent response generation.",
  },
  {
    title: "Real-Time Object Detection",
    tags: ["OpenCV", "Deep Learning"],
    description:
      "Built a real-time image and object detection pipeline using computer vision and deep learning techniques. Optimized preprocessing and inference workflows for live video streams.",
  },
  {
    title: "User Authentication System",
    tags: ["Computer Vision", "Security"],
    description:
      "Developed a secure desktop-based authentication system using facial recognition with multi-layer verification logic and encrypted user data storage.",
  },
  {
    title: "Financial Chatbot",
    tags: ["Python", "NLP", "Machine Learning"],
    description:
      "Built an end-to-end conversational chatbot for financial intent classification and query handling with custom NLP preprocessing pipelines and supervised ML models.",
  },
  {
    title: "Web Scraping & Data Extraction",
    tags: ["Python", "Selenium", "BeautifulSoup"],
    description:
      "Developed intelligent web scraping pipelines for structured and unstructured data extraction with automated dynamic content handling and fault-tolerant modules.",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              data-interactive
              className="border border-border p-6 md:p-8 group hover:border-accent hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-display font-bold text-xl text-text mb-3 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted px-2 py-1 border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
