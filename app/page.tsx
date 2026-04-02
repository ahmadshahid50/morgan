import { Poppins } from "next/font/google";
import Image from "next/image";
import SplitCard from "./components/SplitCard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Replace these with your real URLs later.
const CLINIC_URL = "https://bodytempleclinic.com/";
const COACHING_URL = "https://bodytemplebymorgan.com/";

export default function Page() {
  return (
    <main
      className={`${poppins.className} relative h-screen w-full flex flex-col md:flex-row`}
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <Image
          src="/logo.png"
          alt="Logo"
          width={96}
          height={96}
          className="h-16 w-auto md:h-20"
          priority
        />
      </div>

      <div
        aria-hidden="true"
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/20 z-[5] pointer-events-none"
      />

      <SplitCard
        titleLines={["Body Template", "Clinic", "by Morgan"]}
        subtitle="Advanced treatments for your body transformation"
        ctaLabel="Explore Clinic"
        href={CLINIC_URL}
        backgroundSrc="/images/clinic.png"
        overlayClassName="bg-black/45"
        imagePositionClassName="object-top"
        imageOpacityClassName="opacity-100"
      />

      <SplitCard
        titleLines={["Body Template", "Coaching", "by Morgan"]}
        subtitle="Expert coaching tailored to support your personal transformation"
        ctaLabel="Explore Coaching"
        href={COACHING_URL}
        backgroundSrc="/images/coaching.png"
        overlayClassName="bg-black/45"
        imagePositionClassName="object-top"
        imageOpacityClassName="opacity-100"
      />
    </main>
  );
}
