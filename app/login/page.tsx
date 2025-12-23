"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useCareerStore } from '../../src/store/useCareerStore';
import type { CourseResponseDto } from '../../src/types/api';

// API URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://54.180.100.83:8080';

// ===================================
// 유틸리티 함수
// ===================================

/**
 * 학기 문자열에서 숫자 추출
 * "1학기" -> 1, "2학기" -> 2, "여름학기" -> 1, "겨울학기" -> 2
 */
function parseSemesterNumber(smt_cd: string): number {
  if (smt_cd.includes('1') || smt_cd.includes('여름')) return 1;
  if (smt_cd.includes('2') || smt_cd.includes('겨울')) return 2;
  return 1;
}

/**
 * 정규학기 여부 확인 (여름/겨울학기 제외)
 */
function isRegularSemester(smt_cd: string): boolean {
  return smt_cd === '1학기' || smt_cd === '2학기';
}

/**
 * 수강 과목 데이터에서 학년과 현재 학기를 계산
 * - 유니크한 학기 개수 기준으로 학년 계산 (휴학 고려)
 */
function calculateGradeAndSemester(courses: CourseResponseDto[]): {
  grade: number;
  semester: string;
  department: string;
  completedSemesterCount: number;
} {
  if (courses.length === 0) {
    return { 
      grade: 1, 
      semester: `${new Date().getFullYear()}-1`, 
      department: '컴퓨터공학과',
      completedSemesterCount: 0
    };
  }

  // 정규학기만 필터링 (1학기, 2학기)
  const regularCourses = courses.filter(c => isRegularSemester(c.smt_cd));
  const targetCourses = regularCourses.length > 0 ? regularCourses : courses;

  // 유니크한 학기 추출 (년도-학기 조합)
  const uniqueSemesters = new Set(
    targetCourses.map(c => `${c.year}-${parseSemesterNumber(c.smt_cd)}`)
  );
  const completedSemesterCount = uniqueSemesters.size;

  // 정렬된 학기 목록
  const sortedSemesters = [...uniqueSemesters].sort((a, b) => {
    const [yearA, semA] = a.split('-').map(Number);
    const [yearB, semB] = b.split('-').map(Number);
    if (yearA !== yearB) return yearA - yearB;
    return semA - semB;
  });

  console.log('📊 이수 학기 목록:', sortedSemesters);
  console.log('📊 총 이수 학기 수:', completedSemesterCount);

  // 가장 최근 학기
  const latestSemester = sortedSemesters[sortedSemesters.length - 1];
  const [latestYear, latestSemNum] = latestSemester.split('-').map(Number);

  // 학과 (첫 번째 과목에서 추출)
  const oldest = targetCourses[0];
  const department = oldest.dept_m_alias || '컴퓨터공학과';

  // 학년 계산 (유니크한 학기 수 기준!)
  // 1~2학기: 1학년, 3~4학기: 2학년, 5~6학기: 3학년, 7~8학기: 4학년
  const grade = Math.min(Math.ceil(completedSemesterCount / 2), 4);

  console.log('📊 계산된 학년:', grade);

  return {
    grade,
    semester: `${latestYear}-${latestSemNum}`,
    department,
    completedSemesterCount,
  };
}

/**
 * 이수구분 변환 함수
 */
function convertCourseType(type_name: string): '전필' | '전선' | '교양' {
  if (type_name.includes('전필') || type_name.includes('전공필수')) return '전필';
  if (type_name.includes('전선') || type_name.includes('전공선택')) return '전선';
  return '교양';
}

// ===================================
// 메인 컴포넌트
// ===================================

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
      // ===================================
      setLoadingMessage('로그인 중...');
      
      const loginResponse = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const loginText = await loginResponse.text();

      if (!loginResponse.ok || loginText !== 'LOGIN_SUCCESS') {
        throw new Error(loginText || '로그인에 실패했습니다.');
      }
      
      // ===================================
      // 2단계: 수강 과목 조회 API 호출
      // ===================================
      setLoadingMessage('수강 정보 불러오는 중...');
      
      const coursesResponse = await fetch(`${BACKEND_URL}/api/users/${id}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      let courses: CourseResponseDto[] = [];

      if (coursesResponse.ok) {
        courses = await coursesResponse.json();
      } else {
        console.warn('수강 과목 조회 실패:', await coursesResponse.text());
      }

      // ===================================
      // 3단계: 학년/학기/학과 계산
      // ===================================
      const { grade, semester, department } = calculateGradeAndSemester(courses);

      // ===================================
      // 4단계: 스토어에 저장
      // ===================================
      setStudentInfo({
        id: id,
        name: '세종학생',
        department: department,
        grade: grade,
        semester: semester,
      });

      // 수강 과목 변환 및 저장
      const convertedCourses = courses.map((course) => ({
        id: course.curi_no,
        name: course.curi_nm,
        type: convertCourseType(course.type_name),
        credits: course.cdt,
        semester: `${course.year}-${parseSemesterNumber(course.smt_cd)}`,
      }));
      
      setCompletedCourses(convertedCourses);

      // 진로 선택 페이지로 이동
      router.push('/career-select');

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

  // 데모 모드 - 실제 로그인 없이 테스트
  const handleDemoLogin = () => {
    setStudentInfo({
      id: '21011578',
      name: '이유진',
      department: '컴퓨터공학과',
      grade: 4,
      semester: '2025-1',
    });
    setCompletedCourses([
      { id: '004118', name: '디지털시스템', type: '전필', credits: 3, semester: '2022-1' },
      { id: '009955', name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '2022-2' },
      { id: '009913', name: '고급C프로그래밍및실습', type: '전필', credits: 3, semester: '2021-2' },
      { id: '003278', name: '컴퓨터구조', type: '전필', credits: 3, semester: '2023-2' },
      { id: '003284', name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2023-2' },
      { id: '004310', name: '운영체제', type: '전필', credits: 3, semester: '2023-1' },
      { id: '009954', name: '알고리즘및실습', type: '전필', credits: 3, semester: '2022-2' },
      { id: '006135', name: '정보보호개론', type: '전선', credits: 3, semester: '2025-1' },
      { id: '006237', name: '웹프로그래밍', type: '전선', credits: 3, semester: '2025-1' },
      { id: '009960', name: 'Capstone디자인(산학협력프로젝트)', type: '전필', credits: 6, semester: '2025-1' },
    ]);
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
                  {loadingMessage || '로그인 중...'}
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
          <br />
          비밀번호는 서버에 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}