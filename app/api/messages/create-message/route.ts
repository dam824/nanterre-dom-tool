// app/api/message-templates/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    const newTemplate = await prisma.message.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newTemplate);
  } catch (error) {
    console.error('Error creating message template:', error);
    return NextResponse.json({ error: 'Error creating message template' }, { status: 500 });
  }
}
