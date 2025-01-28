// app/api/message-templates/get-all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function GET(req: NextRequest) {
  try {
    const templates = await prisma.message.findMany();
    revalidateTag('messages');
    return NextResponse.json(templates, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching message templates:', error);
    return NextResponse.json({ error: 'Error fetching message templates' }, { status: 500 });
  }
}
