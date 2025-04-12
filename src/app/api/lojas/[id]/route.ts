import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import slugify from 'slugify'
import sharp from 'sharp'
import fs from 'fs'

const prisma = new PrismaClient()




function getIdFromUrl(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const parts = pathname.split('/')
  const idStr = parts[parts.length - 1]
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req)
  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const formData = await req.formData()

    const nome = formData.get('nome')?.toString() || ''
    const descricao = formData.get('descricao')?.toString() || ''
    const categoria = formData.get('categoria')?.toString() || ''
    const link = formData.get('link')?.toString() || ''
    const visivel = formData.get('visivel') === 'true'

    let nomeDaImagem = undefined

    const logo = formData.get('logo') as File | null
    if (logo && typeof logo === 'object' && logo.size > 0) {
      if (logo.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: 'Imagem muito grande (máx: 2MB)' }, { status: 400 })
      }

      const buffer = Buffer.from(await logo.arrayBuffer())

      const nomeBase = slugify(`${nome}`, { lower: true, strict: true })
      let nomeArquivo = `${nomeBase}.webp`
      let caminho = path.join(process.cwd(), 'public', 'logos', nomeArquivo)

      let contador = 1
      while (fs.existsSync(caminho)) {
        nomeArquivo = `${nomeBase}-${contador}.webp`
        caminho = path.join(process.cwd(), 'public', 'logos', nomeArquivo)
        contador++
      }

      await sharp(buffer)
        .resize(300, 300)
        .toFormat('webp')
        .toFile(caminho)

      nomeDaImagem = nomeArquivo
    }

    const loja = await prisma.loja.update({
      where: { id },
      data: {
        nome,
        descricao,
        categoria,
        link,
        visivel,
        ...(nomeDaImagem && { imagem: nomeDaImagem }), // só atualiza se houver nova imagem
      },
    })

    return NextResponse.json(loja)
  } catch (error) {
    console.error('Erro ao atualizar loja:', error)
    return NextResponse.json({ error: 'Erro ao atualizar loja' }, { status: 500 })
  }
}
