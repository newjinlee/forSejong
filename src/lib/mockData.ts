// ===================================
// SEJONG ROADMAP 목데이터
// API 연결 시 이 파일의 사용을 주석처리하세요
// ===================================

import type {
  LoginResponse,
  CareersResponse,
  CustomCareerAnalyzeResponse,
  CompetencyAnalyzeResponse,
  RoadmapResponse,
  Career,
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
// 2. 진로 목록 목데이터
// ===================================
export const MOCK_CAREERS_RESPONSE: CareersResponse = {
  careers: [
    {
      id: 'backend',
      title: '백엔드 개발자',
      description: '대용량 트래픽 처리 및 서버 아키텍처 설계',
      tags: ['Java', 'Spring', 'AWS'],
      competencies: [
        { subject: 'DB', score: 90, fullMark: 100 },
        { subject: '알고리즘', score: 85, fullMark: 100 },
        { subject: '네트워크', score: 80, fullMark: 100 },
        { subject: 'OS', score: 70, fullMark: 100 },
        { subject: '보안', score: 60, fullMark: 100 },
        { subject: '협업', score: 75, fullMark: 100 },
      ],
    },
    {
      id: 'frontend',
      title: '프론트엔드 개발자',
      description: '웹/앱 사용자 인터페이스 구현 및 UX 최적화',
      tags: ['React', 'Next.js', 'TypeScript'],
      competencies: [
        { subject: 'UI구현', score: 95, fullMark: 100 },
        { subject: '알고리즘', score: 60, fullMark: 100 },
        { subject: '네트워크', score: 70, fullMark: 100 },
        { subject: '디자인', score: 85, fullMark: 100 },
        { subject: '최적화', score: 80, fullMark: 100 },
        { subject: '협업', score: 90, fullMark: 100 },
      ],
    },
    {
      id: 'ai-researcher',
      title: 'AI 연구원',
      description: '최신 논문 분석 및 딥러닝 모델링',
      tags: ['Python', 'PyTorch', 'Math'],
      competencies: [
        { subject: '수학', score: 95, fullMark: 100 },
        { subject: '알고리즘', score: 90, fullMark: 100 },
        { subject: '데이터', score: 85, fullMark: 100 },
        { subject: '모델링', score: 95, fullMark: 100 },
        { subject: '논문', score: 90, fullMark: 100 },
        { subject: '구현', score: 70, fullMark: 100 },
      ],
    },
  ],
};

// 학과별 진로 목록 (프론트엔드 호환용)
export const MOCK_CAREER_DB: Record<string, Career[]> = {
  '컴퓨터공학과': MOCK_CAREERS_RESPONSE.careers,
  '소프트웨어학과': [
    {
      id: 'frontend',
      title: '프론트엔드 개발자',
      description: '웹/앱 사용자 인터페이스 구현 및 UX 최적화',
      tags: ['React', 'Next.js', 'UX'],
      competencies: [
        { subject: 'UI구현', score: 95, fullMark: 100 },
        { subject: '알고리즘', score: 60, fullMark: 100 },
        { subject: '네트워크', score: 70, fullMark: 100 },
        { subject: '디자인', score: 85, fullMark: 100 },
        { subject: '최적화', score: 80, fullMark: 100 },
        { subject: '협업', score: 90, fullMark: 100 },
      ],
    },
  ],
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