"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useCareerStore } from '../../src/store/useCareerStore';
import type { CourseResponseDto } from '../../src/types/api';

// API URL (Next.js 프록시 사용 - CORS 우회)
// 프록시: /api/login → 백엔드 /api/login
// 프록시: /api/users/{id}/courses → 백엔드 /api/users/{id}/courses

// ===================================
// 학년/학기 계산 유틸리티 함수
// ===================================

/**
 * 수강 과목 데이터에서 학년과 현재 학기를 계산
 * @param courses 수강 과목 배열
 * @returns { grade: 학년, semester: "YYYY-S" 형식 }
 */
function calculateGradeAndSemester(courses: CourseResponseDto[]): {
  grade: number;
  semester: string;
  department: string;
} {
  if (courses.length === 0) {
    return { grade: 1, semester: `${new Date().getFullYear()}-1`, department: '컴퓨터공학과' };
  }

  // 년도와 학기를 숫자로 변환하여 정렬
  const sortedByTime = [...courses].sort((a, b) => {
    const timeA = parseInt(a.year) * 10 + parseInt(a.smtCd);
    const timeB = parseInt(b.year) * 10 + parseInt(b.smtCd);
    return timeA - timeB;
  });

  // 가장 오래된 (입학) 년도/학기
  const oldest = sortedByTime[0];
  const entryYear = parseInt(oldest.year);
  const entrySemester = parseInt(oldest.smtCd);

  // 가장 최근 년도/학기
  const latest = sortedByTime[sortedByTime.length - 1];
  const latestYear = parseInt(latest.year);
  const latestSemester = parseInt(latest.smtCd);

  // 학과 (첫 번째 과목에서 추출)
  const department = oldest.deptMAlias || '컴퓨터공학과';

  // 학년 계산: (최근년도 - 입학년도) * 2 + 학기 차이 + 1
  // 예: 2021년 1학기 입학 → 2024년 2학기 = (2024-2021)*2 + (2-1) + 1 = 6+1+1 = 8학기 = 4학년
  const totalSemesters = (latestYear - entryYear) * 2 + (latestSemester - entrySemester) + 1;
  const grade = Math.min(Math.ceil(totalSemesters / 2), 4); // 최대 4학년

  // 현재 학기 표시 (최근 데이터 + 1학기 = 다음 학기로 가정)
  let nextYear = latestYear;
  let nextSemester = latestSemester + 1;
  if (nextSemester > 2) {
    nextSemester = 1;
    nextYear += 1;
  }

  return {
    grade,
    semester: `${nextYear}-${nextSemester}`,
    department,
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { setStudentInfo, setCompletedCourses } = useCareerStore();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // ===================================
      // 1단계: 로그인 API 호출
      // POST /api/login
      // 응답: 200 → "LOGIN_SUCCESS" (텍스트)
      // ===================================
      setLoadingMessage('로그인 중...');
      
      const loginResponse = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const loginText = await loginResponse.text();

      if (!loginResponse.ok || loginText !== 'LOGIN_SUCCESS') {
        // 실패 시 에러 메시지 처리
        throw new Error(loginText || '로그인에 실패했습니다.');
      }
      
      // ===================================
      // 2단계: 수강 과목 조회 API 호출
      // GET /api/users/{studentId}/courses
      // ===================================
      setLoadingMessage('수강 정보 불러오는 중...');
      
      const coursesResponse = await fetch(`/api/users/${id}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      let courses: CourseResponseDto[] = [];

      if (coursesResponse.ok) {
        courses = await coursesResponse.json();
      } else {
        // 수강 과목 조회 실패해도 로그인은 성공으로 처리
        console.warn('수강 과목 조회 실패:', await coursesResponse.text());
      }

      // ===================================
      // 3단계: 학년/학기/학과 계산
      // ===================================
      const { grade, semester, department } = calculateGradeAndSemester(courses);

      // ===================================
      // 4단계: 스토어에 저장
      // ===================================
      
      // 학생 정보 저장 (수강과목에서 계산된 값 사용)
      setStudentInfo({
        id: id,
        name: '세종학생', // 추후 API 추가 시 변경
        department: department,
        grade: grade,
        semester: semester,
      });

      // 수강 과목 변환 및 저장
      const convertedCourses = courses.map((course) => ({
        id: course.curiNo,
        name: course.curiNm,
        type: convertCourseType(course.typeName),
        credits: course.cdt,
        semester: `${course.year}-${course.smtCd}`,
      }));
      
      setCompletedCourses(convertedCourses);

      // 진로 선택 페이지로 이동
      router.push('/career');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  // 이수구분 변환 함수
  const convertCourseType = (typeName: string): '전필' | '전선' | '교양' => {
    if (typeName.includes('전필') || typeName.includes('전공필수')) return '전필';
    if (typeName.includes('전선') || typeName.includes('전공선택')) return '전선';
    return '교양';
  };

  // 데모 모드 - 실제 로그인 없이 테스트
  const handleDemoLogin = () => {
    setStudentInfo({
      id: '21011578',
      name: '이유진',
      department: '컴퓨터공학과',
      grade: 3,
      semester: '2024-2',
    });
    setCompletedCourses([
      { id: 'c-1', name: '디지털시스템', type: '전필', credits: 3, semester: '2-1' },
      { id: 'c-2', name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '2-2' },
      { id: 'c-3', name: '고급C프로그래밍', type: '전선', credits: 3, semester: '2-2' },
      { id: 'c-4', name: '컴퓨터구조', type: '전필', credits: 3, semester: '2-2' },
      { id: 'c-5', name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2-2' },
    ]);
    router.push('/career');
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
                  {loadingMessage || '로그인 중...'}
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          {/* 데모 로그인 버튼 (개발용) */}
          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full mt-3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-all"
            >
              🧪 데모 로그인 (개발용)
            </button>
          )}
        </div>

        {/* 하단 안내 */}
        <p className="text-center text-xs text-slate-400 mt-6">
          세종대학교 포털 계정으로 로그인됩니다.
          <br />
          비밀번호는 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}