// app/api/message-templates/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    const newTemplate = await prisma.message.create({
      data: {
        title,
        content,
      },
    });
    revalidateTag('messages');
    return NextResponse.json(newTemplate, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error creating message template:', error);
    return NextResponse.json({ error: 'Error creating message template' }, { status: 500 });
  }
}
