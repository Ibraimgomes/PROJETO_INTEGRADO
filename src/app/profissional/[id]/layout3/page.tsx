// src/app/profissional/[id]/layout2/page.tsx  ⚠️ substitua todo o conteúdo
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout3Client from "@/components/Layout3Client";

export const dynamic = "force-dynamic"; // sempre SSR

interface Props {
  params: { id: string };   // ← id simples, NÃO Promise
}

export default async function Layout3Page({ params }: Props) {
  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },  // ← ESSENCIAL
  });

  if (!prof) return notFound();       // id inexistente

  return (
    <Layout3Client
      prof={prof}
      idiomas={["PT", "DE", "ES", "SV", "EN"]}
    />
  );
}
