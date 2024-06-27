import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest){
    const {id, phone, society , isActive} = await req.json();

    try{
        const updatedClient = await prisma.client.update({
            where : { id: parseInt(id) },
            data: {phone, society, isActive},
        });
        return NextResponse.json(updatedClient);
    }catch(error){
        console.error('Error updating client:', error);
    return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
    }
}