'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroCameTaOn() {
  return (
    <section className="relative bg-[#0f0f0f] text-white py-28 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Sua presença digital começa aqui
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Sites personalizados, agendamentos, WhatsApp integrado e automação — tudo para destacar seu negócio local.
        </p>

        <Link
          href="/total_conect#planos"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition"
        >
          Conheça nossos planos
        </Link>
      </motion.div>
    </section>
  )
}
