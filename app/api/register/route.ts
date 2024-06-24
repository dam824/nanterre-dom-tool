import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { username, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer un nouvel utilisateur
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
