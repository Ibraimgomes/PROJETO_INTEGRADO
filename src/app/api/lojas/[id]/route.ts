// app/api/lojas/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
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

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.loja.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir loja' }, { status: 500 });
  }
}
