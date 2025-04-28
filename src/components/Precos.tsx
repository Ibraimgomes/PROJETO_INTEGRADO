'use client'

import { useRef, useEffect } from 'react'

const planos = [
  {
    nome: "Plano 1 – Vitrine Digital",
    preco: "R$ 59",
    parcela: "R$ 80 criação",
    destaque: false,
    beneficios: [
      { texto: "Página única estilo ‘link na bio’", incluso: true },
      { texto: "Subdomínio próprio", incluso: true },
      { texto: "Links para redes sociais", incluido: true },
      { texto: "Botão de WhatsApp", incluso: true },
      { texto: "Inclusão no portal cameTáOn", incluso: true },
      { texto: "1 foto ou vídeo como banner", incluso: true },
      { texto: "Até 2 páginas no subdomínio", incluso: false },
      { texto: "Google Meu Negócio + Analytics", incluso: false },
      { texto: "Sistema de agendamento", incluso: false },
      { texto: "Vídeo institucional", incluso: false },
      { texto: "Consultoria ou eventos mensais", incluso: false },
    ]
  },
  {
    nome: "Plano 2 – Conexão Local",
    preco: "R$ 150",
    parcela: "R$ 150 criação",
    destaque: false,
    beneficios: [
      { texto: "Página única estilo ‘link na bio’", incluso: true },
      { texto: "Subdomínio próprio", incluso: true },
      { texto: "Links para redes sociais", incluso: true },
      { texto: "Botão de WhatsApp", incluso: true },
      { texto: "Inclusão no portal cameTáOn", incluso: true },
      { texto: "1 foto ou vídeo como banner", incluso: true },
      { texto: "Até 2 páginas no subdomínio", incluso: true },
      { texto: "Google Meu Negócio + Analytics", incluso: true },
      { texto: "Sistema de agendamento", incluso: false },
      { texto: "Vídeo institucional", incluso: true },
      { texto: "Consultoria ou eventos mensais", incluso: false },
    ]
  },
  {
    nome: "Plano 3 – Atendimento Digital",
    preco: "R$ 250",
    parcela: "R$ 250 criação",
    destaque: true,
    beneficios: [
      { texto: "Página única estilo ‘link na bio’", incluso: true },
      { texto: "Subdomínio próprio", incluso: true },
      { texto: "Links para redes sociais", incluso: true },
      { texto: "Botão de WhatsApp", incluso: true },
      { texto: "Inclusão no portal cameTáOn", incluso: true },
      { texto: "1 foto ou vídeo como banner", incluso: true },
      { texto: "Até 2 páginas no subdomínio", incluso: true },
      { texto: "Google Meu Negócio + Analytics", incluso: true },
      { texto: "Sistema de agendamento", incluso: true },
      { texto: "Vídeo institucional", incluso: true },
      { texto: "Consultoria ou eventos mensais", incluso: false },
    ]
  },
  {
    nome: "Plano 4 – Automação Total",
    preco: "R$ 390",
    parcela: "R$ 350 criação",
    destaque: false,
    beneficios: [
      { texto: "Página única estilo ‘link na bio’", incluso: true },
      { texto: "Subdomínio próprio", incluso: true },
      { texto: "Links para redes sociais", incluso: true },
      { texto: "Botão de WhatsApp", incluso: true },
      { texto: "Inclusão no portal cameTáOn", incluso: true },
      { texto: "1 foto ou vídeo como banner", incluso: true },
      { texto: "Até 2 páginas no subdomínio", incluso: true },
      { texto: "Google Meu Negócio + Analytics", incluso: true },
      { texto: "Sistema de agendamento", incluso: true },
      { texto: "Vídeo institucional", incluso: true },
      { texto: "Consultoria ou eventos mensais", incluso: true },
    ]
  }
]

export default function Precos() {
  const containerRef = useRef<HTMLDivElement>(null)
  // const [scrollX, setScrollX] = useState(0)

  function scrollToLeft() {
    containerRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
  }

  function scrollToRight() {
    containerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
    }
  }, [])

  return (
    <section id="planos" className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Planos cameTáOn</h2>

      <div className="relative">
        <button
          onClick={scrollToLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        >
          ◀
        </button>

        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide flex gap-6 md:justify-center snap-x snap-mandatory px-1"
        >
          {planos.map((plano, idx) => (
            <div
              key={idx}
              className={`min-w-[280px] md:min-w-[300px] max-w-[350px] snap-center bg-white border rounded-xl p-6 shadow transition hover:shadow-md flex-shrink-0 ${plano.destaque ? 'border-blue-500' : 'border-gray-200'
                }`}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plano.nome}</h3>
              <p className="text-gray-500 mb-1">{plano.parcela}</p>
              <p className="text-3xl font-bold text-blue-700 mb-4">{plano.preco}<span className="text-base font-medium">/mês</span></p>

              <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mb-4">
                Quero esse plano
              </button>

              <ul className="text-sm text-gray-700 space-y-2 border-t pt-4">
                {plano.beneficios.map((b, i) => (
                  <li key={i} className={`flex items-start gap-2 ${!b.incluso ? 'text-gray-400 line-through' : ''}`}>
                    <span>{b.incluso ? '✔' : '–'}</span>
                    <span>{b.texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        >
          ▶
        </button>
      </div>
    </section>
  )
}
