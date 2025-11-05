// src/components/OnePageContracting.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Phone, MapPin, ShieldCheck, Sparkles, Camera,
  Building2, PanelsTopLeft, Layers, Cog, Send, Mail,
  Zap, Award, Target, Users, ArrowRight, X, Menu,
  ChevronDown, Eye, CheckCircle2
} from "lucide-react";

/* =========================================================
   OnePageContracting — Ultra Pro (RB Font + Fixes)
   - Navbar underline متزامن مع القسم الحالي (Scrollspy)
   - عناوين غير مقصوصة (leading + padding + scroll-mt)
   - Variants بدون أخطاء TS
   ========================================================= */

const LOGO = "https://cdn.salla.sa/Azrxzp/4uiYHPtMtTcEEFby6FaiRwtxdSAN7CBVVF5AqQlL.png";
const RB_FONT = "https://sanint.sirv.com/zyros_natinonal_day_font/RB%20Font.ttf";

const GALLERY_IMAGES = [
  { id: 1, category: "glass",    label: "واجهة زجاج — 01", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afd4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
  { id: 2, category: "aluminum", label: "واجهات ألمنيوم — 02", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afd4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
  { id: 3, category: "security", label: "أنظمة أمنية — 03", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afd4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
  { id: 4, category: "glass",    label: "واجهة زجاج — 04", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afd4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
  { id: 5, category: "aluminum", label: "واجهات ألمنيوم — 05", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afd4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
  { id: 6, category: "glass",    label: "واجهة زجاج — 06", src: "https://cdn.salla.sa/Azrxzp/c8e90168-4431-4863-afد4-c4718b87132c-1000x1000-nri2jxXGQXZ5jf5vkuOnvvIGOmMxZJetOcQ6T0EG.jpg" },
];

/* ===== Smooth anchor scroll with header offset ===== */
function smoothScrollTo(hash: string, opts?: { offset?: number; delay?: number; closeMenu?: () => void }) {
  if (typeof window === "undefined") return;
  const { offset = 12, delay = 0, closeMenu } = opts || {};
  const run = () => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const header = document.querySelector("header") as HTMLElement | null;
    const headerH = header?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + offset);
    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  if (closeMenu) closeMenu();
  if (delay > 0) setTimeout(run, delay); else run();
}

/* ===== Progress bar (Top) ===== */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[60]"
    />
  );
}

/* ===== Before/After Slider ===== */
function BeforeAfterSlider({ src, label }: { src: string; label: string }) {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      <img src={src} alt={`${label} (قبل)`} className="w-full h-[340px] object-cover grayscale contrast-110 brightness-110" loading="lazy" />
      <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={src} alt={`${label} (بعد)`} className="w-full h-[340px] object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute -translate-x-1/2 h-full w-0.5 bg-white/80" />
        <button
          aria-label="تحريك مقارنة قبل/بعد"
          onMouseDown={(e) => {
            const el = (e.currentTarget.parentElement?.parentElement as HTMLElement);
            if (!el) return;
            const onMove = (ev: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = Math.min(Math.max(ev.clientX - rect.left, 0), rect.width);
              setPos(Math.round((x / rect.width) * 100));
            };
            const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          className="absolute -translate-x-1/2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-[var(--brand)] shadow-lg border border-gray-200 grid place-items-center"
        >
          ↔
        </button>
      </div>
    </div>
  );
}

/* ============== Variants (TS-safe) ============== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function SectionTitle({ tag, title, center = true }: { tag: string; title: string; center?: boolean }) {
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
      {/* زيادة line-height و padding لمنع القصّ */}
      <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] bg-clip-text text-transparent leading-[1.25] pb-1">
        {title}
      </h2>
    </motion.div>
  );
}

/* ============== Header ============== */
function Header({
  mobileMenuOpen, setMobileMenuOpen, scrollYProgress, activeSection, onQuote
}: {
  mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void; scrollYProgress: any; activeSection: string; onQuote: () => void;
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => setScrolled(v > 0.05));
    return () => unsub();
  }, [scrollYProgress]);

  const navLinks = [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "من نحن" },
    { href: "#services", label: "خدماتنا" },
    { href: "#gallery", label: "الأعمال" },
    { href: "#contact", label: "تواصل" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] border-b border-black/5" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); smoothScrollTo('#home'); }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-[var(--accent)] group-hover:opacity-100 transition-opacity" />
              <div className="relative h-11 w-11 rounded-2xl bg-white ring-2 ring-[var(--accent)] grid place-items-center shadow-md overflow-hidden">
                <img src={LOGO} alt="الشعار" className="h-9 w-9 object-contain" />
              </div>
            </div>
            <div>
              <span className="font-black text-lg md:text-xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] bg-clip-text text-transparent">استرجاع فني</span>
              <div className="text-[10px] text-gray-500 font-medium -mt-1">للمقاولات والتصميم</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            {navLinks.map((l, i) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href); }}
                  className={`relative group transition-colors ${isActive ? "text-[var(--brand)]" : "text-gray-700 hover:text-[var(--brand)]"}`}
                >
                  {l.label}
                  {/* تحت هنا التصحيح: العرض مرتبط بالحالة */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onQuote}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: .97 }}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="h-4 w-4" /> استشارة فورية
            </motion.button>
            <button aria-label="قائمة الجوال" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="pt-24 px-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href, { closeMenu: () => setMobileMenuOpen(false), delay: 220 }); }}
                  className="block py-4 text-xl font-bold border-b border-gray-100 text-gray-800 hover:text-[var(--brand)]"
                >
                  {l.label}
                </motion.a>
              ))}
              <button onClick={() => { setMobileMenuOpen(false); }} className="w-full mt-6 h-12 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-bold shadow-md">استشارة فورية</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============== Hero ============== */
function HeroSection({ opacity, scale, onQuote }: { opacity: any; scale: any; onQuote: () => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0">
      {/* خلفيات خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[var(--accent)] rounded-full blur-[140px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-[var(--brand)] rounded-full blur-[140px] opacity-10" />
      </div>

      <motion.div style={{ opacity, scale }} className="absolute inset-0 pointer-events-none will-change-transform">
        <div className="absolute top-20 right-10 w-20 h-20 border-4 border-[var(--accent)] rounded-3xl rotate-12" />
        <div className="absolute bottom-40 left-10 w-16 h-16 bg-[var(--brand)] rounded-2xl rotate-45 opacity-10" />
        <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-[var(--brand)]/70 rounded-full opacity-20" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.span initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: .15 }} className="inline-block px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--brand)] text-sm font-black mb-6 shadow">
              ✨ التميز في كل تفصيلة
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.15] pb-1 mb-6">
              <span className="block bg-gradient-to-l from-[var(--brand)] via-[var(--brand2)] to-[var(--brand)] bg-clip-text text-transparent">جودة تُرى.</span>
              <span className="block mt-2 text-gray-800">تفاصيل تُحس.</span>
              <span className="block mt-2 bg-gradient-to-r from-[var(--accent)] via-[#ffd700] to-[var(--accent)] bg-clip-text text-transparent">تنفيذ يسبق التوقعات.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              ننفّذ أعمال الزجاج والألمنيوم والأنظمة الأمنية بذائقة عصرية وجودة عالية — من الفكرة إلى التسليم.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a href="#services" onClick={(e) => { e.preventDefault(); smoothScrollTo('#services'); }} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: .98 }} className="group relative px-8 py-4 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-white font-bold shadow-md hover:shadow-lg transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">استكشف خدماتنا <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform"/></span>
              </motion.a>

              <motion.button onClick={onQuote} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: .98 }} className="px-8 py-4 rounded-2xl border-2 border-[var(--brand)] text-[var(--brand)] font-bold hover:bg-[var(--brand)] hover:text-white transition-all">
                استشارة مجانية
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { icon: ShieldCheck, text: "التزام بالمواعيد" },
                { icon: Award,       text: "دقة في التفاصيل" },
                { icon: Target,      text: "خامات معتمدة" },
              ].map((it, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .25 + i * 0.08 }} className="flex items-center gap-2 text-gray-700">
                  <div className="p-2 rounded-lg bg-[var(--accent)]/20"><it.icon className="h-4 w-4 text-[var(--brand)]" /></div>
                  <span className="font-semibold">{it.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .7, delay: .2 }} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] rounded-[3rem] blur-3xl opacity-15" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-[3rem] p-8 shadow-2xl border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                {[Camera, Building2, Layers, PanelsTopLeft, Cog, Zap].map((Icon, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .35 + i * 0.08 }} whileHover={{ scale: 1.06, rotate: 3 }} className="aspect-square rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all grid place-items-center">
                    <Icon className="h-8 w-8 text-[var(--brand)]" />
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }} className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] text-sm font-black shadow">
                ⚡ تنفيذ فائق
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a href="#about" onClick={(e) => { e.preventDefault(); smoothScrollTo('#about'); }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 hover:text-[var(--brand)] transition-colors">
        <span className="text-sm font-medium">تعرف علينا</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* ============== About ============== */
function AboutSection() {
  return (
    // scroll-mt حسب ارتفاع الهيدر ~ 80-90px
    <section id="about" className="py-16 md:py-24 bg-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="من نحن" title="استرجاع فني للمقاولات" />

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Eye,    title: "رؤيتنا",  desc: "أن نكون الخيار الأول في المملكة لحلول الزجاج والألمنيوم العصرية" },
            { icon: Target, title: "مهمتنا",  desc: "تقديم أعمال استثنائية تجمع بين الجودة والأسعار المنافسة والالتزام بالمواعيد" },
            { icon: Award,  title: "قيمنا",   desc: "الشفافية، الإتقان، الابتكار، ورضا العميل هي أساس كل ما نقوم به" },
          ].map((it, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-[var(--accent)] shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] mb-4">
                <it.icon className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-[var(--brand)] mb-3 leading-[1.25] pb-0.5">{it.title}</h3>
              <p className="text-gray-600 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Services ============== */
function ServicesSection({ activeService, setActiveService }: { activeService: string; setActiveService: (id: string) => void }) {
  const services = [
    { id: "glass",     title: "الزجاج",    icon: PanelsTopLeft, items: ["واجهات زجاجية", "أبواب زجاج", "فواصل مكتبية", "كبائن شاور"] },
    { id: "aluminum",  title: "الألمنيوم", icon: Building2,     items: ["نوافذ ألمنيوم", "أبواب أمنية", "واجهات كلادينج", "درابزينات"] },
    { id: "security",  title: "الأمن",     icon: ShieldCheck,   items: ["كاميرات مراقبة", "أنظمة إنذار", "بوابات إلكترونية", "أنظمة تحكم"] },
    { id: "smart",     title: "ذكي",       icon: Zap,           items: ["أنظمة ذكية", "إضاءة تلقائية", "تحكم صوتي", "تكامل منزلي"] },
  ];
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="خدماتنا" title="حلول متكاملة لكل احتياجاتك" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const active = activeService === s.id;
            return (
              <motion.button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveService(s.id)}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group text-left cursor-pointer p-8 rounded-3xl transition-all ${
                  active
                    ? "bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-white shadow-xl"
                    : "bg-white border-2 border-gray-100 hover:border-[var(--accent)] shadow-sm hover:shadow-lg"
                }`}
              >
                <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                  active ? "bg-[var(--accent)] text-[var(--brand)]" : "bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)]"
                }`}>
                  <s.icon className="h-8 w-8" strokeWidth={2.5} />
                </div>
                <h3 className={`text-2xl font-black mb-4 leading-[1.25] pb-0.5 ${active ? "text-[var(--accent)]" : "text-[var(--brand)]"}`}>{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((it, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className={`h-4 w-4 ${active ? "text-[var(--accent)]" : "text-[var(--brand)]"}`} />
                      <span className={active ? "text-gray-50" : "text-gray-600"}>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== Gallery ============== */
function GallerySection({ activeFilter, setActiveFilter, onOpen }: { activeFilter: string; setActiveFilter: (id: string) => void; onOpen: (img: { src: string; label: string }) => void }) {
  const filters = [
    { id: "all", label: "الكل" },
    { id: "glass", label: "زجاج" },
    { id: "aluminum", label: "ألمنيوم" },
    { id: "security", label: "أمن" },
  ];

  const filtered = activeFilter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(g => g.category === activeFilter);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="معرض الأعمال" title="أعمالنا التي نفخر بها" />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f, i) => {
            const active = activeFilter === f.id;
            return (
              <motion.button key={f.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} transition={{ delay: i * 0.04 }} onClick={() => setActiveFilter(f.id)} className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                active ? "bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] shadow-md" : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[var(--accent)]"
              }`}>
                {f.label}
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <motion.figure key={it.id} layout initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} exit={{ opacity: 0, scale: .95 }} transition={{ delay: i * 0.04 }} className="group relative aspect-square rounded-3xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl border border-white">
                <img src={it.src} alt={it.label} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur text-[var(--brand)] text-xs md:text-sm font-bold shadow">
                  {it.label}
                </figcaption>
                <button aria-label="تكبير الصورة" onClick={() => onOpen({ src: it.src, label: it.label })} className="absolute inset-0" />
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============== Lightbox ============== */
function Lightbox({ photo, onClose }: { photo: { src: string; label: string } | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: .9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .9, y: 10 }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={photo.src} alt={photo.label} className="w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl ring-2 ring-[var(--accent)] bg-white" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-[var(--brand)] text-xs font-bold shadow-sm">{photo.label}</div>
            <button aria-label="إغلاق" onClick={onClose} className="absolute -top-3 -right-3 h-10 w-10 rounded-full grid place-items-center bg-white text-[var(--brand)] shadow-lg">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============== Contact ============== */
function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="تواصل معنا" title="ابدأ مشروعك اليوم" />

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <form className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="الاسم الكامل" className="h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none text-lg font-medium transition-all" />
                <input type="tel" placeholder="رقم الجوال" className="h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none text-lg font-medium transition-all" />
              </div>
              <input type="email" placeholder="البريد الإلكتروني" className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none text-lg font-medium mb-6 transition-all" />
              <textarea placeholder="أخبرنا عن مشروعك..." rows={6} className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none text-lg font-medium mb-6 transition-all resize-none" />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: .99 }} className="w-full h-14 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-black text-lg shadow-md hover:shadow-lg transition-all grid place-items-center gap-3">
                <Send className="h-5 w-5" /> إرسال الطلب
              </motion.button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: Phone, title: "اتصل بنا", content: "+966 50 000 0000", href: "tel:+966500000000", gradient: "from-green-500 to-emerald-500" },
              { icon: Mail,  title: "راسلنا",   content: "info@istrjaa.com",   href: "mailto:info@istrjaa.com", gradient: "from-blue-500 to-cyan-500" },
              { icon: MapPin,title: "موقعنا",   content: "الرياض، المملكة العربية السعودية", href: "#", gradient: "from-purple-500 to-pink-500" },
            ].map((it, i) => (
              <motion.a key={i} href={it.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.03, y: -3 }} className="block p-6 rounded-3xl bg-white border-2 border-gray-100 hover:border-[var(--accent)] shadow-sm hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${it.gradient} text-white group-hover:scale-110 transition-transform`}>
                    <it.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-[var(--brand)] mb-1">{it.title}</div>
                    <div className="text-gray-600 font-medium">{it.content}</div>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.a href="https://wa.me/966500000000" whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className="block w-full h-14 rounded-2xl bg-[#25D366] text-white font-black text-lg shadow-md hover:shadow-lg transition-all grid place-items-center gap-3">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/><path d="M12.051 24h-.004A9.87 9.87 0 016.99 22.62l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.14 11.1C2.14 5.65 6.576 1.215 12.03 1.215a9.83 9.83 0 016.99 2.898 9.83 9.83 0 012.898 6.99c0 5.45-4.44 9.897-9.867 9.897z"/></svg>
              راسلنا واتساب
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============== Bottom Tab (Mobile) ============== */
function BottomTabBar() {
  const tabs = [
    { href: "#home",     label: "الرئيسية", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { href: "#services", label: "خدماتنا",  icon: "M4 6h16M4 12h16M4 18h7" },
    { href: "https://wa.me/966500000000", label: "واتساب", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", highlight: true as const },
    { href: "tel:+966500000000", label: "اتصال", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" },
    { href: "#contact",  label: "تواصل",   icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
  ];

  return (
    <motion.nav initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t-2 border-gray-100 shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-5 h-20 px-2">
        {tabs.map((t, i) => (
          <a key={i} href={t.href} onClick={(e) => { if (t.href.startsWith("#")) { e.preventDefault(); smoothScrollTo(t.href); } }} className={`grid place-items-center gap-1 rounded-2xl active:scale-95 transition-all ${t.highlight ? "text-[var(--brand)]" : "text-gray-600"}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
            </svg>
            <span className="text-[10px] font-bold">{t.label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

/* ============== Footer ============== */
function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-br from-[var(--brand)] via-[#1a0850] to-[var(--brand)] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white ring-2 ring-[var(--accent)] grid place-items-center overflow-hidden">
              <img src={LOGO} alt="الشعار" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <div className="font-black text-lg text-[var(--accent)]">استرجاع فني</div>
              <div className="text-xs text-gray-300">للمقاولات والتصميم</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <a href="#home" onClick={(e)=>{ e.preventDefault(); smoothScrollTo('#home'); }} className="hover:text-[var(--accent)] transition-colors">الرئيسية</a>
            <span className="text-white/40">•</span>
            <a href="#services" onClick={(e)=>{ e.preventDefault(); smoothScrollTo('#services'); }} className="hover:text-[var(--accent)] transition-colors">خدماتنا</a>
            <span className="text-white/40">•</span>
            <a href="#gallery" onClick={(e)=>{ e.preventDefault(); smoothScrollTo('#gallery'); }} className="hover:text-[var(--accent)] transition-colors">الأعمال</a>
            <span className="text-white/40">•</span>
            <a href="#contact" onClick={(e)=>{ e.preventDefault(); smoothScrollTo('#contact'); }} className="hover:text-[var(--accent)] transition-colors">تواصل</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} استرجاع فني للمقاولات — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}


/* ============== Quick Quote Modal ============== */
function QuickQuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ service: "الزجاج", name: "", phone: "", notes: "" });

  React.useEffect(() => {
    if (!open) { setStep(0); setForm({ service: "الزجاج", name: "", phone: "", notes: "" }); }
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // اربط API هنا لاحقاً
    onClose();
    alert("تم إرسال الطلب. سنتواصل معك قريبًا ✨");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.form
            initial={{ y: 24, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .98 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            onSubmit={submit} onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            <button
              aria-label="إغلاق" type="button" onClick={onClose}
              className="absolute top-3 left-3 h-10 w-10 rounded-full grid place-items-center bg-white text-[var(--brand)] shadow"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl md:text-3xl font-black text-[var(--brand)] mb-4">استشارة فورية</h3>

            {step === 0 && (
              <div className="space-y-4">
                <p className="text-gray-600">اختر نوع الخدمة المطلوبة:</p>
                <div className="grid grid-cols-2 gap-3">
                  {["الزجاج", "الألمنيوم", "الأمن", "ذكي"].map((s) => (
                    <button
                      key={s} type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`h-12 rounded-2xl border-2 font-bold ${
                        form.service === s
                          ? "bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] border-transparent"
                          : "border-gray-200 hover:border-[var(--accent)]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600">اذكر تفاصيل سريعة:</p>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="مثال: واجهة زجاج لمكتب 6×3 م، زجاج سيكوريت، مفصلات ستانلس..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-gray-600">بيانات التواصل:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text" placeholder="الاسم"
                    className="h-12 px-4 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none"
                  />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    type="tel" placeholder="رقم الجوال"
                    className="h-12 px-4 rounded-2xl border-2 border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button" onClick={back} disabled={step === 0}
                className={`h-12 px-4 rounded-2xl border-2 ${
                  step === 0 ? "border-gray-100 text-gray-300 cursor-not-allowed"
                              : "border-gray-200 hover:border-[var(--accent)]"
                }`}
              >
                رجوع
              </button>

              {step < 2 ? (
                <button
                  type="button" onClick={next}
                  className="h-12 px-6 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-bold shadow-md"
                >
                  استمرار
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-12 px-6 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-bold shadow-md"
                >
                  إرسال الطلب
                </button>
              )}
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============== Main Component ============== */
export default function OnePageContracting() {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState("glass");
  const [lightbox, setLightbox] = React.useState<{ src: string; label: string } | null>(null);
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const { scrollYProgress } = useScroll();

  // Hero transforms
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.96]);
  const scale   = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // ScrollSpy
  React.useEffect(() => {
    const ids = ["home", "about", "services", "gallery", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0.15 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-900 selection:bg-[#130342] selection:text-[#f1fe2b] overflow-x-hidden scroll-smooth antialiased"
      style={{
        // ألوان
        // @ts-ignore
        "--brand": "#130342",
        // @ts-ignore
        "--brand2": "#2a1570",
        // @ts-ignore
        "--accent": "#f1fe2b",
        fontFamily: "RBFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      } as React.CSSProperties}
    >
      {/* خط RB Font */}
      <style jsx global>{`
        @font-face {
          font-family: 'RBFont';
          src: url('${RB_FONT}') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
        html, body { font-family: RBFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `}</style>

      <ScrollProgressBar />
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollYProgress={scrollYProgress}
        activeSection={activeSection}
        onQuote={() => setQuoteOpen(true)}
      />

      <HeroSection opacity={opacity} scale={scale} onQuote={() => setQuoteOpen(true)} />
      <AboutSection />
      <ServicesSection activeService={activeService} setActiveService={setActiveService} />
      <GallerySection activeFilter={activeFilter} setActiveFilter={setActiveFilter} onOpen={setLightbox} />

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-[92px]">
        <div className="container mx-auto px-4">
          <SectionTitle tag="قبل / بعد" title="نتيجة التنفيذ على أرض الواقع" />
          <BeforeAfterSlider src={GALLERY_IMAGES[0].src} label="واجهة زجاج" />
        </div>
      </section>

      <ContactSection />

      {/* فراغ أسفل لشريط الجوال */}
      <div className="h-20 md:hidden" />
      <BottomTabBar />
      <Footer />

      {/* Modals */}
      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
      <QuickQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      {/* WhatsApp Floating (Desktop) */}
      <a
        href="https://wa.me/966500000000"
        className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-3 px-4 h-12 rounded-2xl bg-[#25D366] text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/><path d="M12.051 24h-.004A9.87 9.87 0 016.99 22.62l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.14 11.1C2.14 5.65 6.576 1.215 12.03 1.215a9.83 9.83 0 016.99 2.898 9.83 9.83 0 012.898 6.99c0 5.45-4.44 9.897-9.867 9.897z"/></svg>
        تواصل واتساب
      </a>
    </div>
  );
}
