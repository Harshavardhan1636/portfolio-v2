"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "4+", label: "Internships" },
  { value: "6+", label: "Projects" },
  { value: "4", label: "Hackathons" },
  { value: "10+", label: "Certifications" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed mb-6">
              I&apos;m an Applied AI & Machine Learning systems builder with
              hands-on experience designing, training, and integrating
              intelligent systems under real-world constraints. Currently
              pursuing{" "}
              <span className="font-semibold">
                B.Tech in Computer Science (AI & ML)
              </span>{" "}
              at Vidya Jyothi Institute of Technology, Hyderabad.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              My work spans{" "}
              <span className="font-semibold">open-source AI development</span>,{" "}
              <span className="font-semibold">enterprise cloud platforms</span>,{" "}
              <span className="font-semibold">sustainability-focused ML</span>,
              and{" "}
              <span className="font-semibold">national-level hackathons</span>.
              I have a strong foundation in machine learning, computer vision,
              NLP, automation, and system-level thinking.
            </p>
            <p className="text-lg leading-relaxed">
              From building multimodal AI virtual assistants to real-time object
              detection systems, I focus on creating{" "}
              <span className="font-semibold text-accent">
                production-grade AI solutions
              </span>{" "}
              that solve real problems.
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-5 md:border-l md:border-border md:pl-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border p-5 text-center hover:border-accent hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-display font-bold text-3xl text-accent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
