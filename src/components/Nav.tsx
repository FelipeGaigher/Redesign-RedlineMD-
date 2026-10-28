import { useEffect, useState } from "react";
import { useT, type Lang } from "../lib/i18n";
import { scrollToId } from "../lib/lenis";
import { useUpload } from "../lib/upload";
import { Logo } from "./Logo";

export function Nav() {
  const { openUpload } = useUpload();
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-line bg-white/90 backdrop-blur-md" : "border-b border-transparent"
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
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
          <button
            type="button"
            onClick={openUpload}
            className="hidden h-11 cursor-pointer rounded-ui border border-navy/25 px-4 text-[15px] font-semibold text-navy transition-colors hover:border-navy sm:inline-flex sm:items-center"
          >
            {t.nav.cta}
          </button>
        </div>
      </nav>
    </header>
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
