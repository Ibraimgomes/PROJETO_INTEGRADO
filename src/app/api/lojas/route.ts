// app/api/lojas/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

// 🔒 IMPORTANTE: garante que a API rode no Node.js, não em Edge
export const config = {
  runtime: 'nodejs'
}

export async function GET(request: NextRequest) {
    try {
      const url = new URL(request.url)
      const isAdmin = url.searchParams.get('admin') === 'true'
  
      const lojas = await prisma.loja.findMany({
        where: isAdmin ? {} : { visivel: true },
        orderBy: { id: 'desc' },
      })
  
      return NextResponse.json(lojas)
    } catch (error) {
      console.error('Erro ao buscar lojas:', error)
      return NextResponse.json({ error: 'Erro ao buscar lojas' }, { status: 500 })
    }
  }
  

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const nome = formData.get('nome')?.toString() || ''
    const descricao = formData.get('descricao')?.toString() || ''
    const categoria = formData.get('categoria')?.toString() || ''
    const link = formData.get('link')?.toString() || ''
    const visivel = formData.get('visivel') === 'true'

    const clienteNome = formData.get('clienteNome')?.toString() || ''
    const clienteEmail = formData.get('clienteEmail')?.toString() || ''
    const clienteSenha = formData.get('clienteSenha')?.toString() || ''

    const logo = formData.get('logo') as File | null
    let nomeDaImagem = ''

    // Salva imagem se existir
    if (logo && typeof logo === 'object' && logo.size > 0) {
      const buffer = Buffer.from(await logo.arrayBuffer())
      const ext = logo.name.split('.').pop()
      const nomeArquivo = `${randomUUID()}.${ext}`

      const caminho = path.join(process.cwd(), 'public', 'logos', nomeArquivo)
      await writeFile(caminho, buffer)
      nomeDaImagem = nomeArquivo
    }

    // Criação do cliente
    const cliente = await prisma.user.create({
      data: {
        name: clienteNome,
        email: clienteEmail,
        password: await bcrypt.hash(clienteSenha, 10),
        role: 'cliente'
      }
    })

    // Criação da loja vinculada
    const loja = await prisma.loja.create({
      data: {
        nome,
        descricao,
        categoria,
        link,
        imagem: nomeDaImagem,
        visivel,
        clienteId: cliente.id
      }
    })

    return NextResponse.json(loja, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar loja:', error)
    return NextResponse.json(
      { error: 'Erro ao criar loja', detalhes: String(error) },
      { status: 500 }
    )
  }

  

}
