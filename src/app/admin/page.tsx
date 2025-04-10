'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Loja {
  id: number
  nome: string
  descricao: string
  categoria: string
  link: string
  imagem: string
  visivel: boolean
}

export default function PaginaAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formulario, setFormulario] = useState<Partial<Loja> & {
    clienteNome?: string
    clienteEmail?: string
    clienteSenha?: string
  }>({})
  const [lojas, setLojas] = useState<Loja[]>([])
  const [modoEdicao, setModoEdicao] = useState<null | number>(null)
  const [mensagem, setMensagem] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      carregarLojas()
    }
  }, [status])

  async function carregarLojas() {
    try {
      const res = await fetch("/api/lojas?admin=true")
      const contentType = res.headers.get("content-type") || ""
      if (!contentType.includes("application/json")) {
        console.error("Resposta inválida:", await res.text())
        setMensagem("Erro ao buscar lojas.")
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) {
        setLojas(data)
      } else {
        setMensagem("Erro ao carregar lojas.")
      }
    } catch (err) {
      console.error("Erro ao carregar lojas:", err)
      setMensagem("Erro ao conectar com o servidor.")
    }
  }

  function atualizarCampo(
    campo: keyof (Loja & { clienteNome: string; clienteEmail: string; clienteSenha: string }),
    valor: string | boolean
  ) {
    setFormulario((dados) => ({ ...dados, [campo]: valor }))
  }

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nome', formulario.nome || '')
    formData.append('descricao', formulario.descricao || '')
    formData.append('categoria', formulario.categoria || '')
    formData.append('link', formulario.link || '')
    formData.append('clienteNome', formulario.clienteNome || '')
    formData.append('clienteEmail', formulario.clienteEmail || '')
    formData.append('clienteSenha', formulario.clienteSenha || '')
    formData.append('visivel', 'true')
    if (logo) formData.append('logo', logo)

    try {
      const res = await fetch('/api/lojas', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const texto = await res.text()
        console.error('Erro na resposta da API:', texto)
        setMensagem("Erro ao salvar loja.")
        return
      }

      const data = await res.json()
      setMensagem("Loja salva com sucesso!")
      setFormulario({})
      setLogo(null)
      setLogoPreview(null)
      setModoEdicao(null)
      carregarLojas()
    } catch (err) {
      console.error('Erro inesperado:', err)
      setMensagem("Erro ao conectar com a API.")
    }
  }

  async function ocultarLoja(id: number) {
    await fetch(`/api/lojas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visivel: false })
    })
    carregarLojas()
  }

  async function reativarLoja(id: number) {
    await fetch(`/api/lojas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visivel: true })
    })
    carregarLojas()
  }

  async function excluirLoja(id: number) {
    if (confirm("Tem certeza que deseja excluir permanentemente esta loja?")) {
      await fetch(`/api/lojas/${id}`, { method: "DELETE" })
      carregarLojas()
    }
  }

  const lojasAtivas = lojas.filter((l) => l.visivel)
  const lojasOcultas = lojas.filter((l) => !l.visivel)

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-8">
        <p className="text-gray-600">
          Logado como: <strong>{session?.user?.name}</strong>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-red-600 hover:underline text-sm"
        >
          Sair
        </button>
      </header>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        {modoEdicao ? "Editar Loja" : "Cadastro de Lojas Parceiras"}
      </h1>

      <form onSubmit={enviarFormulario} className="grid gap-4 sm:grid-cols-2 mb-10">
        <input type="text" placeholder="Nome" value={formulario.nome || ""} onChange={(e) => atualizarCampo("nome", e.target.value)} className="border rounded px-4 py-2" required />
        <input type="text" placeholder="Descrição" value={formulario.descricao || ""} onChange={(e) => atualizarCampo("descricao", e.target.value)} className="border rounded px-4 py-2" required />
        <input type="text" placeholder="Categoria" value={formulario.categoria || ""} onChange={(e) => atualizarCampo("categoria", e.target.value)} className="border rounded px-4 py-2" required />
        <input type="url" placeholder="Link do site" value={formulario.link || ""} onChange={(e) => atualizarCampo("link", e.target.value)} className="border rounded px-4 py-2" required />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setLogo(file)
              setLogoPreview(URL.createObjectURL(file))
            }
          }}
          className="border rounded px-4 py-2 sm:col-span-2"
        />
        {logoPreview && (
          <img src={logoPreview} alt="Preview da logo" className="w-32 mt-2 rounded shadow" />
        )}

        <input type="text" placeholder="Nome do cliente" value={formulario.clienteNome || ""} onChange={(e) => atualizarCampo("clienteNome", e.target.value)} className="border rounded px-4 py-2" required />
        <input type="email" placeholder="Email do cliente" value={formulario.clienteEmail || ""} onChange={(e) => atualizarCampo("clienteEmail", e.target.value)} className="border rounded px-4 py-2" required />
        <input type="password" placeholder="Senha do cliente" value={formulario.clienteSenha || ""} onChange={(e) => atualizarCampo("clienteSenha", e.target.value)} className="border rounded px-4 py-2 sm:col-span-2" required />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">
          {modoEdicao ? "Atualizar loja" : "Cadastrar loja"}
        </button>
      </form>

      {mensagem && <p className="text-green-600 font-medium mb-6">{mensagem}</p>}

      {/* Lista de lojas cadastradas */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lojas Cadastradas</h2>

        {lojas.length === 0 ? (
          <p className="text-gray-500">Nenhuma loja cadastrada ainda.</p>
        ) : (
          <ul className="space-y-4">
            {lojas.map((loja) => (
              <li key={loja.id} className={`p-4 border rounded shadow-sm ${loja.visivel ? 'bg-white' : 'bg-red-50'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{loja.nome}</h3>
                    <p className="text-sm text-gray-600">{loja.descricao}</p>
                    <p className="text-xs text-blue-600">{loja.link}</p>
                    {!loja.visivel && <span className="text-red-600 font-semibold">[Loja Oculta]</span>}
                    {loja.imagem && (
                      <img
                        src={`/logos/${loja.imagem}`}
                        alt="Logo da loja"
                        className="w-20 h-auto mt-2 rounded"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-right">
                    <button onClick={() => setModoEdicao(loja.id)} className="text-yellow-600 hover:underline">Editar</button>
                    <button onClick={() => loja.visivel ? ocultarLoja(loja.id) : reativarLoja(loja.id)} className="text-blue-600 hover:underline">
                      {loja.visivel ? "Ocultar" : "Reativar"}
                    </button>
                    <button onClick={() => excluirLoja(loja.id)} className="text-red-600 hover:underline">Excluir</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
