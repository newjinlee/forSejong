/* eslint-disable react-hooks/purity */
"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend
} from 'recharts';
import { 
  ArrowRight, User, Target, TrendingUp, AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { useCareerStore } from '../../src/store/useCareerStore';

// ===================================
// Mock Data - 현재 역량 (TODO: 기이수 과목 기반 분석 API 연동)
// ===================================
const CURRENT_COMPETENCY_MOCK = [
  { subject: 'Problem Solving', score: 45 },
  { subject: 'Communication', score: 60 },
  { subject: 'Teamwork', score: 70 },
  { subject: 'Time Management', score: 55 },
  { subject: 'Programming Languages', score: 40 },
  { subject: 'Debugging', score: 35 },
];

// ===================================
// 메인 컴포넌트
// ===================================
export default function CompetencyAnalysisPage() {
  const router = useRouter();
  const { studentInfo, selectedCareer } = useCareerStore();

  // ===================================
  // 목표 역량: selectedCareer.competencies에서 가져옴 (API 연동 완료!)
  // ===================================
  const targetCompetency = useMemo(() => {
    if (!selectedCareer?.competencies) return [];
    
    // store의 competencies 형식: { subject, A, fullMark }
    // 차트용 형식: { subject, score, fullMark }
    return selectedCareer.competencies.map(c => ({
      subject: c.subject,
      score: c.A, // A가 점수
      fullMark: c.fullMark,
    }));
  }, [selectedCareer]);

  // ===================================
  // 현재 역량: 목표 역량의 subject에 맞춰서 매핑
  // TODO: 기이수 과목 기반 분석 API 연동 시 교체
  // ===================================
  const currentCompetency = useMemo(() => {
    if (targetCompetency.length === 0) return CURRENT_COMPETENCY_MOCK;
    
    // 목표 역량의 subject에 맞춰 현재 역량 생성 (임시 랜덤 값)
    return targetCompetency.map(target => ({
      subject: target.subject,
      score: Math.floor(Math.random() * 40) + 30, // 30~70 사이 랜덤
      fullMark: 100,
    }));
  }, [targetCompetency]);

  // ===================================
  // 차트용 데이터 변환
  // ===================================
  const chartData = useMemo(() => {
    return targetCompetency.map((target, index) => ({
      subject: target.subject,
      current: currentCompetency[index]?.score || 0,
      target: target.score,
      fullMark: 100,
    }));
  }, [currentCompetency, targetCompetency]);

  // ===================================
  // 달성률 계산: 현재 총합 / 목표 총합 × 100
  // ===================================
  const achievementRate = useMemo(() => {
    const totalCurrent = currentCompetency.reduce((sum, c) => sum + c.score, 0);
    const totalTarget = targetCompetency.reduce((sum, c) => sum + c.score, 0);
    if (totalTarget === 0) return 0;
    return Math.round((totalCurrent / totalTarget) * 100);
  }, [currentCompetency, targetCompetency]);

  // ===================================
  // 보완 필요 역량: target > current 인 항목
  // ===================================
  const gapAnalysis = useMemo(() => {
    return targetCompetency
      .map((target, index) => {
        const current = currentCompetency[index]?.score || 0;
        const gap = target.score - current;
        
        let priority: 'high' | 'medium' | 'low';
        if (gap >= 40) priority = 'high';
        else if (gap >= 20) priority = 'medium';
        else priority = 'low';

        return {
          subject: target.subject,
          current,
          target: target.score,
          gap,
          priority,
        };
      })
      .filter(item => item.gap > 0)
      .sort((a, b) => b.gap - a.gap);
  }, [currentCompetency, targetCompetency]);

  const needImprovementCount = gapAnalysis.length;

  // ===================================
  // 네비게이션
  // ===================================
  const handleNext = () => {
    router.push('/roadmap/generate');
  };

  const handleBack = () => {
    router.push('/career-select');
  };

  // ===================================
  // 진로 미선택 시
  // ===================================
  if (!studentInfo || !selectedCareer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">진로 선택이 필요합니다.</p>
          <button 
            onClick={() => router.push('/career-select')}
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
              역량 분석 결과
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
          {/* 현재 역량 수준 */}
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

          {/* 목표 진로 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-50 p-2 rounded-lg">
                <Target className="w-5 h-5 text-[#c3002f]" />
              </div>
              <span className="text-sm font-medium text-slate-500">목표 진로</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{selectedCareer.title}</p>
            <p className="text-xs text-slate-400 mt-1">{selectedCareer.tags?.join(', ') || 'AI 분석'}</p>
          </div>

          {/* 보완 필요 역량 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-50 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-slate-500">보완 필요 역량</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {needImprovementCount}개
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {needImprovementCount === 0 ? '모든 역량 충족!' : '우선 보완 필요'}
            </p>
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
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} 
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

          {/* 목표 역량 차트 - API 데이터 사용! */}
          <div className="bg-white rounded-2xl p-6 border border-[#c3002f] shadow-sm ring-1 ring-red-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-[#c3002f]" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">목표 역량 모델</h2>
                <p className="text-xs text-slate-500">{selectedCareer.title} 필요 역량 (API)</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} 
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
              <RadarChart data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} 
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

        {/* GAP 분석 상세 */}
        {gapAnalysis.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">보완 필요 역량</h2>
                <p className="text-xs text-slate-500">부족분이 큰 순으로 정렬</p>
              </div>
            </div>
            <div className="space-y-3">
              {gapAnalysis.map((gap) => (
                <div 
                  key={gap.subject}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    gap.priority === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : gap.priority === 'medium'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      gap.priority === 'high' 
                        ? 'bg-red-500 text-white' 
                        : gap.priority === 'medium'
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-400 text-white'
                    }`}>
                      {gap.priority === 'high' ? '중요' : gap.priority === 'medium' ? '권장' : '참고'}
                    </span>
                    <span className="font-bold text-slate-800">{gap.subject}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-blue-600 font-bold">{gap.current}</span>
                      <span className="text-slate-400 mx-1">→</span>
                      <span className="text-[#c3002f] font-bold">{gap.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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