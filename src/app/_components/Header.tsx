// app/_components/Header.tsx
"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Menu, Sparkles } from "lucide-react";

export const LOGO = "/images/LOGO.png";

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

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  onQuote,
  onNav,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: "home" | "about" | "services" | "gallery" | "contact";
  onQuote: () => void;
  onNav: (id: "home" | "about" | "services" | "gallery" | "contact") => void;
}) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "من نحن" },
    { href: "#services", label: "خدماتنا" },
    { href: "#gallery", label: "الأعمال" },
    { href: "#contact", label: "تواصل" },
  ] as const;

  /* ===== ألوان المشروع (تأكد أنها موجودة في :root) =====
    :root {
      --brand: #130342;
      --brand2: #3e1ca6;
      --accent: #f1fe2b;
    }
  */

  return (
    <>
      {/* هالة ثلجية تحت الهيدر */}
      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-40 transition-opacity duration-300 pointer-events-none ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto h-28 w-[90%] max-w-6xl blur-2xl rounded-full bg-gradient-to-r from-white/40 via-white/20 to-white/40" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className="mx-auto container px-3 md:px-4 mt-2 md:mt-3">
          <div
            className={[
              "h-16 md:h-[4.5rem] rounded-2xl md:rounded-3xl",
              "border border-white/40",
              "bg-white/55 md:bg-white/45",
              "backdrop-blur-xl",
              "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]",
              "ring-1 ring-black/5",
              "transition-all duration-300",
            ].join(" ")}
            style={{
              backgroundImage:
                "radial-gradient(80px 40px at 10% 10%, rgba(255,255,255,0.6), transparent 60%), radial-gradient(100px 60px at 90% 20%, rgba(255,255,255,0.5), transparent 60%)",
            }}
          >
            <nav className="h-full flex items-center justify-between gap-4 px-3 md:px-6">
              {/* Logo */}
              <a
                href="#home"
                className="flex items-center gap-3 group"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("home");
                  smoothScrollTo("#home");
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-60 bg-[var(--accent)] group-hover:opacity-90 transition-opacity" />
                  <div className="relative h-11 w-11 md:h-12 md:w-12 rounded-2xl bg-white/90 ring-2 ring-[var(--accent)] grid place-items-center shadow-md overflow-hidden">
                    <img
                      src={LOGO}
                      alt="الشعار"
                      className="h-9 w-9 md:h-10 md:w-10 object-contain"
                      loading="eager"
                      decoding="async"
                      width={48}
                      height={48}
                      fetchPriority="high"
                    />
                  </div>
                </div>
                <div className="leading-4">
                  <span className="font-black text-lg md:text-xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] bg-clip-text text-transparent tracking-tight">
                    استرجاع فني
                  </span>
                  <div className="text-[10px] text-gray-500 font-medium -mt-0.5">
                    للمقاولات والتصميم
                  </div>
                </div>
              </a>

              {/* Desktop Nav — مكبّر وواضح */}
              <div className="hidden md:flex items-center gap-2">
                <div className="relative flex items-center gap-1.5 rounded-2xl px-2 py-1 bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm">
                  {links.map((l) => {
                    const id = l.href.slice(1) as typeof activeSection;
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={l.href}
                        onClick={() => {
                          onNav(id);
                          smoothScrollTo(l.href);
                        }}
                        className={[
                          "relative px-4 py-2 rounded-xl",
                          // الحجم مكبر: base → 17px → 18px على الشاشات الكبيرة
                          "text-base md:text-[17px] lg:text-[18px] font-extrabold tracking-tight",
                          "transition-all",
                          "hover:text-[var(--brand)]",
                          isActive ? "text-[var(--brand)]" : "text-gray-800",
                        ].join(" ")}
                      >
                        <span className="relative z-10">{l.label}</span>
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              layoutId="nav-active-pill"
                              className="absolute inset-0 rounded-xl bg-white/80 ring-1 ring-black/5 shadow-sm"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA + Mobile Menu */}
              <div className="flex items-center gap-2 md:gap-3">
                <motion.button
                  onClick={onQuote}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] text-sm font-extrabold shadow-md hover:shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  استشارة فورية
                </motion.button>

                <button
                  aria-label="قائمة الجوال"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl bg-white/70 border border-white/60 backdrop-blur hover:bg-white/90 transition"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu (مكبّر الخط أيضاً) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(2px 2px at 20% 20%, rgba(255,255,255,0.7) 50%, transparent 51%), radial-gradient(2px 2px at 80% 10%, rgba(255,255,255,0.6) 50%, transparent 51%)",
                backgroundSize: "16px 16px",
                opacity: 0.35,
              }}
            />

            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative pt-24 px-6"
            >
              <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-xl overflow-hidden">
                <div className="p-2">
                  {links.map((l, i) => {
                    const id = l.href.slice(1) as typeof activeSection;
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={l.href}
                        onClick={() => {
                          onNav(id);
                          smoothScrollTo(l.href, {
                            closeMenu: () => setMobileMenuOpen(false),
                            delay: 220,
                          });
                        }}
                        className={[
                          "w-full text-right px-5 py-4", // مساحة تنفّس
                          "text-xl font-extrabold tracking-tight", // تكبير واضح للموبايل
                          "transition-colors",
                          isActive
                            ? "text-[var(--brand)] bg-white/90"
                            : "text-gray-900 hover:text-[var(--brand)]",
                          i !== links.length - 1
                            ? "border-b border-white/70"
                            : "",
                        ].join(" ")}
                      >
                        {l.label}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onQuote();
                    }}
                    className="w-full h-12 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-extrabold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    استشارة فورية
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
