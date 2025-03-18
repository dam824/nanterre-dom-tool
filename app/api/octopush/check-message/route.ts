import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { prisma } from '../../../../lib/prisma';
import { revalidateTag } from 'next/cache';


export async function GET(req:NextRequest){
    try{
       
        const totalMessagesSent = await prisma.messageEnvoyes.count();

        revalidateTag('messages');
         

       

        return NextResponse.json({ totalMessagesSent  }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0' 
            }
        });

    }catch(error){
        console.error('Error fetching sent messages:', error);
        return NextResponse.json({ error: 'Failed to fetch sent messages' }, { status: 500 });
    }
}