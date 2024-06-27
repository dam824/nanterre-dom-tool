// /app/api/user/update-profile.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyJwt } from '../../../../lib/verifyJwt';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { newUsername } = await req.json();

  console.log('Token:', token);
  console.log('New Username:', newUsername);


  if (!token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await verifyJwt(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { username: newUsername },
    });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
