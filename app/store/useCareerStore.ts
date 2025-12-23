import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 역량 데이터 타입
export type Competency = {
  subject: string;
  A: number;
  fullMark: number;
};

// 진로 데이터 타입
export type Career = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  competencies: Competency[];
  isCustom?: boolean; // 직접 입력 여부 판별용
};

// 학생 정보 타입
export type StudentInfo = {
  name: string;
  department: string; // 예: "컴퓨터공학과", "소프트웨어학과"
  grade: number;
  semester: string;   // 예: "2024-1"
};

interface CareerState {
  studentInfo: StudentInfo | null;
  selectedCareer: Career | null;
  setStudentInfo: (info: StudentInfo) => void;
  setSelectedCareer: (career: Career) => void;
  reset: () => void; // 로그아웃용
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      studentInfo: null, // 초기값 null (로그인 전)
      selectedCareer: null,
      setStudentInfo: (info) => set({ studentInfo: info }),
      setSelectedCareer: (career) => set({ selectedCareer: career }),
      reset: () => set({ studentInfo: null, selectedCareer: null }),
    }),
    {
      name: 'career-storage', // localStorage 키 이름
    }
  )
);