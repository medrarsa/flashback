"use client";
import * as React from "react";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Target,
  ArrowRight,
} from "lucide-react";

/* ===== Smooth Scroll ===== */
function smoothScrollTo(
  hash: string,
  opts?: { offset?: number; delay?: number; closeMenu?: () => void }
) {
  if (typeof window === "undefined") return;
  const { offset = 12, delay = 0, closeMenu } = opts || {};
  const run = () => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const header = document.querySelector("header") as HTMLElement | null;
    const headerH = header?.offsetHeight ?? 0;
    const y =
      el.getBoundingClientRect().top + window.scrollY - (headerH + offset);
    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  if (closeMenu) closeMenu();
  delay ? setTimeout(run, delay) : run();
}

/* ===== Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
} as const;

/* ===================== Slider (Fade — لا ترانسليت) ===================== */
function FadeSlider({ images }: { images: string[] }) {
  const norm = (s: string) => (s.startsWith("/") ? s : `/${s}`);
  const slides = React.useMemo(() => images.map(norm), [images]);
  const [idx, setIdx] = React.useState(0);
  const total = slides.length;

  React.useEffect(() => {
    slides.forEach((src) => {
      const im = new Image();
      im.src = src;
    });
  }, [slides]);

  React.useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % total), 4200);
    return () => clearInterval(t);
  }, [total]);

  const next = () => setIdx((p) => (p + 1) % total);
  const prev = () => setIdx((p) => (p - 1 + total) % total);

  return (
    <div className="relative">
      {/* شريط التقدم */}
      <div className="slider-bar absolute top-0 left-0 w-full">
        <div key={idx} className="fill" />
      </div>

      {/* إطار فاخر + ماسك لطيف */}
      <div className="relative aspect-[16/10] overflow-hidden frame-lux mask-soft">
        {/* بريق خفيف */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[radial-gradient(600px_120px_at_80%_0%,rgba(241,254,43,0.5),transparent_70%)]" />
        {/* صور متراكبة بفيد */}
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i + 1}`}
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {/* الأسهم */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3">
        <button
          onClick={prev}
          aria-label="prev"
          className="grid place-items-center h-11 w-11 rounded-full bg-white/85 backdrop-blur border border-white/70 shadow hover:bg-white transition will-change-transform hover:-translate-x-0.5"
        >
          <ChevronRight className="h-5 w-5 text-[var(--brand)]" />
        </button>
        <button
          onClick={next}
          aria-label="next"
          className="grid place-items-center h-11 w-11 rounded-full bg-white/85 backdrop-blur border border-white/70 shadow hover:bg-white transition will-change-transform hover:translate-x-0.5"
        >
          <ChevronLeft className="h-5 w-5 text-[var(--brand)]" />
        </button>
      </div>

      {/* النقاط */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`go-${i + 1}`}
            className={`dot-genz ${idx === i ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ===================== HeroSection ===================== */
export default function HeroSection({ onQuote }: { onQuote: () => void }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.96]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  const gallery = [
    "/images/door/1.JPG",
    "/images/cladding/3.JPG",
    "/images/structure/3.JPG",
    "/images/glass_facades/1.JPG",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
    >
      {/* خلفية فاخرة ناعمة */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div className="absolute top-24 right-10 w-24 h-24 border-4 border-[var(--accent)]/90 rounded-3xl rotate-12" />
          <div className="absolute bottom-40 left-10 w-16 h-16 bg-[var(--brand)] rounded-2xl rotate-45 opacity-10" />
          <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-[var(--brand)]/60 rounded-full opacity-20" />
          <div
            className="absolute -left-20 bottom-16 w-[520px] h-[520px] rounded-full opacity-[0.10] blur-3xl"
            style={{
              background:
                "conic-gradient(from 180deg, var(--accent), transparent 65%)",
            }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* السلايدر */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-1 md:order-2"
          >
            {/* هالة ضوء ناعمة */}
            <div
              className="absolute -inset-4 rounded-[3rem] blur-3xl opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand), var(--accent))",
              }}
            />
            <div className="relative rounded-[3rem] overflow-hidden card-genz">
              <FadeSlider images={gallery} />
            </div>
          </motion.div>

          {/* النص */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-block px-4 py-2 rounded-full text-[var(--brand)] text-sm font-black mb-6 shadow"
              style={{
                background: "linear-gradient(90deg, var(--accent), #fffbe6)",
              }}
            >
              ✨ التميز في كل تفصيلة
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.15] pb-1 mb-6">
              <span className="block bg-gradient-to-l from-[var(--brand)] via-[var(--brand2)] to-[var(--brand)] bg-clip-text text-transparent">
                جودة تُرى.
              </span>
              <span className="block mt-2 text-gray-800">تفاصيل تُحس.</span>
              <span className="block mt-2 bg-gradient-to-r from-[var(--accent)] via-[#ffd700] to-[var(--accent)] bg-clip-text text-transparent">
                تنفيذ يسبق التوقعات.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              ننفّذ أعمال الزجاج والألمنيوم والأنظمة الأمنية بذائقة عصرية وجودة
              عالية — من الفكرة إلى التسليم.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#services");
                }}
                className="btn-genz group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  استكشف خدماتنا
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <button onClick={onQuote} className="btn-ghost-genz">
                استشارة مجانية
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { icon: ShieldCheck, text: "التزام بالمواعيد" },
                { icon: Award, text: "دقة في التفاصيل" },
                { icon: Target, text: "خامات معتمدة" },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(241,254,43,0.18)",
                      border: "1px solid rgba(19,3,66,0.08)",
                    }}
                  >
                    <it.icon className="h-4 w-4 text-[var(--brand)]" />
                  </div>
                  <span className="font-semibold">{it.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* سحب للأسفل */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo("#about");
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 hover:text-[var(--brand)] transition-colors"
      >
        <span className="text-sm font-medium">تعرف علينا</span>
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
