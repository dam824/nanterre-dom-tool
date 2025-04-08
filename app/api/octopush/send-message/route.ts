import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { prisma } from '../../../../lib/prisma';

const OCTOPUSH_API_LOGIN = process.env.OCTOPUSH_API_LOGIN!;
const OCTOPUSH_API_KEY = process.env.OCTOPUSH_API_KEY!;
const OCTOPUSH_API_URL = 'https://api.octopush.com/v1/public/sms-campaign/send';
const SENDER_NAME = 'Nanterre-dom';

export async function POST(req: NextRequest) {
  let formattedTo = '';
  let client = null;
  let messageId = '';

  try {
    const body = await req.json();
    const { to, messageId: incomingMessageId } = body;

    if (!to || !incomingMessageId) {
      return NextResponse.json({ error: 'Missing required fields (to or messageId)' }, { status: 400 });
    }

    messageId = incomingMessageId;
    formattedTo = formatPhoneNumber(to);

    // Récupère le template de message
    const messageTemplate = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!messageTemplate) {
      return NextResponse.json({ error: 'Message template not found' }, { status: 404 });
    }

    const payload = {
      text: messageTemplate.content,
      recipients: [{ phone_number: formattedTo }],
      sender: SENDER_NAME,
      purpose: 'alert',
      sms_type: 'FR',
      request_mode: 'real',
    };

    const headers = {
      'Content-Type': 'application/json',
      'api-login': OCTOPUSH_API_LOGIN,
      'api-key': OCTOPUSH_API_KEY,
    };

    const response = await axios.post(OCTOPUSH_API_URL, payload, { headers });

    if (response.data.sms_ticket) {
      client = await prisma.client.findFirst({
        where: {
          phone: {
            in: [formattedTo, formattedTo.replace('+33', '0')],
          },
        },
      });

      console.log('client trouvé :', client);

      await prisma.messageEnvoyes.create({
        data: {
          clientId: client?.id || null,
          clientName: client?.society || 'inconnu',
          phone: formattedTo,
          statut: 'SUCCESS',
          sentAt: new Date(),
          messageId: messageTemplate.id, // ← C’EST ÇA QUI TE MANQUAIT
        },
      });

      return NextResponse.json({ success: true, smsTicket: response.data.sms_ticket });
    } else {
      console.error('Erreur d’envoi SMS Octopush:', response.data.message);
      return NextResponse.json({ error: 'Failed to send message', details: response.data }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Erreur envoi catch:', error?.message || error);

    await prisma.messageEnvoyes.create({
      data: {
        clientId: null,
        clientName: client?.society || 'inconnu',
        phone: formattedTo,
        statut: 'FAILED',
        sentAt: new Date(),
        messageId: messageId || null,
      },
    });

    return NextResponse.json(
      { error: 'Unexpected error', details: error?.response?.data || error?.message || error },
      { status: error?.response?.status || 500 }
    );
  }
}

const formatPhoneNumber = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.startsWith('0')) cleaned = '33' + cleaned.substring(1);
  else if (!cleaned.startsWith('33')) cleaned = '33' + cleaned;
  return '+' + cleaned;
};
