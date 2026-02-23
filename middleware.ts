import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // halaman yang boleh diakses tanpa login
  const publicPaths = ['/sign-in','/sign-up']

  const isPublic = publicPaths.includes(pathname)

  // kalau belum login & bukan halaman public
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      Jalankan di semua route kecuali:
      - _next (internal next)
      - favicon
      - file static
    */
    '/((?!_next|favicon.ico|.*\\..*).*)',
  ],
}