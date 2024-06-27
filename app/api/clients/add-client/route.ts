import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';

export async function POST(req:NextRequest){
    const {phone, society, isActive } = await req.json();
    

    try{
        const newClient = await prisma.client.create({
            data:{
                phone,
                society,
                isActive,
            },
        });
         
        return NextResponse.json(newClient);
    }catch(error){
        console.error('Error adding client:', error);
        return NextResponse.json({ error: 'Error adding client' }, { status: 500 });
    }
}