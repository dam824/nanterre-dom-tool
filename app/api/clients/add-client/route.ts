import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

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
        revalidateTag('clients');
        return NextResponse.json(newClient, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    }catch(error){
        console.error('Error adding client:', error);
        return NextResponse.json({ error: 'Error adding client' }, { status: 500 });
    }
}