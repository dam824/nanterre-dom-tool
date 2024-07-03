import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    //delete token
    const url = new URL('/login', req.nextUrl.origin);
    const response = NextResponse.redirect(url);
    response.cookies.set('auth_token', '', { maxAge: -1 });

    return response;
}
