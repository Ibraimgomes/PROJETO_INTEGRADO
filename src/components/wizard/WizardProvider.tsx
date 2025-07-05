"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Categoria = "MEDICINA" | "PSICOLOGIA" | "NUTRICAO" | "EDUCACIONAL";
export type LayoutSlug = "L1" | "L2" | "L3";

interface WizardData {
  categoria?: Categoria;
  layout?: LayoutSlug;
  setCategoria: (c: Categoria) => void;
  setLayout: (l: LayoutSlug) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardData | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [categoria, setCategoria] = useState<Categoria>();
  const [layout, setLayout] = useState<LayoutSlug>();

  const value: WizardData = {
    categoria,
    layout,
    setCategoria,
    setLayout,
    reset: () => {
      setCategoria(undefined);
      setLayout(undefined);
    },
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export const useWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard deve estar dentro do WizardProvider");
  return ctx;
};
