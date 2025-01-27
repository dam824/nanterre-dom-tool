import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const clients = await prisma.client.findMany();
        return NextResponse.json(clients, {
            headers: {
                "Cache-Control": "no-store, max-age=0, must-revalidate"
            }
        });
       
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
    }
}
