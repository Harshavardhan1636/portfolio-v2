"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
    <section id="about" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-cyan">01.</span>
            <div className="hr-accent flex-1 max-w-[200px]" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-cream">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              I&apos;m an Applied AI & Machine Learning systems builder with
              hands-on experience designing, training, and integrating
              intelligent systems under real-world constraints. Currently
              pursuing{" "}
              <span className="text-cream font-medium">
                B.Tech in Computer Science (AI & ML)
              </span>{" "}
              at Vidya Jyothi Institute of Technology, Hyderabad.
            </p>
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              My work spans{" "}
              <span className="text-cream font-medium">
                open-source AI development
              </span>
              ,{" "}
              <span className="text-cream font-medium">
                enterprise cloud platforms
              </span>
              ,{" "}
              <span className="text-cream font-medium">
                sustainability-focused ML
              </span>
              , and{" "}
              <span className="text-cream font-medium">
                national-level hackathons
              </span>
              . I have a strong foundation in machine learning, computer vision,
              NLP, automation, and system-level thinking.
            </p>
            <p className="text-muted-light text-lg leading-relaxed">
              From building multimodal AI virtual assistants to real-time object
              detection systems, I focus on creating{" "}
              <span className="text-cyan font-medium">
                production-grade AI solutions
              </span>{" "}
              that solve real problems.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="bg-noir-card border border-noir-border p-6 group hover:border-cyan/30 transition-colors duration-500"
                >
                  <div className="font-display font-extrabold text-4xl text-cyan mb-1 group-hover:text-shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-muted uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Location badge */}
            <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-noir-card border border-noir-border">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="font-mono text-sm text-muted-light">
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
