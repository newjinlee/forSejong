// ===================================
// SEJONG ROADMAP API 클라이언트
// ===================================

import type {
  LoginRequest,
  LoginResponse,
  CareerCompetenciesRequest,
  CareerCompetenciesResponse,
  CustomCareerAnalyzeRequest,
  CustomCareerAnalyzeResponse,
  CompetencyAnalyzeRequest,
  CompetencyAnalyzeResponse,
  RoadmapGenerateRequest,
  RoadmapResponse,
  ApiErrorResponse,
} from '../types/api';

import {
  MOCK_LOGIN_RESPONSE,
  MOCK_COMPETENCY_RESPONSE,
  MOCK_ROADMAP_RESPONSE,
  simulateDelay,
} from './mockData';

// ===================================
// 설정
// ===================================

// 🔧 목데이터 사용 여부 - API 연결 시 false로 변경
const USE_MOCK_DATA = false;

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// ===================================
// 공통 fetch 래퍼
// ===================================
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      message: '알 수 없는 오류가 발생했습니다.',
    }));
    throw new Error(errorData.message);
  }

  return response.json();
}

// ===================================
// 1. 로그인 API
// POST /api/auth/login
// ===================================
export async function login(data: LoginRequest): Promise<LoginResponse> {
  if (USE_MOCK_DATA) {
    await simulateDelay(1000);
    if (data.id === 'test' && data.password === 'test') {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    return MOCK_LOGIN_RESPONSE;
  }

  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===================================
// 2. 진로 역량 분석 API ✅ 백엔드 연동!
// POST /api/careers
// Request:  { title: "백엔드 개발자" }
// Response: { title, competencies: [{ subject, score, fullMark }] }
// ===================================
export async function getCareerCompetencies(
  data: CareerCompetenciesRequest
): Promise<CareerCompetenciesResponse> {
  // 백엔드 API 호출 (Next.js 프록시 경유)
  const response = await apiRequest<{
    title: string;
    competencies: Array<{ subject: string; score: number; fullMark: number }>;
  }>('/careers', {
    method: 'POST',
    body: JSON.stringify({ title: data.title }),
  });

  return {
    title: response.title || data.title,
    competencies: response.competencies,
  };
}

// ===================================
// 3. 커스텀 진로 분석 API ✅ 동일한 /careers API 사용!
// POST /api/careers
// ===================================
export async function analyzeCustomCareer(
  data: CustomCareerAnalyzeRequest
): Promise<CustomCareerAnalyzeResponse> {
  // 동일한 /careers API 호출 (직접 입력도 같은 API)
  const response = await apiRequest<{
    title: string;
    competencies: Array<{ subject: string; score: number; fullMark: number }>;
  }>('/careers', {
    method: 'POST',
    body: JSON.stringify({ title: data.title }),
  });

  return {
    id: `custom-${Date.now()}`,
    title: data.title,
    description: `AI가 분석한 ${data.title} 직무입니다.`,
    tags: ['AI 분석', '커스텀'],
    competencies: response.competencies,
    isCustom: true,
  };
}

// ===================================
// 4. 역량 GAP 분석 API ✅ 백엔드 연동!
// POST /api/competency/analyze
// Request:  { userId, title }
// Response: { currentCompetency, targetCompetency }
// ===================================
export async function analyzeCompetency(
  data: CompetencyAnalyzeRequest
): Promise<CompetencyAnalyzeResponse> {
  // 백엔드 API 호출 (Next.js 프록시 경유)
  return apiRequest<CompetencyAnalyzeResponse>('/competency/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===================================
// 5. 로드맵 생성 API
// POST /api/roadmap/generate
// ===================================
export async function generateRoadmap(
  data: RoadmapGenerateRequest
): Promise<RoadmapResponse> {
  if (USE_MOCK_DATA) {
    await simulateDelay(1200);
    return MOCK_ROADMAP_RESPONSE;
  }

  return apiRequest<RoadmapResponse>('/roadmap/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}