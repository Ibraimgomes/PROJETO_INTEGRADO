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
        email: { label: 'Email', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null

        const usuario = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!usuario) return null

        const senhaCorreta = await bcrypt.compare(credentials.senha, usuario.password)
        if (!senhaCorreta) return null

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
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role
        session.user.id = token.sub ?? ''
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
