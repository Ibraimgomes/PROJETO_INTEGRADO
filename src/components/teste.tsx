
import Head from 'next/head';
import { useEffect, useState } from 'react';

const images = [
  'https://source.unsplash.com/random/1600x900?business',
  'https://source.unsplash.com/random/1600x900?technology',
  'https://source.unsplash.com/random/1600x900?startup',
];

export default function Home() {
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let lastPos = 0;
    const onScroll = () => {
      const current = window.pageYOffset;
      if (current > lastPos && current > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastPos = current;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Landing Page Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full bg-white/95 border-b border-[#ffd2cc] z-50 transition-transform duration-300 ${
          navHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="mx-auto max-w-[1200px] flex justify-between items-center py-3 px-4">
          <span className="text-[#fa8072] font-bold text-lg">Brand</span>
          <div className="hidden sm:flex gap-4 font-medium text-gray-800">
            <a href="#hero" className="hover:text-[#fa8072]">Início</a>
            <a href="#sobre" className="hover:text-[#fa8072]">Sobre</a>
            <a href="#servicos" className="hover:text-[#fa8072]">Serviços</a>
            <a href="#contato" className="hover:text-[#fa8072]">Contato</a>
          </div>
        </nav>
      </header>

      {/* HERO / CARROSSEL */}
      <section id="hero" className="pt-16">
        <div className="relative w-full h-[60vh] overflow-hidden">
          <div className="flex w-[300%] h-full animate-slide">
            {images.map((src, i) => (
              <div key={i} className="w-full flex-shrink-0 h-full">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-[#ffd2cc] py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-[#fa8072] mb-6">Sobre Nós</h2>
        <p className="max-w-3xl mx-auto text-gray-800">
          Somos uma empresa fictícia dedicada a fornecer soluções criativas e eficientes para
          impulsionar o crescimento de negócios de todos os portes. Nossa missão é transformar
          ideias em projetos de sucesso.
        </p>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-[#fa8072] text-center mb-10">Serviços</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto">
          {[
            {
              title: 'Consultoria Digital',
              desc: 'Ajudamos a definir estratégias digitais para aumentar presença online e engajamento.',
            },
            {
              title: 'Criação de Sites',
              desc: 'Desenvolvimento de sites modernos e responsivos que representam sua marca.',
            },
            {
              title: 'Marketing de Conteúdo',
              desc: 'Produção de conteúdo relevante para atrair e reter seu público-alvo.',
            },
            {
              title: 'Design Gráfico',
              desc: 'Criação de identidades visuais únicas e alinhadas com sua proposta.',
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-white border-2 border-[#ffd2cc] rounded-lg p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform"
            >
              <h3 className="text-xl font-semibold text-[#fa8072] mb-2">{s.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="bg-[#ffd2cc] py-16 px-4">
        <h2 className="text-3xl font-semibold text-[#fa8072] text-center mb-8">Fale Conosco</h2>
        <form className="flex flex-col gap-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Nome"
            required
            className="border border-[#ffd2cc] rounded-md py-3 px-4 outline-none focus:border-[#fa8072]"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-[#ffd2cc] rounded-md py-3 px-4 outline-none focus:border-[#fa8072]"
          />
          <textarea
            rows={5}
            placeholder="Sua mensagem"
            required
            className="border border-[#ffd2cc] rounded-md py-3 px-4 outline-none focus:border-[#fa8072] resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-[#fa8072] text-white rounded-md py-3 px-6 font-medium hover:bg-[#e06b5f] transition-colors"
          >
            Enviar Mensagem
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-600 py-6">© 2025 Brand. Todos os direitos reservados.</footer>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          33% {
            transform: translateX(-100%);
          }
          66% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(-300%);
          }
        }
        .animate-slide {
          animation: slide 15s infinite;
        }
      `}</style>
    </>
  );
}
