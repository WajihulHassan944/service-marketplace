import { NextResponse } from 'next/server';
import { generateBrief } from '../shared';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await generateBrief(body || {});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const status = error?.status || 500;
    const payload = {
      success: false,
      message: error?.message || 'Unable to generate AI brief at this time.',
    };

    if (error?.raw) {
      payload.raw = error.raw;
    }

    console.error('[AI_BRIEF] Request failed:', error);
    return NextResponse.json(payload, { status });
  }
}
