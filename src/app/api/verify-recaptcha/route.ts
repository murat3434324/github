import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json() as { token?: string };
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    const secretKey = "6Lcl7JQqAAAAAIJD0BGZp2Tzqs4eaIZC8lYV8y1L"; // SECRET KEY'iniz
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(url, { method: 'POST' });
    const data = await response.json() as { success: boolean; score?: number };

    if (!data.success) {
      return NextResponse.json({ success: false, error: 'Verification failed', score: data.score }, { status: 400 });
    }

    return NextResponse.json({ success: true, score: data.score }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
