import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit store: ip -> timestamp of last accepted submission
const submissions = new Map<string, number>();
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 1. Honeypot check — bots fill hidden fields, humans don't
  if (body.website) {
    // Silently accept to avoid revealing detection to bots
    return NextResponse.json({ ok: true });
  }

  // 2. Rate limit by IP — 1 submission per 24h
  const ip = getIp(req);
  const lastSeen = submissions.get(ip);
  if (lastSeen && Date.now() - lastSeen < WINDOW_MS) {
    return NextResponse.json(
      { error: 'You already submitted recently. Please try again in 24 hours.' },
      { status: 429 }
    );
  }

  // 3. Forward to external API
  const res = await fetch('https://coding2u.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      ip: body.ip,
      location: body.location,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 502 }
    );
  }

  // Record successful submission
  submissions.set(ip, Date.now());

  return NextResponse.json({ ok: true });
}
