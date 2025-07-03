"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Idioma } from "@/types/idioma";

const idiomas: Idioma[] = ["PT", "DE", "ES", "SV", "EN"];

type Traducoes = Record<Idioma, { nome: string; descricao: string; servicos: string; endereco: string }>;

export default function Cadastro() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    category: "MEDICINA",
    layout: "L1", // L1, L2 ou L3
    translations: idiomas.reduce((acc, lang) => {
      acc[lang] = { nome: "", descricao: "", servicos: "", endereco: "" };
      return acc;
    }, {} as Traducoes),
  });

  const [idiomaAtivo, setIdiomaAtivo] = useState<Idioma>("PT");

  // ------------ SUBMIT -------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        translations: Object.entries(form.translations).map(([language, dados]) => ({
          language, // "PT", "DE", etc.
          ...dados,
        })),
      };

      const { data: novo } = await axios.post("/api/profissionais", payload);

      // Extrai "1", "2" ou "3" de "L1" | "L2" | "L3" e gera /layout1, /layout2...
      const layoutSlug = `layout${form.layout.slice(1)}`;
      router.push(`/profissional/${novo.id}/${layoutSlug}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar. Veja o console.");
    }
  };

  // ------------ ATUALIZA TRADUÇÃO -------------
  const atualizarTraducao = (campo: keyof Traducoes[Idioma], valor: string) => {
    setForm((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [idiomaAtivo]: {
          ...prev.translations[idiomaAtivo],
          [campo]: valor,
        },
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Profissional</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input"
        >
          <option value="MEDICINA">Medicina</option>
          <option value="PSICOLOGIA">Psicologia</option>
          <option value="NUTRICAO">Nutrição</option>
          <option value="EDUCACIONAL">Educacional</option>
        </select>

        <select
          value={form.layout}
          onChange={(e) => setForm({ ...form, layout: e.target.value })}
          className="input"
        >
          <option value="L1">Layout 1</option>
          <option value="L2">Layout 2</option>
          <option value="L3">Layout 3</option>
        </select>

        {/* Tabs de idioma */}
        <LanguageSwitcher
          idiomas={idiomas}
          ativo={idiomaAtivo}
          setAtivo={setIdiomaAtivo}
        />

        {(
          [
            { label: "Nome", key: "nome" },
            { label: "Descrição", key: "descricao" },
            { label: "Serviços", key: "servicos" },
            { label: "Endereço", key: "endereco" },
          ] as const
        ).map(({ label, key }) => (
          <input
            key={key}
            className="input"
            placeholder={`${label} (${idiomaAtivo})`}
            value={form.translations[idiomaAtivo][key]}
            onChange={(e) => atualizarTraducao(key, e.target.value)}
            required={idiomaAtivo === "PT" && key === "nome"}
          />
        ))}

        <button type="submit" className="btn w-full">
          Salvar
        </button>
      </form>
    </div>
  );
}