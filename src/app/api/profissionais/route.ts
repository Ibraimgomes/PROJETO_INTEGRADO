// src/app/api/profissionais/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic"; // evita cache em dev

/* ───────────────────────────────
   1. Schema — campos podem ficar vazios
   ─────────────────────────────── */
const translationSchema = z.object({
  language: z.enum(["PT", "DE", "ES", "SV", "EN"]),
  /* permitem vazio; refinamos depois */
  nome:       z.string(),
  descricao:  z.string(),
  servicos:   z.string(),
  endereco:   z.string(),
});

const bodySchema = z.object({
  email:    z.string().email(),
  phone:    z.string().min(3),
  category: z.enum(["MEDICINA", "PSICOLOGIA", "NUTRICAO", "EDUCACIONAL"]),
  layout:   z.enum(["L1", "L2", "L3"]),
  translations: z.array(translationSchema).min(1),
});

export async function POST(req: Request) {
  try {
    /* 2. Lê JSON cru e faz log */
    const raw = await req.json();
    console.log("📥 Dados recebidos:", JSON.stringify(raw, null, 2));

    /* 3. Validação básica (não exige conteúdo) */
    const parsedBody = bodySchema.parse(raw);

    /* 4. Mantém só idiomas COMPLETOS (todos os 4 campos com texto) */
    const filledTranslations = parsedBody.translations.filter((t) =>
      [t.nome, t.descricao, t.servicos, t.endereco].every(
        (f) => f.trim().length >= 2
      )
    );

    if (filledTranslations.length === 0) {
      return NextResponse.json(
        { error: "Pelo menos um idioma deve ter todos os campos preenchidos." },
        { status: 422 }
      );
    }

    /* 5. Upsert baseado em e-mail */
    const novo = await prisma.profissional.upsert({
      where:  { email: parsedBody.email },
      update: {
        phone:    parsedBody.phone,
        category: parsedBody.category,
        layout:   parsedBody.layout,
        translations: {
          deleteMany: {},            // remove antigas
          create:     filledTranslations,
        },
      },
      create: {
        email:  parsedBody.email,
        phone:  parsedBody.phone,
        category: parsedBody.category,
        layout:   parsedBody.layout,
        translations: { create: filledTranslations },
      },
      include: { translations: true },
    });

    return NextResponse.json(novo, { status: 201 });

  /* ───────────── tratamento de erros ───────────── */
  } catch (err: unknown) {

    /* violação de unique (e-mail) */
    if (err && typeof err === "object" && "code" in err && (err as any).code === "P2002") {
      return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });
    }

    /* erro de validação Zod */
    if (err instanceof z.ZodError) {
      console.error("🔴 Erro de validação:", err.errors);
      return NextResponse.json(
        { error: "Dados inválidos", issues: err.errors },
        { status: 422 }
      );
    }

    console.error("🔴 Erro interno:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
