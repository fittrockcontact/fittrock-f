import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    const res = await fetch(`${backendUrl}/api/checkout/orders/${id}/invoice`, {
      method: 'GET',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to retrieve tax invoice' },
        { status: res.status }
      );
    }

    const pdfBuffer = await res.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Tax-Invoice-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Proxy invoice download error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
