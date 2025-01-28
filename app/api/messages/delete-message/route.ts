// app/api/message-templates/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';


export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.message.delete({
      where: { id },
    });
    revalidateTag('messages');
    return NextResponse.json({ success: true }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error deleting message template:', error);
    return NextResponse.json({ error: 'Error deleting message template' }, { status: 500 });
  }
}
