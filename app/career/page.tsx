/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { 
  Briefcase, CheckCircle2, ArrowRight, Sparkles, User, RefreshCw, Plus 
} from 'lucide-react';
import { useCareerStore, Career } from '../store/useCareerStore';

// --- Mock Data ---
const CAREER_DB: Record<string, Career[]> = {
  '컴퓨터공학과': [
    {
      id: 'backend',
      title: '백엔드 개발자',
      description: '대용량 트래픽 처리 및 서버 아키텍처 설계',
      tags: ['Java', 'Spring', 'AWS'],
      competencies: [
        { subject: 'DB', A: 90, fullMark: 100 },
        { subject: '알고리즘', A: 85, fullMark: 100 },
        { subject: '네트워크', A: 80, fullMark: 100 },
        { subject: 'OS', A: 70, fullMark: 100 },
        { subject: '보안', A: 60, fullMark: 100 },
        { subject: '협업', A: 75, fullMark: 100 },
      ]
    },
    {
      id: 'ai-researcher',
      title: 'AI 연구원',
      description: '최신 논문 분석 및 딥러닝 모델링',
      tags: ['Python', 'Pytorch', 'Math'],
      competencies: [
        { subject: '수학', A: 95, fullMark: 100 },
        { subject: '알고리즘', A: 90, fullMark: 100 },
        { subject: '데이터', A: 85, fullMark: 100 },
        { subject: '모델링', A: 95, fullMark: 100 },
        { subject: '논문', A: 90, fullMark: 100 },
        { subject: '구현', A: 70, fullMark: 100 },
      ]
    },
  ],
  '소프트웨어학과': [
    {
      id: 'frontend',
      title: '프론트엔드 개발자',
      description: '웹/앱 사용자 인터페이스 구현 및 UX 최적화',
      tags: ['React', 'Next.js', 'UX'],
      competencies: [
        { subject: 'UI구현', A: 95, fullMark: 100 },
        { subject: '알고리즘', A: 60, fullMark: 100 },
        { subject: '네트워크', A: 70, fullMark: 100 },
        { subject: '디자인', A: 85, fullMark: 100 },
        { subject: '최적화', A: 80, fullMark: 100 },
        { subject: '협업', A: 90, fullMark: 100 },
      ]
    }
  ]
};

const generateMockCompetencies = () => [
  { subject: '전공기초', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
  { subject: '설계능력', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
  { subject: '구현능력', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
  { subject: '문제해결', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
  { subject: '협업', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
  { subject: '창의성', A: Math.floor(Math.random() * 30) + 70, fullMark: 100 },
];

export default function CareerSelectPage() {
  const router = useRouter();
  const { studentInfo, setSelectedCareer } = useCareerStore();
  
  const availableCareers = useMemo(() => {
    if (!studentInfo) return [];
    return CAREER_DB[studentInfo.department] || CAREER_DB['컴퓨터공학과'];
  }, [studentInfo]);

  const [activeCareer, setActiveCareer] = useState<Career | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 초기 진입 시 첫 번째 추천 진로 자동 선택
  useEffect(() => {
    if (!activeCareer && availableCareers.length > 0 && !isCustomMode) {
      setActiveCareer(availableCareers[0]);
    }
  }, [availableCareers, activeCareer, isCustomMode]);

  // "직접 입력하기" 카드 클릭 핸들러
  const handleCustomModeClick = () => {
    setIsCustomMode(true);
    setActiveCareer(null); // 기존 선택 해제 -> 입력 폼 표시 트리거
    setCustomInput('');    // 입력창 초기화
  };

  // 기존 목록 클릭 핸들러
  const handleCareerClick = (career: Career) => {
    setIsCustomMode(false);
    setActiveCareer(career);
  };

  // 분석 시작 핸들러
  const handleCustomAnalyze = () => {
    if (!customInput.trim()) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newCustomCareer: Career = {
        id: `custom-${Date.now()}`,
        title: customInput,
        description: '사용자가 직접 입력한 커리어 패스입니다.',
        tags: ['Custom', 'Specialist'],
        competencies: generateMockCompetencies(),
        isCustom: true
      };
      setActiveCareer(newCustomCareer); // 분석 완료 후 결과 보여주기
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleNext = () => {
    if (activeCareer) {
      setSelectedCareer(activeCareer);
      router.push('/roadmap/generate');
    }
  };

  if (!studentInfo) return <div className="p-10">로그인 정보가 없습니다.</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-red-50 text-[#c3002f] p-2 rounded-lg">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800">{studentInfo.name}님, 어떤 진로를 꿈꾸시나요?</h1>
            <p className="text-xs text-slate-500">
              {studentInfo.department} {studentInfo.grade}학년 | {studentInfo.semester}학기
            </p>
          </div>
        </div>
        <div className="text-sm font-medium text-[#c3002f]">Step 1 / 3</div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid lg:grid-cols-12 gap-6">
        
        {/* Left: 진로 목록 */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-sm text-slate-500 font-bold px-1">
            {studentInfo.department} 추천 진로
          </p>
          
          {availableCareers.map((career) => (
            <div
              key={career.id}
              onClick={() => handleCareerClick(career)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md relative group ${
                !isCustomMode && activeCareer?.id === career.id
                  ? 'border-[#c3002f] bg-white ring-1 ring-red-100'
                  : 'border-white bg-white hover:border-red-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-800">{career.title}</h3>
                </div>
                {!isCustomMode && activeCareer?.id === career.id && <CheckCircle2 className="text-[#c3002f] w-6 h-6" />}
              </div>
              <p className="text-slate-600 text-sm mb-3">{career.description}</p>
              <div className="flex gap-2">
                {career.tags.map(tag => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </div>
          ))}

          {/* ➕ 직접 입력하기 카드 */}
          <div 
            onClick={handleCustomModeClick}
            className={`p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-center gap-3 min-h-[100px] ${
              isCustomMode 
                ? 'border-[#c3002f] bg-red-50/50 text-[#c3002f] shadow-inner' 
                : 'border-slate-300 bg-transparent text-slate-400 hover:border-slate-400 hover:text-slate-600'
            }`}
          >
            <Plus size={24} />
            <span className="font-bold text-lg">직접 입력하기</span>
          </div>
        </div>

        {/* Right: 대시보드 (조건부 렌더링) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex-1 flex flex-col relative overflow-hidden">
            
            {/* 1️⃣ 입력 폼: Custom 모드이고, 아직 분석 결과(activeCareer)가 없고, 분석 중도 아닐 때 */}
            {isCustomMode && !activeCareer && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="bg-red-100 p-4 rounded-full">
                  <Sparkles className="w-8 h-8 text-[#c3002f]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">새로운 진로를 개척하시네요!</h2>
                  <p className="text-slate-500 max-w-md mx-auto">
                    원하시는 직무명을 입력하시면, <br/>AI가 현재 채용 트렌드를 분석하여 <strong>필요 역량을 도출</strong>해드립니다.
                  </p>
                </div>
                
                <div className="w-full max-w-md space-y-3">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="예: 블록체인 개발자, 데이터 엔지니어..." 
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c3002f] focus:border-transparent text-slate-900"
                      onKeyDown={(e) => e.key === 'Enter' && handleCustomAnalyze()}
                      autoFocus // 폼 나타나면 자동 포커스
                    />
                    <button 
                      onClick={handleCustomAnalyze}
                      disabled={!customInput}
                      className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      분석
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 text-left px-1">
                    * 구체적인 직무명일수록 정확도가 올라갑니다.
                  </p>
                </div>
              </div>
            )}

            {/* 2️⃣ 로딩 중 화면 */}
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in">
                <RefreshCw className="w-10 h-10 text-[#c3002f] animate-spin" />
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-700">AI가 &lsquo;{customInput}&rsquo; 직무를 분석 중입니다...</p>
                  <p className="text-sm text-slate-400 mt-1">채용 공고 데이터 스캐닝 중... (1/3)</p>
                </div>
              </div>
            )}

            {/* 3️⃣ 결과 차트 화면 (기본 선택 or 분석 완료) */}
            {activeCareer && (
              <div className="flex flex-col h-full animate-in zoom-in-95 duration-300">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-slate-900">
                      <span className="text-[#c3002f]">{activeCareer.title}</span> 역량 모델
                    </h2>
                    {activeCareer.isCustom && (
                       <span className="bg-red-100 text-[#c3002f] text-xs px-2 py-1 rounded font-bold">AI Generated</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm">
                    {activeCareer.description}
                  </p>
                </div>

                <div className="flex-1 w-full min-h-[300px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={activeCareer.competencies}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={activeCareer.title}
                        dataKey="A"
                        stroke="#c3002f"
                        strokeWidth={3}
                        fill="#c3002f"
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                   <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
                      <Sparkles size={16} className="text-[#c3002f]" />
                   </div>
                   <div>
                     <h4 className="font-bold text-sm text-slate-800 mb-1">AI Recommendation</h4>
                     <p className="text-sm text-slate-600 leading-relaxed">
                       {activeCareer.isCustom 
                         ? `'${activeCareer.title}' 직무는 최신 기술 트렌드에 민감합니다. 기초 전공 지식 위에 최신 프레임워크 활용 능력을 쌓는 로드맵을 설계해드리겠습니다.`
                         : `이 진로를 위해서는 '${activeCareer.competencies[0].subject}' 역량이 가장 중요합니다. 3학년 2학기에 관련 심화 과목 수강을 추천합니다.`
                       }
                     </p>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            disabled={!activeCareer}
            className="w-full mt-6 py-4 bg-[#c3002f] hover:bg-[#a00026] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {activeCareer ? `${activeCareer.title} 로드맵 생성하기` : '진로를 선택해주세요'}
            <ArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}