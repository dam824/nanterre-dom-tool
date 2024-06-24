import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Créer le token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log('Token created:', token);

    return NextResponse.json({ token }, { status: 200 });
}
