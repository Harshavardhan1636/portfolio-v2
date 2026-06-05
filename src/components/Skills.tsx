"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: "⌨️",
    skills: ["Python", "Java", "C"],
    color: "cyan",
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
    color: "amber",
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
    color: "cyan",
  },
  {
    title: "Systems & Data",
    icon: "🗄️",
    skills: ["SQL", "DBMS", "Operating Systems", "Data Structures & Algorithms"],
    color: "amber",
  },
  {
    title: "Platforms",
    icon: "☁️",
    skills: ["Salesforce CRM", "Cloud-Based AI Workflows"],
    color: "cyan",
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
    color: "amber",
  },
];

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
            <span className="font-mono text-sm text-cyan">04.</span>
            <div className="hr-accent flex-1 max-w-[200px]" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group bg-noir-card border border-noir-border p-6 hover:border-cyan/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display font-bold text-cream text-lg">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                    className={`font-mono text-xs px-3 py-1.5 border transition-all duration-300 cursor-default ${
                      cat.color === "cyan"
                        ? "text-cyan/80 border-cyan/15 bg-cyan/5 hover:bg-cyan/10 hover:border-cyan/30"
                        : "text-amber/80 border-amber/15 bg-amber/5 hover:bg-amber/10 hover:border-amber/30"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
