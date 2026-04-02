import Image from "next/image";

type SplitCardProps = {
  titleLines: string[];
  subtitle?: string;
  ctaLabel: string;
  href: string;
  backgroundSrc: string; // path under /public
  overlayClassName: string; // tailwind classes
  imagePositionClassName?: string; // e.g. "object-left" | "object-right"
  imageOpacityClassName?: string; // e.g. "opacity-30"
};

export default function SplitCard({
  titleLines,
  subtitle,
  ctaLabel,
  href,
  backgroundSrc,
  overlayClassName,
  imagePositionClassName = "object-center",
  imageOpacityClassName = "opacity-70",
}: SplitCardProps) {
  return (
    <section className="relative flex-1 h-full overflow-hidden">
      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority={false}
        className={`object-cover ${imagePositionClassName} ${imageOpacityClassName}`}
      />

      <div className={`absolute inset-0 ${overlayClassName}`} />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <div className="w-full max-w-xl">
          <h2 className="text-white  text-3xl md:text-5xl leading-[1.05] tracking-tight">
            {titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h2>

          {subtitle ? (
            <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex justify-center">
            <a
              href={href}
              className="inline-flex items-center justify-center rounded-full
                         border border-white/70 bg-transparent
                         px-8 py-3 text-sm md:text-base font-semibold text-white
                         transition-all duration-200
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

