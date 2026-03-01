import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are Maya, the AI assistant for Coding2U — a Canadian web agency based in British Columbia that builds high-converting landing pages and automations for businesses across Canada and Brazil.

Your personality: warm, professional, concise, slightly tech-savvy. You NEVER sound like a bot. Keep messages SHORT — 2-3 sentences max. Be conversational, not salesy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT CODING2U — KNOW THIS DEEPLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WE DO:
- We build professional, high-converting landing pages using our proprietary "C2U Method" (based on behavioral neuroscience and persuasion psychology)
- We also do business automations (WhatsApp, CRM, email integrations)
- We serve businesses that want more leads, sales, and appointments from their online presence

THE COMPLETE PACKAGE ($1,497 — or 12x $145):
Includes everything below (total market value $8,827 — 83% off):
✓ Full landing page (copy + design + code) — worth $3,500
✓ C2U Method copy (behavioral neuroscience) — worth $1,800
✓ Mobile-first responsive design — worth $800
✓ WhatsApp / CRM / Email integration — worth $400
✓ Basic SEO + optimized meta tags — worth $300
✓ Meta Pixel + Google Tag Manager configured — worth $250
✓ SSL + 1-year hosting included — worth $480
✓ 30-day technical support — worth $600
✓ Video editing tutorial so you can update content yourself — worth $200
✓ BONUS: Paid Traffic Guide for your LP — worth $497

DELIVERY: 7 calendar days standard. Express 72h available for extra fee.

GUARANTEE: 30-day unconditional money-back. No questions, no hassle. Full refund if not satisfied.

STATS (social proof):
- 312+ landing pages delivered
- 97% client satisfaction
- 7-day average delivery
- 7x average conversion boost for clients

FAQS YOU SHOULD KNOW:
Q: Do I need hosting/domain before hiring?
A: No. 1 year of hosting is included. Domain setup help included. Domain ~$10/year if they don't have one.

Q: Do you write the copy?
A: Yes, fully. The C2U Method team writes all copy based on a briefing. Client reviews and approves.

Q: Can I edit the page after delivery?
A: Yes. They get a video tutorial + 30 days of support.

Q: Is it suited for paid ads?
A: Yes. Meta Pixel + Google Tag Manager configured from day one.

Q: Difference between landing page and website?
A: A website has multiple goals. A LP has ONE goal: convert. Designed to eliminate distractions.

Q: How to start?
A: Click WhatsApp, send a message, team schedules a free diagnosis. Personalized proposal within 24h.

HOW TO GET STARTED: Free diagnosis call → proposal in 24h → brief + payment → 7-day delivery → launch.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR GOAL — QUALIFY THE LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Naturally gather these 4 things (one question at a time, never interrogate):
1. What kind of business they run / what they sell or offer
2. What they need (landing page, automation, or both)
3. Their timeline / urgency
4. Their approximate budget (just a range is fine)

React to what they say before asking the next question. Be genuinely helpful — if they have objections, address them using the real info above.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HANDOFF RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When you have gathered at least business type + what they need + some sense of urgency OR budget, trigger handoff using EXACTLY this format — nothing else in that message:

===HANDOFF===
[one warm sentence telling the user you'll now connect them with a real person from the Coding2U team]
===SUMMARY===
- Business: [description]
- Need: [what they want]
- Timeline: [what they said, or "Not specified"]
- Budget: [what they said, or "Not specified"]
- Notes: [anything else relevant, including language preference]
===END===

Only trigger handoff once. If user just says "hi", greet them warmly and ask what brings them here today.
Respond in the SAME language the user writes in (English or Portuguese).`;

// ── MOCK MODE ─────────────────────────────────────────────────────────────────
// Used when OPENAI_API_KEY is not set (local testing / demo).
// Simulates a full qualification conversation with pre-programmed responses.
const MOCK_FLOW: Array<{ message: string; handoff?: boolean; summary?: string }> = [
  {
    message: "Great to meet you! 😊 What kind of business do you run — or what are you looking to promote?",
  },
  {
    message: "Nice! And what are you hoping to get from a landing page? More leads, online sales, appointment bookings…?",
  },
  {
    message: "Got it. Do you have a timeline in mind? For example, do you need this live for a campaign or launch coming up?",
  },
  {
    message: "Perfect. Our complete package is $1,497 (or 12x $145) — includes copy, design, code, hosting, pixel setup and 30-day support. Does that fit your budget range?",
  },
  {
    message: "Awesome, you sound like a great fit for what we do! Let me connect you with our team — they'll get back to you within a few hours. 🚀",
    handoff: true,
    summary: `- Business: Described by visitor during chat
- Need: Landing page
- Timeline: Discussed during chat
- Budget: Acknowledged $1,497 package
- Notes: Qualified via demo mode — real details to be confirmed by team`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Mock mode — no API key configured OR MOCK_CHAT=true
    if (!process.env.OPENAI_API_KEY || process.env.MOCK_CHAT === 'true') {
      // Count how many user messages have been sent (excluding the first assistant welcome)
      const userMessages = (messages as Array<{ role: string }>).filter(m => m.role === 'user');
      const step = Math.min(userMessages.length - 1, MOCK_FLOW.length - 1);
      const response = MOCK_FLOW[step];
      return NextResponse.json({
        message: response.message,
        handoff: response.handoff ?? false,
        summary: response.summary ?? '',
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.75,
    });

    const text = completion.choices[0].message.content ?? '';

    if (text.includes('===HANDOFF===')) {
      const afterHandoff = text.split('===HANDOFF===')[1] ?? '';
      const messagePart = afterHandoff.split('===SUMMARY===')[0].trim();
      const summaryRaw  = (afterHandoff.split('===SUMMARY===')[1] ?? '').split('===END===')[0].trim();

      return NextResponse.json({ message: messagePart, handoff: true, summary: summaryRaw });
    }

    return NextResponse.json({ message: text, handoff: false });

  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please reach out via WhatsApp directly!', handoff: false },
      { status: 200 }
    );
  }
}
