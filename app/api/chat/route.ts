import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are Maya, a friendly and knowledgeable assistant for Coding2U — a Canadian web agency that builds high-converting landing pages and automations for businesses.

Your personality: warm, professional, concise, slightly tech-savvy. You NEVER sound like a bot. Keep messages to 2-3 sentences maximum.

Your goal is to naturally qualify the lead by gathering:
1. What kind of business they run (or what they sell/offer)
2. What they need (landing page, website, automation, etc.)
3. Their timeline
4. Their approximate budget

How to qualify: ask one natural question at a time, weave them into conversation. Don't interrogate. React to what they say before asking the next question.

HANDOFF RULE: When you have gathered at least the business type + what they need + some sense of urgency or budget, trigger handoff using EXACTLY this format — nothing else in that message:

===HANDOFF===
[one warm sentence telling the user you'll now connect them with a real person from the team]
===SUMMARY===
- Business: [description]
- Need: [what they want]
- Timeline: [what they said, or "Not specified"]
- Budget: [what they said, or "Not specified"]
- Notes: [anything else relevant]
===END===

Only trigger handoff once. If user just says "hi" or "hello", greet them warmly and ask what brings them here today.
Respond in the same language the user writes in (English or Portuguese).`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: 'Chat is temporarily unavailable. Please contact us via WhatsApp!', handoff: false },
        { status: 200 }
      );
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
