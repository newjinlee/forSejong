"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
  Database,
  BrainCircuit,
  ArrowRight,
  Search,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  XCircle,
  User,
  Target,
  Map,
  Globe,
  Sparkles
} from 'lucide-react';

export default function RoadmapLandingPage() {
  const SEJONG_RED = "#c3002f";
  const [activeTab, setActiveTab] = useState<'career' | 'roadmap' | 'schedule'>('career');

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* --- 네비게이션 --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div 
            className="flex items-center font-bold text-xl tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={"/icon.svg"} className="h-6 w-6 mr-2" alt="Logo" />
            <span className="text-slate-900">SEJONG <span className="text-[#c3002f]">ROADMAP</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-[#c3002f] transition-colors"
            >
              이용 방법
            </Link>
            <Link 
              href="#pain-point" 
              onClick={(e) => scrollToSection(e, 'pain-point')}
              className="hover:text-[#c3002f] transition-colors"
            >
              Why This?
            </Link>
            <Link 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className="hover:text-[#c3002f] transition-colors"
            >
              핵심 기술
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="rounded-md px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition-all shadow-md"
            >
              내 로드맵 생성하기
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-block mb-10 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#c3002f] font-bold text-sm animate-pulse">
            LLM + Vector Search Powered
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-10">
            &quot;뭐부터 들어야 하지?&quot; 고민 끝.<br />
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: SEJONG_RED }}>AI가 졸업까지 최적의 수강 루트</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-red-200/50 -z-0"></span>
            </span>를 찾아드려요.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            &quot;이 수업 들으려면 뭐부터 들어야 하지?&quot; 고민하지 마세요.<br className="hidden md:block" />
            AI가 <strong>채용 트렌드를 분석</strong>하고,<br />진로에 맞는 최적의 수강 로드맵을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-8 text-lg font-bold text-white shadow-lg hover:translate-y-[-2px] transition-transform"
            >
              AI 로드맵 생성 시작
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            * 현재 SW대학의 커리큘럼을 지원합니다
          </p>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-slate-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 translate-y-1/3 translate-x-1/3"></div>
      </section>

      {/* --- How It Works (3단계 플로우) --- */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">3단계로 완성하는 나만의 로드맵</h2>
            <p className="text-slate-600">로그인부터 맞춤 로드맵까지, 단 3분이면 충분합니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#c3002f] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                1
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 pt-12 h-full hover:shadow-lg transition-shadow">
                <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <User className="w-7 h-7 text-[#c3002f]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">세종대 포털 로그인</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  학번과 비밀번호로 로그인하면 <strong>기이수 과목을 자동으로 크롤링</strong>합니다.
                  어떤 과목을 들었는지 직접 입력할 필요 없어요.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-slate-300" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#c3002f] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                2
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 pt-12 h-full hover:shadow-lg transition-shadow">
                <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-[#c3002f]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">희망 진로 선택</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  백엔드, 프론트엔드, AI 연구원 등 <strong>희망 진로</strong>를 선택하세요.
                  <strong className="text-[#c3002f]">실제 채용 공고 기반</strong>으로 필요 역량을 분석합니다.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-slate-300" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#c3002f] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                3
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 pt-12 h-full hover:shadow-lg transition-shadow">
                <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Map className="w-7 h-7 text-[#c3002f]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">맞춤 로드맵 확인</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  기이수 과목과 진로를 바탕으로 <strong>AI가 학기별 로드맵</strong>을 생성합니다.
                  2-1부터 4-2까지, 이수 시뮬레이션 결과를 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Pain Point Solution (Before & After) --- */}
      <section id="pain-point" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">수강신청 시즌의 고민, 기술로 해결했습니다.</h2>
            <p className="text-slate-600">엑셀 파일을 뒤적거리며 수작업하던 커리큘럼 설계, 이렇게 바뀝니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Before: 기존 방식 */}
            <div className="relative group rounded-2xl border border-slate-200 bg-white p-8">
              <div className="absolute -top-4 -left-4 bg-slate-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                기존 방식 (Manual)
              </div>
              <div className="space-y-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <Search className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">선수과목 확인 불가</h3>
                    <p className="text-sm text-slate-600 mt-1">&quot;알고리즘 들으려면 자료구조 필수인가?&quot;<br />요람 PDF를 일일이 검색해서 확인해야 합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <XCircle className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">꼬여버린 수강 순서</h3>
                    <p className="text-sm text-slate-600 mt-1">학년이 올라갈수록 듣지 못한 선수과목 때문에<br />전공 필수 과목 수강이 불가능해집니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">목적 없는 수강</h3>
                    <p className="text-sm text-slate-600 mt-1">나의 진로(백엔드, AI 등)와 상관없이<br />시간 맞는 강의만 골라서 듣는 현실.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* After: SEJONG ROADMAP 방식 */}
            <div className="relative rounded-2xl border-2 border-[#c3002f] bg-white p-8 shadow-2xl scale-105 z-10">
              <div className="absolute -top-4 -left-4 bg-[#c3002f] text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                SEJONG ROADMAP (AI + Vector Search)
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <Globe color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">취업 트렌드 기반 역량 분석</h3>
                    <p className="text-sm text-slate-600 mt-1">실제 <strong className="text-[#c3002f]">채용 공고를 크롤링</strong>하여<br />진로별 필요 역량을 실시간으로 반영합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <BrainCircuit color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">LLM 역량 분석</h3>
                    <p className="text-sm text-slate-600 mt-1">기이수 과목을 LLM이 분석하여<br /><strong className="text-[#c3002f]">6가지 역량 점수</strong>를 자동으로 도출합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <CalendarClock color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">학기별 이수 시뮬레이션</h3>
                    <p className="text-sm text-slate-600 mt-1">2-1부터 4-2까지 <strong className="text-[#c3002f]">선수과목을 고려</strong>하여<br />학기별 최적 과목을 자동 배치합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features (Tabs) --- */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              기술 기반의 맞춤형 설계
            </h2>
            <p className="mt-2 text-slate-600">LLM과 벡터 검색을 결합한 인터랙티브 경험을 제공합니다.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-200 p-1 rounded-lg">
              {(['career', 'roadmap', 'schedule'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === tab
                    ? 'bg-white text-[#c3002f] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {tab === 'career' && '1. 채용 트렌드 분석'}
                  {tab === 'roadmap' && '2. LLM 역량 분석'}
                  {tab === 'schedule' && '3. Milvus 과목 추천'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 min-h-[360px]">
            {activeTab === 'career' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    취업 사이트 크롤링으로<br />
                    <span style={{ color: SEJONG_RED }}>실시간 채용 트렌드</span>를 반영합니다.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>채용 공고 수집:</strong> 백엔드, 프론트엔드, AI 등 직무별 채용 공고를 크롤링하여 필요 역량을 추출합니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>역량 DB 구축:</strong> 정적인 진로 목록이 아닌, 실제 시장에서 요구하는 역량을 반영합니다.</span>
                    </li>
                  </ul>
                </div>
                {/* Mockup: 크롤링 시각화 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Globe className="w-4 h-4 text-[#c3002f]" />
                    취업 사이트 크롤링
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-1">사람인 | 백엔드 개발자</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded">Java</span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded">Spring</span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded">AWS</span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded">MySQL</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-1">잡코리아 | 백엔드 개발자</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded">Python</span>
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded">Django</span>
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded">Docker</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <ArrowRight className="w-5 h-5 text-[#c3002f] mx-auto rotate-90" />
                    </div>
                    <div className="bg-red-50 border border-[#c3002f] rounded-lg p-3">
                      <div className="text-xs font-bold text-[#c3002f] mb-1">백엔드 개발자 필수 역량</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-0.5 rounded">DB 설계</span>
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-0.5 rounded">API 개발</span>
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-0.5 rounded">클라우드</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    기이수 과목을 LLM이 분석하여<br />
                    <span style={{ color: SEJONG_RED }}>6가지 역량 점수</span>를 도출합니다.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>자동 역량 분석:</strong> &apos;자료구조를 들었다&apos; → &apos;알고리즘 이해도가 있다&apos; → &apos;구현능력 높음&apos; 추론</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>GAP 분석:</strong> 현재 역량과 목표 진로의 필요 역량을 비교하여 보완 포인트를 도출합니다.</span>
                    </li>
                  </ul>
                </div>
                {/* Mockup: Radar Chart */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex justify-center items-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { subject: '전공기초', score: 85, fullMark: 100 },
                      { subject: '설계능력', score: 80, fullMark: 100 },
                      { subject: '구현능력', score: 90, fullMark: 100 },
                      { subject: '문제해결', score: 85, fullMark: 100 },
                      { subject: '협업', score: 70, fullMark: 100 },
                      { subject: '창의성', score: 75, fullMark: 100 },
                    ]}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="역량"
                        dataKey="score"
                        stroke="#c3002f"
                        strokeWidth={2}
                        fill="#c3002f"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Milvus 벡터 검색으로<br />
                    <span style={{ color: SEJONG_RED }}>의미 기반 과목 추천</span>
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>벡터 유사도 검색:</strong> &apos;DB 역량 부족&apos; → 데이터베이스, 빅데이터, 정보검색 등 의미적으로 유사한 과목을 모두 검색합니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>학기별 시뮬레이션:</strong> 2-1 → 4-2까지 순차적으로 이수 상황을 반영하여 로드맵을 생성합니다.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="space-y-4">
                    {/* 벡터 검색 시각화 */}
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                      <Database className="w-4 h-4 text-[#c3002f]" />
                      Milvus 벡터 검색
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-2">보완 필요: DB 역량</div>
                      <div className="text-center mb-2">
                        <Sparkles className="w-5 h-5 text-[#c3002f] mx-auto" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white rounded p-2 border border-slate-100">
                          <span className="text-xs font-medium">데이터베이스</span>
                          <span className="text-[10px] text-[#c3002f] font-bold">유사도 95%</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded p-2 border border-slate-100">
                          <span className="text-xs font-medium">빅데이터처리</span>
                          <span className="text-[10px] text-[#c3002f] font-bold">유사도 87%</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded p-2 border border-slate-100">
                          <span className="text-xs font-medium">정보검색론</span>
                          <span className="text-[10px] text-[#c3002f] font-bold">유사도 82%</span>
                        </div>
                      </div>
                    </div>
                    {/* 학기 시뮬레이션 */}
                    <div className="text-center">
                      <ArrowRight className="w-5 h-5 text-slate-400 mx-auto rotate-90" />
                    </div>
                    <div className="border border-[#c3002f] bg-red-50/30 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-[#c3002f]">2-2학기 추천</span>
                        <span className="text-xs font-bold text-slate-700">15학점</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-1 rounded font-bold">데이터베이스(3)</span>
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-1 rounded font-bold">알고리즘(3)</span>
                        <span className="bg-[#c3002f] text-white text-[10px] px-2 py-1 rounded font-bold">운영체제(3)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            아직도 수강편람 PDF를<br />
            일일이 찾아보고 계신가요?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            내 진로에 딱 맞는 커리큘럼,<br />
            SEJONG ROADMAP이 단 3분 만에 설계해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              학번으로 로그인하고 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white py-12 border-t border-slate-200 text-sm text-slate-500">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="font-bold text-slate-700 flex justify-center items-center">
            <img src={"/icon.svg"} className="h-5 w-5" />
            SEJONG ROADMAP
          </div>
          <p>
            세종대학교 SW AI 해커톤 Team 고구임<br />
            Frontend: 이유진 | Backend: 구은서 | AI: 김소희 | PM: 임영빈
          </p>
          <p className="text-xs text-slate-400 mt-8">
            © {new Date().getFullYear()} Sejong HACKERTHON Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}