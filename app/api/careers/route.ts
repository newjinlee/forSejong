// ===================================
// 백엔드 프록시 - /api/careers
// POST { title: string } → 역량 분석 결과
// ===================================
import { NextRequest, NextResponse } from 'next/server';

// 백엔드 API URL (환경변수에서 가져옴)
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://54.180.100.83:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 백엔드로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      return NextResponse.json(
        { message: `백엔드 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 백엔드 응답: { title, competencies: [{ subject, score, full_mark }] }
    // 프론트 기대: { title, competencies: [{ subject, score, fullMark }] }
    // full_mark → fullMark 변환
    const transformedData = {
      title: data.title || body.title,
      competencies: data.competencies.map((c: { subject: string; score: number; full_mark: number }) => ({
        subject: c.subject,
        score: c.score,
        fullMark: c.full_mark,
      })),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Careers API 프록시 오류:', error);
    return NextResponse.json(
      { message: '역량 분석 서버에 연결할 수 없습니다.' },
      { status: 500 }
    );
  }
}