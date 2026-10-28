import { useEffect, useState } from "react";
import { scrollToId } from "../lib/lenis";
import { useUpload } from "../lib/upload";
import { Logo } from "./Logo";

const LINKS = [
  { id: "how", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export function Nav() {
  const { openUpload } = useUpload();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-line/80 bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <a href="#top" aria-label="Redline MD home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
          <Logo />
        </a>
        <div className="flex items-center gap-1 lg:gap-2">
          <ul className="mr-4 hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                  className="rounded-full px-3 py-2 text-[15px] text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openUpload}
            className="h-11 rounded-full border border-ink/15 bg-surface px-4 text-[15px] font-semibold text-ink transition-colors hover:border-ink/40"
          >
            Review my contract
          </button>
        </div>
      </nav>
    </header>
  );
}
