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
      onClick={() => setExpandir(!expandir)}
      onMouseEnter={() => setExpandir(true)}
      onMouseLeave={() => setExpandir(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#e8edf5] text-gray-800 rounded-2xl shadow-[20px_20px_60px_#c5cbd6,-20px_-20px_60px_#ffffff] p-5 transition-all duration-300 cursor-pointer hover:shadow-[10px_10px_30px_#c5cbd6,-10px_-10px_30px_#ffffff]"
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center">
        <img
          src={caminhoImagem}
          alt={`Logo de ${nome}`}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-white shadow-md"
        />

        <div className="flex-1 text-left">
          <h3 className="font-bold text-gray-700 text-lg truncate">{nome}</h3>

          <div className="text-sm text-gray-600 flex gap-2 flex-wrap">
            <span className="text-blue-600 font-semibold">★ {avaliacao.toFixed(1)}</span>
            <span>• {categoria}</span>
            <span>• {distancia}</span>
          </div>

          {expandir && (
            <motion.div
              className="mt-3 text-sm text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {destaque && <p className="font-medium text-blue-500">📌 {destaque}</p>}
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
