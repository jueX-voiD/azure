"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

const chevron = {
  prev: "M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414l-5.657-5.657Z",
  next: "M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657Z",
};

function NavButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous" : "Next"}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 z-10 h-[43px] -translate-y-1/2 cursor-pointer p-2 disabled:cursor-default disabled:opacity-30 ${
        dir === "prev" ? "left-3" : "right-3"
      }`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <path d={chevron[dir]} fill="#09244B" />
      </svg>
    </button>
  );
}

// Same behaviour as the live site's gallery: one slide at a time, arrows and swipe, slide-in animation.
export default function ProjectGallery({
  images,
  imageClassName = "",
  priority = false,
}: {
  images: GalleryImage[];
  imageClassName?: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [height, setHeight] = useState<number | undefined>();
  const startX = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const last = images.length - 1;

  function go(index: number) {
    if (index < 0 || index > last) return;
    setCurrent(index);
  }

  // Slides can have different aspect ratios (villas), so the viewport follows the current slide's height.
  useEffect(() => {
    const el = slideRefs.current[current];
    if (!el) return;
    setHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [current]);

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-[height] duration-500 ease-in-out"
      style={{ height }}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = startX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 50) return;
        go(diff > 0 ? current + 1 : current - 1);
      }}
    >
      <div
        className="flex items-start transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-full shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              width={img.w}
              height={img.h}
              sizes="(min-width: 1025px) 736px, 100vw"
              priority={priority && i === 0}
              className={`block w-full rounded-lg object-cover ${imageClassName}`}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <NavButton
            dir="prev"
            disabled={current === 0}
            onClick={() => go(current - 1)}
          />
          <NavButton
            dir="next"
            disabled={current === last}
            onClick={() => go(current + 1)}
          />
        </>
      )}
    </div>
  );
}
