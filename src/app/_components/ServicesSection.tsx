// app/_components/ServicesSection.tsx
"use client";
import * as React from "react";
import { motion, cubicBezier } from "framer-motion";
import SectionTitle from "./SectionTitle";
import {
  PanelsTopLeft,
  Building2,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
} as const;

type ServiceId = "glass" | "aluminum" | "security" | "smart";

import FeaturedAlbums from "./FeaturedAlbums";
import Lightbox from "./Lightbox"; // ✅ أضفنا اللايت بوكس هنا

export default function ServicesSection({
  activeService,
  setActiveService,
}: {
  activeService: ServiceId | string;
  setActiveService: (id: ServiceId) => void;
}) {
  const services: {
    id: ServiceId;
    title: string;
    icon: React.ComponentType<any>;
    items: string[];
  }[] = [
    {
      id: "glass",
      title: "الزجاج",
      icon: PanelsTopLeft,
      items: ["واجهات زجاجية", "أبواب زجاج", "فواصل مكتبية", "كبائن شاور"],
    },
    {
      id: "aluminum",
      title: "الألمنيوم",
      icon: Building2,
      items: ["نوافذ ألمنيوم", "أبواب أمنية", "واجهات كلادينج", "درابزينات"],
    },
    {
      id: "security",
      title: "الأمن",
      icon: ShieldCheck,
      items: [
        "كاميرات مراقبة",
        "أنظمة إنذار",
        "بوابات إلكترونية",
        "أنظمة تحكم",
      ],
    },
    {
      id: "smart",
      title: "ذكي",
      icon: Zap,
      items: ["أنظمة ذكية", "إضاءة تلقائية", "تحكم صوتي", "تكامل منزلي"],
    },
  ];

  // ✅ حالة الصورة الخاصة بالبوب-أب داخل ServicesSection
  const [photo, setPhoto] = React.useState<{
    src: string;
    label: string;
  } | null>(null);

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white scroll-mt-[92px]"
    >
      <div className="container mx-auto px-4">
        <SectionTitle tag="خدماتنا" title="حلول متكاملة لكل احتياجاتك" />

        {/* ✅ الألبومات — يفتح اللايت بوكس عبر setPhoto */}
        <FeaturedAlbums onOpen={(p) => setPhoto(p)} />

        {/* ✅ عرض اللايت بوكس هنا بما إن الحالة هنا */}
        <Lightbox photo={photo} onClose={() => setPhoto(null)} />

        {/* بطاقات الخدمات */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="tablist"
          aria-label="خدماتنا"
        >
          {services.map((s, i) => {
            const active = activeService === s.id;
            const Icon = s.icon;

            return (
              <motion.button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`service-panel-${s.id}`}
                onClick={() => setActiveService(s.id)}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group text-right cursor-pointer p-8 rounded-3xl transition-all ${
                  active
                    ? "bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-white shadow-xl"
                    : "bg-white border-2 border-gray-100 hover:border-[var(--accent)] shadow-sm hover:shadow-lg"
                }`}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl mb-4 ${
                    active
                      ? "bg-[var(--accent)] text-[var(--brand)]"
                      : "bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)]"
                  }`}
                >
                  <Icon className="h-8 w-8" strokeWidth={2.5} />
                </div>

                <h3
                  className={`text-2xl font-black mb-4 leading-[1.25] pb-0.5 ${
                    active ? "text-[var(--accent)]" : "text-[var(--brand)]"
                  }`}
                >
                  {s.title}
                </h3>

                <ul
                  id={`service-panel-${s.id}`}
                  className="space-y-2"
                  role="tabpanel"
                  aria-labelledby={`service-tab-${s.id}`}
                >
                  {s.items.map((it, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          active
                            ? "text-[var(--accent)]"
                            : "text-[var(--brand)]"
                        }`}
                      />
                      <span
                        className={active ? "text-gray-50" : "text-gray-600"}
                      >
                        {it}
                      </span>
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
