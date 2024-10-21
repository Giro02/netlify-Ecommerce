import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  // const session = await getServerSession(options);

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/costumer')) {
    return NextResponse.redirect(new URL('/costumer/account',request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/costumer vc', '/login', '/register'],
};
