'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginCliente() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      senha
    })

    if (res?.ok) {
      router.push('/minha-conta') // redireciona para área do cliente
    } else {
      setErro('Login inválido')
    }
  }

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Login do Cliente</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Teste11
        </button>
        {erro && <p className="text-red-600">{erro}</p>}
      </form>
    </main>
  )
}
