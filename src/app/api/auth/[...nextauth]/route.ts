// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credenciais',
      credentials: {
        email: { label: 'Email', type: 'text' },
        senha: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null

        // 🔎 Busca usuário no banco
        const usuario = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!usuario) return null

        // 🔐 Compara senha com bcrypt
        const senhaCorreta = await bcrypt.compare(credentials.senha, usuario.password)

        if (!senhaCorreta) return null

        // ✅ Retorna usuário autorizado
        return {
          id: String(usuario.id), // ✅ Agora está no tipo correto
          name: usuario.name,
          email: usuario.email,
          role: usuario.role
        }

      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }
