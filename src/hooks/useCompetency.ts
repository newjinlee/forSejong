// ===================================
// 역량 분석 훅
// ===================================
'use client';

import { useState, useCallback } from 'react';
import { analyzeCompetency } from '../lib/api';
import type {
  CompetencyAnalyzeRequest,
  CompetencyAnalyzeResponse,
  Competency,
  GapAnalysis,
} from '../types/api';

// 과목별 추천 매핑
const SUBJECT_RECOMMENDATIONS: Record<string, string> = {
  'DB': '데이터베이스, 데이터모델링',
  '알고리즘': '알고리즘, 문제해결기법',
  '네트워크': '컴퓨터네트워크, 네트워크보안',
  'OS': '운영체제, 시스템프로그래밍',
  '보안': '정보보호개론, 암호학',
  '협업': '캡스톤디자인, 소프트웨어공학',
  '수학': '선형대수학, 확률및통계',
  '데이터': '빅데이터분석, 데이터마이닝',
  '모델링': '기계학습, 딥러닝',
  '논문': '연구방법론, 학술논문작성',
  '구현': '소프트웨어개발실습',
  'UI구현': '웹프로그래밍, 모바일프로그래밍',
  '디자인': 'HCI, UX디자인',
  '최적화': '웹성능최적화, 코드최적화',
  '전공기초': 'C프로그래밍, 자료구조',
  '설계능력': '소프트웨어설계, 시스템설계',
  '구현능력': '고급프로그래밍, 프로젝트실습',
  '문제해결': '알고리즘, 코딩테스트대비',
  '창의성': '창의적공학설계, 스타트업워크숍',
  'Problem Solving': '알고리즘, 문제해결기법',
  'Programming Languages': '프로그래밍언어, 고급프로그래밍',
  'Database Management': '데이터베이스, 데이터모델링',
  'Team Collaboration': '캡스톤디자인, 소프트웨어공학',
  'System Architecture': '시스템설계, 소프트웨어아키텍처',
  'Debugging': '디버깅실습, 테스트기법',
  'Communication': '기술문서작성, 프레젠테이션',
  'Teamwork': '팀프로젝트, 협업도구활용',
  'Time Management': '프로젝트관리, 애자일방법론',
};

function getRecommendation(subject: string): string {
  return SUBJECT_RECOMMENDATIONS[subject] || `${subject} 관련 과목`;
}

// ===================================
// GAP 분석 계산 유틸리티 (외부에서 사용 가능)
// ===================================
export function calculateGapAnalysis(
  currentCompetency: Competency[],
  targetCompetency: Competency[]
): GapAnalysis[] {
  if (!currentCompetency.length || !targetCompetency.length) return [];
  
  // subject 기준으로 매칭
  const targetMap = new Map(targetCompetency.map(t => [t.subject, t.score]));
  
  return currentCompetency
    .map(current => {
      const targetScore = targetMap.get(current.subject) || 100;
      const gap = targetScore - current.score;

      let priority: 'high' | 'medium' | 'low';
      if (gap >= 40) {
        priority = 'high';
      } else if (gap >= 20) {
        priority = 'medium';
      } else {
        priority = 'low';
      }

      return {
        subject: current.subject,
        gap,
        priority,
        recommendation: getRecommendation(current.subject),
      };
    })
    .filter((g) => g.gap > 0)
    .sort((a, b) => b.gap - a.gap);
}

// ===================================
// 달성률 계산 유틸리티 (외부에서 사용 가능)
// ===================================
export function calculateAchievementRate(
  currentCompetency: Competency[],
  targetCompetency: Competency[]
): number {
  if (!currentCompetency.length || !targetCompetency.length) return 0;
  
  const totalCurrent = currentCompetency.reduce((sum, c) => sum + c.score, 0);
  const totalTarget = targetCompetency.reduce((sum, c) => sum + c.score, 0);
  if (totalTarget === 0) return 0;
  return Math.round((totalCurrent / totalTarget) * 100);
}

// ===================================
// useCompetencyAnalysis 훅
// - currentCompetency만 API에서 받아옴
// - targetCompetency는 외부에서 제공 (store에서)
// ===================================
type UseCompetencyAnalysisReturn = {
  isLoading: boolean;
  error: string | null;
  data: CompetencyAnalyzeResponse | null;
  analyze: (request: CompetencyAnalyzeRequest) => Promise<CompetencyAnalyzeResponse | null>;
  reset: () => void;
};

export function useCompetencyAnalysis(): UseCompetencyAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompetencyAnalyzeResponse | null>(null);

  const analyze = useCallback(async (request: CompetencyAnalyzeRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeCompetency(request);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '역량 분석에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    analyze,
    reset,
  };
}