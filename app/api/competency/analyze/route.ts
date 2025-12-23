// ===================================
// 백엔드 프록시 - /api/competency/analyze
// POST { userId, title } → 현재 역량 분석 결과
// ===================================
import { NextRequest, NextResponse } from 'next/server';

// 백엔드 API URL (환경변수에서 가져옴)
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://54.180.100.83:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📤 Competency API 요청:', body);

    // 백엔드로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/competency/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error:', response.status, errorText);
      return NextResponse.json(
        { message: `백엔드 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log('📥 백엔드 응답:', JSON.stringify(data, null, 2));
    
    // 응답 검증
    if (!data.competencies) {
      console.error('❌ 응답 형식 오류:', data);
      return NextResponse.json(
        { message: '백엔드 응답 형식이 올바르지 않습니다.' },
        { status: 500 }
      );
    }
    
    // 백엔드 응답: { competencies, description, is_custom }
    // competencies → currentCompetency로 변환
    // full_mark → fullMark 변환 (snake_case → camelCase)
    const transformedData = {
      currentCompetency: data.competencies.map((c: { subject: string; score: number; full_mark?: number; fullMark?: number }) => ({
        subject: c.subject,
        score: c.score,
        fullMark: c.full_mark ?? c.fullMark ?? 100,
      })),
      description: data.description,
      isCustom: data.is_custom,
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('❌ Competency API 프록시 오류:', error);
    return NextResponse.json(
      { message: '역량 분석 서버에 연결할 수 없습니다.' },
      { status: 500 }
    );
  }
}