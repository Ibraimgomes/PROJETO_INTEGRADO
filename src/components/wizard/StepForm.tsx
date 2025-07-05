"use client";
import { useWizard } from "./WizardProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Idioma } from "@/types/idioma";
import { useAlert, AlertContainer } from "@/components/Alert";

export default function StepForm() {
  /* ─ contextos / hooks ─ */
  const { categoria, layout, reset } = useWizard();
  const router = useRouter();
  const { alerts, success, error } = useAlert();

  /* ─ estados ─ */
  const idiomas: Idioma[] = ["PT", "DE", "ES", "SV", "EN"];
  const [idiomaAtivo, setIdiomaAtivo] = useState<Idioma>("PT");
  const [isLoading, setIsLoading] = useState(false);

  /* redirecionamento seguro */
  useEffect(() => {
    if (!categoria || !layout) router.replace("/cadastro/step/1");
  }, [categoria, layout, router]);

  const [form, setForm] = useState(() => ({
    email: "",
    phone: "",
    translations: idiomas.reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: {
          nome: "",
          descricao: "",
          servicos: [] as string[], // ← ARRAY
          endereco: "",
        },
      }),
      {} as Record<
        Idioma,
        { nome: string; descricao: string; servicos: string[]; endereco: string }
      >
    ),
  }));

  /* campo de serviço temporário */
  const [servicoDraft, setServicoDraft] = useState("");

  /* helpers de serviço */
  const addServico = () => {
    const s = servicoDraft.trim();
    if (!s) return;
    setForm((prev) => {
      const atuais = prev.translations[idiomaAtivo].servicos;
      return {
        ...prev,
        translations: {
          ...prev.translations,
          [idiomaAtivo]: {
            ...prev.translations[idiomaAtivo],
            servicos: [...atuais, s],
          },
        },
      };
    });
    setServicoDraft("");
  };

  const removeServico = (idx: number) => {
    setForm((prev) => {
      const novos = prev.translations[idiomaAtivo].servicos.filter(
        (_, i) => i !== idx
      );
      return {
        ...prev,
        translations: {
          ...prev.translations,
          [idiomaAtivo]: {
            ...prev.translations[idiomaAtivo],
            servicos: novos,
          },
        },
      };
    });
  };

  /* submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      /* converte lista de serviços → string (1 por linha) */
      const translations = Object.entries(form.translations).map(
        ([language, dados]) => ({
          language,
          nome: dados.nome,
          descricao: dados.descricao,
          endereco: dados.endereco,
          servicos: dados.servicos.join("\n"),
        })
      );

      const payload = {
        email: form.email,
        phone: form.phone,
        category: categoria,
        layout,
        translations,
      };

      const { data } = await axios.post("/api/profissionais", payload);
      success("Profissional cadastrado com sucesso!", "Sucesso");
      reset();

      setTimeout(() => {
        router.push(`/profissional/${data.id}/layout${layout.slice(1)}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      error("Não foi possível salvar. Tente novamente.", "Erro");
    } finally {
      setIsLoading(false);
    }
  };

  /* placeholder durante redirecionamento */
  if (!categoria || !layout)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        Redirecionando…
      </div>
    );

  /* ─ UI ─ */
  const t = form.translations[idiomaAtivo];

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <AlertContainer alerts={alerts} />

      {/* resumo topo */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-400">
        <span>
          Categoria: <strong>{categoria}</strong> • Layout:{" "}
          <strong>{layout}</strong>
        </span>
        <button
          type="button"
          onClick={() => router.push("/cadastro/step/2")}
          className="text-primary underline"
        >
          Trocar
        </button>
      </div>

      {/* formulário */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* email / telefone */}
        <div className="grid sm:grid-cols-2 gap-6 border border-slate-700/50 p-6 rounded-xl bg-slate-800">
          <input
            className="input border border-slate-100/50 p-3 rounded-xl bg-slate-800"
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={isLoading}
            required
          />

          <input
            className="input border border-slate-100/50 p-3 rounded-xl bg-slate-800"
            placeholder="Telefone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={isLoading}
            required
          />
        </div>

        {/* switch de idioma */}
        <LanguageSwitcher
          idiomas={idiomas}
          ativo={idiomaAtivo}
          setAtivo={setIdiomaAtivo}
        />

        {/* nome / descricao / endereco */}
        {(["nome", "descricao", "endereco"] as const).map((campo) => (
          <input
            key={campo}
            className="input border border-slate-100/50 p-3 rounded-xl bg-slate-800 mr-4"
            placeholder={`${campo} (${idiomaAtivo})`}
            value={t[campo]}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                translations: {
                  ...prev.translations,
                  [idiomaAtivo]: {
                    ...prev.translations[idiomaAtivo],
                    [campo]: e.target.value,
                  },
                },
              }))
            }
            disabled={isLoading}
            required={idiomaAtivo === "PT" && campo === "nome"}
          />
        ))}

        {/* ───────────── SERVIÇOS (lista) ───────────── */}
        <div className="space-y-4">
          {/* input + botão adicionar */}
          <div className="flex gap-3">
            <input
              className="input flex-1 border border-slate-100/50 p-3 rounded-xl bg-slate-800"
              placeholder={`Novo serviço (${idiomaAtivo})`}
              value={servicoDraft}
              onChange={(e) => setServicoDraft(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={addServico}
              disabled={isLoading || !servicoDraft.trim()}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-accent/90 transition disabled:opacity-40"
            >
              + Add
            </button>
          </div>

          {/* chips/lista */}
          {t.servicos.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {t.servicos.map((s, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary-200 rounded-full text-sm"
                >
                  {s}
                  <button
                    type="button"
                    aria-label="Remover"
                    className="hover:text-red-400"
                    onClick={() => removeServico(idx)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ações */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/cadastro/step/2")}
            className="px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-500 transition"
            disabled={isLoading}
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-600 transition flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Salvando…
              </>
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
