// /app/api/user/update-password.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { verifyJwt } from '../../../lib/verifyJwt';

export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { oldPassword, newPassword } = await req.json();

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

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid old password' }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
