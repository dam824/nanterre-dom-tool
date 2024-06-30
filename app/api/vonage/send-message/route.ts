import { NextRequest, NextResponse } from 'next/server';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';

const auth = new Auth({
  apiKey: process.env.VONAGE_API_KEY!,
  apiSecret: process.env.VONAGE_API_SECRET!,
});

const vonage = new Vonage(auth);
const from = process.env.VONAGE_PHONE_NUMBER!;

export async function POST(req: NextRequest) {
  try {
    const { to, body } = await req.json();

    if (!to || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedTo = formatPhoneNumber(to);
    console.log(`Original phone number: ${to}`);
    console.log(`Formatted phone number: ${formattedTo}`);
    console.log(`Sending SMS to: ${formattedTo} with body: ${body}`);

    const responseData = await vonage.sms.send({
      to: formattedTo,
      from: from,
      text: body,
    });

    console.log(`Vonage API response: ${JSON.stringify(responseData, null, 2)}`);

    if (responseData.messages[0].status === '0') {
      return NextResponse.json({ success: true, messageId: responseData.messages[0]['message-id'] });
    } else {
      console.error(`Failed to send message: ${responseData.messages[0]['error-text']}`);
      return NextResponse.json({ error: `Failed to send message: ${responseData.messages[0]['error-text']}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
  }
}

const formatPhoneNumber = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, ''); // Remove all non-digit characters

  // Check if the number starts with "0" and remove it
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1); // Remove the leading 0 and add the country code 33 for France
  }

  return cleaned; // Return the cleaned number without the '+'
};
