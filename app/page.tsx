import { Poppins } from "next/font/google";
import SplitCard from "./components/SplitCard";
import Navbar from "./components/Navbar";
import Cursor from "./Cursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Replace these with your real URLs later.
const CLINIC_URL = "https://bodytempleclinic.com/";
const COACHING_URL = "https://bodytemplebymorgan.com/";

export default function Page() {
  return (
    <>
      <Cursor />
    <div
      className={`${poppins.className} min-h-screen bg-black flex flex-col`}
    >
      <Navbar />
      <main className="flex-1 w-full flex flex-col md:flex-row relative">
        {/* Partition line between the two 50/50 panels */}
        <div
          aria-hidden="true"
          className="md:hidden absolute left-0 right-0 top-1/2 h-px bg-white/20 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/20 pointer-events-none"
        />

        <SplitCard
          id="clinic"
          sectionClassName="flex-1 min-h-0"
          titleLines={["Body Template", "Clinic", "by Morgan"]}
          subtitle="Advanced treatments for your body transformation"
          ctaLabel="Explore Clinic"
          href={CLINIC_URL}
          backgroundSrc="/images/clininc1.jpg"
          overlayClassName="bg-black/45"
          imagePositionClassName="object-top"
          imageOpacityClassName="opacity-100"
          // topLogoSrc="/logo.png"
        />

        <SplitCard
          id="coaching"
          sectionClassName="flex-1 min-h-0"
          titleLines={["Body Template", "Coaching", "by Morgan"]}
          subtitle="Expert coaching tailored to support your personal transformation"
          ctaLabel="Explore Coaching"
          href={COACHING_URL}
          backgroundSrc="/images/coaching1.jpg"
          overlayClassName="bg-black/45"
          imagePositionClassName="object-top"
          imageOpacityClassName="opacity-100"
        />
      </main>
    </div>
    </>
  );
}
