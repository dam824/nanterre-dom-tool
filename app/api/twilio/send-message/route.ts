// app/api/twilio/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const formatPhoneNumber = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, ''); // Remove all non-digit characters

  // Check if the number starts with "0" and remove it
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  // Ensure the number starts with the country code "+33" for France
  return '+33' + cleaned;
};

export async function POST(req: NextRequest) {
  try {
    const { to, body } = await req.json();

    if (!to || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedTo = formatPhoneNumber(to);

    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedTo,
    });

    return NextResponse.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
  }
}
