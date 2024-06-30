import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
 

const OCTOPUSH_API_LOGIN = process.env.OCTOPUSH_API_LOGIN!;
const OCTOPUSH_API_KEY = process.env.OCTOPUSH_API_KEY!;
const OCTOPUSH_API_URL = 'https://api.octopush.com/v1/public/sms-campaign/send';
const SENDER_NAME = 'Nanterre-dom';

export async function POST(req: NextRequest) {
  try {
    const { to, body } = await req.json();

    if (!to || !body) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedTo = formatPhoneNumber(to);
    console.log(`Original phone number: ${to}`);
    console.log(`Formatted phone number: ${formattedTo}`);
    console.log(`Sending SMS to: ${formattedTo} with body: ${body}`);

    const payload = {
      text: body,
      recipients: [
        {
          phone_number: formattedTo
        }
      ],
      sender: SENDER_NAME,
      purpose: "alert", // Ajout de ce champ pour spécifier le type de campagne
      sms_type: "FR", // Ajout du type de SMS (Premium)
      request_mode: "real" // Ajout du mode de requête
    };

    const headers = {
      'Content-Type': 'application/json',
      'api-login': OCTOPUSH_API_LOGIN,
      'api-key': OCTOPUSH_API_KEY
    };

    console.log('Payload:', JSON.stringify(payload));
    console.log('Headers:', headers);

    const response = await axios.post(OCTOPUSH_API_URL, payload, { headers });

    console.log(`Octopush API response: ${JSON.stringify(response.data)}`);

    if (response.data.sms_ticket) {
      return NextResponse.json({ success: true, messageId: response.data.sms_ticket });
    } else {
      console.error(`Failed to send message: ${response.data.message}`);
      return NextResponse.json({ error: `Failed to send message: ${response.data.message}` }, { status: 500 });
    }
  } catch (error) {
    if (error.response) {
      console.error('Error sending message:', error.response.data);
      return NextResponse.json({ error: 'Failed to send message', details: error.response.data }, { status: error.response.status });
    } else {
      console.error('Error sending message:', error.message);
      return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
    }
  }
}

const formatPhoneNumber = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, ''); // Remove all non-digit characters

  // Check if the number starts with "0" and remove it
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1); // Remove the leading 0 and add the country code 33 for France
  } else if (!cleaned.startsWith('33')) {
    cleaned = '33' + cleaned; // Add country code if it's not present
  }

  return '+' + cleaned; // Return the cleaned number with '+'
};
