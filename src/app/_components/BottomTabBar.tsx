"use client";

function smoothScrollTo(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const header = document.querySelector("header") as HTMLElement | null;
  const headerH = header?.offsetHeight ?? 0;
  const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 12);
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function BottomTabBar() {
  const tabs = [
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
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t-2 border-gray-100 shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-5 h-20 px-2">
        {tabs.map((t, i) => (
          <a
            key={i}
            href={t.href}
            onClick={(e) => {
              if (t.href.startsWith("#")) {
                e.preventDefault();
                smoothScrollTo(t.href);
              }
            }}
            className={`grid place-items-center gap-1 rounded-2xl active:scale-95 transition-all ${
              t.highlight ? "text-[var(--brand)]" : "text-gray-600"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
            </svg>
            <span className="text-[10px] font-bold">{t.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
