/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { 
  CheckCircle2, ArrowRight, Sparkles, User, RefreshCw, Plus, AlertCircle, Briefcase
} from 'lucide-react';
import { useCareerStore, toCareerWithChart, toChartCompetencies, type CareerWithChart } from '@/src/store/useCareerStore';
import { useCareers, useCareerCompetencies, useCustomCareerAnalysis } from '@/src/hooks';
import type { CareerInput } from '@/src/lib/careerData';

// ===================================
// 초기 로딩 컴포넌트
// ===================================
function InitialLoadingScreen({ progress }: { progress: number }) {
  const loadingMessages = [
    { threshold: 0, message: '채용 사이트에서 관련 직무를 가져오고 있어요...' },
    { threshold: 30, message: '최신 채용 트렌드를 분석하고 있어요...' },
    { threshold: 60, message: '맞춤 진로 데이터를 준비하고 있어요...' },
    { threshold: 85, message: '거의 다 됐어요!' },
  ];

  const currentMessage = [...loadingMessages]
    .reverse()
    .find(m => progress >= m.threshold)?.message || loadingMessages[0].message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* 아이콘 */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-lg border border-red-100">
          <Briefcase className="w-10 h-10 text-[#c3002f] animate-pulse" />
        </div>

        {/* 메시지 */}
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          진로 정보를 불러오는 중...
        </h2>
        <p className="text-slate-500 mb-8 transition-all duration-300">
          {currentMessage}
        </p>

        {/* 프로그레스 바 */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-[#c3002f] h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 퍼센트 */}
        <p className="text-sm text-slate-400">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

// ===================================
// 메인 컴포넌트
// ===================================
export default function CareerSelectPage() {
  const router = useRouter();
  const { studentInfo, setSelectedCareer } = useCareerStore();
  
  // ===================================
  // 초기 로딩 상태
  // ===================================
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 5초 동안 프로그레스바 애니메이션
  useEffect(() => {
    if (!isInitialLoading) return;

    const duration = 5000; // 5초
    const interval = 50; // 50ms마다 업데이트
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsInitialLoading(false), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isInitialLoading]);

  // ===================================
  // 훅 사용
  // ===================================
  
  // 하드코딩된 직업 목록 (competencies 없음)
  const { careers: careerList } = useCareers(studentInfo?.department);

  // 선택한 직업의 competencies를 API로 받아오는 훅
  const { 
    isLoading: isCompetencyLoading, 
    error: competencyError,
    fetchCompetencies,
    reset: resetCompetencies 
  } = useCareerCompetencies();

  // 커스텀 진로 분석 훅
  const { 
    isAnalyzing, 
    error: analyzeError,
    analyzedCareer,
    analyze: analyzeCustomCareer,
    reset: resetAnalysis 
  } = useCustomCareerAnalysis();

  // ===================================
  // 로컬 상태
  // ===================================
  
  // 현재 선택된 직업 (하드코딩 데이터)
  const [selectedCareerInput, setSelectedCareerInput] = useState<CareerInput | null>(null);
  
  // 차트에 표시할 최종 Career (competencies 포함)
  const [activeCareer, setActiveCareer] = useState<CareerWithChart | null>(null);
  
  // 커스텀 모드
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // ===================================
  // 직업 클릭 핸들러 (API 호출)
  // ===================================
  const handleCareerClick = async (career: CareerInput) => {
    setIsCustomMode(false);
    setSelectedCareerInput(career);
    resetAnalysis();
    
    // API 호출하여 competencies 받아오기
    const competencies = await fetchCompetencies(career.title);
    
    if (competencies) {
      // CareerInput + competencies -> CareerWithChart
      const careerWithChart: CareerWithChart = {
        id: career.id,
        title: career.title,
        description: career.description,
        tags: career.tags,
        competencies: toChartCompetencies(competencies),
        isCustom: false,
      };
      setActiveCareer(careerWithChart);
    }
  };

  // 초기 로딩 완료 후 첫 번째 직업 자동 선택
  useEffect(() => {
    if (!isInitialLoading && !activeCareer && careerList.length > 0 && !isCustomMode && !isCompetencyLoading) {
      handleCareerClick(careerList[0]);
    }
  }, [isInitialLoading, careerList]);

  // 커스텀 진로 분석 완료 시 activeCareer 업데이트
  useEffect(() => {
    if (analyzedCareer) {
      const chartCareer = toCareerWithChart(analyzedCareer);
      setActiveCareer(chartCareer);
    }
  }, [analyzedCareer]);

  // ===================================
  // 이벤트 핸들러
  // ===================================
  
  // "직접 입력하기" 카드 클릭 핸들러
  const handleCustomModeClick = () => {
    setIsCustomMode(true);
    setSelectedCareerInput(null);
    setActiveCareer(null);
    setCustomInput('');
    resetAnalysis();
    resetCompetencies();
  };

  // 분석 시작 핸들러
  const handleCustomAnalyze = async () => {
    if (!customInput.trim()) return;
    await analyzeCustomCareer(customInput);
  };

  // 다음 단계 핸들러
  const handleNext = () => {
    if (activeCareer) {
      setSelectedCareer(activeCareer);
      router.push('/competency');
    }
  };

  // ===================================
  // 초기 로딩 화면
  // ===================================
  if (isInitialLoading) {
    return <InitialLoadingScreen progress={loadingProgress} />;
  }

  // ===================================
  // 로그인 필요 화면
  // ===================================
  if (!studentInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-slate-700">로그인 정보가 없습니다.</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-[#c3002f] text-white rounded-lg hover:bg-[#a00026]"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  // ===================================
  // 메인 화면
  // ===================================
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-red-50 text-[#c3002f] p-2 rounded-lg">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800">어떤 진로를 꿈꾸시나요?</h1>
            <p className="text-xs text-slate-500">
              {studentInfo.department} {studentInfo.grade}학년 | 기이수 최종학기: {studentInfo.semester}학기
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
          
          {/* 진로 목록 */}
          {careerList.map((career) => (
            <div
              key={career.id}
              onClick={() => handleCareerClick(career)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md relative group ${
                !isCustomMode && selectedCareerInput?.id === career.id
                  ? 'border-[#c3002f] bg-white ring-1 ring-red-100'
                  : 'border-white bg-white hover:border-red-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-800">{career.title}</h3>
                </div>
                {!isCustomMode && selectedCareerInput?.id === career.id && <CheckCircle2 className="text-[#c3002f] w-6 h-6" />}
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
                  {analyzeError && (
                    <p className="text-red-500 text-sm">{analyzeError}</p>
                  )}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="예: 블록체인 개발자, 데이터 엔지니어..." 
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c3002f] focus:border-transparent text-slate-900"
                      onKeyDown={(e) => e.key === 'Enter' && handleCustomAnalyze()}
                      autoFocus
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

            {/* 2️⃣ 로딩 중 화면 (커스텀 분석 또는 역량 조회) */}
            {(isAnalyzing || isCompetencyLoading) && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in">
                <RefreshCw className="w-10 h-10 text-[#c3002f] animate-spin" />
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-700">
                    {isAnalyzing 
                      ? `AI가 '${customInput}' 직무를 분석 중입니다...`
                      : `'${selectedCareerInput?.title}' 역량 데이터 로딩 중...`
                    }
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {isAnalyzing ? '채용 공고 데이터 스캐닝 중... (1/3)' : '잠시만 기다려주세요...'}
                  </p>
                </div>
              </div>
            )}

            {/* 에러 표시 */}
            {competencyError && !isCompetencyLoading && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <p className="text-red-600">{competencyError}</p>
                <button 
                  onClick={() => selectedCareerInput && handleCareerClick(selectedCareerInput)}
                  className="text-sm text-[#c3002f] underline"
                >
                  다시 시도
                </button>
              </div>
            )}

            {/* 3️⃣ 결과 차트 화면 (기본 선택 or 분석 완료) */}
            {activeCareer && !isCompetencyLoading && !isAnalyzing && (
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
                         : `이 진로를 위해서는 '${activeCareer.competencies[0]?.subject || '전공기초'}' 역량이 가장 중요합니다. 추후 학기에 관련 심화 과목 수강을 추천합니다.`
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
            disabled={!activeCareer || isCompetencyLoading || isAnalyzing}
            className="w-full mt-6 py-4 bg-[#c3002f] hover:bg-[#a00026] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {activeCareer ? `${activeCareer.title} 역량 분석하기` : '진로를 선택해주세요'}
            <ArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}