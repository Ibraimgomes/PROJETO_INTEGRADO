'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Loja {
  nome: string
  descricao: string
  categoria: string
  link: string
  imagem: string
  visivel: boolean
}

export default function MinhaConta() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [loja, setLoja] = useState<Loja | null>(null)
  const [erro, setErro] = useState("")

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login-cliente')
    }

    if (status === 'authenticated' && session?.user.role !== 'cliente') {
      router.push('/')
    }

    if (status === 'authenticated') {
      fetch('/api/minha-loja')
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErro(data.error)
          } else {
            setLoja(data)
          }
        })
        .catch(() => setErro("Erro ao carregar dados da loja."))
    }
  }, [status, session])

  if (status === 'loading') return <p className="text-center mt-10">Verificando sessão...</p>

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2 text-blue-700">
        Olá, {session?.user.name}!
      </h1>

      <div className="mb-4">
        <a
          href="/perfil-cliente"
          className="inline-block text-sm text-blue-600 underline hover:text-blue-800"
        >
          Ver meu perfil
        </a>
      </div>

      {erro && (
        <p className="text-red-600 font-semibold">{erro}</p>
      )}

      {loja ? (
        <div className="bg-white rounded-xl shadow p-6 mt-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Sua Loja</h2>

          {!loja.visivel && (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded border border-yellow-300 space-y-3">
              <p className="font-medium">⚠️ Sua loja está inativa no momento.</p>
              <a
                href="/total_conect#planos"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
              >
                Renovar minha assinatura
              </a>
            </div>
          )}

          <p><strong>Nome:</strong> {loja.nome}</p>
          <p><strong>Descrição:</strong> {loja.descricao}</p>
          <p><strong>Categoria:</strong> {loja.categoria}</p>
          <p>
            <strong>Link:</strong>{' '}
            <a href={loja.link} target="_blank" className="text-blue-600 underline">
              {loja.link}
            </a>
          </p>

          {loja.imagem && (
            <div className="mt-4">
              <p className="mb-1 font-semibold">Logo:</p>
              <img
                src={`/logos/${loja.imagem}`}
                alt="Logo da loja"
                className="w-32 h-32 object-contain border rounded"
              />
            </div>
          )}
        </div>
      ) : !erro ? (
        <p className="text-gray-600 mt-6">Carregando dados da loja...</p>
      ) : null}
    </main>
  )
}
