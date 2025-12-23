"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Loader2, AlertCircle, Eye, EyeOff, Icon } from 'lucide-react';
import { useCareerStore } from '../store/useCareerStore';

export default function LoginPage() {
  const router = useRouter();
  const { setStudentInfo } = useCareerStore();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 - 학생 정보 저장
        // TODO: 실제로는 서버에서 학생 정보를 파싱해서 내려줘야 함
        // 현재는 Mock 데이터로 처리
        setStudentInfo({
          name: data.user?.name || '세종학생',
          department: data.user?.department || '컴퓨터공학과',
          grade: data.user?.grade || 3,
          semester: data.user?.semester || '2024-2',
        });

        // 진로 선택 페이지로 이동
        router.push('/career');
      } else {
        // 로그인 실패
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 데모 모드 - 실제 로그인 없이 테스트
  const handleDemoLogin = () => {
    setStudentInfo({
      name: '이유진',
      department: '컴퓨터공학과',
      grade: 3,
      semester: '2024-2',
    });
    router.push('/career-select');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 & 타이틀 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-md border border-red-200">
            <img src="/icon.svg" alt="Logo" className="w-12 h-12 ml-1" />
          </div>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 학번 입력 */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-slate-700 mb-2">
                학번
              </label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="학번"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c3002f] focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                disabled={isLoading}
                required
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="포털 비밀번호"
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c3002f] focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading || !id || !password}
              className="w-full py-3.5 bg-[#c3002f] hover:bg-[#a00026] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-red-200/50 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>
        </div>

        {/* 하단 안내 */}
        <p className="text-center text-xs text-slate-400 mt-6">
          세종대학교 포털 계정으로 로그인됩니다.
          비밀번호는 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}