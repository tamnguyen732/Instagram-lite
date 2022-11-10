import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path'
};

export function middleware(request: NextRequest) {
  const tokens = request.cookies._parsed;
  let tokenObject: Record<string, string> = {};
  tokens.forEach((e) => (tokenObject[e.name] = e.value));

  if (!tokenObject.access_token || !tokenObject.refresh_token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
