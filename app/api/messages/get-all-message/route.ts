// app/api/message-templates/get-all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const templates = await prisma.message.findMany({
      where: {
        clientId: null,
      },
    });
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching message templates:', error);
    return NextResponse.json({ error: 'Error fetching message templates' }, { status: 500 });
  }
}
