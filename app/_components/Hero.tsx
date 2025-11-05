"use client";
import { motion } from "framer-motion";
export function HeroTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5 }}
      className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
    >
      جودة تُرى.<br/> تفاصيل تُحس.<br/> تنفيذ يسبق التوقعات.
    </motion.h1>
  );
}
