import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


export async function DELETE(req: NextRequest, { params }) {
    const { id } = params;

    try {
        await prisma.client.delete({
            where: { id  },
        });
        return NextResponse.json({ message: 'Client deleted' });
    } catch (error) {
        console.error('Error deleting client:', error);
        return NextResponse.json({ error: 'Error deleting client' }, { status: 500 });
    }
}
