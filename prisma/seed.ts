import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@professionalpage.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@professionalpage.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    }
  })
//
  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@professionalpage.com' },
    update: {},
    create: {
      name: 'Cliente Fiel',
      email: 'cliente@professionalpage.com',
      password: await bcrypt.hash('cliente123', 10),
      role: 'cliente'
    }
  })

  const loja = await prisma.loja.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Loja do Cliente Fiel',
      descricao: 'A melhor loja de exemplo',
      categoria: 'Exemplo',
      link: 'https://loja-exemplo.com',
      imagem: 'logo.jpg',
      visivel: true,
      clienteId: cliente.id
    }
  })

  console.log('Seed concluído com sucesso!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
