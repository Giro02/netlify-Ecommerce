import { NextResponse } from 'next/server';

export async function GET() {

  const publicKey = process.env.PUBLIC_KEY_PAG;
  const createdAt = Date.now();

  if (!publicKey) {
    return NextResponse.json({ error: 'Public key not found' }, { status: 500 });
  }

  const response = {
    public_key: publicKey,
    created_at: createdAt
  };

  return NextResponse.json(response);
}
