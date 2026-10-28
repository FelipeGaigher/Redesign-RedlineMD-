import { MotionConfig } from "framer-motion";
import { Hero } from "./components/Hero";
import { MobileCtaBar } from "./components/MobileCtaBar";
import { Nav } from "./components/Nav";
import { Roi } from "./components/Roi";
import { Faq, Footer, Testimonials, TrustStrip } from "./components/Support";
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
            <Roi />
            <TrustStrip />
            <Testimonials />
            <Faq />
          </main>
          <Footer />
          <MobileCtaBar />
          <UploadDialog />
        </UploadProvider>
      </LangProvider>
    </MotionConfig>
  );
}
