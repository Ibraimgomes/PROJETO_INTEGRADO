'use client'

import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import BarraNavegacao from '@/components/BarraNavegacao'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.title = 'TotalConect Painel'
  }, [])

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {/* TOPO FIXO EM TODAS AS PÁGINAS */}
          <BarraNavegacao />

          <main className="pt-4">{children}</main>

          {/* Rodapé padrão */}
          <footer className="border-t mt-10 py-6 text-center text-sm text-gray-600">
            <div className="flex justify-center gap-6"></div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
