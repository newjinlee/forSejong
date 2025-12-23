// ===================================
// SEJONG ROADMAP Zustand 스토어
// ===================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Career as ApiCareer, Course, Competency, CompetencyChart } from '../types/api';

// ===================================
// 타입 정의
// ===================================

// 프론트엔드용 Career 타입 (차트 호환)
export type CareerWithChart = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  competencies: CompetencyChart[]; // A 키 사용
  isCustom?: boolean;
};

// 학생 정보 타입 (API User 확장)
export type StudentInfo = User;

// API Competency -> Chart Competency 변환
export function toChartCompetencies(competencies: Competency[]): CompetencyChart[] {
  return competencies.map((c) => ({
    subject: c.subject,
    A: c.score,
    fullMark: c.fullMark,
  }));
}

// API Career -> CareerWithChart 변환
export function toCareerWithChart(career: ApiCareer): CareerWithChart {
  return {
    ...career,
    competencies: toChartCompetencies(career.competencies),
  };
}

// ===================================
// 스토어 인터페이스
// ===================================
interface CareerState {
  // 사용자 정보
  studentInfo: StudentInfo | null;
  completedCourses: Course[];
  
  // 선택된 진로
  selectedCareer: CareerWithChart | null;
  
  // 액션
  setStudentInfo: (info: StudentInfo) => void;
  setCompletedCourses: (courses: Course[]) => void;
  setSelectedCareer: (career: CareerWithChart) => void;
  
  // 로그아웃
  reset: () => void;
}

// ===================================
// 스토어 생성
// ===================================
export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      // 초기 상태
      studentInfo: null,
      completedCourses: [],
      selectedCareer: null,
      
      // 액션
      setStudentInfo: (info) => set({ studentInfo: info }),
      setCompletedCourses: (courses) => set({ completedCourses: courses }),
      setSelectedCareer: (career) => set({ selectedCareer: career }),
      
      // 리셋
      reset: () => set({
        studentInfo: null,
        completedCourses: [],
        selectedCareer: null,
      }),
    }),
    {
      name: 'career-storage', // localStorage 키 이름
    }
  )
);

// ===================================
// 기존 호환성을 위한 타입 re-export
// ===================================
export type { Competency } from '../types/api';
// Career 타입은 CareerWithChart를 사용하세요
// (API의 Career와 구분하기 위해 CareerWithChart 이름 그대로 사용 권장)