import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useT } from "../lib/i18n";
import { useUpload } from "../lib/upload";
import { Upload } from "./Icons";

/* Appears once the hero CTA scrolls out of view, so the action is always under the thumb. */
export function MobileCtaBar() {
  const { open, openUpload } = useUpload();
  const { t } = useT();
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const footer = document.getElementById("footer");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroVisible(e.isIntersecting || e.boundingClientRect.top > 0);
        if (e.target === footer) setFooterVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = !heroVisible && !footerVisible && !open;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <p className="tabular text-[22px] font-semibold tracking-[-0.02em] text-navy">$199</p>
              <p className="text-[12px] text-muted">{t.mobileBar.vs}</p>
            </div>
            <button
              type="button"
              onClick={openUpload}
              className="ml-auto inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-ui bg-yellow px-5 text-[16px] font-semibold text-ink"
            >
              <Upload className="size-[18px]" />
              {t.mobileBar.cta}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
