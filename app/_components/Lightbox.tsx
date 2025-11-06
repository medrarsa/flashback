"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({
  photo,
  onClose,
}: {
  photo: { src: string; label: string } | null;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl ring-2 ring-[var(--accent)] bg-white"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-[var(--brand)] text-xs font-bold shadow-sm">
              {photo.label}
            </div>
            <button
              aria-label="إغلاق"
              onClick={onClose}
              className="absolute -top-3 -right-3 h-10 w-10 rounded-full grid place-items-center bg-white text-[var(--brand)] shadow-lg"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
