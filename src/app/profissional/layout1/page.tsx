// src/app/profissional/[id]/layout1page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Layout1Client from "@/components/Layout1Client";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function Layout1Page({ params }: Props) {
  const prof = await prisma.profissional.findUnique({
    where: { id: params.id },
    include: { translations: true },
  });

  if (!prof) return notFound();

  const heroImages = [
    "/slides/heroclinica1.jpg",
    "/slides/heroclinica2.jpg",
    "/slides/heroclinica3.jpg",
  ];
  const profilePhoto = "/team/orlando-freitas.jpg";

  return (
    <Layout1Client
      prof={prof}
      idiomas={["PT", "DE", "ES", "EN"]}
      heroImages={heroImages}
      profilePhoto={profilePhoto}
    />
  );
}