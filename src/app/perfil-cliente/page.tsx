'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const modoVisual = process.env.NEXT_PUBLIC_MODO_VISUAL === '1'

export default function PerfilCliente() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!modoVisual) {
      if (status === 'unauthenticated') {
        router.push('/login-cliente')
        return
      }
      if (session?.user.role !== 'cliente') {
        router.push('/')
        return
      }
    }

    if (session?.user || modoVisual) {
      setNome(session?.user?.name || 'Nome Teste')
      setEmail(session?.user?.email || 'teste@email.com')
    }
  }, [status, session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMensagem('')
    setErro('')

    try {
      const res = await fetch('/api/clientes/editar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar')

      setMensagem('Perfil atualizado com sucesso!')
      update() // força atualização da sessão
    } catch (err: any) {
      setErro(err.message || 'Erro ao atualizar')
    }
  }

  if (status === 'loading') return <p className="text-center mt-10">Carregando perfil...</p>

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Meu Perfil
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        {mensagem && <p className="text-green-600 font-medium">{mensagem}</p>}
        {erro && <p className="text-red-600 font-medium">{erro}</p>}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Salvar Alterações
        </button>
      </form>

      {!modoVisual && (
        <button
          onClick={() => signOut({ callbackUrl: '/login-cliente' })}
          className="mt-6 text-red-600 underline"
        >
          Sair da conta
        </button>
      )}
    </main>
  )
}
