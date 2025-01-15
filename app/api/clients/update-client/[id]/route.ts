import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../../lib/prisma';

 


export async function PUT(req: NextRequest, { params }: {params: {id: string } }) {
    const { id } = params;
    const { society, phone, isActive } = await req.json();

    try {
        const updatedClient = await prisma.client.update({
            where: { id },
            data: {
                society,
                phone,
                isActive,
            },
        });
        return NextResponse.json(updatedClient);
    } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
    }
}
