import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';

export async function GET(req: NextRequest) {
    try {
       
        // Exécuter l'agrégation brute
        const rawResult = await prisma.messageEnvoyes.aggregateRaw({
            pipeline: [
                { $group: { _id: "$clientId", count: { $sum: 1 } } }
            ]
        });

        // Vérifier que le retour est bien un tableau avant la conversion
        if (!Array.isArray(rawResult)) {
            throw new Error("Invalid response format from aggregateRaw()");
        }

        // Caster proprement en tableau d'objets bien typés
       
        const messagesByClient = rawResult as Array<{ _id: { $oid: string }, count: number }>;


        // Transformer en objet { clientId: count }
        const messageCounts: Record<string, number> = messagesByClient.reduce((acc, curr) => {
            const clientId = curr._id.$oid;
            acc[clientId] = curr.count;
            return acc;
        }, {} as Record<string, number>);

        revalidateTag('messages-by-client');

        return NextResponse.json({ messageCounts }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

    } catch (error) {
        console.error('Error fetching messages per client:', error);
        return NextResponse.json({ error: 'Failed to fetch messages per client' }, { status: 500 });
    }
}
