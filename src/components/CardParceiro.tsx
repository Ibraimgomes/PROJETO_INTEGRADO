'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export interface Parceiro {
  nome: string
  descricao: string
  link: string
  imagem?: string
  avaliacao?: number
  categoria?: string
  distancia?: string
  tempo?: string
  taxa?: string
  destaque?: string
}

export default function CardParceiro({
  nome,
  descricao,
  link,
  imagem = 'placeholder.jpg',
  avaliacao = 4.6,
  categoria = 'Serviços',
  distancia = '1.2 km',
  tempo,
  taxa,
  destaque,
}: Parceiro) {
  const caminhoImagem = imagem.startsWith('http')
    ? imagem
    : `/logos/${imagem}`

  const [expandir, setExpandir] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => setExpandir(!expandir)}
      onMouseEnter={() => setExpandir(true)}
      onMouseLeave={() => setExpandir(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4">
        <img
          src={caminhoImagem}
          alt={`Logo de ${nome}`}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />

        <div className="flex-1 text-left">
          <h3 className="font-bold text-gray-800 text-lg truncate">{nome}</h3>

          <div className="text-sm text-gray-500 flex gap-2 items-center flex-wrap">
            <span className="text-yellow-500 font-semibold">★ {avaliacao.toFixed(1)}</span>
            <span>• {categoria}</span>
            <span>• {distancia}</span>
          </div>

          {/* Detalhes extras ao expandir */}
          {expandir && (
            <motion.div
              className="mt-3 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {destaque && <p className="font-medium text-blue-600">📌 {destaque}</p>}
              <p>{descricao}</p>
              {tempo && <p>⏱ Tempo estimado: {tempo}</p>}
              {taxa && <p>💰 Taxa: {taxa}</p>}
            </motion.div>
          )}
        </div>
      </a>
    </motion.div>
  )
}
