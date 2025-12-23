// ===================================
// 로그인 훅
// ===================================
'use client';

import { useState, useCallback } from 'react';
import { login } from '../lib/api';
import type { LoginRequest, LoginResponse } from '../types/api';

type UseLoginReturn = {
  isLoading: boolean;
  error: string | null;
  data: LoginResponse | null;
  loginMutation: (credentials: LoginRequest) => Promise<LoginResponse | null>;
  reset: () => void;
};

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);

  const loginMutation = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(credentials);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
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
    loginMutation,
    reset,
  };
}