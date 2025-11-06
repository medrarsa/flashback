// app/page.tsx
"use client";
import * as React from "react";

import ScrollProgressBar from "./_components/ScrollProgressBar";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import ServicesSection from "./_components/ServicesSection";
// حذفنا BeforeAfterSlider من الاستيراد
import GallerySection from "./_components/GallerySection";
import ContactSection from "./_components/ContactSection";
import BottomTabBar from "./_components/BottomTabBar";
import Footer from "./_components/Footer";
import Lightbox from "./_components/Lightbox";
import FeaturedAlbums from "./_components/FeaturedAlbums";

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

  const [activeSection, setActiveSection] = React.useState<SectionId>("home");

  React.useEffect(() => {
    const ids: SectionId[] = [
      "home",
      "about",
      "services",
      "gallery",
      "contact",
    ];
    let raf = 0;
    const headerEl = () =>
      document.querySelector("header") as HTMLElement | null;
    const headerH = () => headerEl()?.offsetHeight ?? 0;

    const measure = () => {
      const y = window.scrollY + headerH() + 8;
      let current: SectionId = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };

    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

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
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        onQuote={() => {}}
        onNav={(id) => setActiveSection(id)}
      />
      {/* الأقسام */}
      <HeroSection onQuote={() => {}} /> {/* id="home" */}
      <AboutSection /> {/* id="about" */}
      <ServicesSection
        activeService={activeService}
        setActiveService={setActiveService}
      />{" "}
      {/* id="services" */}
      {/* 🔥 القسم الجديد بدل "نتيجة التنفيذ" */}
      <GallerySection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onOpen={setPhoto}
      />{" "}
      {/* id="gallery" */}
      <ContactSection /> {/* id="contact" */}
      <div className="md:hidden h-[calc(80px+env(safe-area-inset-bottom))]" />
      <BottomTabBar />
      <Footer />
      <Lightbox photo={photo} onClose={() => setPhoto(null)} />
    </div>
  );
}
