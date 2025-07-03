import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, phone, category, layout, translations } = await req.json();

    // Faz upsert com base no e-mail (se já existir, atualiza)
    const novo = await prisma.profissional.upsert({
      where: { email },
      update: {
        phone,
        category,
        layout,
        translations: {
          deleteMany: {}, // Remove traduções antigas
          create: translations,
        },
      },
      create: {
        email,
        phone,
        category,
        layout,
        translations: {
          create: translations,
        },
      },
    });

    return NextResponse.json(novo, { status: 201 });
  } catch (err) {
    console.error("Erro ao salvar profissional:", err);
    return NextResponse.json(
      { error: "Erro ao salvar profissional" },
      { status: 400 }
    );
  }
}
