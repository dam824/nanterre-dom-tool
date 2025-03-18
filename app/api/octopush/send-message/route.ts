import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { prisma } from '../../../../lib/prisma';
 

const OCTOPUSH_API_LOGIN = process.env.OCTOPUSH_API_LOGIN!;
const OCTOPUSH_API_KEY = process.env.OCTOPUSH_API_KEY!;
const OCTOPUSH_API_URL = 'https://api.octopush.com/v1/public/sms-campaign/send';
const SENDER_NAME = 'Nanterre-dom';

export async function POST(req: NextRequest) {
  let formattedTo = "";
  let client = null;
  try {
    const { to, body } = await req.json();

    if (!to || !body) {
       
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }



  formattedTo = formatPhoneNumber(to);
   

    const payload = {
      text: body,
      recipients: [
        {
          phone_number: formattedTo
        }
      ],
      sender: SENDER_NAME,
      purpose: "alert",  
      sms_type: "FR",  
      request_mode: "real"  
    };

    const headers = {
      'Content-Type': 'application/json',
      'api-login': OCTOPUSH_API_LOGIN,
      'api-key': OCTOPUSH_API_KEY
    };

    

    const response = await axios.post(OCTOPUSH_API_URL, payload, { headers });



    

    if (response.data.sms_ticket) {
      //enregistrer les messages dans MessagesEnvoyes
       client = await prisma.client.findFirst({
        where: {
            phone: {
                in: [formattedTo, formattedTo.replace("+33", "0")] // Essaye les deux formats
            }
        }
    });

      console.log('client trouvé :', client);


      await prisma.messageEnvoyes.create({
        data:{
          clientId: client ? client.id : null,
          clientName: client ? client.society : "inconnu",
          phone: formattedTo,
          statut: 'SUCCESS',
          sentAt: new Date()
        }
      });

       

      return NextResponse.json({ success: true, messageId: response.data.sms_ticket });
    } else {
      console.error(`Failed to send message: ${response.data.message}`);
      return NextResponse.json({ error: `Failed to send message: ${response.data.message}` }, { status: 500 });
    }
  } catch (error) {
    if (error.response) {
      

      await prisma.messageEnvoyes.create({
        data: {
          clientId: null,
          clientName: client ?  client.society: "inconnu",
          phone: formattedTo,
          statut: "FAILED",
          sentAt: new Date()
        }
      });

       
      return NextResponse.json({ error: 'Failed to send message', details: error.response.data }, { status: error.response.status });
    } else {
      console.error('Error sending message:', error.message);
      return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
    }
  }
}

const formatPhoneNumber = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, '');  

  // Check if the number starts with "0" and remove it
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1);  
  } else if (!cleaned.startsWith('33')) {
    cleaned = '33' + cleaned;  
  }

  return '+' + cleaned;  
};
