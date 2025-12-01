import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const cookies = response.headers.get('set-cookie');
    const nextResponse = NextResponse.json(data);
    
    if (cookies) {
      nextResponse.headers.set('Set-Cookie', cookies);
    }
    
    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: `Registration failed: ${error}` },
      { status: 500 }
    );
  }
}