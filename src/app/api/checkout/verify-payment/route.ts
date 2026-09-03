import { NextRequest, NextResponse } from 'next/server';
import { apiFetch } from '@/lib/api-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await apiFetch('/api/checkout/verify-payment', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Payment verification failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
