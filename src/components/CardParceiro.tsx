'use client'

import { motion } from 'framer-motion'

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
}: Parceiro) {
  const caminhoImagem = imagem.startsWith('http')
    ? imagem
    : `/logos/${imagem}`

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-white dark:bg-[#1b1b1b] border rounded-xl overflow-hidden shadow hover:shadow-md transition p-4 gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <img
        src={caminhoImagem}
        alt={`Logo de ${nome}`}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
      />

      <div className="flex-1 text-left">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base md:text-lg truncate">
          {nome}
        </h3>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center flex-wrap">
          <span className="text-yellow-500 font-medium">★ {avaliacao.toFixed(1)}</span>
          <span>• {categoria}</span>
          <span>• {distancia}</span>
        </div>
      </div>
    </motion.a>
  )
}
