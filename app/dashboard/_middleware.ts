// app/dashboard/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
    console.log('Middleware: Request received'); // Log the request
    const token = req.cookies.get('token')?.value;

    if (!token) {
        console.log('Middleware: No token found, redirecting to /login');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        console.log('Middleware: Token verified, proceeding to next');
        return NextResponse.next();
    } catch (error) {
        console.log('Middleware: Invalid token, redirecting to /login');
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
