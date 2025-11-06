// app/page.tsx
"use client";
import * as React from "react";

import ScrollProgressBar from "./_components/ScrollProgressBar";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import ServicesSection from "./_components/ServicesSection";
import GallerySection from "./_components/GallerySection";
import BeforeAfterSlider from "./_components/BeforeAfterSlider";
import ContactSection from "./_components/ContactSection";
import BottomTabBar from "./_components/BottomTabBar";
import Footer from "./_components/Footer";
import Lightbox from "./_components/Lightbox";

type SectionId = "home" | "about" | "services" | "gallery" | "contact";

const RB_FONT =
  "https://sanint.sirv.com/zyros_natinonal_day_font/RB%20Font.ttf";

export default function Page() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState("glass");
  const [photo, setPhoto] = React.useState<{
    src: string;
    label: string;
  } | null>(null);

  // الحالة التي تتحكم في underline
  const [activeSection, setActiveSection] = React.useState<SectionId>("home");

  // ========= ScrollSpy يعتمد على أقرب قسم لمركز الشاشة =========
  React.useEffect(() => {
    const ids: SectionId[] = [
      "home",
      "about",
      "services",
      "gallery",
      "contact",
    ];
    let ticking = false;

    const header = document.querySelector("header") as HTMLElement | null;
    const headerH = () => header?.offsetHeight ?? 0;

    const measure = () => {
      // نقطة القياس (وسط الشاشة مع طرح ارتفاع الهيدر)
      const mid = window.scrollY + window.innerHeight / 2 - headerH();

      let nearest: { id: SectionId; dist: number } | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + el.offsetHeight;
        const center = (top + bottom) / 2;
        const dist = Math.abs(center - mid);
        if (!nearest || dist < nearest.dist) nearest = { id, dist };
      }

      if (nearest) setActiveSection(nearest.id);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    // أول مرة + scroll + resize
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // sync مع زر الرجوع/التقدم (hashchange)
  React.useEffect(() => {
    const onHash = () => {
      const id = (location.hash.replace("#", "") || "home") as SectionId;
      if (["home", "about", "services", "gallery", "contact"].includes(id)) {
        setActiveSection(id);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-900 selection:bg-[#130342] selection:text-[#f1fe2b] overflow-x-hidden scroll-smooth antialiased"
      style={
        {
          // @ts-ignore
          "--brand": "#130342",
          // @ts-ignore
          "--brand2": "#2a1570",
          // @ts-ignore
          "--accent": "#f1fe2b",
          fontFamily:
            "RBFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        } as React.CSSProperties
      }
    >
      {/* خط RB */}
      <style jsx global>{`
        @font-face {
          font-family: "RBFont";
          src: url("${RB_FONT}") format("truetype");
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
        html,
        body {
          font-family: RBFont, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }
      `}</style>
      <ScrollProgressBar />
      {/* onNav يحدّث underline فوري عند النقر */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        onQuote={() => {}}
        onNav={(id) => setActiveSection(id)}
      />
      {/* الأقسام (تأكد أن كل مكوّن داخله <section id="..."> الصحيح) */}
      <HeroSection onQuote={() => {}} /> {/* id="home" */}
      <AboutSection /> {/* id="about" */}
      <ServicesSection
        activeService={activeService}
        setActiveService={setActiveService}
      />{" "}
      {/* id="services" */}
      <GallerySection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onOpen={setPhoto}
      />{" "}
      {/* id="gallery" */}
      {/* كتلة قبل/بعد مستقلة */}
      <ContactSection /> {/* id="contact" */}
      {/* مسافة لشريط الجوال */}
      <div className="md:hidden h-[calc(80px+env(safe-area-inset-bottom))]" />
      <BottomTabBar />
      <Footer />
      {/* Lightbox */}
      <Lightbox photo={photo} onClose={() => setPhoto(null)} />
    </div>
  );
}
