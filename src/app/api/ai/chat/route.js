import { NextResponse } from 'next/server';
import { chatTurn } from '../shared';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await chatTurn(body || {});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const status = error?.status || 500;
    const payload = {
      success: false,
      message: error?.message || 'Unable to continue the AI conversation at this time.',
    };

    if (error?.raw) {
      payload.raw = error.raw;
    }

    console.error('[AI_CHAT] Request failed:', error);
    return NextResponse.json(payload, { status });
  }
}
