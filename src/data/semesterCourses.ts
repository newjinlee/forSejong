// ===================================
// 세종대학교 2025년 개설과목 데이터
// 1학기, 2학기 학과별/학년별 과목
// ===================================

export type CourseData = {
  id: string;
  name: string;
  type: '전필' | '전선';
  credits: number;
};

export type SemesterCourses = {
  [department: string]: {
    [grade: string]: CourseData[];
  };
};

// ===================================
// 1학기 개설 과목
// ===================================
export const SEMESTER_1_COURSES: SemesterCourses = {
  "컴퓨터공학과": {
    "1": [
      { "id": "7330", "name": "확률및통계", "type": "전필", "credits": 3 },
      { "id": "9912", "name": "C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "4118", "name": "디지털시스템", "type": "전필", "credits": 3 },
      { "id": "9913", "name": "고급C프로그래밍및실습", "type": "전필", "credits": 3 },
      { "id": "9952", "name": "자료구조및실습", "type": "전필", "credits": 3 },
      { "id": "6237", "name": "웹프로그래밍", "type": "전선", "credits": 3 },
      { "id": "9914", "name": "공학설계기초(산학프로젝트입문)", "type": "전선", "credits": 3 },
      { "id": "9992", "name": "문제해결및실습:C++", "type": "전선", "credits": 3 },
      { "id": "11251", "name": "K-MOOC:모두를위한머신러닝", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "4310", "name": "운영체제", "type": "전필", "credits": 3 },
      { "id": "3281", "name": "컴퓨터그래픽스", "type": "전선", "credits": 3 },
      { "id": "7219", "name": "데이터베이스", "type": "전선", "credits": 3 },
      { "id": "7313", "name": "프로그래밍언어의개념", "type": "전선", "credits": 3 },
      { "id": "10881", "name": "딥러닝", "type": "전선", "credits": 3 },
      { "id": "5246", "name": "신호및시스템", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "9960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "6132", "name": "영상처리", "type": "전선", "credits": 3 },
      { "id": "6135", "name": "정보보호개론", "type": "전선", "credits": 3 },
      { "id": "6478", "name": "무선통신", "type": "전선", "credits": 3 },
      { "id": "11771", "name": "K-MOOC:생성형인공지능입문", "type": "전선", "credits": 3 },
      { "id": "11932", "name": "Human-AI Interaction", "type": "전선", "credits": 3 },
      { "id": "12001", "name": "지능형엣지시스템", "type": "전선", "credits": 3 }
    ]
  },
  "소프트웨어학과": {
    "2": [
      { "id": "9952", "name": "자료구조및실습", "type": "전필", "credits": 3 },
      { "id": "9992", "name": "문제해결및실습:C++", "type": "전필", "credits": 3 },
      { "id": "5619", "name": "멀티미디어프로그래밍", "type": "전선", "credits": 3 },
      { "id": "10206", "name": "일반물리및시뮬레이션", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "4310", "name": "운영체제", "type": "전필", "credits": 3 },
      { "id": "7219", "name": "데이터베이스", "type": "전필", "credits": 3 },
      { "id": "9957", "name": "오픈소스SW개론", "type": "전필", "credits": 3 },
      { "id": "6476", "name": "게임프로그래밍", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "9960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "6208", "name": "가상현실", "type": "전선", "credits": 3 },
      { "id": "10000", "name": "기계학습", "type": "전선", "credits": 3 },
      { "id": "11904", "name": "생성형AI", "type": "전선", "credits": 3 }
    ]
  },
  "정보보호학과": {
    "1": [
      { "id": "9912", "name": "C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "9914", "name": "공학설계기초(산학프로젝트입문)", "type": "전필", "credits": 3 },
      { "id": "9952", "name": "자료구조및실습", "type": "전필", "credits": 3 },
      { "id": "3284", "name": "컴퓨터네트워크", "type": "전선", "credits": 3 },
      { "id": "6237", "name": "웹프로그래밍", "type": "전선", "credits": 3 },
      { "id": "9173", "name": "정보보호와보안의기초", "type": "전선", "credits": 3 },
      { "id": "9955", "name": "이산수학및프로그래밍", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "9520", "name": "공개키암호론", "type": "전필", "credits": 3 },
      { "id": "9986", "name": "운영체제및보안", "type": "전필", "credits": 3 },
      { "id": "11973", "name": "정보보호연구입문", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "9960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "8662", "name": "디지털포렌식", "type": "전선", "credits": 3 },
      { "id": "12008", "name": "AI기반악성코드분석", "type": "전선", "credits": 3 }
    ]
  },
  "AI로봇학과": {
    "1": [
      { "id": "7330", "name": "확률및통계", "type": "전필", "credits": 3 },
      { "id": "9912", "name": "C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "10224", "name": "창의SW기초설계", "type": "전필", "credits": 3 },
      { "id": "11488", "name": "자료구조및실습", "type": "전필", "credits": 3 },
      { "id": "4642", "name": "동역학", "type": "전선", "credits": 3 },
      { "id": "4864", "name": "메카트로닉스", "type": "전선", "credits": 3 },
      { "id": "8621", "name": "MATLAB프로그래밍", "type": "전선", "credits": 3 },
      { "id": "9955", "name": "이산수학및프로그래밍", "type": "전선", "credits": 3 },
      { "id": "11428", "name": "AI로봇프로그래밍", "type": "전선", "credits": 3 }
    ]
  },
  "인공지능학과": {
    "3": [
      { "id": "11261", "name": "딥러닝개론", "type": "전필", "credits": 3 },
      { "id": "6132", "name": "영상처리", "type": "전선", "credits": 3 },
      { "id": "11173", "name": "자연어처리", "type": "전선", "credits": 3 },
      { "id": "11262", "name": "인공지능과사이버보안", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "9960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "10238", "name": "딥러닝시스템", "type": "전선", "credits": 3 },
      { "id": "11181", "name": "강화학습", "type": "전선", "credits": 3 }
    ]
  },
  "데이터사이언스학과": {
    "3": [
      { "id": "7219", "name": "데이터베이스", "type": "전필", "credits": 3 },
      { "id": "10000", "name": "기계학습", "type": "전필", "credits": 3 },
      { "id": "4310", "name": "운영체제", "type": "전선", "credits": 3 },
      { "id": "10563", "name": "의사결정분석", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "9960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "10566", "name": "시계열분석및예측", "type": "전선", "credits": 3 }
    ]
  },
  "인공지능데이터사이언스학과": {
    "1": [
      { "id": "7330", "name": "확률및통계", "type": "전필", "credits": 3 },
      { "id": "9912", "name": "C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "9952", "name": "자료구조및실습", "type": "전필", "credits": 3 },
      { "id": "11259", "name": "기계학습개론", "type": "전필", "credits": 3 },
      { "id": "4102", "name": "수치해석", "type": "전선", "credits": 3 },
      { "id": "6237", "name": "웹프로그래밍", "type": "전선", "credits": 3 },
      { "id": "9955", "name": "이산수학및프로그래밍", "type": "전선", "credits": 3 },
      { "id": "11321", "name": "인공지능활용", "type": "전선", "credits": 3 },
      { "id": "11322", "name": "고급인공지능활용", "type": "전선", "credits": 3 }
    ]
  },
  "전자정보통신공학과": {
    "2": [
      { "id": "4114", "name": "전기회로", "type": "전필", "credits": 3 },
      { "id": "8622", "name": "확률및랜덤변수", "type": "전필", "credits": 3 },
      { "id": "11678", "name": "기초전자물리", "type": "전필", "credits": 3 },
      { "id": "307", "name": "공업수학2", "type": "전선", "credits": 3 },
      { "id": "4268", "name": "데이터구조론", "type": "전선", "credits": 3 },
      { "id": "5611", "name": "디지털논리회로", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "4474", "name": "통신이론", "type": "전필", "credits": 3 },
      { "id": "4600", "name": "디지털신호처리", "type": "전필", "credits": 3 },
      { "id": "4699", "name": "데이터통신", "type": "전필", "credits": 3 },
      { "id": "7453", "name": "전자회로1", "type": "전필", "credits": 3 },
      { "id": "7806", "name": "기초반도체", "type": "전필", "credits": 3 },
      { "id": "9649", "name": "전자기1", "type": "전필", "credits": 3 },
      { "id": "4475", "name": "자동제어", "type": "전선", "credits": 3 },
      { "id": "7235", "name": "랜덤프로세스", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "2505", "name": "인공지능", "type": "전선", "credits": 3 },
      { "id": "6558", "name": "무선통신공학", "type": "전선", "credits": 3 },
      { "id": "6562", "name": "초고주파공학", "type": "전선", "credits": 3 },
      { "id": "9655", "name": "광통신공학", "type": "전선", "credits": 3 }
    ]
  }
};

// ===================================
// 2학기 개설 과목
// ===================================
export const SEMESTER_2_COURSES: SemesterCourses = {
  "컴퓨터공학과": {
    "1": [
      { "id": "000304", "name": "공업수학1", "type": "전필", "credits": 3 },
      { "id": "001725", "name": "선형대수", "type": "전필", "credits": 3 },
      { "id": "009913", "name": "고급C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "009912", "name": "C프로그래밍및실습", "type": "전필", "credits": 3 },
      { "id": "009954", "name": "알고리즘및실습", "type": "전필", "credits": 3 },
      { "id": "003278", "name": "컴퓨터구조", "type": "전선", "credits": 3 },
      { "id": "009955", "name": "이산수학및프로그래밍", "type": "전선", "credits": 3 },
      { "id": "009956", "name": "문제해결및실습:JAVA", "type": "전선", "credits": 3 },
      { "id": "011251", "name": "K-MOOC:모두를위한머신러닝", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "003284", "name": "컴퓨터네트워크", "type": "전필", "credits": 3 },
      { "id": "001769", "name": "소프트웨어공학", "type": "전선", "credits": 3 },
      { "id": "002505", "name": "인공지능", "type": "전선", "credits": 3 },
      { "id": "004599", "name": "통신시스템", "type": "전선", "credits": 3 },
      { "id": "004600", "name": "디지털신호처리", "type": "전선", "credits": 3 },
      { "id": "008636", "name": "멀티코어프로그래밍", "type": "전선", "credits": 3 },
      { "id": "012000", "name": "리눅스프로그래밍및실습", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "009960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "006208", "name": "가상현실", "type": "전선", "credits": 3 },
      { "id": "011771", "name": "K-MOOC:생성형인공지능입문", "type": "전선", "credits": 3 }
    ]
  },
  "소프트웨어학과": {
    "2": [
      { "id": "003278", "name": "컴퓨터구조", "type": "전필", "credits": 3 },
      { "id": "009954", "name": "알고리즘및실습", "type": "전필", "credits": 3 },
      { "id": "009993", "name": "SW설계기초(산학프로젝트입문)", "type": "전필", "credits": 3 },
      { "id": "009955", "name": "이산수학및프로그래밍", "type": "전선", "credits": 3 },
      { "id": "009956", "name": "문제해결및실습:JAVA", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "003281", "name": "컴퓨터그래픽스", "type": "전선", "credits": 3 },
      { "id": "005910", "name": "데이터베이스프로그래밍", "type": "전선", "credits": 3 },
      { "id": "011175", "name": "음성오디오처리", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "009960", "name": "Capstone디자인(산학협력프로젝트)", "type": "전필", "credits": 6 },
      { "id": "002505", "name": "인공지능", "type": "전선", "credits": 3 },
      { "id": "010001", "name": "증강현실", "type": "전선", "credits": 3 }
    ]
  },
  "정보보호학과": {
    "1": [
      { "id": "000304", "name": "공업수학1", "type": "전필", "credits": 3 },
      { "id": "001725", "name": "선형대수", "type": "전필", "credits": 3 },
      { "id": "009913", "name": "고급C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "009174", "name": "어셈블리어", "type": "전필", "credits": 3 },
      { "id": "009954", "name": "알고리즘및실습", "type": "전필", "credits": 3 },
      { "id": "002998", "name": "정수론", "type": "전선", "credits": 3 },
      { "id": "003278", "name": "컴퓨터구조", "type": "전선", "credits": 3 },
      { "id": "009176", "name": "고급컴퓨터네트워크", "type": "전선", "credits": 3 },
      { "id": "009518", "name": "대칭키암호론", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "009989", "name": "시스템해킹과보안", "type": "전필", "credits": 3 },
      { "id": "011972", "name": "정보보호심화연구", "type": "전선", "credits": 3 },
      { "id": "012007", "name": "AI기반시스템프로그래밍", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "008663", "name": "보안정책과법규", "type": "전선", "credits": 3 },
      { "id": "010447", "name": "정보보호특강", "type": "전선", "credits": 3 }
    ]
  },
  "AI로봇학과": {
    "1": [
      { "id": "000304", "name": "공업수학1", "type": "전필", "credits": 3 },
      { "id": "001725", "name": "선형대수", "type": "전필", "credits": 3 },
      { "id": "009913", "name": "고급C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "004118", "name": "디지털시스템", "type": "전선", "credits": 3 },
      { "id": "005246", "name": "신호및시스템", "type": "전선", "credits": 3 },
      { "id": "006237", "name": "웹프로그래밍", "type": "전선", "credits": 3 },
      { "id": "010226", "name": "동적시스템모델링", "type": "전선", "credits": 3 },
      { "id": "011495", "name": "알고리즘및실습", "type": "전선", "credits": 3 },
      { "id": "011646", "name": "메커니즘설계", "type": "전선", "credits": 3 }
    ]
  },
  "인공지능학과": {
    "3": [
      { "id": "011263", "name": "파이썬기반딥러닝", "type": "전필", "credits": 3 },
      { "id": "006566", "name": "지능형시스템", "type": "전선", "credits": 3 },
      { "id": "009665", "name": "패턴인식", "type": "전선", "credits": 3 },
      { "id": "011264", "name": "인공지능보안", "type": "전선", "credits": 3 },
      { "id": "011265", "name": "AR/VR/MR", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "009967", "name": "특허와창업", "type": "전선", "credits": 3 },
      { "id": "011271", "name": "Human–AI Interaction", "type": "전선", "credits": 3 }
    ]
  },
  "데이터사이언스학과": {
    "3": [
      { "id": "009957", "name": "오픈소스SW개론", "type": "전필", "credits": 3 },
      { "id": "002505", "name": "인공지능", "type": "전선", "credits": 3 },
      { "id": "010143", "name": "데이터시각화", "type": "전선", "credits": 3 },
      { "id": "010145", "name": "데이터문제해결및실습1", "type": "전선", "credits": 3 },
      { "id": "011176", "name": "대용량데이터처리", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "009967", "name": "특허와창업", "type": "전선", "credits": 3 },
      { "id": "010146", "name": "데이터문제해결및실습2", "type": "전선", "credits": 3 },
      { "id": "010570", "name": "고급기계학습", "type": "전선", "credits": 3 }
    ]
  },
  "인공지능데이터사이언스학과": {
    "1": [
      { "id": "000304", "name": "공업수학1", "type": "전필", "credits": 3 },
      { "id": "001725", "name": "선형대수", "type": "전필", "credits": 3 },
      { "id": "009913", "name": "고급C프로그래밍및실습", "type": "전필", "credits": 3 }
    ],
    "2": [
      { "id": "003278", "name": "컴퓨터구조", "type": "전필", "credits": 3 },
      { "id": "009954", "name": "알고리즘및실습", "type": "전필", "credits": 3 },
      { "id": "004600", "name": "디지털신호처리", "type": "전선", "credits": 3 },
      { "id": "011497", "name": "기계학습실습", "type": "전선", "credits": 3 },
      { "id": "011499", "name": "인공지능수학", "type": "전선", "credits": 3 }
    ]
  },
  "전자정보통신공학과": {
    "2": [
      { "id": "004111", "name": "물리전자공학", "type": "전필", "credits": 3 },
      { "id": "005246", "name": "신호및시스템", "type": "전필", "credits": 3 },
      { "id": "007620", "name": "기초설계", "type": "전필", "credits": 3 },
      { "id": "003276", "name": "컴퓨터구조론", "type": "전선", "credits": 3 },
      { "id": "009658", "name": "전기회로실험", "type": "전선", "credits": 3 },
      { "id": "011680", "name": "객체지향프로그래밍", "type": "전선", "credits": 3 }
    ],
    "3": [
      { "id": "003284", "name": "컴퓨터네트워크", "type": "전필", "credits": 3 },
      { "id": "004829", "name": "광전자공학", "type": "전필", "credits": 3 },
      { "id": "006132", "name": "영상처리", "type": "전필", "credits": 3 },
      { "id": "006294", "name": "음성처리", "type": "전필", "credits": 3 },
      { "id": "008086", "name": "디지털통신시스템", "type": "전필", "credits": 3 },
      { "id": "004596", "name": "반도체공학", "type": "전선", "credits": 3 },
      { "id": "006139", "name": "임베디드시스템", "type": "전선", "credits": 3 },
      { "id": "007722", "name": "전자회로2", "type": "전선", "credits": 3 }
    ],
    "4": [
      { "id": "004102", "name": "수치해석", "type": "전선", "credits": 3 },
      { "id": "004830", "name": "디지털제어", "type": "전선", "credits": 3 },
      { "id": "007284", "name": "광통신시스템", "type": "전선", "credits": 3 },
      { "id": "007463", "name": "차세대이동통신", "type": "전선", "credits": 3 }
    ]
  }
};

// ===================================
// 추천 과목 선정 유틸리티
// ===================================

export type RecommendedCourse = {
  id: string;
  name: string;
  type: '전필' | '전선';
  credits: number;
  semester: string;
  reason: string;
};

// ===================================
// 선이수 관계 데이터
// A → B: A를 먼저 들어야 B를 들을 수 있음
// ===================================
export const PREREQUISITES: Record<string, string[]> = {
  // 전자정보통신공학과 / 반도체시스템공학과 공통
  "물리전자공학": ["미적분학", "기초물리전자공학"], // 둘 중 하나만 있어도 연결됨
  "디지털신호처리": ["신호및시스템"],
  "통신이론": ["신호및시스템"],
  "전자회로2": ["전자회로1"],
  "전자기2": ["전자기1"],
  
  // 반도체시스템공학과
  "인공지능과빅데이터": ["고급프로그래밍활용"],
  "고급C프로그래밍및실습": ["C프로그래밍및실습"],
  "전기회로2": ["전기회로1"],
  "전자회로1": ["전기회로2"],
  "전자회로실험": ["전자회로2"],
  "반도체CAD실험": ["전자회로실험"],
  "컴퓨터구조": ["디지털논리회로"],
  "하드웨어구현언어": ["컴퓨터구조"],
  "AI반도체집적회로": ["하드웨어구현언어"],
  "AI반도체설계": ["AI반도체집적회로"],
  "반도체소자공학1": ["물리전자공학"],
  "반도체소자공학2": ["반도체소자공학1"],
  "반도체공정": ["반도체공정역학"],
  "반도체소자제작및실습1": ["반도체공정"],
  "반도체소자제작및실습2": ["반도체소자제작및실습1"],
  "반도체재료공학": ["박막공학"],
  "디스플레이공학": ["반도체재료공학"],
  "반도체재료분석": ["디스플레이공학"],
  "나노소재의합성및응용": ["반도체재료분석"],
  "반도체특화연구및실험1": ["연구실인턴"],
  "반도체종합설계A": ["반도체특화연구및실험2"],
  "반도체종합설계B": ["반도체특화연구및실험2"],
  
  // 컴퓨터공학과
  "자료구조및실습": ["C프로그래밍및실습"],
  "알고리즘및실습": ["C프로그래밍및실습", "자료구조및실습"],
  "Capstone디자인(산학협력프로젝트)": ["선형대수", "이산수학및프로그래밍"],
  
  // 소프트웨어학과
  "객체지향프로그래밍C++": ["고급C프로그래밍및실습"],
  "디지털이미지프로그래밍": ["C프로그래밍및실습"],
  "컴퓨터애니메이션": ["실시간컴퓨터그래픽스"],
  
  // 정보보호학과
  "공개키암호론": ["미적분학1"],
  "대칭키암호론": ["이산수학및프로그래밍"],
  "네트워킹해킹과보안": ["컴퓨터네트워크"],
  "시스템해킹과보안": ["운영체제및보안"],
  "디지털포렌식": ["어셈블리어"],
  "AI기반악성코드분석": ["어셈블리어"],
  
  // 데이터사이언스학과
  "데이터분석개론": ["고급C프로그래밍및실습"],
  "기계학습개론": ["통계학개론"],
  
  // AI로봇학과
  "인공지능": ["확률및통계"],
  "기계학습": ["창의SW기초설계", "선형대수"],
};

/**
 * 과목의 선이수 과목 목록 반환
 */
export function getPrerequisites(courseName: string): string[] {
  return PREREQUISITES[courseName] || [];
}

/**
 * 이수한 과목 기반으로 수강 가능한 과목인지 확인
 */
export function canTakeCourse(courseName: string, completedCourseNames: string[]): boolean {
  const prereqs = getPrerequisites(courseName);
  if (prereqs.length === 0) return true;
  return prereqs.every(prereq => completedCourseNames.includes(prereq));
}

/**
 * 랜덤으로 배열에서 n개 선택
 */
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/**
 * 사용자 학과, 학년, 학기에 맞는 추천 과목 생성
 * - 전필 2개 + 전선 2개
 * - 기이수 과목 제외 (과목명 기준)
 */
export function getRecommendedCourses(
  department: string,
  grade: number,
  semesterNum: number, // 1 or 2
  completedCourseNames: string[]
): RecommendedCourse[] {
  // 1학기 또는 2학기 데이터 선택
  const semesterData = semesterNum === 1 ? SEMESTER_1_COURSES : SEMESTER_2_COURSES;
  
  // 해당 학과 데이터
  const deptData = semesterData[department];
  if (!deptData) {
    // 학과가 없으면 컴퓨터공학과로 fallback
    return getRecommendedCourses('컴퓨터공학과', grade, semesterNum, completedCourseNames);
  }
  
  // 해당 학년 과목
  const gradeKey = String(grade);
  let courses = deptData[gradeKey] || [];
  
  // 해당 학년 과목이 부족하면 이전/다음 학년도 포함
  if (courses.length < 4) {
    const allGrades = Object.keys(deptData).sort();
    for (const g of allGrades) {
      if (g !== gradeKey) {
        courses = [...courses, ...deptData[g]];
      }
    }
  }
  
  // 기이수 과목 제외 (과목명 기준)
  const availableCourses = courses.filter(
    c => !completedCourseNames.includes(c.name)
  );
  
  // 전필/전선 분리
  const required = availableCourses.filter(c => c.type === '전필');
  const elective = availableCourses.filter(c => c.type === '전선');
  
  // 전필 2개, 전선 2개 선택 (부족하면 있는 만큼)
  const selectedRequired = pickRandom(required, Math.min(2, required.length));
  const selectedElective = pickRandom(elective, Math.min(2, elective.length));
  
  // 부족하면 다른 타입에서 채움
  const total = [...selectedRequired, ...selectedElective];
  if (total.length < 4) {
    const remaining = availableCourses.filter(c => !total.includes(c));
    const additional = pickRandom(remaining, 4 - total.length);
    total.push(...additional);
  }
  
  // 추천 이유 생성
  const reasons = [
    '다음 학기 수강 추천',
    '전공 역량 강화에 필수',
    '취업 경쟁력 향상',
    '졸업요건 충족 필요',
  ];
  
  // 결과 생성
  const semesterStr = `${new Date().getFullYear()}-${semesterNum}`;
  
  return total.slice(0, 4).map((course, idx) => ({
    ...course,
    semester: semesterStr,
    reason: reasons[idx % reasons.length],
  }));
}

// ===================================
// 남은 학기 전체 추천 과목 생성
// 총 8학기 기준, 현재 학기 이후 모든 학기 추천
// ===================================

export type SemesterRecommendation = {
  semester: string;       // "2025-2" 형식
  grade: number;          // 학년 (1~4)
  semesterNum: number;    // 학기 (1 or 2)
  courses: RecommendedCourse[];
};

/**
 * 현재 학년/학기부터 졸업까지 남은 모든 학기 추천 과목 생성
 * @param department 학과
 * @param currentGrade 현재 학년 (참고용)
 * @param currentSemesterNum 현재 학기 (1 or 2) (참고용)
 * @param currentYear 현재 연도
 * @param completedCourseNames 기이수 과목명 목록
 * @param completedCourseSemesters 기이수 과목의 학기 정보 배열 (예: ["2022-1", "2023-2", ...])
 * @returns 학기별 추천 과목 배열
 */
export function getAllRemainingRecommendations(
  department: string,
  currentGrade: number,
  currentSemesterNum: number,
  currentYear: number,
  completedCourseNames: string[],
  completedCourseSemesters?: string[]
): SemesterRecommendation[] {
  const result: SemesterRecommendation[] = [];
  
  // 누적 이수 과목 (추천 과목도 이수한 것으로 처리)
  let accumulatedCompleted = [...completedCourseNames];
  
  // ===================================
  // 실제 이수 학기 수 계산 (유니크한 학기 개수)
  // ===================================
  let completedSemesters: number;
  let lastCompletedYear = currentYear;
  let lastCompletedSemNum = currentSemesterNum;
  
  if (completedCourseSemesters && completedCourseSemesters.length > 0) {
    // 유니크한 학기 추출 (여름/겨울학기 제외)
    const uniqueSemesters = [...new Set(
      completedCourseSemesters.filter(s => s && s.includes('-') && !s.includes('여름') && !s.includes('겨울'))
    )];
    completedSemesters = uniqueSemesters.length;
    
    // 가장 최근 학기 찾기
    const sortedSemesters = uniqueSemesters
      .map(s => {
        const [year, sem] = s.split('-').map(Number);
        return { year, sem, str: s };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.sem - a.sem;
      });
    
    if (sortedSemesters.length > 0) {
      lastCompletedYear = sortedSemesters[0].year;
      lastCompletedSemNum = sortedSemesters[0].sem;
    }
    
    console.log('📊 이수 학기 목록:', uniqueSemesters.sort());
  } else {
    // 학기 정보 없으면 과목 수로 추정
    completedSemesters = Math.ceil(completedCourseNames.length / 7) || 1;
  }
  
  // 이수 학기로 현재 학년 계산
  // 5학기 이수 → 3학년 1학기까지 완료
  const calculatedGrade = Math.min(4, Math.ceil(completedSemesters / 2));
  const lastSemNumByCount = completedSemesters % 2 === 1 ? 1 : 2;
  
  console.log('📊 로드맵 생성 정보:', {
    department,
    inputGrade: currentGrade,
    currentYear,
    completedCount: completedCourseNames.length,
    completedSemesters,
    calculatedGrade,
    lastCompletedSemester: `${lastCompletedYear}-${lastCompletedSemNum}`
  });
  
  // 다음 학기 계산
  let year = lastCompletedYear;
  let semNum: number;
  let grade: number;
  
  if (lastCompletedSemNum === 1) {
    // 1학기까지 이수 → 다음은 같은 해 2학기
    semNum = 2;
    grade = calculatedGrade;
  } else {
    // 2학기까지 이수 → 다음은 다음 해 1학기
    semNum = 1;
    year += 1;
    grade = Math.min(4, calculatedGrade + 1);
  }
  
  // 남은 학기 수 계산 (8학기 - 이수 학기)
  const remainingSemesters = Math.max(0, 8 - completedSemesters);
  
  console.log('📅 추천 시작 학기:', { 
    year, 
    grade, 
    semNum, 
    remainingSemesters,
    message: `${completedSemesters}학기 이수 완료 → ${remainingSemesters}개 학기 남음`
  });
  
  // 4학년 2학기까지 반복
  let loopCount = 0;
  while (grade <= 4 && loopCount < remainingSemesters + 1) {
    loopCount++;
    
    // 해당 학기 과목 데이터 선택
    const semesterData = semNum === 1 ? SEMESTER_1_COURSES : SEMESTER_2_COURSES;
    const deptData = semesterData[department] || semesterData['컴퓨터공학과'];
    
    // 해당 학년 + 근접 학년 과목 수집
    const gradeKey = String(grade);
    let courses: CourseData[] = deptData[gradeKey] || [];
    
    // 해당 학년 과목 부족하면 인접 학년 포함
    if (courses.length < 4) {
      const adjacentGrades = [String(grade - 1), String(grade + 1)];
      for (const g of adjacentGrades) {
        if (deptData[g]) {
          courses = [...courses, ...deptData[g]];
        }
      }
    }
    
    // 기이수 + 이전 학기 추천 과목 제외
    const availableCourses = courses.filter(
      c => !accumulatedCompleted.includes(c.name)
    );
    
    // 전필/전선 분리
    const required = availableCourses.filter(c => c.type === '전필');
    const elective = availableCourses.filter(c => c.type === '전선');
    
    // 전필 우선, 전선 보충 (학기당 3~4과목)
    const maxCourses = 4;
    const selectedRequired = required.slice(0, Math.min(2, required.length));
    const selectedElective = elective.slice(0, Math.min(maxCourses - selectedRequired.length, elective.length));
    const selectedCourses = [...selectedRequired, ...selectedElective];
    
    // 추천 이유 생성
    const getReasonByGrade = (g: number, type: string): string => {
      if (type === '전필') {
        return g === 4 ? '졸업요건 필수' : '전공 기초 강화';
      }
      if (g === 3 || g === 4) {
        return '취업 역량 강화';
      }
      return '전공 심화 추천';
    };
    
    const semesterStr = `${year}-${semNum}`;
    
    const recommendedCourses: RecommendedCourse[] = selectedCourses.map(course => ({
      ...course,
      semester: semesterStr,
      reason: getReasonByGrade(grade, course.type),
    }));
    
    console.log(`📚 ${semesterStr} (${grade}학년 ${semNum}학기): ${recommendedCourses.length}개 추천`);
    
    // 결과에 추가 (과목이 있을 때만)
    if (recommendedCourses.length > 0) {
      result.push({
        semester: semesterStr,
        grade,
        semesterNum: semNum,
        courses: recommendedCourses,
      });
      
      // 누적 이수 목록에 추가
      accumulatedCompleted = [
        ...accumulatedCompleted,
        ...recommendedCourses.map(c => c.name)
      ];
    }
    
    // 다음 학기로
    if (semNum === 1) {
      semNum = 2;
    } else {
      semNum = 1;
      year += 1;
      grade += 1;
    }
  }
  
  console.log('✅ 총 추천 학기 수:', result.length);
  
  return result;
}