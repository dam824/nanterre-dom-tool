// app/api/message-templates/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.message.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message template:', error);
    return NextResponse.json({ error: 'Error deleting message template' }, { status: 500 });
  }
}
