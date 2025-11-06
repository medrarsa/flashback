"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionTitle({
  tag,
  title,
  center = true,
}: {
  tag: string;
  title: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={center ? "text-center mb-12" : "mb-8"}
    >
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--brand)] text-sm font-black mb-4 shadow-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)]" />
        {tag}
      </span>
      <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] bg-clip-text text-transparent leading-[1.25] pb-1">
        {title}
      </h2>
    </motion.div>
  );
}
