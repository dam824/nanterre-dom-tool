import { writeFile, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import {v4 as uuidv4 } from 'uuid';
import { prisma } from '../../../../lib/prisma';
import { verifyJwt } from '../../../../lib/verifyJwt';

export async function POST(req: NextRequest) {
    try{
        const formData = await req.formData();
        const file = formData.get('avatar') as File;

        if(!file){
            return NextResponse.json({error: 'Aucun fichier reçu'}, {status: 400});
        }

      const token = req.cookies.get('token')?.value;
      if(!token){
        return NextResponse.json({error: "Non authentifié"}, {status: 401});
      }

      const decoded = await verifyJwt(token, process.env.JWT_SECRET!);
      if(!decoded?.userId){
        return NextResponse.json({error: 'Token invalide'},{status: 403});
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${uuidv4()}-${file.name}`;
      const dir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
      const filepath = path.join(dir, filename);

      if(!fs.existsSync(dir)){
        await mkdir(dir, {recursive: true});
      }

      await writeFile(filepath, new Uint8Array(buffer));

      await prisma.user.update({
        where: {id: decoded.userId},
        data: {avatarUrl: `/uploads/avatars/${filename}`},
      })

      return NextResponse.json({message:'Avatar uploadé', filename});

    }catch(err){
        console.error(err);
        return NextResponse.json({error: "Erreur serveur"}, {status: 500})
    }
}