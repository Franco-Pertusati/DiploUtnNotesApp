import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ['/home', '/folders', '/flashcards', '/desing-system'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(`${baseUrl}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `access_token=${token}`,
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Verification error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/folders/:path*',
    '/flashcards/:path*',
    '/desing-system/:path*',
  ],
};