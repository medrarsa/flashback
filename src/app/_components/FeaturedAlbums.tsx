// app/_components/FeaturedAlbums.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";

type Photo = { src: string; label: string };

const ease = cubicBezier(0.22, 1, 0.36, 1);

const ALBUMS: Record<
  "bells" | "locks" | "onsite" | "cctv",
  { title: string; items: Photo[] }
> = {
  bells: {
    title: "أجراس",
    items: [
      { src: "/images/albums/bells/1.jpg", label: "جرس باب — موديل A" },
      { src: "/images/albums/bells/2.jpg", label: "جرس ذكي — تركيب جداري" },
      { src: "/images/albums/bells/3.jpg", label: "جرس لاسلكي — مدخل رئيسي" },
      { src: "/images/albums/bells/4.jpg", label: "جرس فيديو — مدخل فيلا" },
      { src: "/images/albums/bells/5.jpg", label: "جرس — شقة سكنية" },
      { src: "/images/albums/bells/6.jpg", label: "جرس — لوحة داخلية" },
    ],
  },
  locks: {
    title: "أقفال ذكية",
    items: [
      { src: "/images/albums/locks/1.jpg", label: "قفل ذكي — بصمة + بلوتوث" },
      { src: "/images/albums/locks/2.jpg", label: "قفل كيباد — باب خارجي" },
      { src: "/images/albums/locks/3.jpg", label: "قفل ذكي — فندق" },
      { src: "/images/albums/locks/4.jpg", label: "قفل ذكي — شقة" },
      { src: "/images/albums/locks/5.jpg", label: "قفل ذكي — إدارة وصول" },
      { src: "/images/albums/locks/6.jpg", label: "قفل — ميكانيكي/إلكتروني" },
    ],
  },
  onsite: {
    title: "صور من المكان",
    items: [
      { src: "/images/albums/onsite/1.jpg", label: "قبل التركيب — صالة" },
      { src: "/images/albums/onsite/2.jpg", label: "أثناء العمل — تمديدات" },
      { src: "/images/albums/onsite/3.jpg", label: "اختبار النظام — موقع A" },
      { src: "/images/albums/onsite/4.jpg", label: "تسليم نهائي — مكتب" },
      {
        src: "/images/albums/onsite/5.jpg",
        label: "تنظيف وترتيب — بعد التنفيذ",
      },
      { src: "/images/albums/onsite/6.jpg", label: "تسليم مفاتيح الوصول" },
    ],
  },
  cctv: {
    title: "كاميرات",
    items: [
      { src: "/images/albums/cctv/1.jpg", label: "كاميرا Dome داخلية" },
      { src: "/images/albums/cctv/2.jpg", label: "كاميرا Bullet خارجية" },
      { src: "/images/albums/cctv/3.jpg", label: "كاميرا PTZ — ساحة" },
      { src: "/images/albums/cctv/4.jpg", label: "تركيب DVR/NVR" },
      { src: "/images/albums/cctv/5.jpg", label: "مشاهدة عبر الجوال" },
      { src: "/images/albums/cctv/6.jpg", label: "تغطية ممرات كاملة" },
      { src: "/images/albums/cctv/7.jpg", label: "تغطية ممرات كاملة" },
    ],
  },
};

export default function FeaturedAlbums({
  onOpen,
}: {
  onOpen: (p: Photo) => void;
}) {
  const [active, setActive] = React.useState<keyof typeof ALBUMS>("bells");

  const tabs: { id: keyof typeof ALBUMS; label: string }[] = [
    { id: "bells", label: "أجراس" },
    { id: "locks", label: "أقفال ذكية" },
    { id: "onsite", label: "صور من المكان" },
    { id: "cctv", label: "كاميرات" },
  ];

  const album = ALBUMS[active];

  return (
    <section
      id="featured-albums"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-[92px]"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-[var(--brand)] tracking-tight">
            تركيب اجراس وكاميرات مراقبة
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-500">
            شغل نظيف + تنظيم أسلاك + اختبار وشرح الاستخدام — كله على أصوله.
          </p>
        </div>

        {/* أزرار التبويب — جيل زد */}
        <div className="relative mb-8">
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={[
                    "relative overflow-hidden rounded-2xl px-4 py-2 text-sm md:text-base font-bold transition",
                    "border",
                    isActive
                      ? "bg-[var(--brand)] text-[var(--accent)] border-[var(--brand)] shadow-lg"
                      : "bg-white text-gray-800 border-gray-200 hover:border-[var(--brand)] hover:text-[var(--brand)]",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* الشبكة */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {album.items.map((p, i) => (
            <motion.button
              key={p.src}
              onClick={() => onOpen(p)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease, delay: i * 0.03 },
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 hover:shadow-xl"
              title={p.label}
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width:1024px) 16vw, (min-width:640px) 30vw, 45vw"
                priority={i < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <span className="absolute bottom-2 right-2 text-[10px] md:text-xs font-semibold text-white/95">
                {p.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* ملاحظة مسارات الصور */}
      </div>
    </section>
  );
}
