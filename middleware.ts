import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import MobileDetect from 'mobile-detect';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const ua = req.headers.get('user-agent') || '';
  const md = new MobileDetect(ua);
  const isMobileDevice = Boolean(md.mobile() || md.tablet());

  if (isMobileDevice && pathname === '/simulator') {
    return NextResponse.redirect(new URL('/builder', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

