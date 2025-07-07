//src/app/profissional/[id]/layout2/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout2Client from "@/components/Layout2Client";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function Layout2Page({ params }: Props) {
  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });

  if (!prof) return notFound();

  return (
    <Layout2Client
      prof={prof}
      idiomas={["PT", "DE", "ES", "SV", "EN"]}
    />
  );
}