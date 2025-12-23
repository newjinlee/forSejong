// ===================================
// 로드맵 생성 훅
// ===================================
'use client';

import { useState, useCallback } from 'react';
import { generateRoadmap } from '../lib/api';
import type { RoadmapGenerateRequest, RoadmapResponse } from '../types/api';

type UseRoadmapReturn = {
  isLoading: boolean;
  error: string | null;
  roadmap: RoadmapResponse | null;
  generate: (request: RoadmapGenerateRequest) => Promise<RoadmapResponse | null>;
  reset: () => void;
};

export function useRoadmap(): UseRoadmapReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);

  const generate = useCallback(async (request: RoadmapGenerateRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateRoadmap(request);
      setRoadmap(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로드맵 생성에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setRoadmap(null);
  }, []);

  return {
    isLoading,
    error,
    roadmap,
    generate,
    reset,
  };
}