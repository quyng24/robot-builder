import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import MobileDetect from 'mobile-detect';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const md = new MobileDetect(ua);

  if (md.mobile() || md.tablet()) {
    return NextResponse.redirect(new URL('/builder', req.url));
  }

  return NextResponse.next();
}
