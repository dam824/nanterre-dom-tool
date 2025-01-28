import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function DELETE(req: NextRequest, { params }) {
    const { id } = params;

    try {
        await prisma.client.delete({
            where: { id  },
        });
        revalidateTag('clients');
        return NextResponse.json({ message: 'Client deleted' }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        return NextResponse.json({ error: 'Error deleting client' }, { status: 500 });
    }
}
