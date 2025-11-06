// app/_components/AboutSection.tsx
"use client";
import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Eye, Target, Award } from "lucide-react";

/* نفس الأنيميشن الأصلية */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ستاجر خفيف للكروت (إضافة شكل فقط) */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/* نفس العناصر تمامًا */
const items = [
  {
    icon: Eye,
    title: "رؤيتنا",
    desc: "أن نكون الخيار الأول في المملكة لحلول الزجاج والألمنيوم العصرية",
  },
  {
    icon: Target,
    title: "مهمتنا",
    desc: "تقديم أعمال استثنائية تجمع بين الجودة والأسعار المنافسة والالتزام بالمواعيد",
  },
  {
    icon: Award,
    title: "قيمنا",
    desc: "الشفافية، الإتقان، الابتكار، ورضا العميل هي أساس كل ما نقوم به",
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 bg-white scroll-mt-[92px] overflow-hidden"
    >
      {/* خلفية فاخرة ناعمة + هالات */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -right-10 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.10]"
          style={{
            background:
              "conic-gradient(from 180deg, var(--accent), transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-24 w-[460px] h-[460px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(19,3,66,0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionTitle tag="من نحن" title="استرجاع فني للمقاولات" />

        {/* إطار علوي رفيع بلون العلامة */}
        <div className="mx-auto mb-10 h-[3px] w-32 rounded-full bg-gradient-to-r from-[var(--accent)] via-[#ffd700] to-[var(--accent)] opacity-90" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((it, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="
                group relative p-8 rounded-3xl
                bg-white/90 backdrop-blur
                border border-neutral-200/70
                shadow-[0_10px_30px_rgba(19,3,66,0.08)]
                transition-all duration-300
                hover:border-[var(--accent)]/60
                hover:shadow-[0_20px_40px_rgba(19,3,66,0.14)]
                overflow-hidden
              "
            >
              {/* لمعة محيطية على الهوفر */}
              <span
                aria-hidden
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(241,254,43,0.35), rgba(19,3,66,0.15))",
                  filter: "blur(10px)",
                }}
              />

              {/* رأس بطاقة مزخرف بخط مائل خفي */}
              <div
                className="absolute -top-12 -right-10 w-48 h-48 rotate-12 rounded-3xl opacity-[0.06] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand), var(--accent))",
                }}
              />

              {/* أيقونة — نفس الأيقونات، بادج فاخر */}
              <div
                className="
                  relative inline-flex p-4 rounded-2xl mb-4
                  text-[var(--accent)]
                  ring-1 ring-black/5
                  transition-transform duration-300
                  group-hover:scale-[1.05]
                "
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand), var(--brand2))",
                  boxShadow:
                    "0 10px 24px rgba(19,3,66,0.20), inset 0 -1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <it.icon className="h-8 w-8" strokeWidth={2.5} />
              </div>

              {/* عنوان — نفس النص */}
              <h3 className="text-xl font-black text-[var(--brand)] mb-3 leading-[1.25] tracking-tight">
                {it.title}
              </h3>

              {/* وصف — نفس النص */}
              <p className="text-gray-700 leading-relaxed">{it.desc}</p>

              {/* خط سفلي أنيق */}
              <div className="mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-[var(--accent)] to-transparent opacity-80" />

              {/* حد داخلي شفاف على الهوفر */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-hover:ring-1 group-hover:ring-[var(--accent)]/30 transition-[ring-width,box-shadow] duration-300"
              />

              {/* زر تفاصيل (اختياري شكلي) */}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
