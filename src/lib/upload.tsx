import { createContext, useContext, useState, type ReactNode } from "react";

type UploadCtx = { open: boolean; openUpload: () => void; closeUpload: () => void };

const Ctx = createContext<UploadCtx | null>(null);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open, openUpload: () => setOpen(true), closeUpload: () => setOpen(false) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useUpload() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUpload must be used inside UploadProvider");
  return ctx;
}
