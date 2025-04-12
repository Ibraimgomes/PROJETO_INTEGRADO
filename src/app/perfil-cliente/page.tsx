'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilCliente() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login-cliente')
    } else if (session?.user.role !== 'cliente') {
      router.push('/')
    } else if (session?.user) {
      setNome(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [status, session])

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

  if (status === 'loading') return <p className="text-center mt-10">Carregando perfil.teste..teste</p>

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Meu Perfilteste</h1>

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

      <button
        onClick={() => signOut({ callbackUrl: '/login-cliente' })}
        className="mt-6 text-red-600 underline"
      >
        Sair da conta
      </button>
    </main>
  )
}
