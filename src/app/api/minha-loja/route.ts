import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/authOptions'

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'cliente') {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const loja = await prisma.loja.findFirst({
        where: { clienteId: Number(session.user.id) },
    })

    if (!loja) {
        return NextResponse.json({ error: 'Loja não encontrada' }, { status: 404 })
    }

    return NextResponse.json(loja)
}
