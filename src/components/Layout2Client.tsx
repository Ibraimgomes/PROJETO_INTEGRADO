//src/components/Layout2Client.tsx
"use client";
import { useState, useMemo, useEffect } from "react";
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
      servicos: string; // one service per line
      endereco: string;
    }[];
  };
  idiomas: Idioma[];
}

export default function Layout2Client({ prof, idiomas }: Props) {
  const [lang, setLang] = useState<Idioma>("PT");
  const t = useMemo(() => {
    if (!prof.translations) return null;
    return prof.translations.find((tr) => tr.language === lang) ?? prof.translations[0];
  }, [prof, lang]);

  useEffect(() => {
    document.body.classList.add('!bg-white');
    return () => { document.body.classList.remove('!bg-white'); };
  }, []);

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700">Dados indisponíveis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#121826] font-sans">
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
          <div className="text-2xl font-bold">{t.nome}</div>
          <nav className="hidden lg:flex space-x-10">
            {/* Sobre dropdown */}
            <div className="relative group">
              <button className="flex items-center text-[#121826] hover:text-[#0CBBC5] transition">
                Sobre
                <svg className="ml-1 w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.516 7.548l4.484 4.514 4.484-4.514L16 9l-6 6-6-6z"/></svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white text-[#121826] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <a href="#sobre" className="block px-4 py-2 hover:bg-gray-100">Perfil</a>
                <a href="#missao" className="block px-4 py-2 hover:bg-gray-100">Missão</a>
              </div>
            </div>
            {/* Cursos dropdown */}
            <div className="relative group">
              <button className="flex items-center text-[#121826] hover:text-[#0CBBC5] transition">
                Cursos
                <svg className="ml-1 w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.516 7.548l4.484 4.514 4.484-4.514L16 9l-6 6-6-6z"/></svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white text-[#121826] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                {t.servicos.split("\n").filter(s => s.trim()).map((srv, i) => (
                  <a key={i} href={`#curso${i}`} className="block px-4 py-2 hover:bg-gray-100">{srv.split(':')[0].trim()}</a>
                ))}
              </div>
            </div>
            <a href="#contato" className="text-[#121826] hover:text-[#0CBBC5] transition">Contato</a>
          </nav>
          <LanguageSwitcher idiomas={idiomas} ativo={lang} setAtivo={setLang} />
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#121826] z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 items-center h-full px-6 gap-12">
          {/* Text Side */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white font-sans">
              Bem-vindo ao Espaço Educacional
            </h1>
            <p className="text-lg text-gray-200 max-w-lg">
              {t.descricao}
            </p>
            <a
              href="#cursos"
              className="inline-block bg-[#0CBBC5] text-white font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 transition"
            >
              Ver Cursos
            </a>
          </div>
          {/* Professor Image */}
          <div className="hidden lg:flex justify-end">
            <img
              src="/images/professor.png"
              alt="Professor"
              className="w-80 h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-[#121826] mb-4">Sobre Mim</h2>
          <div className="mx-auto w-20 h-1 bg-[#0CBBC5] mb-6"></div>
          <p className="text-[#121826] leading-relaxed whitespace-pre-line">
            {t.descricao}
          </p>
        </div>
      </section>

      {/* Cursos Section */}
      <section id="cursos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#121826] mb-12">Cursos Disponíveis</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.servicos.split("\n").filter(s => s.trim()).map((srv, i) => {
              const [title, desc] = srv.split(':');
              return (
                <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-[#121826] mb-2">{title.trim()}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{desc ? desc.trim() : ''}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-100 rounded-xl p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Notícias</h3>
              <p className="text-gray-700">Cadastre-se para receber artigos, boletins informativos e notícias</p>
            </div>
            <form className="flex w-full md:w-auto gap-4" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Tira Dúvidas Section */}
      <section id="tira-duvidas" className="py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 items-start">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Tem alguma dúvida?</h3>
            <p className="text-gray-700 whitespace-pre-line">Converse conosco, somos flexíveis em nossos atendimentos</p>
          </div>
          <div className="space-y-6">
            <div className="border-2 border-cyan-500 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="/images/professor.png"
                  alt={t.nome}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.nome}</p>
                  <p className="text-gray-600">Professor</p>
                </div>
              </div>
              <a href="#tira-duvidas" className="text-gray-900 text-2xl">→</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center text-[#121826] space-y-4">
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${prof.email}`} className="text-[#121826] hover:underline">
              {prof.email}
            </a>
          </p>
          <p>
            <strong>Telefone:</strong>{' '}
            <a href={`tel:${prof.phone}`} className="text-[#121826] hover:underline">
              {prof.phone}
            </a>
          </p>
          <p className="text-[#121826]">{t.endereco}</p>
          <p className="text-sm text-[#121826]">© {new Date().getFullYear()} {t.nome}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
