// app/api/message-templates/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { id, title, content } = await req.json();
    const updatedTemplate = await prisma.message.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    revalidateTag('messages');
    return NextResponse.json(updatedTemplate, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error updating message template:', error);
    return NextResponse.json({ error: 'Error updating message template' }, { status: 500 });
  }
}
