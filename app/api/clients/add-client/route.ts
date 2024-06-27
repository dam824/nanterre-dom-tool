import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';

export async function POST(req:NextRequest){
    const {phone, society, isActive } = await req.json();
    console.log('Received data:', { phone, society, isActive });

    try{
        const newClient = await prisma.client.create({
            data:{
                phone,
                society,
                isActive,
            },
        });
        console.log('Client created:', newClient);
        return NextResponse.json(newClient);
    }catch(error){
        console.error('Error adding client:', error);
        return NextResponse.json({ error: 'Error adding client' }, { status: 500 });
    }
}