"use client";
import * as React from "react";
import SectionTitle from "./SectionTitle";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-[92px]">
      <div className="container mx-auto px-4">
        <SectionTitle tag="تواصل معنا" title="ابدأ مشروعك اليوم" />

        {/* === بطاقات التواصل فقط (بدون فورم) === */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Phone,
              title: "اتصل بنا",
              content: "+966 50 000 0000",
              href: "tel:+966500000000",
            },
            {
              icon: Mail,
              title: "راسلنا",
              content: "info@istrjaa.com",
              href: "mailto:info@istrjaa.com",
            },
            {
              icon: MapPin,
              title: "موقعنا",
              content: "الرياض، المملكة العربية السعودية",
              href: "https://www.google.com/maps?q=%D9%85%D8%A4%D8%B3%D8%B3%D8%A9+%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9+%D9%81%D9%86%D9%8A+%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA%D8%8C+EDPC2935%D8%8C+9082+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D9%85%D9%84%D9%83+%D8%B3%D8%B9%D9%88%D8%AF+%D8%A8%D9%86+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%D8%8C+2935%D8%8C+%D8%A7%D9%84%D8%AF%D9%85%D8%A7%D9%85+32264",
            },
          ].map(({ icon: Icon, title, content, href }, i) => (
            <a
              key={i}
              href={href}
              target={i === 2 ? "_blank" : undefined}
              rel={i === 2 ? "noopener noreferrer" : undefined}
              className="group p-6 rounded-3xl bg-white border-2 border-gray-100 hover:border-[var(--accent)] shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-black text-[var(--brand)] mb-1">
                    {title}
                  </div>
                  <div className="text-gray-600 font-medium">{content}</div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* زر واتساب فول-وِدث */}
        <motion.a
          href="https://wa.me/966500000000"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-6 block w-full h-14 rounded-2xl bg-[#25D366] text-white font-black text-lg shadow-md hover:shadow-lg transition-all grid place-items-center"
        >
          راسلنا واتساب
        </motion.a>
      </div>
    </section>
  );
}
