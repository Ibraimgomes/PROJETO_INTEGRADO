import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers" // Importa o Provider corrigido
import type { Metadata } from "next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TotalConect Painel",
  description: "Administração de lojas locais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}

          {/* Rodapé com os links de login */}
          <footer className="border-t mt-10 py-6 text-center text-sm text-gray-600">
            <div className="flex justify-center gap-6">
              <a href="/login-cliente" className="hover:underline text-blue-600">
                Área do Cliente
              </a>
              <a href="/login" className="hover:underline text-blue-600">
                Área Administrativa
              </a>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

