import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { useT } from "../lib/i18n";
import { setScrollLocked } from "../lib/lenis";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Alert, Check, Close, File, Lock, Mail, Upload } from "./Icons";

/* Everything here is simulated in the browser. No file leaves the device. */
type State = "idle" | "uploading" | "analyzing" | "done" | "email" | "emailSent";

const CHECK_COUNT = 4;

export function UploadDialog() {
  const { open, closeUpload } = useUpload();
  const reduce = useReducedMotion();
  const { t } = useT();
  const u = t.upload;
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
      const timers = Array.from({ length: CHECK_COUNT }, (_, i) => i).map((i) => window.setTimeout(() => setCheckIndex(i + 1), (i + 1) * (reduce ? 50 : 750)));
      timers.push(window.setTimeout(() => setState("done"), CHECK_COUNT * (reduce ? 50 : 750) + 400));
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
            className="absolute inset-0 bg-navy/45 backdrop-blur-[2px]"
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
            className="relative w-full max-w-[560px] rounded-t-[8px] bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl outline-none sm:rounded-ui sm:p-8"
            initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-ui bg-line sm:hidden" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="upload-title" className="text-[24px] leading-tight font-semibold tracking-[-0.02em]">
                  {state === "done" ? u.titleDone : u.title}
                </h2>
                <p className="mt-1 text-[14px] text-muted">
                  {state === "done" ? fileName : u.sub}
                </p>
              </div>
              <button
                type="button"
                onClick={closeUpload}
                aria-label={u.close}
                className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-ui text-muted transition-colors hover:bg-wash hover:text-ink"
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
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-ui border-2 border-dashed px-6 py-10 text-center transition-[border-color,background-color,transform,box-shadow] duration-200 sm:py-12 ${
                      dragging
                        ? "scale-[1.01] border-red bg-red-soft/60"
                        : "border-line bg-wash hover:border-ink/30"
                    }`}
                  >
                    <Upload className={`size-7 ${dragging ? "text-red" : "text-ink"}`} />
                    <span className="mt-4 text-[16px] font-semibold text-ink">
                      <span className="hidden sm:inline">{dragging ? u.dropActive : u.dropDesktop}</span>
                      <span className="sm:hidden">{u.dropMobile}</span>
                    </span>
                    <span className="mt-1 text-[14px] text-muted">
                      <span className="hidden sm:inline">{u.browse}</span>
                      {u.formats}
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
                    className="mt-4 flex w-full items-center gap-3 rounded-ui border border-line px-4 py-3.5 text-left transition-colors hover:border-ink/30"
                  >
                    <Mail className="size-5 shrink-0 text-muted" />
                    <span className="text-[14px] text-muted">
                      <span className="font-semibold text-ink">{u.noFile}</span>
                      {u.noFileAction}
                    </span>
                  </button>

                  <p className="mt-4 flex items-center gap-2 text-[12px] text-muted">
                    <Lock className="size-3.5" /> {u.security}
                  </p>
                </>
              )}

              {state === "uploading" && (
                <div className="rounded-ui border border-line bg-wash p-5">
                  <div className="flex items-center gap-3">
                    <File className="size-5 text-muted" />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{fileName}</span>
                    <span className="tabular text-[14px] text-muted">{progress}%</span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-ui bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={u.progress}>
                    <div className="h-full rounded-ui bg-navy" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-3 text-[13px] text-muted">{u.uploading}</p>
                </div>
              )}

              {state === "analyzing" && (
                <ul className="space-y-3 rounded-ui border border-line bg-wash p-5">
                  {u.checks.map((c, i) => {
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
                        <span className={`grid size-5 place-items-center rounded-ui ${done ? "bg-accept text-white" : "border border-line"}`}>
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
                  <p className="inline-flex items-center gap-2 rounded-ui bg-red-soft px-3 py-1.5 text-[14px] font-semibold text-red">
                    <Alert className="size-4" /> {u.found}
                  </p>
                  <ul className="mt-4 divide-y divide-line rounded-ui border border-line">
                    {u.findings.map((f, i) => ({ ...f, locked: i > 0 })).map((f) => (
                      <li key={f.title} className="flex items-start gap-3 px-4 py-3.5">
                        <Alert className="mt-0.5 size-4 shrink-0 text-red" />
                        <div className={f.locked ? "select-none blur-[3px]" : ""} aria-hidden={f.locked}>
                          <p className="text-[15px] font-semibold text-ink">{f.title}</p>
                          <p className="text-[13px] text-muted">{f.detail}</p>
                        </div>
                        {f.locked && <Lock className="ml-auto mt-0.5 size-4 shrink-0 text-muted" aria-label={u.locked} />}
                      </li>
                    ))}
                  </ul>
                  <CtaButton className="mt-5 w-full" onClick={() => setCheckoutNote(true)}>
                    {u.buy}
                  </CtaButton>
                  <p className="mt-3 text-center text-[13px] text-muted">
                    {checkoutNote ? u.checkoutNote : u.buyNote}
                  </p>
                </motion.div>
              )}

              {state === "email" && <EmailForm t={u} onSent={() => setState("emailSent")} onBack={() => setState("idle")} />}

              {state === "emailSent" && (
                <div className="rounded-ui border border-line bg-accept-soft p-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-accept">
                    <Check className="size-4" /> {u.sentTitle}
                  </p>
                  <p className="mt-1.5 text-[14px] text-muted">
                    {u.sentBody}
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

function EmailForm({ t, onSent, onBack }: { t: ReturnType<typeof useT>["t"]["upload"]; onSent: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSent();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="upload-email" className="block text-[14px] font-medium text-ink">
        {t.emailLabel}
      </label>
      <input
        id="upload-email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.emailPlaceholder}
        className="h-12 w-full rounded-ui border border-line bg-surface px-4 text-[16px] outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
      />
      <CtaButton type="submit" className="w-full" size="md">
        {t.emailSend}
      </CtaButton>
      <button type="button" onClick={onBack} className="h-11 w-full text-[14px] font-medium text-muted hover:text-ink">
        {t.emailBack}
      </button>
    </form>
  );
}
