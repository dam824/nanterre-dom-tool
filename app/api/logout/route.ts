import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    //delete token
    const response = NextResponse.redirect('/login');
    response.cookies.set('auth_token', '', {maxAge: -1} );

    return response;
}