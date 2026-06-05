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
