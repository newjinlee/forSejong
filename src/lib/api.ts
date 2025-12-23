// ===================================
// SEJONG ROADMAP API 클라이언트
// ===================================
// 🔧 API 연결 방법:
// 1. USE_MOCK_DATA를 false로 변경
// 2. .env.local에 NEXT_PUBLIC_API_BASE_URL 설정
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
  createMockCareerCompetencies,
  createMockCustomCareerResponse,
  MOCK_COMPETENCY_RESPONSE,
  MOCK_ROADMAP_RESPONSE,
  simulateDelay,
} from './mockData';

// ===================================
// 설정
// ===================================

// 🔧 목데이터 사용 여부 - API 연결 시 false로 변경
const USE_MOCK_DATA = true;

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
// POST /api/login
// ===================================
export async function login(data: LoginRequest): Promise<LoginResponse> {
  // 🔧 목데이터 사용 시
  if (USE_MOCK_DATA) {
    await simulateDelay(1000);
    // 간단한 검증 시뮬레이션
    if (data.id === 'test' && data.password === 'test') {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    return MOCK_LOGIN_RESPONSE;
  }

  // 🔧 실제 API 호출
  return apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===================================
// 2. 진로 역량 분석 API (NEW!)
// POST /api/careers
// - 프론트: { title: "백엔드 개발자" }
// - 백: { title: "백엔드 개발자", competencies: [...] }
// ===================================
export async function getCareerCompetencies(
  data: CareerCompetenciesRequest
): Promise<CareerCompetenciesResponse> {
  // 🔧 목데이터 사용 시
  if (USE_MOCK_DATA) {
    await simulateDelay(800);
    return createMockCareerCompetencies(data.title);
  }

  // 🔧 실제 API 호출
  return apiRequest<CareerCompetenciesResponse>('/careers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===================================
// 3. 커스텀 진로 분석 API
// POST /api/careers/analyze
// ===================================
export async function analyzeCustomCareer(
  data: CustomCareerAnalyzeRequest
): Promise<CustomCareerAnalyzeResponse> {
  // 🔧 목데이터 사용 시
  if (USE_MOCK_DATA) {
    await simulateDelay(1500); // AI 분석 시뮬레이션
    return createMockCustomCareerResponse(data.customCareerTitle);
  }

  // 🔧 실제 API 호출
  return apiRequest<CustomCareerAnalyzeResponse>('/careers/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===================================
// 4. 역량 GAP 분석 API
// POST /api/competency/analyze
// ===================================
export async function analyzeCompetency(
  data: CompetencyAnalyzeRequest
): Promise<CompetencyAnalyzeResponse> {
  // 🔧 목데이터 사용 시
  if (USE_MOCK_DATA) {
    await simulateDelay(800);
    return MOCK_COMPETENCY_RESPONSE;
  }

  // 🔧 실제 API 호출
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
  // 🔧 목데이터 사용 시
  if (USE_MOCK_DATA) {
    await simulateDelay(1200);
    return MOCK_ROADMAP_RESPONSE;
  }

  // 🔧 실제 API 호출
  return apiRequest<RoadmapResponse>('/roadmap/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}