// ===================================
// 진로 목록 및 역량 조회 훅
// ===================================
'use client';

import { useState, useCallback, useMemo } from 'react';
import { getCareerCompetencies, analyzeCustomCareer } from '../lib/api';
import { getCareersByDepartment, type CareerInput } from '../lib/careerData';
import type { CustomCareerAnalyzeResponse, Competency } from '../types/api';

// ===================================
// 타입 정의
// ===================================

// 프론트엔드에서 사용하는 Career 타입 (competencies 포함)
export type CareerWithCompetencies = CareerInput & {
  competencies?: Competency[];
  isCustom?: boolean;
};

// ===================================
// 학과별 하드코딩된 직업 목록 조회 훅
// ===================================
type UseCareersReturn = {
  careers: CareerInput[];
  isLoading: boolean;
  error: string | null;
};

export function useCareers(department?: string): UseCareersReturn {
  // 하드코딩된 데이터에서 직접 가져옴 (API 호출 없음)
  const careers = useMemo(() => {
    if (!department) return [];
    return getCareersByDepartment(department);
  }, [department]);

  return {
    careers,
    isLoading: false,
    error: null,
  };
}

// ===================================
// 직업 역량 분석 훅 (API 호출)
// ===================================
type UseCareerCompetenciesReturn = {
  isLoading: boolean;
  error: string | null;
  competencies: Competency[] | null;
  fetchCompetencies: (title: string) => Promise<Competency[] | null>;
  reset: () => void;
};

export function useCareerCompetencies(): UseCareerCompetenciesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [competencies, setCompetencies] = useState<Competency[] | null>(null);

  const fetchCompetencies = useCallback(async (title: string) => {
    if (!title.trim()) {
      setError('직업명을 입력해주세요.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getCareerCompetencies({ title });
      setCompetencies(response.competencies);
      return response.competencies;
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
    setCompetencies(null);
  }, []);

  return {
    isLoading,
    error,
    competencies,
    fetchCompetencies,
    reset,
  };
}

// ===================================
// 커스텀 진로 분석 훅
// ===================================
type UseCustomCareerAnalysisReturn = {
  isAnalyzing: boolean;
  error: string | null;
  analyzedCareer: CustomCareerAnalyzeResponse | null;
  analyze: (title: string) => Promise<CustomCareerAnalyzeResponse | null>;
  reset: () => void;
};

export function useCustomCareerAnalysis(): UseCustomCareerAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzedCareer, setAnalyzedCareer] = useState<CustomCareerAnalyzeResponse | null>(null);

  const analyze = useCallback(async (title: string) => {
    if (!title.trim()) {
      setError('진로명을 입력해주세요.');
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeCustomCareer({ title: title });
      setAnalyzedCareer(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '진로 분석에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setError(null);
    setAnalyzedCareer(null);
  }, []);

  return {
    isAnalyzing,
    error,
    analyzedCareer,
    analyze,
    reset,
  };
}