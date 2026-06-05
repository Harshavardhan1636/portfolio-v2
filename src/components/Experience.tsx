"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import GradientText from "./GradientText";

const EXPERIENCES = [
  {
    title: "AI Developer Intern",
    company: "VISWAM.AI — IIIT Hyderabad / Swecha",
    period: "May 2025 – Aug 2025",
    highlights: [
      "Worked on collaborative, open-source AI projects addressing social and regional problem statements",
      "Applied Python-based ML workflows including local data collection, preprocessing, and model fine-tuning",
      "Contributed to LLM and computer vision experimentation for practical, local deployments",
      "Gained exposure to collaborative software development, DevOps basics, and research-driven AI workflows",
    ],
  },
  {
    title: "AI & Green Skills Intern",
    company: "Edunet Foundation — AICTE & Shell",
    period: "Jun 2025 – Jul 2025",
    highlights: [
      "Developed AI and data analytics solutions aligned with UN Sustainable Development Goals",
      "Built a Water Quality Prediction model using environmental datasets and ML techniques",
      "Participated in structured mentorship covering data preprocessing, modeling, evaluation, and optimization",
      "Delivered a final prototype and presentation under Shell–AICTE innovation framework",
    ],
  },
  {
    title: "AI & Machine Learning Intern",
    company: "Edunet Foundation — IBM SkillsBuild & AICTE",
    period: "Jun 2025 – Jul 2025",
    highlights: [
      "Built an Employee Salary Prediction system using Gradient Boosting in Python",
      "Deployed the model using Streamlit with batch prediction and CSV upload support",
      "Participated in IBM-led learning modules on ML pipelines, evaluation, and project delivery",
      "Completed weekly milestones and a final project submission under mentor guidance",
    ],
  },
  {
    title: "Salesforce Virtual Developer Intern",
    company: "SmartBridge / Salesforce",
    period: "May 2025 – Jul 2025",
    highlights: [
      "Completed structured training in Salesforce Admin and Developer fundamentals",
      "Worked with Data Modeling, Security, Process Automation (Flows), Apex, and Lightning App Builder",
      "Explored Generative AI features including Agentforce and Einstein Copilot concepts",
      "Participated in instructor-led training, mentor sessions, and a career-fair–oriented program",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm">
              <GradientText>02.</GradientText>
            </span>
            <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Experience
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Tab list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-4 md:pb-0"
          >
            {EXPERIENCES.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActiveIdx(i)}
                data-interactive
                className={`flex-shrink-0 text-left px-4 py-3 font-mono text-sm transition-all duration-300 rounded-lg ${
                  activeIdx === i
                    ? "glass border-cyan/30 text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    : "text-muted hover:text-cream hover:bg-noir-card/50"
                }`}
              >
                {exp.company.split("—")[0].trim()}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-display font-bold text-xl text-cream">
                    {EXPERIENCES[activeIdx].title}
                  </h3>
                  <span className="text-cyan font-display font-bold text-lg">
                    @ {EXPERIENCES[activeIdx].company.split("—")[0].trim()}
                  </span>
                </div>
                <p className="font-mono text-sm text-muted mb-1">
                  {EXPERIENCES[activeIdx].company.includes("—")
                    ? EXPERIENCES[activeIdx].company.split("—")[1].trim()
                    : ""}
                </p>
                <span className="inline-block font-mono text-xs text-cyan/70 bg-cyan/10 px-2 py-1 rounded-md border border-cyan/15 mb-6">
                  {EXPERIENCES[activeIdx].period}
                </span>

                <ul className="space-y-3">
                  {EXPERIENCES[activeIdx].highlights.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 text-muted-light"
                    >
                      <span className="text-cyan mt-1.5 flex-shrink-0">▸</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
