// app/api/lojas/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Função auxiliar para extrair ID da URL
function getIdFromUrl(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const parts = pathname.split('/');
  const idStr = parts[parts.length - 1];
  const id = Number(idStr);
  return isNaN(id) ? null : id;
}

export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const dados = await req.json();

  try {
    const atualizada = await prisma.loja.update({
      where: { id },
      data: dados,
    });
    return NextResponse.json(atualizada);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar loja' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { visivel } = await req.json();

  try {
    const atualizada = await prisma.loja.update({
      where: { id },
      data: { visivel },
    });
    return NextResponse.json(atualizada);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ocultar loja' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.loja.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir loja' }, { status: 500 });
  }
}
