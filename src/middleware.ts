import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|vi)/:path*']
};

// import { NextRequest, NextResponse } from 'next/server'

// const PUBLIC_FILE = /\.(.*)$/

// export async function middleware(req: NextRequest) {
//   if (
//     req.nextUrl.pathname.startsWith('/_next') ||
//     req.nextUrl.pathname.includes('/api/') ||
//     PUBLIC_FILE.test(req.nextUrl.pathname)
//   ) {
//     return
//   }

//   if (req.nextUrl.locale === 'default') {
//     const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'

//     return NextResponse.redirect(
//       new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
//     )
//   }
// }
