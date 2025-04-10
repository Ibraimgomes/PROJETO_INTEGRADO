import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isClienteRoute = request.nextUrl.pathname.startsWith('/minha-conta')

  // Se não estiver autenticado, redireciona
  if (!token) {
    const loginPage = isAdminRoute ? '/login' : '/login-cliente'
    return NextResponse.redirect(new URL(loginPage, request.url))
  }

  // Se não for admin e tentar acessar /admin
  if (isAdminRoute && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Se não for cliente e tentar acessar /minha-conta
  if (isClienteRoute && token.role !== 'cliente') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Caso tudo esteja ok, libera acesso
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/minha-conta/:path*',
  ],
}
