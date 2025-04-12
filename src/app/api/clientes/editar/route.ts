import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'cliente') {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { name, email } = await req.json()

    try {
        const atualizado = await prisma.user.update({
            where: { id: Number(session.user.id) },
            data: {
                name,
                email,
            },
        })

        return NextResponse.json({ ok: true, user: atualizado })
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error)
        return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 })
    }
}
