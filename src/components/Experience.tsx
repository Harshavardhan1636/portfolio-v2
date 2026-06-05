"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

  return (
    <section id="experience" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8 md:space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              data-interactive
              className={`border-l-2 transition-all duration-300 ${
                i === 0
                  ? "border-accent pl-6 md:pl-8"
                  : "border-border pl-6 md:pl-8 hover:border-accent"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="font-display font-bold text-xl text-text">
                  {exp.title}
                </h3>
                <span className="text-accent font-semibold">
                  {exp.company.split("—")[0].trim()}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                {exp.company.includes("—") && (
                  <span>{exp.company.split("—")[1].trim()}</span>
                )}
                <span>{exp.period}</span>
              </div>

              <ul className="space-y-2">
                {exp.highlights.map((point) => (
                  <li key={point} className="text-muted leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
