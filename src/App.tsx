import { MotionConfig } from "framer-motion";
import { ResidentsBand, SignBand } from "./components/Bands";
import { Hero } from "./components/Hero";
import { MobileCtaBar } from "./components/MobileCtaBar";
import { Nav } from "./components/Nav";
import { Checks } from "./components/Checks";
import { HowItWorks } from "./components/HowItWorks";
import { SpecialtyMarquee, StatsStrip } from "./components/ProofStrip";
import { Faq, Footer, Voices } from "./components/Support";
import { UploadDialog } from "./components/UploadDialog";
import { LangProvider } from "./lib/i18n";
import { useLenis } from "./lib/lenis";
import { UploadProvider } from "./lib/upload";

export default function App() {
  useLenis();
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <UploadProvider>
          <Nav />
          <main>
            <Hero />
            <SpecialtyMarquee />
            <StatsStrip />
            <HowItWorks />
            <Checks />
            <ResidentsBand />
            <Voices />
            <Faq />
            <SignBand />
          </main>
          <Footer />
          <MobileCtaBar />
          <UploadDialog />
        </UploadProvider>
      </LangProvider>
    </MotionConfig>
  );
}
