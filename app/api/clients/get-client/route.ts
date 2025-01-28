import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache'

export async function GET(req: NextRequest) {
    try {
        const clients = await prisma.client.findMany();
        revalidateTag('clients')
        return NextResponse.json(clients, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
       
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
    }
}
