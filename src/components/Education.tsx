"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EDUCATION = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering (AI & ML)",
    school: "Vidya Jyothi Institute of Technology",
    location: "Hyderabad, India",
    period: "Aug 2024 – Apr 2027",
    current: true,
  },
  {
    degree: "Diploma",
    field: "Civil Engineering",
    school: "SRRS Government Polytechnic",
    location: "Sircilla, India",
    period: "2021 – 2024",
    current: false,
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="space-y-10">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="font-display font-bold text-xl text-text">
                  {edu.degree}
                </h3>
                {edu.current && (
                  <span className="text-xs text-accent font-medium">
                    (Current)
                  </span>
                )}
              </div>
              <p className="font-semibold text-accent mb-1">{edu.field}</p>
              <p className="text-muted mb-1">{edu.school}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted">
                <span>{edu.location}</span>
                <span>{edu.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
