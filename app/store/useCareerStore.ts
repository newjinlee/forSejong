import { create } from 'zustand';

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
type StudentInfo = {
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
}

export const useCareerStore = create<CareerState>((set) => ({
  studentInfo: {
    name: '이유진', // 로그인에서 받아왔다고 가정
    department: '컴퓨터공학과',
    grade: 3,
    semester: '2024-1',
  },
  selectedCareer: null,
  setStudentInfo: (info) => set({ studentInfo: info }),
  setSelectedCareer: (career) => set({ selectedCareer: career }),
}));