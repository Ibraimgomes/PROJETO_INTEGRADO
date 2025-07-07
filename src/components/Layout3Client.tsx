
// src/components/Layout3Client.tsx
"use client";
import { useState, useMemo, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Idioma } from "@/types/idioma";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Youtube,
  MessageCircle,
  Users,
  BookOpen,
} from 'lucide-react';

interface ProfissionalComTrad {
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

interface Testimonial {
  name: string;
  subtitle: string;
  photo: string;
  text: string;
}

interface Props {
  prof: ProfissionalComTrad;
  idiomas: Idioma[];
  activeLang: Idioma;
}

export default function Layout3Client({ prof, idiomas, activeLang }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // language state
  const [lang, setLangState] = useState<Idioma>(activeLang);
  const setLang: Dispatch<SetStateAction<Idioma>> = (value) => {
    const newLang = typeof value === 'function'
      ? (value as (prev: Idioma) => Idioma)(lang)
      : value;
    setLangState(newLang);
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const t = useMemo(
    () => prof.translations.find(tr => tr.language === lang) || prof.translations[0],
    [prof, lang]
  );

  // header hide on scroll
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowHeader(y < lastScrollY.current || y < 50);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // courses parsing
  const cursos = t.servicos.split("\n").filter(c => c.trim()).map(c => {
    const [title, price] = c.split("|");
    return { title: title.trim(), price: price?.trim() };
  });

  // mock testimonials
  const testimonials: Testimonial[] = [
    { name: "Jéssica de Sá", subtitle: "2º lugar no concurso de Betim", photo: "/img/teste1.jpg", text: `O curso é muito bom...` },
    { name: "Carlos Pereira", subtitle: "Aprovado em UFMG", photo: "/img/teste2.jpg", text: `Metodologia clara...` },
    { name: "Mariana Oliveira", subtitle: "Passou na USP", photo: "/img/teste3.jpg", text: `As videoaulas são...` },
    { name: "Pedro Alves", subtitle: "Concurso da ALEMG", photo: "/img/teste4.jpg", text: `Excelente suporte...` },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((idx + 1) % testimonials.length);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} fixed top-0 w-full bg-black text-white transition-transform duration-300 z-50`}>  
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold">
            {t.nome} <span className="text-cyan-400">Professora</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {['início','cursos','depoimentos','quemsoueu'].map(item => (
              <a key={item} href={`#${item}`} className="capitalize hover:text-cyan-400 transition">
                {item.replace(/quemsoueu/, 'quem sou eu')}
              </a>
            ))}
          </nav>
          <LanguageSwitcher idiomas={idiomas} ativo={lang} setAtivo={setLang} />
        </div>
      </header>

      {/* Hero */}
      <section id="início" className="relative h-screen">
        <img src="/img/prof.jpeg" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-3">Aulas particulares e Concursos Públicos</h1>
          <p className="text-2xl md:text-3xl text-gray-200">Ajudando pessoas a conquistarem sua aprovação</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pink-500 text-white py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">INSCREVA-SE PARA RECEBER NOVIDADES</h2>
          <p className="mb-6">Cadastre-se para receber novidades e dicas de ensino e concursos públicos.</p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="text" placeholder="Nome" className="w-full md:w-1/3 p-4 rounded-full border-2 border-cyan-400 focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full md:w-1/3 p-4 rounded-full border-2 border-cyan-400 focus:outline-none" />
            <button type="submit" className="bg-cyan-400 text-black py-4 px-8 rounded-full hover:bg-cyan-500 transition">Inscreva-se</button>
          </form>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="py-20 bg-black/80 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">ENCONTRE O CURSO CERTO PARA SEU <span className="text-pink-500">OBJETIVO</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((c, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/img/course${i+1}.jpg')` }} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-black">{c.title}</h3>
                  <p className="text-gray-700 mb-4">R$ {c.price} ou em parcelas</p>
                  <a href="#" className="inline-block bg-cyan-400 text-black py-2 px-4 rounded-full hover:bg-cyan-500 transition">Saiba Mais</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-[#F2E300]">
        <div className="max-w-6xl mx-auto px-4 relative text-[#121826] text-center">
          <h2 className="text-3xl font-bold mb-8">Conheça os alunos que <span className="text-pink-500">conquistaram</span> a aprovação</h2>
          <blockquote className="p-8 bg-[#F2E300] shadow-lg rounded-lg mx-auto max-w-3xl">
            <img src={testimonials[idx].photo} alt={testimonials[idx].name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="font-semibold text-xl mb-1">{testimonials[idx].name}</p>
            <p className="text-pink-500 mb-4">{testimonials[idx].subtitle}</p>
            <p className="leading-relaxed whitespace-pre-line">{testimonials[idx].text}</p>
          </blockquote>
          <button onClick={prev} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={next} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"><ChevronRight className="w-8 h-8" /></button>
          <div className="flex justify-center mt-6 gap-2">testimonial pagination</div>
        </div>
      </section>

      {/* Quem sou eu */}
      <section id="quemsoueu" className="py-20 bg-black/90 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <img src="/img/professor.png" alt={t.nome} className="rounded-xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4 text-pink-500">Quem sou eu</h2>
            <p className="leading-relaxed whitespace-pre-line">{t.descricao}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <p>© {new Date().getFullYear()} {t.nome}</p>
          <div className="flex justify-center gap-6">
            <Instagram /> <Youtube /> <MessageCircle /> <Users /> <BookOpen />
          </div>
        </div>
      </footer>
    </div>
  );
}
