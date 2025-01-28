import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/verifyJwt';

export async function middleware(req: NextRequest) {
    console.log('Middleware: Request received'); // Log the request
    const token = req.cookies.get('token')?.value;
    console.log('Middleware: Token found', token);

    if (!token) {
        console.log('Middleware: No token found, redirecting to /login');
        const url = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(url);
    }

    try {
        const decoded = await verifyJwt(token, process.env.JWT_SECRET!);
        if (!decoded) throw new Error('Invalid token');
        console.log('Middleware: Token verified, proceeding to next');
        
       const response = NextResponse.next();
       response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
       response.headers.set('Pragma', 'no-cache');
       response.headers.set('Expires', '0');
       return response;
    } catch (error) {
        const err = error as Error;
        console.log('Middleware: Invalid token, redirecting to /login', err.message);
        const url = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/mon-compte/:path*', '/clients/:path*', '/twilio/:path*', '/messages/:path*','/api/messages/:path*'],
};
