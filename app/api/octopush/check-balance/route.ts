// /app/api/octopush/check-balance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { revalidateTag } from 'next/cache';

const OCTOPUSH_API_LOGIN = process.env.OCTOPUSH_API_LOGIN!;
const OCTOPUSH_API_KEY = process.env.OCTOPUSH_API_KEY!;
const OCTOPUSH_API_URL = 'https://api.octopush.com/v1/public/wallet/check-balance';

export async function GET(req: NextRequest) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'api-login': OCTOPUSH_API_LOGIN,
      'api-key': OCTOPUSH_API_KEY
    };

    const response = await axios.get(OCTOPUSH_API_URL, { headers });
     

    // Check available keys in the response and log them
    const availableKeys = Object.keys(response.data);
    

    const amount = response.data.amount; // Ensure this key is correct.
    const unit = response.data.unit;
    revalidateTag('balance');

    return NextResponse.json({
      amount,
      unit
    }, {
      headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
