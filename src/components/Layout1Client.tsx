"use client";
import { useState, useMemo } from "react";
import { Idioma } from "@/types/idioma";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Props {
  prof: {
    email: string;
    phone: string;
    translations?: {
      language: Idioma;
      nome: string;
      descricao: string;
      servicos: string;   // ← continua string (1 serviço por linha)
      endereco: string;
    }[];
  };
  idiomas: Idioma[];
}

export default function Layout1Client({ prof, idiomas }: Props) {
  const [lang, setLang] = useState<Idioma>("PT");

  /* tradução ativa com guard-clause */
  const t = useMemo(() => {
    if (!prof?.translations?.length) return null;
    return (
      prof.translations.find((tr) => tr.language === lang) ??
      prof.translations[0]
    );
  }, [prof, lang]);

  /* fallback elegante se não houver traduções */
  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-700">
        <div className="p-8 bg-white rounded-xl shadow border">
          <h1 className="text-xl font-semibold mb-4">
            Dados incompletos para exibir o layout
          </h1>
          <p className="text-sm text-slate-500">
            Este profissional ainda não possui traduções cadastradas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] bg-slate-50 text-slate-800 gap-50">
      {/* SIDEBAR -------------------------------------------------------------- */}
      <aside className="bg-primary text-black p-8 space-y-8">
        <h1 className="text-2xl font-bold">{t.nome}</h1>
        <LanguageSwitcher
          idiomas={idiomas}
          ativo={lang}
          setAtivo={setLang}
        />
        <div className="space-y-1 text-sm opacity-90">
          <p>{prof.email}</p>
          <p>{prof.phone}</p>
        </div>
        <p className="text-sm opacity-70 pt-4">{t.endereco}</p>
      </aside>

      {/* CONTEÚDO ------------------------------------------------------------- */}
      <main className="p-10 space-y-16">
        {/* Introdução */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Sobre</h2>
          <p className="text-slate-700 whitespace-pre-line">{t.descricao}</p>
        </section>

        {/* Serviços em cards */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Serviços</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.servicos.split("\n").map((srv, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold mb-2">Serviço {i + 1}</h3>
                <p className="text-slate-600 whitespace-pre-line">{srv}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
