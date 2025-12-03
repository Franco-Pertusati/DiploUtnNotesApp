import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const body = await request.json();

    const response = await fetch(`${API_URL}/flashcards/${params.id}/review`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader || '',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Error al actualizar datos de revisión' } },
      { status: 500 }
    );
  }
}