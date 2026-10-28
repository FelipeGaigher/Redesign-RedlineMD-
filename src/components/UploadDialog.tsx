import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { setScrollLocked } from "../lib/lenis";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Alert, Check, Close, File, Lock, Mail, Upload } from "./Icons";

/* Everything here is simulated in the browser. No file leaves the device. */
type State = "idle" | "uploading" | "analyzing" | "done" | "email" | "emailSent";

const CHECKS = ["Reading contract…", "Checking tail coverage…", "Reviewing non-compete…", "Comparing termination terms…"];

const FINDINGS = [
  { title: "Tail coverage is physician-paid", detail: "Est. exposure ~$12,000 when you leave", locked: false },
  { title: "Non-compete radius", detail: "Unlocked in your full review", locked: true },
  { title: "Termination without cause", detail: "Unlocked in your full review", locked: true },
];

export function UploadDialog() {
  const { open, closeUpload } = useUpload();
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [checkIndex, setCheckIndex] = useState(0);
  const [checkoutNote, setCheckoutNote] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeUpload();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeUpload]);

  // Reset after the exit animation so the next open starts clean.
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      setState("idle");
      setProgress(0);
      setCheckIndex(0);
      setFileName("");
      setCheckoutNote(false);
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (state === "uploading") {
      const c = animate(0, 100, {
        duration: reduce ? 0.01 : 1.4,
        ease: "easeInOut",
        onUpdate: (v) => setProgress(Math.round(v)),
        onComplete: () => setState("analyzing"),
      });
      return () => c.stop();
    }
    if (state === "analyzing") {
      setCheckIndex(0);
      const timers = CHECKS.map((_, i) => window.setTimeout(() => setCheckIndex(i + 1), (i + 1) * (reduce ? 50 : 750)));
      timers.push(window.setTimeout(() => setState("done"), CHECKS.length * (reduce ? 50 : 750) + 400));
      return () => timers.forEach(clearTimeout);
    }
  }, [state, reduce]);

  const start = (name: string) => {
    setFileName(name);
    setState("uploading");
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) start(f.name);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="presentation">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUpload}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-title"
            className="relative w-full max-w-[560px] rounded-t-2xl bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-float)] outline-none sm:rounded-2xl sm:p-8"
            initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-line sm:hidden" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="upload-title" className="font-serif text-[26px] leading-tight font-medium">
                  {state === "done" ? "Here’s what we found" : "Upload your contract"}
                </h2>
                <p className="mt-1 text-[14px] text-muted">
                  {state === "done" ? fileName : "Free risk preview in under a minute. Pay only for the full review."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeUpload}
                aria-label="Close"
                className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
              >
                <Close />
              </button>
            </div>

            <div className="mt-6" aria-live="polite">
              {state === "idle" && (
                <>
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-[border-color,background-color,transform,box-shadow] duration-200 sm:py-12 ${
                      dragging
                        ? "scale-[1.015] border-redline bg-redline-soft/50 shadow-[var(--shadow-float)]"
                        : "border-line bg-paper hover:border-ink/30"
                    }`}
                  >
                    <span className={`grid size-12 place-items-center rounded-full ${dragging ? "bg-redline text-white" : "bg-ink text-paper"}`}>
                      <Upload />
                    </span>
                    <span className="mt-4 text-[16px] font-semibold text-ink">
                      <span className="hidden sm:inline">{dragging ? "Drop to start your review" : "Drag your contract here"}</span>
                      <span className="sm:hidden">Choose a file or take a photo</span>
                    </span>
                    <span className="mt-1 text-[14px] text-muted">
                      <span className="hidden sm:inline">or click to browse · </span>PDF, Word or photos · up to 30 pages
                    </span>
                    <input
                      ref={inputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) start(f.name);
                      }}
                    />
                  </label>

                  {/* The mobile insight: the contract is often in a desktop inbox, not on the phone. Keep the intent. */}
                  <button
                    type="button"
                    onClick={() => setState("email")}
                    className="mt-4 flex w-full items-center gap-3 rounded-xl border border-line px-4 py-3.5 text-left transition-colors hover:border-ink/30"
                  >
                    <Mail className="size-5 shrink-0 text-muted" />
                    <span className="text-[14px] text-muted">
                      <span className="font-semibold text-ink">Contract not on this device?</span> Email me a secure upload link.
                    </span>
                  </button>

                  <p className="mt-4 flex items-center gap-2 text-[12px] text-muted">
                    <Lock className="size-3.5" /> Encrypted in transit and at rest. Deleted after your review.
                  </p>
                </>
              )}

              {state === "uploading" && (
                <div className="rounded-xl border border-line bg-paper p-5">
                  <div className="flex items-center gap-3">
                    <File className="size-5 text-muted" />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{fileName}</span>
                    <span className="tabular text-[14px] text-muted">{progress}%</span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
                    <div className="h-full rounded-full bg-ink" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-3 text-[13px] text-muted">Encrypting and uploading…</p>
                </div>
              )}

              {state === "analyzing" && (
                <ul className="space-y-3 rounded-xl border border-line bg-paper p-5">
                  {CHECKS.map((c, i) => {
                    const done = i < checkIndex;
                    const active = i === checkIndex;
                    return (
                      <motion.li
                        key={c}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: i <= checkIndex ? 1 : 0.35, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 text-[15px]"
                      >
                        <span className={`grid size-5 place-items-center rounded-full ${done ? "bg-accept text-white" : "border border-line"}`}>
                          {done ? <Check className="size-3" /> : active ? <span className="size-1.5 animate-pulse rounded-full bg-ink" /> : null}
                        </span>
                        <span className={done ? "text-muted" : "text-ink"}>{c}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              )}

              {state === "done" && (
                <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  <p className="inline-flex items-center gap-2 rounded-full bg-redline-soft px-3 py-1.5 text-[14px] font-semibold text-redline">
                    <Alert className="size-4" /> 3 risks found
                  </p>
                  <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
                    {FINDINGS.map((f) => (
                      <li key={f.title} className="flex items-start gap-3 px-4 py-3.5">
                        <Alert className="mt-0.5 size-4 shrink-0 text-redline" />
                        <div className={f.locked ? "select-none blur-[3px]" : ""} aria-hidden={f.locked}>
                          <p className="text-[15px] font-semibold text-ink">{f.title}</p>
                          <p className="text-[13px] text-muted">{f.detail}</p>
                        </div>
                        {f.locked && <Lock className="ml-auto mt-0.5 size-4 shrink-0 text-muted" aria-label="Locked" />}
                      </li>
                    ))}
                  </ul>
                  <CtaButton className="mt-5 w-full" onClick={() => setCheckoutNote(true)}>
                    Get full review for $199
                  </CtaButton>
                  <p className="mt-3 text-center text-[13px] text-muted">
                    {checkoutNote
                      ? "Checkout would open here. Out of scope for this design concept."
                      : "Redlined copy + negotiation script within 24 hours."}
                  </p>
                </motion.div>
              )}

              {state === "email" && <EmailForm onSent={() => setState("emailSent")} onBack={() => setState("idle")} />}

              {state === "emailSent" && (
                <div className="rounded-xl border border-line bg-accept-soft p-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-accept">
                    <Check className="size-4" /> Link sent
                  </p>
                  <p className="mt-1.5 text-[14px] text-muted">
                    Open it on the computer where your contract is. The link is valid for 7 days.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function EmailForm({ onSent, onBack }: { onSent: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSent();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="upload-email" className="block text-[14px] font-medium text-ink">
        Where should we send your secure upload link?
      </label>
      <input
        id="upload-email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@hospital.org"
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-[16px] outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
      />
      <CtaButton type="submit" className="w-full" size="md">
        Send me the link
      </CtaButton>
      <button type="button" onClick={onBack} className="h-11 w-full text-[14px] font-medium text-muted hover:text-ink">
        Back to upload
      </button>
    </form>
  );
}
