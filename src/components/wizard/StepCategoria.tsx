"use client";
import { Categoria, useWizard } from "./WizardProvider";
import { useRouter } from "next/navigation";
import { Stethoscope, Brain, Utensils, Book } from "lucide-react";

const itens: { value: Categoria; label: string; Icon: any }[] = [
  { value: "MEDICINA", label: "Medicina", Icon: Stethoscope },
  { value: "PSICOLOGIA", label: "Psicologia", Icon: Brain },
  { value: "NUTRICAO", label: "Nutrição", Icon: Utensils },
  { value: "EDUCACIONAL", label: "Educacional", Icon: Book },
];

export default function StepCategoria() {
  const { categoria, setCategoria } = useWizard();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Selecione sua categoria</h1>
      <div className="grid sm:grid-cols-2 gap-10 mb-10">
        {itens.map(({ value, label, Icon }) => (
          <button
            key={value}
            onClick={() => setCategoria(value)}
            className={`w-44 h-44 rounded-2xl border flex flex-col
              items-center justify-center space-y-3
              ${categoria === value ? "ring-4 ring-primary border-primary" : "border-slate-600"}`}
          >
            <Icon className="w-10 h-10" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button
        disabled={!categoria}
        onClick={() => router.push("/cadastro/step/2")}
        className="px-8 py-3 rounded-xl bg-primary disabled:opacity-40"
      >
        Próximo
      </button>
    </div>
  );
}
