//src/components/Layout1Client.tsx
"use client";
import { useState, useMemo, useEffect, useRef } from "react";
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
  heroImages: string[];
  profilePhoto: string;
}

export default function Layout1Client({ prof, idiomas, heroImages, profilePhoto }: Props) {
  const [lang, setLang] = useState<Idioma>("PT");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const t = useMemo(() => {
    if (!prof.translations) return null;
    return prof.translations.find(tr => tr.language === lang) || prof.translations[0];
  }, [prof, lang]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowHeader(!(y > lastScrollY.current && y > 120));
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  if (!t) return <div>Traduções indisponíveis.</div>;

  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      {/* Header */}
      <header className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} fixed w-full bg-white shadow-md transition-transform duration-300 z-50`}>  
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
          <div className="text-xl md:text-2xl font-bold text-blue-900">{t.nome}</div>
          <nav className="hidden md:flex space-x-6">
            {['Home','Sobre','Serviços','Contato'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-700 transition">{item}</a>
            ))}
          </nav>
          <LanguageSwitcher idiomas={idiomas} ativo={lang} setAtivo={setLang} />
        </div>
      </header>

      {/* Hero with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4">Bem-vindo a página 1</h1>
          <p className="max-w-2xl text-lg md:text-2xl">{t.descricao}  </p>
        </div>
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 transition"
        >
          &#10094;
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % heroImages.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 transition"
        >
          &#10095;
        </button>
        <div className="absolute bottom-10 w-full flex justify-center space-x-2">
          {heroImages.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-4 md:px-0 gap-12">
        <img src={profilePhoto} alt={t.nome} className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="space-y-4 w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-blue-900">{t.nome}</h2>
          <div className="w-16 h-1 bg-blue-600 mb-4"></div>
          <p className="text-gray-700 leading-relaxed">
           Há 10 anos, Ibraim deixou sua carreira em engenharia para atender ao chamado da enfermagem.<p/>
Desde então, ele atua na UTI adulta, ajustando medicações, monitorando sinais vitais e realizando procedimentos com precisão técnico-científica.<p/>
Mas, para Ibraim, cuidar vai além do aspecto clínico: ele reserva um momento a cada plantão para conversar com pacientes e familiares, explicando cada etapa do tratamento de forma clara e oferecendo apoio emocional.<p/>
Nos intervalos, orienta estagiários, revisita protocolos de higiene e participa de grupos de estudo sobre humanização hospitalar.<p/>
Para Ibraim, a verdadeira cura acontece quando a técnica se alia à empatia, transformando cada gesto em esperança.<p/>
          </p>
         
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Serviços</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.servicos.split('\n').map((srv, i) => {
              const parts = srv.split(':');
              const title = parts[0].trim();
              const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
              return (
                <div key={i} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{title || `Serviço ${i+1}`}</h3>
                  <p className="text-gray-600">{desc || title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Entre em Contato</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Seu nome" className="p-4 border rounded focus:ring-2 focus:ring-blue-600" />
          <input type="email" placeholder="Seu e-mail" className="p-4 border rounded focus:ring-2 focus:ring-blue-600" />
          <textarea placeholder="Sua mensagem" className="col-span-1 md:col-span-2 p-4 border rounded focus:ring-2 focus:ring-blue-600 h-40 resize-none"></textarea>
          <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold">Enviar Mensagem</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Endereço</h4>
            <p className="text-gray-600">{t.endereco}</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Telefone</h4>
            <p className="text-gray-600">{prof.phone}</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">E-mail</h4>
            <p className="text-gray-600">{prof.email}</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Idiomas</h4>
            <p className="text-gray-600">{idiomas.join(', ')}</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} {t.nome}. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
