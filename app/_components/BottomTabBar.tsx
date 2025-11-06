"use client";

import * as React from "react";

/* ===== Helpers ===== */
function smoothScrollTo(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const header = document.querySelector("header") as HTMLElement | null;
  const headerH = header?.offsetHeight ?? 0;
  const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 12);
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* راصد السكشن النشط */
function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");
  React.useEffect(() => {
    if (typeof window === "undefined" || !ids.length) return;
    const ios: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0.2, 0.5] }
      );
      io.observe(el);
      ios.push(io);
    });
    return () => ios.forEach((o) => o.disconnect());
  }, [ids, offset]);
  return active;
}

type Tab = { href: string; label: string; icon: string; highlight?: boolean };

export default function BottomTabBar() {
  const tabs: Tab[] = [
    {
      href: "#home",
      label: "الرئيسية",
      icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    },
    { href: "#services", label: "خدماتنا", icon: "M4 6h16M4 12h16M4 18h7" },
    {
      href: "https://wa.me/966500000000",
      label: "واتساب",
      icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
      highlight: true,
    },
    {
      href: "tel:+966500000000",
      label: "اتصال",
      icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    },
    {
      href: "#contact",
      label: "تواصل",
      icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    },
  ];

  const anchors = tabs.map((t) => t.href).filter((h) => h.startsWith("#"));
  const active = useActiveSection(anchors);

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-[60] md:hidden pointer-events-none"
    >
      <div className="mx-auto max-w-screen-sm px-3 pb-[env(safe-area-inset-bottom)] pointer-events-auto">
        {/* حاوية مقصوصة بالكامل لتفادي أي بروز حواف */}
        <div className="relative rounded-[22px] overflow-hidden isolate">
          {/* الخلفية الثلجية: بدون أي لمعة فوق واتساب، وتدرّجات خفيفة جداً */}
          <div
            className="
              absolute inset-0
              bg-white/40 backdrop-blur-xl
              after:absolute after:inset-0
              after:bg-[linear-gradient(to_top,rgba(0,0,0,0.05),transparent)]
            "
            aria-hidden="true"
          />
          {/* حدّ خفيف موحّد داخل القصّ */}
          <div
            className="absolute inset-0 ring-1 ring-white/35"
            aria-hidden="true"
          />

          {/* المحتوى */}
          <div className="relative grid grid-cols-5 h-20">
            {tabs.map((t, i) => {
              const isAnchor = t.href.startsWith("#");
              const isActive = isAnchor && active === t.href;

              return (
                <a
                  key={i}
                  href={t.href}
                  aria-label={t.label}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (isAnchor) {
                      e.preventDefault();
                      smoothScrollTo(t.href);
                    }
                  }}
                  className={[
                    "flex flex-col items-center justify-center gap-1",
                    "transition-all select-none",
                    "active:scale-[0.97] focus:outline-none",
                    "text-slate-700",
                  ].join(" ")}
                >
                  {/* أيقونة — واتساب ستروك ثابت بدون لمعة/نبض */}
                  <svg
                    className={[
                      "h-6 w-6 transition-transform",
                      isActive ? "scale-110" : "scale-100",
                    ].join(" ")}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={t.highlight ? "#24CC66" : "currentColor"}
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={t.icon}
                    />
                  </svg>

                  {/* لابل */}
                  <span
                    className={[
                      "text-[10px] font-semibold tracking-wide",
                      isActive ? "text-slate-900" : "text-slate-700",
                    ].join(" ")}
                  >
                    {t.label}
                  </span>

                  {/* مؤشر Active خطّي تحت الأيقونة */}
                  <span
                    className={[
                      "mt-0.5 h-[3px] w-5 rounded-full transition-all",
                      isActive
                        ? "bg-[var(--accent,#f1fe2b)]"
                        : "bg-transparent",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
