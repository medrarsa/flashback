"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Phone, X, Menu } from "lucide-react";

export const LOGO = "/images/LOGO.png";

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
    const on = () => setScrolled(window.scrollY > 20);
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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
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
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-[var(--accent)] group-hover:opacity-100 transition-opacity" />
              <div className="relative h-11 w-11 rounded-2xl bg-white ring-2 ring-[var(--accent)] grid place-items-center shadow-md overflow-hidden">
                <img
                  src={LOGO}
                  alt="الشعار"
                  className="h-9 w-9 object-contain"
                  loading="eager"
                  decoding="async"
                  width={48}
                  height={48}
                  fetchPriority="high"
                />
              </div>
            </div>
            <div>
              <span className="font-black text-lg md:text-xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] bg-clip-text text-transparent">
                استرجاع فني
              </span>
              <div className="text-[10px] text-gray-500 font-medium -mt-1">
                للمقاولات والتصميم
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            {links.map((l) => {
              const id = l.href.slice(1) as typeof activeSection;
              const isActive = activeSection === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(id);
                    smoothScrollTo(l.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative group ${
                    isActive
                      ? "text-[var(--brand)]"
                      : "text-gray-700 hover:text-[var(--brand)]"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onQuote}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] text-sm font-bold shadow-md hover:shadow-lg"
            >
              <Phone className="h-4 w-4" /> استشارة فورية
            </motion.button>
            <button
              aria-label="قائمة الجوال"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="pt-24 px-6">
            {links.map((l) => {
              const id = l.href.slice(1) as typeof activeSection;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(id);
                    smoothScrollTo(l.href, {
                      closeMenu: () => setMobileMenuOpen(false),
                      delay: 220,
                    });
                  }}
                  className="block py-4 text-xl font-bold border-b border-gray-100 text-gray-800 hover:text-[var(--brand)]"
                >
                  {l.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuote();
              }}
              className="w-full mt-6 h-12 rounded-2xl bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] font-bold shadow-md"
            >
              استشارة فورية
            </button>
          </div>
        </div>
      )}
    </>
  );
}
