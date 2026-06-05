"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CATEGORIES = [
  { title: "Languages", skills: ["Python", "Java", "C"] },
  {
    title: "AI / ML",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "LLM Fundamentals",
      "Model Training & Evaluation",
    ],
  },
  {
    title: "Tools & Frameworks",
    skills: ["OpenCV", "Scikit-learn", "Streamlit", "Git", "Selenium", "BeautifulSoup"],
  },
  {
    title: "Systems & Data",
    skills: ["SQL", "DBMS", "Operating Systems", "Data Structures & Algorithms"],
  },
  { title: "Platforms", skills: ["Salesforce CRM", "Cloud-Based AI Workflows"] },
  {
    title: "Domains",
    skills: ["Applied AI Systems", "Automation", "Data Pipelines", "Generative AI", "Web3 + AI"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="space-y-10">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              data-interactive
              className="group"
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-accent mb-3">
                {cat.title}
              </h3>
              <p className="text-lg leading-relaxed text-text group-hover:text-accent transition-colors duration-300">
                {cat.skills.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
