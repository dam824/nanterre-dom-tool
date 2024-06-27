import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyJwt } from '../../../lib/verifyJwt';

export async function GET(req: NextRequest){
    const token = req.cookies.get('token')?.value;

    if(!token){
        return NextResponse.json({error: "unauthorized"}, {status:401 } );
    }

    try{
        const decoded = await verifyJwt(token, process.env.JWT_SECRET! );
        const user = await prisma.user.findUnique({
            where: {id : decoded.userId},
        });

        if(!user){
            return NextResponse.json({error: 'User not found'}, {status: 404});

        }

        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json({error: 'Invalid token'} , {status : 401})
    }
}