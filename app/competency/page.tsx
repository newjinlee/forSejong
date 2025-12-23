"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend
} from 'recharts';
import { 
  ArrowRight, User, Target, TrendingUp, AlertTriangle, CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useCareerStore } from '../../src/store/useCareerStore';

// --- Mock Data: 현재 역량 (기이수 과목 기반으로 계산되었다고 가정) ---
const CURRENT_COMPETENCY_MOCK = [
  { subject: 'DB', current: 45, target: 90, fullMark: 100 },
  { subject: '알고리즘', current: 30, target: 85, fullMark: 100 },
  { subject: '네트워크', current: 70, target: 80, fullMark: 100 },
  { subject: 'OS', current: 25, target: 70, fullMark: 100 },
  { subject: '보안', current: 55, target: 60, fullMark: 100 },
  { subject: '협업', current: 60, target: 75, fullMark: 100 },
];

// --- Mock Data: 부족한 역량 분석 ---
const GAP_ANALYSIS_MOCK = [
  { 
    subject: '알고리즘', 
    gap: 55, 
    priority: 'high',
    recommendation: '알고리즘, 자료구조 과목 수강 필요',
  },
  { 
    subject: 'DB', 
    gap: 45, 
    priority: 'high',
    recommendation: '데이터베이스, DB설계 과목 수강 필요',
  },
  { 
    subject: 'OS', 
    gap: 45, 
    priority: 'medium',
    recommendation: '운영체제 과목 수강 필요',
  },
  { 
    subject: '협업', 
    gap: 15, 
    priority: 'low',
    recommendation: '캡스톤, 팀프로젝트 경험 권장',
  },
];

export default function CompetencyAnalysisPage() {
  const router = useRouter();
  const { studentInfo, selectedCareer } = useCareerStore();

  const handleNext = () => {
    router.push('/roadmap/generate');
  };

  const handleBack = () => {
    router.push('/career');
  };

  // 전체 역량 달성률 계산
  const totalCurrent = CURRENT_COMPETENCY_MOCK.reduce((sum, c) => sum + c.current, 0);
  const totalTarget = CURRENT_COMPETENCY_MOCK.reduce((sum, c) => sum + c.target, 0);
  const achievementRate = Math.round((totalCurrent / totalTarget) * 100);

  if (!studentInfo || !selectedCareer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">진로 선택이 필요합니다.</p>
          <button 
            onClick={() => router.push('/career')}
            className="px-6 py-2 bg-[#c3002f] text-white rounded-lg"
          >
            진로 선택하러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-red-50 text-[#c3002f] p-2 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800">
              {studentInfo.name}님의 역량 분석 결과
            </h1>
            <p className="text-xs text-slate-500">
              목표 진로: <span className="font-bold text-[#c3002f]">{selectedCareer.title}</span>
            </p>
          </div>
        </div>
        <div className="text-sm font-medium text-[#c3002f]">Step 2 / 3</div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* 상단 요약 카드 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-50 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-500">현재 역량 수준</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{achievementRate}%</p>
            <p className="text-xs text-slate-400 mt-1">목표 대비 달성률</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-50 p-2 rounded-lg">
                <Target className="w-5 h-5 text-[#c3002f]" />
              </div>
              <span className="text-sm font-medium text-slate-500">목표 진로</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{selectedCareer.title}</p>
            <p className="text-xs text-slate-400 mt-1">{selectedCareer.tags.join(', ')}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-50 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-slate-500">보완 필요 역량</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {GAP_ANALYSIS_MOCK.filter(g => g.priority === 'high').length}개
            </p>
            <p className="text-xs text-slate-400 mt-1">우선 보완 필요</p>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 현재 역량 차트 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">현재 역량 모델</h2>
                <p className="text-xs text-slate-500">기이수 과목 기반 분석</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={CURRENT_COMPETENCY_MOCK}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="현재 역량"
                    dataKey="current"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 목표 역량 차트 */}
          <div className="bg-white rounded-2xl p-6 border border-[#c3002f] shadow-sm ring-1 ring-red-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-[#c3002f]" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">목표 역량 모델</h2>
                <p className="text-xs text-slate-500">{selectedCareer.title} 필요 역량</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={CURRENT_COMPETENCY_MOCK}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="목표 역량"
                    dataKey="target"
                    stroke="#c3002f"
                    strokeWidth={2}
                    fill="#c3002f"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 역량 비교 (오버레이 차트) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">역량 비교 분석</h2>
              <p className="text-xs text-slate-500">현재 vs 목표 역량 오버레이</p>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={CURRENT_COMPETENCY_MOCK}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="현재 역량"
                  dataKey="current"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                <Radar
                  name="목표 역량"
                  dataKey="target"
                  stroke="#c3002f"
                  strokeWidth={2}
                  fill="#c3002f"
                  fillOpacity={0.2}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => <span className="text-sm font-medium text-slate-700">{value}</span>}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* 하단 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft />
            진로 다시 선택
          </button>
          <button
            onClick={handleNext}
            className="flex-[2] py-4 bg-[#c3002f] hover:bg-[#a00026] text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            이 역량 기반으로 로드맵 생성하기
            <ArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}