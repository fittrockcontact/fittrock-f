import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/webhooks/razorpay`;

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signature ? { 'x-razorpay-signature': signature } : {}),
      },
      body: rawBody,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook forwarding error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
