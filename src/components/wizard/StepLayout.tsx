"use client";
import { LayoutSlug, useWizard } from "./WizardProvider";
import { useRouter } from "next/navigation";

const cards: { slug: LayoutSlug; label: string }[] = [
  { slug: "L1", label: "Layout 1" },
  { slug: "L2", label: "Layout 2" },
  { slug: "L3", label: "Layout 3" },
];

export default function StepLayout() {
  const { categoria, layout, setLayout } = useWizard();
  const router = useRouter();

  // bloqueia acesso se não veio do passo 1
  if (!categoria) {
    router.replace("/cadastro/step/1");
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Escolha um layout</h1>
      <div className="grid sm:grid-cols-3 gap-10 mb-10">
        {cards.map(({ slug, label }) => (
          <button
            key={slug}
            onClick={() => setLayout(slug)}
            className={`w-48 h-32 rounded-2xl border flex items-center
              justify-center ${layout === slug ? "ring-4 ring-primary border-primary" : "border-slate-600"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/cadastro/step/1")}
          className="px-8 py-3 rounded-xl border border-slate-600"
        >
          Voltar
        </button>
        <button
          disabled={!layout}
          onClick={() => router.push("/cadastro/step/3")}
          className="px-8 py-3 rounded-xl bg-primary disabled:opacity-40"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
