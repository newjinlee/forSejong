// ===================================
// 로드맵 엑셀 다운로드 유틸리티
// ===================================
import * as XLSX from 'xlsx';
import type { Course } from '../types/api';

// 추천 과목 타입
export type RecommendedCourse = {
  id: string;
  name: string;
  type: string;
  credits: number;
  semester: string;
  reason: string;
};

// 분석 인사이트 타입
export type RoadmapInsights = {
  missing: string;
  missingDescription: string;
  strategy: string;
  strategyDescription: string;
};

// 다운로드 함수 파라미터
export type DownloadRoadmapParams = {
  studentName: string;
  studentId: string;
  department: string;
  careerTitle: string;
  completedCourses: Course[];
  recommendedCourses: RecommendedCourse[];
  insights: RoadmapInsights;
};

/**
 * 로드맵을 엑셀 파일로 다운로드
 */
export function downloadRoadmapAsExcel({
  studentName,
  studentId,
  department,
  careerTitle,
  completedCourses,
  recommendedCourses,
  insights,
}: DownloadRoadmapParams): void {
  // 워크북 생성
  const workbook = XLSX.utils.book_new();

  // ===================================
  // 1. 요약 시트
  // ===================================
  const summaryData = [
    ['세종대학교 커리어 로드맵'],
    [],
    ['학생 정보'],
    ['학번', studentId],
    ['학과', department],
    [],
    ['목표 진로', careerTitle],
    [],
    ['이수 현황'],
    ['기이수 과목 수', `${completedCourses.length}과목`],
    ['기이수 학점', `${completedCourses.reduce((sum, c) => sum + c.credits, 0)}학점`],
    ['추천 과목 수', `${recommendedCourses.length}과목`],
    ['추천 학점', `${recommendedCourses.reduce((sum, c) => sum + c.credits, 0)}학점`],
    [],
    ['AI 분석 리포트'],
    ['미충족 과목', insights.missing],
    ['설명', insights.missingDescription],
    ['전략', insights.strategy],
    ['전략 설명', insights.strategyDescription],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  
  // 열 너비 설정
  summarySheet['!cols'] = [
    { wch: 15 },
    { wch: 50 },
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, '요약');

  // ===================================
  // 2. 기이수 과목 시트
  // ===================================
  const completedData = [
    ['기이수 과목 목록'],
    [],
    ['과목명', '이수구분', '학점', '수강학기'],
    ...completedCourses.map(course => [
      course.name,
      course.type,
      course.credits,
      course.semester || '-',
    ]),
    [],
    ['합계', '', completedCourses.reduce((sum, c) => sum + c.credits, 0), ''],
  ];

  const completedSheet = XLSX.utils.aoa_to_sheet(completedData);
  
  completedSheet['!cols'] = [
    { wch: 25 },
    { wch: 10 },
    { wch: 8 },
    { wch: 12 },
  ];

  XLSX.utils.book_append_sheet(workbook, completedSheet, '기이수 과목');

  // ===================================
  // 3. 추천 과목 시트
  // ===================================
  const recommendedData = [
    ['AI 추천 과목 목록'],
    [],
    ['과목명', '이수구분', '학점', '추천학기', '추천 이유'],
    ...recommendedCourses.map(course => [
      course.name,
      course.type,
      course.credits,
      course.semester,
      course.reason,
    ]),
    [],
    ['합계', '', recommendedCourses.reduce((sum, c) => sum + c.credits, 0), '', ''],
  ];

  const recommendedSheet = XLSX.utils.aoa_to_sheet(recommendedData);
  
  recommendedSheet['!cols'] = [
    { wch: 25 },
    { wch: 10 },
    { wch: 8 },
    { wch: 12 },
    { wch: 40 },
  ];

  XLSX.utils.book_append_sheet(workbook, recommendedSheet, '추천 과목');

  // ===================================
  // 4. 전체 로드맵 시트 (학기별 정렬)
  // ===================================
  const allCourses = [
    ...completedCourses.map(c => ({ ...c, status: '이수완료', reason: '-' })),
    ...recommendedCourses.map(c => ({ ...c, status: 'AI추천' })),
  ].sort((a, b) => {
    // 학기 기준 정렬 (예: "2-1" < "3-2" < "4-1")
    const semA = a.semester || 'Z';
    const semB = b.semester || 'Z';
    return semA.localeCompare(semB);
  });

  const roadmapData = [
    ['전체 로드맵 (학기별)'],
    [],
    ['학기', '과목명', '이수구분', '학점', '상태', '비고'],
    ...allCourses.map(course => [
      course.semester || '-',
      course.name,
      course.type,
      course.credits,
      course.status,
      course.reason || '-',
    ]),
  ];

  const roadmapSheet = XLSX.utils.aoa_to_sheet(roadmapData);
  
  roadmapSheet['!cols'] = [
    { wch: 10 },
    { wch: 25 },
    { wch: 10 },
    { wch: 8 },
    { wch: 10 },
    { wch: 40 },
  ];

  XLSX.utils.book_append_sheet(workbook, roadmapSheet, '전체 로드맵');

  // ===================================
  // 파일 다운로드
  // ===================================
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fileName = `세종로드맵_${careerTitle}_${today}.xlsx`;
  
  XLSX.writeFile(workbook, fileName);
}