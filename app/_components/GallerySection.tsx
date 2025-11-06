"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const IMAGES = [
  {
    id: 1,
    category: "glass",
    label: "واجهة زجاج — 01",
    src: "/images/glass/1.JPG",
  },
  {
    id: 2,
    category: "glass",
    label: "واجهة زجاج — 02",
    src: "/images/glass/2.JPG",
  },
  {
    id: 3,
    category: "glass",
    label: "واجهة زجاج — 03",
    src: "/images/glass/3.JPG",
  },
  {
    id: 4,
    category: "glass",
    label: "واجهة زجاج — 04",
    src: "/images/glass/4.JPG",
  },

  {
    id: 5,
    category: "glass_facades",
    label: "الواجهات الزجاجية العصرية — 01",
    src: "/images/glass_facades/1.JPG",
  },
  {
    id: 6,
    category: "glass_facades",
    label: "الواجهات الزجاجية العصرية — 02",
    src: "/images/glass_facades/2.JPG",
  },
  {
    id: 7,
    category: "glass_facades",
    label: "الواجهات الزجاجية العصرية — 03",
    src: "/images/glass_facades/3.JPG",
  },
  {
    id: 8,
    category: "glass_facades",
    label: "الواجهات الزجاجية العصرية — 01",
    src: "/images/glass_facades/4.JPG",
  },

  {
    id: 9,
    category: "structure",
    label: "تنفيذ أعمال — 01",
    src: "/images/structure/1.JPG",
  },
  {
    id: 10,
    category: "structure",
    label: "تنفيذ أعمال — 02",
    src: "/images/structure/2.JPG",
  },
  {
    id: 11,
    category: "structure",
    label: "تنفيذ أعمال — 03",
    src: "/images/structure/3.JPG",
  },

  {
    id: 12,
    category: "door",
    label: "الأبواب الأوتوماتيكية — 01",
    src: "/images/door/3.JPG",
  },
  {
    id: 13,
    category: "door",
    label: "الأبواب الأوتوماتيكية — 02",
    src: "/images/door/3.JPG",
  },
  {
    id: 14,
    category: "door",
    label: "الأبواب الأوتوماتيكية — 03",
    src: "/images/door/3.JPG",
  },
  {
    id: 15,
    category: "door",
    label: "الأبواب الأوتوماتيكية — 04",
    src: "/images/door/4.JPG",
  },
  {
    id: 16,
    category: "door",
    label: "الأبواب الأوتوماتيكية — 05",
    src: "/images/door/5.JPG",
  },

  {
    id: 17,
    category: "cffice_glass",
    label: "زجاج المكاتب الداخلية — 01",
    src: "/images/cffice_glass/1.JPG",
  },
  {
    id: 18,
    category: "cffice_glass",
    label: "زجاج المكاتب الداخلية — 02",
    src: "/images/cffice_glass/2.JPG",
  },
  {
    id: 19,
    category: "cffice_glass",
    label: "زجاج المكاتب الداخلية — 03",
    src: "/images/cffice_glass/3.JPG",
  },
  {
    id: 20,
    category: "cffice_glass",
    label: "زجاج المكاتب الداخلية — 04",
    src: "/images/cffice_glass/4.JPG",
  },
  {
    id: 21,
    category: "cffice_glass",
    label: "زجاج المكاتب الداخلية — 05",
    src: "/images/cffice_glass/5.JPG",
  },

  {
    id: 22,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 01",
    src: "/images/chower_cabins/1.JPG",
  },
  {
    id: 23,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 02",
    src: "/images/chower_cabins/2.JPG",
  },
  {
    id: 24,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 03",
    src: "/images/chower_cabins/3.JPG",
  },
  {
    id: 25,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 04",
    src: "/images/chower_cabins/4.JPG",
  },
  {
    id: 26,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 05",
    src: "/images/chower_cabins/5.JPG",
  },
  {
    id: 27,
    category: "chower_cabins",
    label: "زجاج كبائن شاور الحمامات — 06",
    src: "/images/chower_cabins/6.JPG",
  },

  {
    id: 44,
    category: "stair_railing",
    label: "زجاج دربزين الدرج — 01",
    src: "/images/stair_railing/1.JPG",
  },
  {
    id: 28,
    category: "stair_railing",
    label: "زجاج دربزين الدرج — 02",
    src: "/images/stair_railing/2.JPG",
  },
  {
    id: 29,
    category: "stair_railing",
    label: "زجاج دربزين الدرج — 03",
    src: "/images/stair_railing/3.JPG",
  },
  {
    id: 30,
    category: "stair_railing",
    label: "زجاج دربزين الدرج — 04",
    src: "/images/stair_railing/4.JPG",
  },

  {
    id: 31,
    category: "mirrors",
    label: "المرايا — 01",
    src: "/images/mirrors/1.JPG",
  },
  {
    id: 32,
    category: "mirrors",
    label: "المرايا — 02",
    src: "/images/mirrors/2.JPG",
  },
  {
    id: 33,
    category: "mirrors",
    label: "المرايا — 03",
    src: "/images/mirrors/3.JPG",
  },
  {
    id: 34,
    category: "mirrors",
    label: "المرايا — 04",
    src: "/images/mirrors/4.JPG",
  },
  {
    id: 35,
    category: "mirrors",
    label: "المرايا — 05",
    src: "/images/mirrors/5.JPG",
  },

  {
    id: 36,
    category: "cladding",
    label: "الكلادينج — 01",
    src: "/images/cladding/1.JPG",
  },
  {
    id: 37,
    category: "cladding",
    label: "الكلادينج — 02",
    src: "/images/cladding/2.JPG",
  },
  {
    id: 38,
    category: "cladding",
    label: "الكلادينج — 03",
    src: "/images/cladding/3.JPG",
  },
  {
    id: 39,
    category: "cladding",
    label: "الكلادينج — 04",
    src: "/images/cladding/4.JPG",
  },

  {
    id: 40,
    category: "aluminum",
    label: "ألمنيوم — 01",
    src: "/images/aluminum/1.JPG",
  },
  {
    id: 41,
    category: "aluminum",
    label: "ألمنيوم — 02",
    src: "/images/aluminum/2.JPG",
  },
  {
    id: 42,
    category: "aluminum",
    label: "ألمنيوم — 03",
    src: "/images/aluminum/3.JPG",
  },
  {
    id: 43,
    category: "aluminum",
    label: "ألمنيوم — 04",
    src: "/images/aluminum/4.JPG",
  },
];

export default function GallerySection({
  activeFilter,
  setActiveFilter,
  onOpen,
}: {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  onOpen: (img: { src: string; label: string }) => void;
}) {
  const filters = [
    { id: "all", label: "الكل" },
    { id: "glass", label: "زجاج" },
    { id: "glass_facades", label: "الواجهات" },
    { id: "structure", label: "•	تنفيذ أعمال " },
    { id: "door", label: "الأبواب" },
    { id: "cffice_glass", label: "زجاج المكاتب" },
    { id: "chower_cabins", label: "كبائن شاور" },

    { id: "stair_railing", label: "دربزين الدرج" },
    { id: "mirrors", label: "المرايا" },
    { id: "cladding", label: "الكلادينج" },

    { id: "aluminum", label: "ألمنيوم" },
  ];
  const filtered =
    activeFilter === "all"
      ? IMAGES
      : IMAGES.filter((g) => g.category === activeFilter);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="معرض الأعمال" title="أعمالنا التي نفخر بها" />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                activeFilter === f.id
                  ? "bg-gradient-to-l from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[var(--accent)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <motion.figure
                key={it.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl border border-white"
              >
                <img
                  src={it.src}
                  alt={it.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={1000}
                  sizes="(min-width:768px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur text-[var(--brand)] text-xs md:text-sm font-bold shadow">
                  {it.label}
                </figcaption>
                <button
                  aria-label="تكبير الصورة"
                  onClick={() => onOpen({ src: it.src, label: it.label })}
                  className="absolute inset-0"
                />
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
