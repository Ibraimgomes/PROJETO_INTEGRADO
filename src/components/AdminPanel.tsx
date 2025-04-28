'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MapaEndereco from './MapaEndereco'

const modoVisual = process.env.NEXT_PUBLIC_MODO_VISUAL === '1'

interface Loja {
  id: number
  nome: string
  descricao: string
  categoria: string
  link: string
  imagem: string
  visivel: boolean
  endereco?: string
  horarioFuncionamento?: string
}

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formulario, setFormulario] = useState<Partial<Loja> & {
    clienteNome?: string
    clienteEmail?: string
    clienteSenha?: string
  }>({})
  const [lojas, setLojas] = useState<Loja[]>([])
  const [modoEdicao, setModoEdicao] = useState<number | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!modoVisual) {
      if (status === 'unauthenticated') {
        router.push('/login')
        return
      }
      if (session?.user.role !== 'admin') {
        router.push('/')
        return
      }
    }
    if (status === 'authenticated' || modoVisual) carregarLojas()
  }, [status, session, router])

  async function carregarLojas() {
    try {
      const res = await fetch('/api/lojas?admin=true')
      const data = await res.json()
      if (Array.isArray(data)) setLojas(data)
      else setMensagem('Erro ao carregar lojas.')
    } catch {
      setMensagem('Erro ao conectar com o servidor.')
    }
  }

  function atualizarCampo(campo: string, valor: string) {
    setFormulario(prev => ({ ...prev, [campo]: valor }))
  }

  function iniciarEdicao(loja: Loja) {
    setModoEdicao(loja.id)
    setFormulario({
      nome: loja.nome,
      descricao: loja.descricao,
      categoria: loja.categoria,
      link: loja.link,
      endereco: loja.endereco,
      horarioFuncionamento: loja.horarioFuncionamento,
      clienteNome: session?.user.name,
      clienteEmail: session?.user.email,
    })
    setLogoPreview(loja.imagem ? `/logos/${loja.imagem}` : null)
  }

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(formulario).forEach(([k, v]) => v && formData.append(k, v.toString()))
    formData.append('visivel', 'true')
    if (logo) formData.append('logo', logo)

    const url = modoEdicao
      ? `/api/lojas/${modoEdicao}`
      : '/api/lojas'
    const method = modoEdicao ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, { method, body: formData })
      if (!res.ok) throw new Error()
      setMensagem(modoEdicao ? 'Loja atualizada!' : 'Loja criada!')
      setFormulario({})
      setLogo(null)
      setLogoPreview(null)
      setModoEdicao(null)
      carregarLojas()
    } catch {
      setMensagem('Erro ao salvar loja.')
    }
  }

  async function toggleVisibilidade(id: number, visivel: boolean) {
    await fetch(`/api/lojas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visivel }),
    })
    carregarLojas()
  }

  async function excluirLoja(id: number) {
    if (confirm('Confirmar exclusão?')) {
      await fetch(`/api/lojas/${id}`, { method: 'DELETE' })
      carregarLojas()
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <header className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Logado como: <strong>{session?.user?.name || 'Modo Visual'}</strong>
          </p>
          {!modoVisual && (
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 hover:underline text-sm">
              Sair
            </button>
          )}
        </header>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            {modoEdicao ? 'Editar Loja' : 'Cadastrar Nova Loja'}
          </h1>
          {mensagem && <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">{mensagem}</div>}

          <form onSubmit={enviarFormulario} className="grid gap-4 sm:grid-cols-2">
            {/* ...os inputs conforme seu design original... */}
          </form>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lojas Cadastradas</h2>
          {/* ...listagem de lojas conforme seu JSX original... */}
        </section>
      </div>
    </main>
  )
}
