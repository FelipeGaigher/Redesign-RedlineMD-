import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useT, type Lang } from "../lib/i18n";
import { scrollToId } from "../lib/lenis";
import { useUpload } from "../lib/upload";
import { Close } from "./Icons";
import { Logo } from "./Logo";

export function Nav() {
  const { openUpload } = useUpload();
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || menu ? "border-b border-line bg-white/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <a href="#top" aria-label={t.nav.home} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
          <Logo className="h-6 sm:h-7 lg:h-8" />
        </a>
        <div className="flex items-center gap-2 lg:gap-3">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {t.nav.links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                  className="px-3 py-2 text-[15px] text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
          </div>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
            className="grid size-11 cursor-pointer place-items-center rounded-ui text-navy md:hidden"
          >
            {menu ? <Close /> : <Burger />}
          </button>
          <button
            type="button"
            onClick={openUpload}
            className="hidden h-11 cursor-pointer rounded-ui border border-navy/25 px-4 text-[15px] font-semibold text-navy transition-colors hover:border-navy md:inline-flex md:items-center"
          >
            {t.nav.cta}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-white px-4 pt-2 pb-5 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="divide-y divide-line">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => { e.preventDefault(); setMenu(false); scrollToId(l.id); }}
                    className="flex h-14 items-center text-[17px] font-semibold text-navy"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-3">
              <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
              <button
                type="button"
                onClick={() => { setMenu(false); openUpload(); }}
                className="h-12 flex-1 cursor-pointer rounded-ui bg-yellow px-4 text-[15px] font-semibold text-ink"
              >
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Burger() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function LangSwitch({ lang, setLang, label }: { lang: Lang; setLang: (l: Lang) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex h-11 items-center text-[13px] font-semibold">
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-11 min-w-11 cursor-pointer px-2 uppercase transition-colors ${lang === l ? "text-navy underline decoration-red decoration-2 underline-offset-[6px]" : "text-muted hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
