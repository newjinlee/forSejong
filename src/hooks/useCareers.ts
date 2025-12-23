// ===================================
// 진로 목록 조회 훅
// ===================================
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCareers, analyzeCustomCareer } from '../lib/api';
import type { Career, CareersResponse, CustomCareerAnalyzeResponse } from '../types/api';

type UseCareersReturn = {
  careers: Career[];
  isLoading: boolean;
  error: string | null;
  refetch: (department?: string) => Promise<void>;
};

export function useCareers(department?: string): UseCareersReturn {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = useCallback(async (dept?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: CareersResponse = await getCareers(dept);
      setCareers(response.careers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '진로 목록을 불러오는데 실패했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers(department);
  }, [department, fetchCareers]);

  return {
    careers,
    isLoading,
    error,
    refetch: fetchCareers,
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
      const response = await analyzeCustomCareer({ customCareerTitle: title });
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