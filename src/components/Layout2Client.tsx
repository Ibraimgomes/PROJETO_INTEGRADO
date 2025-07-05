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
      servicos: string;
      endereco: string;
    }[];
  };
  idiomas: Idioma[];
}

export default function Layout2Client({ prof, idiomas }: Props) {
  const [lang, setLang] = useState<Idioma>("PT");

  const t = useMemo(() => {
    if (!prof?.translations?.length) return null;
    return (
      prof.translations.find((tr) => tr.language === lang) ??
      prof.translations[0]
    );
  }, [prof, lang]);

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-700">
        <div className="p-8 bg-white rounded-xl shadow border max-w-sm text-center">
          <h1 className="text-xl font-semibold mb-2">
            Dados incompletos para exibir o layout.
          </h1>
          <p className="text-sm text-slate-500">
            Este profissional ainda não possui traduções cadastradas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* TOPO */}
      <div className="py-4 px-6 border-b border-white/10 bg-slate-950/70 backdrop-blur sticky top-0 z-20">
        <LanguageSwitcher idiomas={idiomas} ativo={lang} setAtivo={setLang} />
      </div>

      {/* HERO */}
      <header className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/40 blur-3xl rounded-full -z-10" />

        <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-sm text-white">
            {t.nome}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90">
            {t.descricao}
          </p>
        </div>
      </header>

      {/* SERVIÇOS */}
      <section className="flex-1 bg-slate-900 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-accent tracking-tight">
            Serviços oferecidos
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.servicos
              .split("\n")
              .filter((s) => s.trim())
              .map((srv, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-white/10 bg-slate-800/80 backdrop-blur shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-primary group-hover:underline mb-2">
                    {srv.split(":")[0] || `Serviço ${i + 1}`}
                  </h3>
                  <p className="text-slate-200 whitespace-pre-line">
                    {srv.includes(":") ? srv.split(":").slice(1).join(":") : ""}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="text-white">
            <span className="font-semibold">E-mail:</span> {prof.email}
          </p>
          <p className="text-white">
            <span className="font-semibold">Telefone:</span> {prof.phone}
          </p>
          <p className="text-white">{t.endereco}</p>

          <p className="text-xs text-slate-400 mt-4">
            © {new Date().getFullYear()} <strong>{t.nome}</strong> • ProfessionalPage
          </p>
        </div>
      </footer>
    </div>
  );
}
