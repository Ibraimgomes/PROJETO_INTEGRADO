// app/api/lojas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import sharp from 'sharp'
import slugify from 'slugify'

import fs from 'fs'

export const config = {
  runtime: 'nodejs',
}

// 🚀 POST: Cria uma nova loja e vincula a um cliente
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

    // 🖼️ Salva a imagem da logo se existir
    if (logo && typeof logo === 'object' && logo.size > 0) {
      if (!clienteNome || !nome) {
        return NextResponse.json({ error: 'Nome do cliente e da loja são obrigatórios para salvar a imagem.' }, { status: 400 })
      }

      if (logo.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: 'Imagem muito grande (máx: 2MB)' }, { status: 400 })
      }

      const buffer = Buffer.from(await logo.arrayBuffer())

      const nomeBase = slugify(`${clienteNome}-${nome}`, { lower: true, strict: true })
      let nomeArquivo = `${nomeBase}.webp`
      let caminho = path.join(process.cwd(), 'public', 'logos', nomeArquivo)

      // Evita sobrescrever imagens existentes
      let contador = 1
      while (fs.existsSync(caminho)) {
        nomeArquivo = `${nomeBase}-${contador}.webp`
        caminho = path.join(process.cwd(), 'public', 'logos', nomeArquivo)
        contador++
      }

      // Redimensiona e salva como .webp
      await sharp(buffer)
        .resize(300, 300)
        .toFormat('webp')
        .toFile(caminho)

      nomeDaImagem = nomeArquivo
    }

    // 👤 Criação do cliente
    const cliente = await prisma.user.create({
      data: {
        name: clienteNome,
        email: clienteEmail,
        password: await bcrypt.hash(clienteSenha, 10),
        role: 'cliente',
      },
    })

    // 🏪 Criação da loja vinculada
    const loja = await prisma.loja.create({
      data: {
        nome,
        descricao,
        categoria,
        link,
        imagem: nomeDaImagem,
        visivel,
        clienteId: cliente.id,
      },
    })

    return NextResponse.json(loja, { status: 201 })
  } catch (error) {
    console.error('❌ Erro ao criar loja:', error)

    return NextResponse.json(
      {
        error: 'Erro ao criar loja',
        detalhes: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    )
  }
}
