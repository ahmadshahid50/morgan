"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SplitCardProps = {
  id?: string;
  titleLines: string[];
  subtitle?: string;
  ctaLabel: string;
  href: string;
  backgroundSrc: string; // path under /public
  overlayClassName: string; // tailwind classes
  imagePositionClassName?: string; // e.g. "object-left" | "object-right"
  imageOpacityClassName?: string; // e.g. "opacity-30"
  topLogoSrc?: string; // optional logo rendered at top-center of the panel
  sectionClassName?: string; // e.g. "h-[calc(100vh-4rem)]"
};

export default function SplitCard({
  id,
  titleLines,
  subtitle,
  ctaLabel,
  href,
  backgroundSrc,
  imagePositionClassName = "object-center",
  imageOpacityClassName = "opacity-70",
  topLogoSrc,
  sectionClassName = "h-[100vh]",
}: SplitCardProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [canHover] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover)").matches ?? false;
  });

  // On touch devices, "hover" doesn't exist; keep content visible.
  const isActive = hasRevealed || isHovered || isAnyHovered || !canHover;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // If the user navigates away/back, IntersectionObserver may not fire immediately.
    // Ensure content is visible when the section is already in view.
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || 0;
    const isInView = rect.top < viewportH * 0.85 && rect.bottom > viewportH * 0.15;
    if (isInView) {
      requestAnimationFrame(() => setHasRevealed(true));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasRevealed(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ active: boolean }>;
      setIsAnyHovered(!!customEvent.detail?.active);
    };

    window.addEventListener("splitcard-hover", handler as EventListener);
    return () => {
      window.removeEventListener("splitcard-hover", handler as EventListener);
    };
  }, []);

  const activate = () => {
    setIsHovered(true);
    setHasRevealed(true);
    window.dispatchEvent(
      new CustomEvent("splitcard-hover", {
        detail: { active: true },
      })
    );
  };

  const deactivate = () => {
    setIsHovered(false);
    window.dispatchEvent(
      new CustomEvent("splitcard-hover", {
        detail: { active: false },
      })
    );
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden ${sectionClassName}`}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocusCapture={activate}
      onBlurCapture={deactivate}
    >
      {topLogoSrc ? (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <Image
            src={topLogoSrc}
            alt="Logo"
            width={72}
            height={72}
            className="h-14 w-auto object-contain opacity-95"
            priority={false}
          />
        </div>
      ) : null}

      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority={false}
        className={`object-cover ${imagePositionClassName} ${imageOpacityClassName} will-change-[transform,filter] ${
          hasRevealed ? "bt-image-reveal" : ""
        } transition-transform duration-700 ${
          isActive ? "scale-100" : "scale-110"
        } ${isHovered ? "md:scale-[1.03]" : ""}`}
      />

      <div
        className={`absolute inset-0  transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 flex h-full w-full items-end md:items-center justify-center px-6 pb-90 mt-90 md:mt-10 md:pt-50 text-center">
        <div className="w-full max-w-xl">
          <h2 className="text-white text-3xl md:text-5xl leading-[1.05] tracking-tight">
            {titleLines.map((line, idx) => (
              <span
                key={idx}
                className={`block transition-all duration-700 will-change-[transform] ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                {line}
              </span>
            ))}
          </h2>

          {subtitle ? (
            <p
              className={`mt-4 text-white text-sm md:text-base leading-relaxed transition-all duration-700 delay-150 ${
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex justify-center">
            <a
              href={href}
              className="inline-flex items-center justify-center rounded-full
                         border border-white bg-transparent
                         px-8 py-3 text-sm md:text-base font-semibold text-white
                         transition-all duration-200 will-change-[transform]
                         hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                         focus:outline-none focus:ring-2 focus:ring-white/60
                         active:translate-y-0 active:shadow-none"
              style={{
                transitionDelay: "200ms",
              }}
            >
              <span
                className={`inline-block transition-all duration-700 will-change-[transform] ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                } ${hasRevealed ? "bt-button-reveal" : ""}`}
              >
                {ctaLabel}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

