"use client";
import * as React from "react";

export default function BeforeAfterSlider({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      <img
        src={src}
        alt={`${label} (قبل)`}
        className="w-full h-[340px] object-cover grayscale contrast-110 brightness-110"
        loading="lazy"
        decoding="async"
        width={1200}
        height={800}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={src}
          alt={`${label} (بعد)`}
          className="w-full h-[340px] object-cover"
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
        />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute -translate-x-1/2 h-full w-0.5 bg-white/80" />
        <button
          aria-label="تحريك مقارنة قبل/بعد"
          onMouseDown={(e) => {
            const el = e.currentTarget.parentElement
              ?.parentElement as HTMLElement;
            if (!el) return;
            const onMove = (ev: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = Math.min(
                Math.max(ev.clientX - rect.left, 0),
                rect.width
              );
              setPos(Math.round((x / rect.width) * 100));
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          className="absolute -translate-x-1/2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-[var(--brand)] shadow-lg border border-gray-200 grid place-items-center"
        >
          ↔
        </button>
      </div>
    </div>
  );
}
