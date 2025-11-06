"use client";

export const LOGO = "/images/LOGO.png";

function smoothScrollTo(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const header = document.querySelector("header") as HTMLElement | null;
  const headerH = header?.offsetHeight ?? 0;
  const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 12);
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer
      className="pt-0 bg-gradient-to-br from-[var(--brand)] via-[#1a0850] to-[var(--brand)] text-white"
      style={{ ["--footer-bg" as any]: "var(--brand)" }} // احتياط لو تستعمله بصفحات ثانية
    >
      {/* ===== الخريطة داخل الفوتر ===== */}
      <div className="relative w-full h-[380px] md:h-[520px]">
        {/* شارة زجاجية */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center">
          <div className="pointer-events-auto backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-full px-5 py-2 text-sm font-bold text-[var(--brand)]">
            مواقعنا على الخريطة
          </div>
        </div>

        {/* خريطة قابلة للتضمين */}
        <iframe
          title="موقع استرجاع فني للمقاولات"
          src={
            "https://maps.google.com/maps?" +
            new URLSearchParams({
              q: "مؤسسة استرجاع فني للمقاولات، EDPC2935، 9082 شارع الملك سعود بن عبدالعزيز، 2935، الدمام 32264",
              hl: "ar",
              z: "16",
              t: "m",
              ie: "UTF8",
              iwloc: "",
              output: "embed",
            }).toString()
          }
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* تدرّج سفلي يندمج مع لون الفوتر */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-28"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--footer-bg, #130342) 85%)",
          }}
        />

        {/* زر فتح الخريطة */}
        <a
          href="https://www.google.com/maps?q=%D9%85%D8%A4%D8%B3%D8%B3%D8%A9+%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9+%D9%81%D9%86%D9%8A+%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA%D8%8C+EDPC2935%D8%8C+9082+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D9%85%D9%84%D9%83+%D8%B3%D8%B9%D9%88%D8%AF+%D8%A8%D9%86+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%D8%8C+2935%D8%8C+%D8%A7%D9%84%D8%AF%D9%85%D8%A7%D9%85+32264"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute z-20 left-4 md:left-6 top-4 md:top-6 backdrop-blur-md bg-white/70 hover:bg-white/90 border border-white/60 shadow-xl rounded-full ps-4 pe-3 py-2 text-sm font-bold text-[var(--brand)] transition"
        >
          افتح الخريطة →
        </a>
      </div>

      {/* ===== محتوى الفوتر القديم ===== */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white ring-2 ring-[var(--accent)] grid place-items-center overflow-hidden">
              <img
                src={LOGO}
                alt="الشعار"
                className="h-10 w-10 object-contain"
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
              />
            </div>
            <div>
              <div className="font-black text-lg text-[var(--accent)]">
                استرجاع فني
              </div>
              <div className="text-xs text-gray-300">للمقاولات والتصميم</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            {[
              { href: "#home", label: "الرئيسية" },
              { href: "#services", label: "خدماتنا" },
              { href: "#gallery", label: "الأعمال" },
              { href: "#contact", label: "تواصل" },
            ].map((l, i) => (
              <a
                key={i}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(l.href);
                }}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} استرجاع فني للمقاولات — جميع الحقوق
          محفوظة
        </div>
      </div>
    </footer>
  );
}
