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
    <section id="education" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-cyan">05.</span>
            <div className="hr-accent flex-1 max-w-[200px]" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/30 via-cyan/10 to-transparent" />

          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-6">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      edu.current
                        ? "border-cyan bg-cyan/30"
                        : "border-noir-border bg-noir-card"
                    }`}
                  />
                  {edu.current && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan/40 animate-ping" />
                  )}
                </div>

                <div className="bg-noir-card border border-noir-border p-6 md:p-8 group hover:border-cyan/20 transition-all duration-500">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-display font-bold text-xl text-cream">
                      {edu.degree}
                    </h3>
                    {edu.current && (
                      <span className="font-mono text-xs text-cyan bg-cyan/10 px-2 py-0.5 border border-cyan/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-amber font-display font-semibold text-lg mb-1">
                    {edu.field}
                  </p>
                  <p className="text-muted-light mb-1">{edu.school}</p>
                  <div className="flex flex-wrap gap-4 font-mono text-sm text-muted">
                    <span>📍 {edu.location}</span>
                    <span>📅 {edu.period}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
