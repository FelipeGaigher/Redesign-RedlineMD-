import { motion, useReducedMotion } from "framer-motion";
import { useT } from "../lib/i18n";
import { Check, File, Lock, Mail, Upload } from "./Icons";

export function UploadMock() {
  const { t } = useT();
  const m = t.how.mock;
  const reduce = useReducedMotion();
  return (
    <div className="rounded-ui border border-line bg-surface shadow-lg">
      <div className="flex flex-col items-center border-b border-dashed border-line px-6 py-8 text-center">
        <Upload className="size-7 text-navy" />
        <p className="mt-3 text-[15px] font-semibold text-ink">{t.upload.dropDesktop}</p>
        <p className="mt-1 text-[13px] text-muted">{t.upload.formats}</p>
      </div>
      <ul className="space-y-4 p-5">
        {m.files.map((f, i) => (
          <li key={f}>
            <div className="flex items-center gap-3">
              <File className="size-4 shrink-0 text-muted" />
              <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink">{f}</span>
              <motion.span
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.6 }}
              >
                <Check className="size-4 text-accept" />
              </motion.span>
            </div>
            <div className="mt-2 h-1 bg-line">
              <motion.div
                className="h-full origin-left bg-navy"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: i * 0.6, ease: "easeInOut" }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 border-t border-line px-5 py-3 text-[13px] text-accept">
        <Lock className="size-3.5" /> {m.ready}
      </p>
    </div>
  );
}

export function ScriptMock() {
  const { t } = useT();
  const m = t.how.mock;
  const reduce = useReducedMotion();
  return (
    <div className="rounded-ui border border-line bg-surface shadow-lg">
      <div className="space-y-1 border-b border-line px-5 py-3 text-[13px] text-muted">
        <p className="flex items-center gap-2">
          <Mail className="size-3.5" /> {m.scriptTo}
        </p>
        <p className="font-semibold text-ink">{m.scriptSubject}</p>
      </div>
      <div className="space-y-3 px-5 py-5 text-[15px] leading-relaxed text-ink">
        {m.scriptBody.map((line, i) => (
          <motion.p
            key={line}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.7, duration: 0.4 }}
            className={i > 0 ? "border-l-2 border-accept bg-accept-soft/60 py-1.5 pl-3" : ""}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <div className="flex justify-end border-t border-line px-5 py-3">
        <span className="rounded-sm bg-navy px-3 py-1.5 text-[13px] font-semibold text-white">{m.scriptCopy}</span>
      </div>
    </div>
  );
}
