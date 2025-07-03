"use client";

import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Idioma } from "@/types/idioma";

interface ProfissionalComTrad {
  id: string;
  email: string;
  phone: string;
  translations: {
    language: Idioma;
    nome: string;
    descricao: string;
    servicos: string;
    endereco: string;
  }[];
}

export default function Layout1Client({
  prof,
  idiomas,
}: {
  prof: ProfissionalComTrad;
  idiomas: Idioma[];
}) {
  const [idiomaAtivo, setIdiomaAtivo] = useState<Idioma>("PT");
  const t =
    prof.translations.find((tr) => tr.language === idiomaAtivo) ??
    prof.translations[0];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <LanguageSwitcher
        idiomas={idiomas}
        ativo={idiomaAtivo}
        setAtivo={setIdiomaAtivo}
      />

      <header className="bg-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold">{t.nome}</h1>
        <p className="mt-2">{t.descricao}</p>
      </header>

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Serviços</h2>
        <p>{t.servicos}</p>
      </section>

      <footer className="p-8 bg-gray-200">
        <p>
          <strong>Contato:</strong> {prof.email} • {prof.phone}
        </p>
        <p className="mt-1">{t.endereco}</p>
      </footer>
    </main>
  );
}
