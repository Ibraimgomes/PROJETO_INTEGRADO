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
    if (status === 'authenticated' || modoVisual) loadStores()
  }, [status, session, router])

  async function loadStores() {
    try {
      const res = await fetch('/api/lojas?admin=true')
      const data = await res.json()
      if (Array.isArray(data)) setLojas(data)
      else setMensagem('Erro ao carregar lojas.')
    } catch {
      setMensagem('Erro ao conectar com o servidor.')
    }
  }

  function updateField(field: string, value: string) {
    setFormulario(prev => ({ ...prev, [field]: value }))
  }

  function startEdit(store: Loja) {
    setModoEdicao(store.id)
    setFormulario({
      nome: store.nome,
      descricao: store.descricao,
      categoria: store.categoria,
      link: store.link,
      endereco: store.endereco || '',
      horarioFuncionamento: store.horarioFuncionamento || '',
      clienteNome: session?.user.name,
      clienteEmail: session?.user.email,
    })
    setLogoPreview(store.imagem ? `/logos/${store.imagem}` : null)
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(formulario).forEach(([k, v]) => v && formData.append(k, v.toString()))
    formData.append('visivel', 'true')
    if (logo) formData.append('logo', logo)

    const url = modoEdicao ? `/api/lojas/${modoEdicao}` : '/api/lojas'
    const method = modoEdicao ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, { method, body: formData })
      if (!res.ok) throw new Error()
      setMensagem(modoEdicao ? 'Loja atualizada!' : 'Loja criada!')
      setFormulario({})
      setLogo(null)
      setLogoPreview(null)
      setModoEdicao(null)
      loadStores()
    } catch {
      setMensagem('Erro ao salvar loja.')
    }
  }

  async function toggleVisibility(id: number, visible: boolean) {
    await fetch(`/api/lojas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visivel: visible }),
    })
    loadStores()
  }

  async function deleteStore(id: number) {
    if (confirm('Tem certeza que deseja excluir esta loja?')) {
      await fetch(`/api/lojas/${id}`, { method: 'DELETE' })
      loadStores()
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

        <section className="bg-white p-6 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            {modoEdicao ? 'Editar Loja' : 'Cadastrar Nova Loja'}
          </h1>
          {mensagem && <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">{mensagem}</div>}
          <form onSubmit={submitForm} className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Nome" value={formulario.nome || ''} onChange={e => updateField('nome', e.target.value)} className="input" required />
            <input type="text" placeholder="Descrição" value={formulario.descricao || ''} onChange={e => updateField('descricao', e.target.value)} className="input" required />
            <input type="text" placeholder="Categoria" value={formulario.categoria || ''} onChange={e => updateField('categoria', e.target.value)} className="input" required />
            <input type="url" placeholder="Link" value={formulario.link || ''} onChange={e => updateField('link', e.target.value)} className="input" required />
            <MapaEndereco endereco={formulario.endereco || ''} setEndereco={v => updateField('endereco', v)} />
            <input type="text" placeholder="Horário" value={formulario.horarioFuncionamento || ''} onChange={e => updateField('horarioFuncionamento', e.target.value)} className="input sm:col-span-2" required />
            <input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) { setLogo(file); setLogoPreview(URL.createObjectURL(file)); } }} className="sm:col-span-2" />
            {logoPreview && <Image src={logoPreview} alt="Preview" width={128} height={128} className="rounded shadow mt-2" />}
            <input type="text" placeholder="Cliente Nome" value={formulario.clienteNome || ''} onChange={e => updateField('clienteNome', e.target.value)} className="input" required />
            <input type="email" placeholder="Cliente Email" value={formulario.clienteEmail || ''} onChange={e => updateField('clienteEmail', e.target.value)} className="input" required />
            {!modoVisual && <input type="password" placeholder="Senha" value={formulario.clienteSenha || ''} onChange={e => updateField('clienteSenha', e.target.value)} className="input sm:col-span-2" required />}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">{modoEdicao ? 'Atualizar' : 'Cadastrar'}</button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lojas Cadastradas</h2>
          {lojas.length === 0 ? (
            <p className="text-gray-500">Nenhuma loja cadastrada.</p>
          ) : (
            lojas.map(store => (
              <div key={store.id} className={`p-4 border rounded-xl shadow-sm ${!store.visivel ? 'bg-red-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold">{store.nome}</h3>
                    <p className="text-sm text-gray-600">{store.descricao}</p>
                    <p className="text-xs text-blue-600">{store.link}</p>
                    {store.endereco && <p className="text-sm text-gray-700 mt-1">📍 {store.endereco}</p>}
                    {store.horarioFuncionamento && <p className="text-sm text-gray-600 italic">🕒 {store.horarioFuncionamento}</p>}
                    {!store.visivel && <span className="text-red-500 font-semibold block mt-1">[Oculta]</span>}
                    {store.imagem && <Image src={`/logos/${store.imagem}`} alt="Logo" width={64} height={64} className="rounded mt-2" />}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm">
                    <button onClick={() => startEdit(store)} className="text-yellow-600 hover:underline">Editar</button>
                    <button onClick={() => toggleVisibility(store.id, !store.visivel)} className="text-blue-600 hover:underline">{store.visivel ? 'Ocultar' : 'Reativar'}</button>
                    <button onClick={() => deleteStore(store.id)} className="text-red-600 hover:underline">Excluir</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
