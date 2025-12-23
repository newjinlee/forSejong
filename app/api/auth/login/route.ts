import { NextResponse } from 'next/server';

// 백엔드 API URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://54.180.100.83:8080';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { message: '학번과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 백엔드로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    const text = await response.text();

    // 백엔드 응답 그대로 전달 (LOGIN_SUCCESS 또는 에러 메시지)
    return new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { message: '백엔드 서버에 연결할 수 없습니다.' },
      { status: 503 }
    );
  }
}