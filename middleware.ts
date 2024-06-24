import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/verifyJwt';

export async function middleware(req: NextRequest) {
    console.log('Middleware: Request received'); // Log the request
    const token = req.cookies.get('token')?.value;
    console.log('Middleware: Token found', token);

    if (!token) {
        console.log('Middleware: No token found, redirecting to /login');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decoded = await verifyJwt(token, process.env.JWT_SECRET!);
        if (!decoded) throw new Error('Invalid token');
        console.log('Middleware: Token verified, proceeding to next');
        return NextResponse.next();
    } catch (error) {
        const err = error as Error;
        console.log('Middleware: Invalid token, redirecting to /login', err.message);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
