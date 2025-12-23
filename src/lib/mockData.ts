// ===================================
// SEJONG ROADMAP 목데이터
// API 연결 시 이 파일의 사용을 주석처리하세요
// ===================================

import type {
  LoginResponse,
  CareerCompetenciesResponse,
  CustomCareerAnalyzeResponse,
  CompetencyAnalyzeResponse,
  RoadmapResponse,
  Competency,
} from '../types/api';

// ===================================
// 1. 로그인 목데이터
// ===================================
export const MOCK_LOGIN_RESPONSE: LoginResponse = {
  message: '로그인 성공',
  user: {
    id: '20210001',
    name: '이유진',
    department: '컴퓨터공학과',
    grade: 3,
    semester: '2024-2',
  },
  completedCourses: [
    { id: 'c-1', name: '디지털시스템', type: '전필', credits: 3, semester: '2-1' },
    { id: 'c-2', name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '2-2' },
    { id: 'c-3', name: '고급C프로그래밍', type: '전선', credits: 3, semester: '2-2' },
    { id: 'c-4', name: '컴퓨터구조', type: '전필', credits: 3, semester: '2-2' },
    { id: 'c-5', name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2-2' },
  ],
};

// ===================================
// 2. 진로 역량 분석 목데이터
// title -> competencies 매핑
// ===================================
const CAREER_COMPETENCIES_MAP: Record<string, Competency[]> = {
  '인공지능 엔지니어': [
    { subject: '수학', score: 95, fullMark: 100 },
    { subject: '알고리즘', score: 90, fullMark: 100 },
    { subject: '데이터', score: 90, fullMark: 100 },
    { subject: '프로그래밍', score: 85, fullMark: 100 },
    { subject: '논문분석', score: 80, fullMark: 100 },
    { subject: '협업', score: 70, fullMark: 100 },
  ],
  '백엔드 개발자': [
    { subject: 'DB', score: 90, fullMark: 100 },
    { subject: '알고리즘', score: 85, fullMark: 100 },
    { subject: '네트워크', score: 80, fullMark: 100 },
    { subject: 'OS', score: 70, fullMark: 100 },
    { subject: '보안', score: 60, fullMark: 100 },
    { subject: '협업', score: 75, fullMark: 100 },
  ],
  '클라우드 컴퓨팅 엔지니어': [
    { subject: '네트워크', score: 90, fullMark: 100 },
    { subject: 'OS', score: 85, fullMark: 100 },
    { subject: '보안', score: 80, fullMark: 100 },
    { subject: '자동화', score: 85, fullMark: 100 },
    { subject: 'DB', score: 70, fullMark: 100 },
    { subject: '협업', score: 75, fullMark: 100 },
  ],
  '빅데이터 분석가': [
    { subject: '통계', score: 90, fullMark: 100 },
    { subject: 'DB', score: 85, fullMark: 100 },
    { subject: '시각화', score: 80, fullMark: 100 },
    { subject: '프로그래밍', score: 75, fullMark: 100 },
    { subject: '도메인지식', score: 70, fullMark: 100 },
    { subject: '커뮤니케이션', score: 80, fullMark: 100 },
  ],
  '정보보안 엔지니어': [
    { subject: '보안', score: 95, fullMark: 100 },
    { subject: '네트워크', score: 90, fullMark: 100 },
    { subject: 'OS', score: 85, fullMark: 100 },
    { subject: '프로그래밍', score: 70, fullMark: 100 },
    { subject: '암호학', score: 80, fullMark: 100 },
    { subject: '분석력', score: 85, fullMark: 100 },
  ],
  '소프트웨어 개발자': [
    { subject: '프로그래밍', score: 90, fullMark: 100 },
    { subject: '알고리즘', score: 80, fullMark: 100 },
    { subject: 'DB', score: 75, fullMark: 100 },
    { subject: '설계', score: 80, fullMark: 100 },
    { subject: '테스트', score: 70, fullMark: 100 },
    { subject: '협업', score: 85, fullMark: 100 },
  ],
  '프론트엔드 개발자': [
    { subject: 'UI구현', score: 95, fullMark: 100 },
    { subject: '알고리즘', score: 60, fullMark: 100 },
    { subject: '네트워크', score: 70, fullMark: 100 },
    { subject: '디자인', score: 85, fullMark: 100 },
    { subject: '최적화', score: 80, fullMark: 100 },
    { subject: '협업', score: 90, fullMark: 100 },
  ],
  '시스템 엔지니어': [
    { subject: 'OS', score: 95, fullMark: 100 },
    { subject: '네트워크', score: 85, fullMark: 100 },
    { subject: '보안', score: 75, fullMark: 100 },
    { subject: '자동화', score: 80, fullMark: 100 },
    { subject: '모니터링', score: 85, fullMark: 100 },
    { subject: '문제해결', score: 90, fullMark: 100 },
  ],
  '데이터베이스 관리자': [
    { subject: 'DB', score: 95, fullMark: 100 },
    { subject: '쿼리최적화', score: 90, fullMark: 100 },
    { subject: '보안', score: 80, fullMark: 100 },
    { subject: '백업/복구', score: 85, fullMark: 100 },
    { subject: 'OS', score: 70, fullMark: 100 },
    { subject: '모니터링', score: 80, fullMark: 100 },
  ],
  '네트워크 설계 엔지니어': [
    { subject: '네트워크', score: 95, fullMark: 100 },
    { subject: '보안', score: 85, fullMark: 100 },
    { subject: '프로토콜', score: 90, fullMark: 100 },
    { subject: '트러블슈팅', score: 85, fullMark: 100 },
    { subject: '설계', score: 80, fullMark: 100 },
    { subject: '문서화', score: 70, fullMark: 100 },
  ],
};

// 기본 competencies (매핑에 없는 직업용)
const DEFAULT_COMPETENCIES: Competency[] = [
  { subject: '전공기초', score: 80, fullMark: 100 },
  { subject: '설계능력', score: 75, fullMark: 100 },
  { subject: '구현능력', score: 85, fullMark: 100 },
  { subject: '문제해결', score: 80, fullMark: 100 },
  { subject: '협업', score: 70, fullMark: 100 },
  { subject: '커뮤니케이션', score: 75, fullMark: 100 },
];

/**
 * 진로 역량 분석 목데이터 생성
 * title을 받아서 해당 직업의 competencies 반환
 */
export const createMockCareerCompetencies = (
  title: string
): CareerCompetenciesResponse => {
  const competencies = CAREER_COMPETENCIES_MAP[title] || DEFAULT_COMPETENCIES;
  return {
    title,
    competencies,
  };
};

// ===================================
// 3. 커스텀 진로 분석 목데이터
// ===================================
export const createMockCustomCareerResponse = (
  title: string
): CustomCareerAnalyzeResponse => ({
  id: `custom-${Date.now()}`,
  title,
  description: 'AI가 분석한 커스텀 진로입니다.',
  tags: ['Solidity', 'Web3', 'Ethereum'],
  competencies: [
    { subject: '전공기초', score: Math.floor(Math.random() * 20) + 75, fullMark: 100 },
    { subject: '설계능력', score: Math.floor(Math.random() * 20) + 75, fullMark: 100 },
    { subject: '구현능력', score: Math.floor(Math.random() * 20) + 75, fullMark: 100 },
    { subject: '문제해결', score: Math.floor(Math.random() * 20) + 75, fullMark: 100 },
    { subject: '협업', score: Math.floor(Math.random() * 20) + 65, fullMark: 100 },
    { subject: '창의성', score: Math.floor(Math.random() * 20) + 70, fullMark: 100 },
  ],
  isCustom: true,
});

// ===================================
// 4. 역량 분석 목데이터
// ===================================
export const MOCK_COMPETENCY_RESPONSE: CompetencyAnalyzeResponse = {
  currentCompetency: [
    { subject: 'DB', score: 45, fullMark: 100 },
    { subject: '알고리즘', score: 30, fullMark: 100 },
    { subject: '네트워크', score: 70, fullMark: 100 },
    { subject: 'OS', score: 25, fullMark: 100 },
    { subject: '보안', score: 55, fullMark: 100 },
    { subject: '협업', score: 60, fullMark: 100 },
  ],
  targetCompetency: [
    { subject: 'DB', score: 90, fullMark: 100 },
    { subject: '알고리즘', score: 85, fullMark: 100 },
    { subject: '네트워크', score: 80, fullMark: 100 },
    { subject: 'OS', score: 70, fullMark: 100 },
    { subject: '보안', score: 60, fullMark: 100 },
    { subject: '협업', score: 75, fullMark: 100 },
  ],
};

// ===================================
// 5. 로드맵 생성 목데이터
// ===================================
export const MOCK_ROADMAP_RESPONSE: RoadmapResponse = {
  roadmapId: 'rm-12345',
  career: {
    id: 'backend',
    title: '백엔드 개발자',
  },
  completedCourses: [
    { id: 'c-1', name: '디지털시스템', type: '전필', credits: 3, semester: '2-1' },
    { id: 'c-2', name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '2-2' },
    { id: 'c-3', name: '고급C프로그래밍', type: '전선', credits: 3, semester: '2-2' },
    { id: 'c-4', name: '컴퓨터구조', type: '전필', credits: 3, semester: '2-2' },
    { id: 'c-5', name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2-2' },
    { id: 'c-6', name: '정보보호개론', type: '전선', credits: 3, semester: '3-1' },
    { id: 'c-7', name: '웹프로그래밍', type: '전선', credits: 3, semester: '3-1' },
    { id: 'c-8', name: '생성형인공지능입문', type: '전선', credits: 3, semester: '3-1' },
    { id: 'c-9', name: 'Capstone디자인', type: '전필', credits: 3, semester: '4-1' },
  ],
  recommendedCourses: [
    { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '대규모 데이터 처리 최적화' },
    { id: 'r-2', name: '운영체제', type: '전필', credits: 3, semester: '4-2', reason: '서버 리소스 관리 이해' },
    { id: 'r-3', name: '데이터베이스', type: '전필', credits: 3, semester: '4-2', reason: 'SQL 최적화 및 설계' },
    { id: 'r-4', name: '분산시스템', type: '전선', credits: 3, semester: '4-2', reason: 'MSA 아키텍처 기반' },
  ],
  insights: {
    missing: '알고리즘, 운영체제, 데이터베이스',
    missingDescription: '백엔드 핵심 과목이 부족합니다. 서버 개발자로서 필수적인 CS 지식을 쌓아야 합니다.',
    strategy: '백엔드 직무 경쟁력',
    strategyDescription: '데이터베이스와 분산시스템으로 대용량 트래픽 처리 역량을 강화합니다.',
  },
  graduationRate: 82,
};

// ===================================
// 딜레이 시뮬레이션 유틸리티
// ===================================
export const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};