// src/lib/authOptions.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions } from 'next-auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credenciais',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'seu@email.com' },
        senha: { label: 'Senha', type: 'password', placeholder: '********' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          console.error('❌ Credenciais ausentes.')
          return null
        }

        const usuario = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!usuario) {
          console.error('❌ Usuário não encontrado.')
          return null
        }

        const senhaCorreta = await bcrypt.compare(credentials.senha, usuario.password)

        if (!senhaCorreta) {
          console.error('❌ Senha incorreta.')
          return null
        }

        return {
          id: String(usuario.id),
          name: usuario.name,
          email: usuario.email,
          role: usuario.role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
}
