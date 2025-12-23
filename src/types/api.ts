// ===================================
// SEJONG ROADMAP API 타입 정의
// ===================================

// 공통 타입
export type Course = {
  id: string;
  name: string;
  type: '전필' | '전선' | '교양';
  credits: number;
  semester: string; // "2-1", "3-2" 형식
};

// 백엔드 수강과목 응답 타입
export type CourseResponseDto = {
  curiNo: string;      // 학수번호
  curiNm: string;      // 과목명
  typeName: string;    // 이수구분
  cdt: number;         // 학점
  deptMAlias: string;  // 학과
  year: string;        // 년도 (예: "2023")
  smtCd: string;       // 학기 (예: "1", "2")
};

export type RecommendedCourse = Course & {
  reason: string; // AI 추천 이유
};

export type Competency = {
  subject: string;
  score: number;
  fullMark: number;
};

// 프론트엔드용 역량 타입 (차트용)
export type CompetencyChart = {
  subject: string;
  A: number; // 현재 역량 또는 목표 역량 점수
  fullMark: number;
};

export type User = {
  id: string;
  name: string;
  department: string;
  grade: number;
  semester: string; // "2024-2" 형식
};

// ===================================
// 1. 로그인 API
// ===================================
export type LoginRequest = {
  id: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: User;
  completedCourses: Course[];
};

export type LoginErrorResponse = {
  message: string;
  code: 'erridpwd' | 'pwsNeedChg' | 'invalid';
};

// ===================================
// 2. 진로 역량 분석 API
// POST /api/careers
// 프론트: { title: "백엔드 개발자" }
// 백: { title: "백엔드 개발자", competencies: [...] }
// ===================================
export type CareerCompetenciesRequest = {
  title: string;
};

export type CareerCompetenciesResponse = {
  title: string;
  competencies: Competency[];
};

// ===================================
// 3. 진로 목록 타입 (프론트 하드코딩용)
// ===================================
export type Career = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  competencies: Competency[];
  isCustom?: boolean;
};

// 레거시 호환용 (더 이상 API에서 사용 안함)
export type CareersResponse = {
  careers: Career[];
};

// ===================================
// 4. 커스텀 진로 API (POST /api/analysis)
// ===================================
export type CustomCareerCreateRequest = {
  title: string;
};

export type CustomCareerCreateResponse = {
  id: string;
  message: string;
};

// ===================================
// 5. 커스텀 진로 분석 API (POST /api/careers/analyze)
// ===================================
export type CustomCareerAnalyzeRequest = {
  customCareerTitle: string;
};

export type CustomCareerAnalyzeResponse = Career & {
  isCustom: true;
};

// ===================================
// 6. 역량 분석 API
// ===================================
export type CompetencyAnalyzeRequest = {
  userId: string;
  careerId: string;
};

export type CompetencyAnalyzeResponse = {
  currentCompetency: Competency[];
  targetCompetency: Competency[];
};

// GAP 분석 결과 (프론트엔드 계산)
export type GapAnalysis = {
  subject: string;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
};

// ===================================
// 7. 로드맵 생성 API
// ===================================
export type RoadmapGenerateRequest = {
  userId: string;
  careerId: string;
};

export type Insights = {
  missing: string;
  missingDescription: string;
  strategy: string;
  strategyDescription: string;
};

export type RoadmapResponse = {
  roadmapId: string;
  career: {
    id: string;
    title: string;
  };
  completedCourses: Course[];
  recommendedCourses: RecommendedCourse[];
  insights: Insights;
  graduationRate: number;
};

// ===================================
// 공통 에러 응답
// ===================================
export type ApiErrorResponse = {
  message: string;
  code?: string;
};