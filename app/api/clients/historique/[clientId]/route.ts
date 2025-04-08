// app/api/clients/historique/[clientId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function GET(req: NextRequest, { params }: { params: { clientId: string } }) {
  const clientId = params.clientId;

  try {
    const messages = await prisma.messageEnvoyes.findMany({
      where: {
        clientId: {
          equals: clientId.toString()
        }
      },
      orderBy: {
        sentAt: 'desc',
      },
      select: {
        sentAt: true,
        messageId: true,
      },
    });

    // Pour chaque message, aller chercher le titre et contenu
  const enrichedMessages = await Promise.all(messages.map(async(msg) =>{
    if(!msg.messageId){
      return {
        sentAt: msg.sentAt,
        title: "Message inconnu",
        content: "Contenu introuvable",
      };
    }

    const relatedMessage = await prisma.message.findUnique({
      where: {id: msg.messageId},
      select: {
        title: true,
        content: true,
      }
    })
 

      return {
        sentAt: msg.sentAt,
        title: relatedMessage?.title || "Message inconnu",
        content: relatedMessage?.content || "Contenu introuvable",
      };
    }));

    revalidateTag('client-historique');

    return NextResponse.json({ historique: enrichedMessages }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Erreur récupération historique client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
