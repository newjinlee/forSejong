"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  GitMerge,      // DAG 그래프 아이콘 대용
  BrainCircuit,  // AI 아이콘
  LayoutDashboard,
  ArrowRight,
  Network,       // React Flow 느낌
  Layers,        // 위상정렬 느낌
  Search,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function RoadmapLandingPage() {
  const SEJONG_RED = "#c3002f";
  const [activeTab, setActiveTab] = useState<'career' | 'roadmap' | 'schedule'>('roadmap');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* --- 네비게이션 --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Network color={SEJONG_RED} className="h-6 w-6" />
            <span className="text-slate-900">SEJONG <span className="text-[#c3002f]">ROADMAP</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#pain-point" className="hover:text-[#c3002f]">Why This?</Link>
            <Link href="#features" className="hover:text-[#c3002f]">핵심 기술</Link>
            <Link href="#tech-stack" className="hover:text-[#c3002f]">기술 스택</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-[#c3002f]">로그인</Link>
            <Link
              href="/roadmap/generate"
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
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#c3002f] font-bold text-sm animate-pulse">
            🤖 AI & Graph Algorithm Powered
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6">
            복잡한 선수과목 의존성,<br />
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: SEJONG_RED }}>DAG 알고리즘</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-red-200/50 -z-0"></span>
            </span>으로 완벽하게 풀어냅니다.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            &#34;이 수업 들으려면 뭐부터 들어야 하지?&#34; 고민하지 마세요.<br className="hidden md:block" />
            AI가 진로 역량을 분석하고, <strong>위상정렬(Topological Sort)</strong>로 최적의 수강 순서를 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/start"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-8 text-lg font-bold text-white shadow-lg hover:translate-y-[-2px] transition-transform"
            >
              AI 로드맵 생성 시작
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/curriculum"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              전체 커리큘럼 보기
            </Link>
          </div>
          
        </div>
        
        {/* Background Elements (Graph Metaphor) */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-slate-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 translate-y-1/3 translate-x-1/3"></div>
      </section>

      {/* --- Pain Point Solution (Before & After) --- */}
      <section id="pain-point" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">수강신청 시즌의 고민, 기술로 해결했습니다.</h2>
            <p className="text-slate-600">엑셀 파일을 뒤적거리며 수작업하던 커리큘럼 설계, 이렇게 바뀝니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Before: 기존 방식 */}
            <div className="relative group rounded-2xl border border-slate-200 bg-slate-50 p-8">
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
                    <p className="text-sm text-slate-600 mt-1">&#34;알고리즘 들으려면 자료구조 필수인가?&#34;<br/>요람 PDF를 일일이 검색해서 확인.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <XCircle className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">꼬여버린 수강 순서</h3>
                    <p className="text-sm text-slate-600 mt-1">학년이 올라갈수록 듣지 못한 선수과목 때문에<br/>전공 필수 과목 수강이 불가능해짐.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">목적 없는 수강</h3>
                    <p className="text-sm text-slate-600 mt-1">나의 진로(백엔드, AI 등)와 상관없이<br/>시간 맞는 강의만 골라서 듣는 현실.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* After: SJ Roadmap 방식 */}
            <div className="relative rounded-2xl border-2 border-[#c3002f] bg-white p-8 shadow-2xl scale-105 z-10">
              <div className="absolute -top-4 -left-4 bg-[#c3002f] text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                SJ Roadmap (AI + DAG)
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <GitMerge color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">DAG 기반 의존성 시각화</h3>
                    <p className="text-sm text-slate-600 mt-1">과목 간의 연결 고리를 <strong className="text-[#c3002f]">유향 비순환 그래프</strong>로 모델링하여,<br/>선후수 관계를 한눈에 파악합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <BrainCircuit color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">AI 역량 매핑</h3>
                    <p className="text-sm text-slate-600 mt-1">원하는 진로를 선택하면 LLM이 필요 역량을 분석하고,<br/>가장 적합한 <strong className="text-[#c3002f]">교과목을 추천</strong>합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <CalendarClock color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">위상정렬 스케줄링</h3>
                    <p className="text-sm text-slate-600 mt-1">학기별 최대 학점(18학점)을 고려하여<br/><strong className="text-[#c3002f]">졸업까지의 최단 경로</strong>를 자동으로 배치합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features (Tabs) --- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              기술 기반의 맞춤형 설계
            </h2>
            <p className="mt-2 text-slate-600">React Flow와 알고리즘을 결합한 인터랙티브 경험을 제공합니다.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-200 p-1 rounded-lg">
              {(['career', 'roadmap', 'schedule'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-[#c3002f] shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab === 'career' && '1. AI 진로 분석'}
                  {tab === 'roadmap' && '2. 인터랙티브 로드맵'}
                  {tab === 'schedule' && '3. 수강 시뮬레이션'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 min-h-[400px]">
            {activeTab === 'career' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    &#34;백엔드 개발자가 되고 싶어요&#34;<br/>
                    <span style={{ color: SEJONG_RED }}>필요 역량</span>을 레이더 차트로 확인하세요.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>LLM 기반 분석:</strong> 채용 공고 트렌드를 반영하여 해당 직무에 필요한 핵심 기술셋을 도출합니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>과목 기여도 매핑:</strong> &#39;데이터베이스&#39;, &#39;네트워크&lsquo; 등 학교 수업이 내 역량 성장에 얼마나 기여하는지 수치화합니다.</span>
                    </li>
                  </ul>
                </div>
                {/* Mockup: Radar Chart */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex justify-center items-center h-64">
                   {/* CSS로 간단한 차트 흉내 */}
                   <div className="relative w-48 h-48">
                      <div className="absolute inset-0 border border-slate-300 rounded-full opacity-50"></div>
                      <div className="absolute inset-4 border border-slate-300 rounded-full opacity-50"></div>
                      <div className="absolute inset-8 border border-slate-300 rounded-full opacity-50"></div>
                      {/* Polygon Data */}
                      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        <polygon points="50,10 90,40 80,80 20,80 10,40" fill="rgba(195, 0, 47, 0.2)" stroke="#c3002f" strokeWidth="2" />
                        <circle cx="50" cy="10" r="3" fill="#c3002f" /> {/* DB */}
                        <text x="50" y="-5" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">DB 설계</text>
                        <circle cx="90" cy="40" r="3" fill="#c3002f" /> {/* Network */}
                        <text x="100" y="40" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">네트워크</text>
                        <circle cx="80" cy="80" r="3" fill="#c3002f" /> {/* Algorithm */}
                        <text x="80" y="95" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">알고리즘</text>
                      </svg>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    React Flow 기반의<br/>
                    <span style={{ color: SEJONG_RED }}>인터랙티브 그래프</span> UI
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>드래그 앤 드롭:</strong> 노드 기반의 UI로 과목 간의 선후수 관계를 직관적으로 파악하고 탐색할 수 있습니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>상태 시각화:</strong> <span className="text-blue-600 font-bold">이수 완료</span>, <span className="text-slate-400">잠김(Locked)</span>, <span className="text-[#c3002f]">수강 예정</span> 상태를 색상으로 구분합니다.</span>
                    </li>
                  </ul>
                </div>
                {/* Mockup: React Flow Node Graph */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative h-64 overflow-hidden">
                   <div className="absolute inset-0 grid grid-cols-[20px_20px] bg-[size:20px_20px] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] opacity-50"></div>
                   
                   {/* Node 1: C Programming (Completed) */}
                   <div className="absolute top-10 left-10 bg-blue-100 border-2 border-blue-500 text-blue-800 px-4 py-2 rounded-lg text-xs font-bold shadow-sm z-10">
                      C프로그래밍 (완료)
                      <div className="absolute bottom-[-6px] left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2"></div>
                   </div>

                   {/* Node 2: Data Structure (Available) */}
                   <div className="absolute top-24 left-32 bg-white border-2 border-[#c3002f] text-slate-800 px-4 py-2 rounded-lg text-xs font-bold shadow-md z-10 animate-bounce">
                      자료구조 (추천!)
                      <div className="absolute top-[-6px] left-1/2 w-2 h-2 bg-[#c3002f] rounded-full -translate-x-1/2"></div>
                      <div className="absolute bottom-[-6px] left-1/2 w-2 h-2 bg-[#c3002f] rounded-full -translate-x-1/2"></div>
                   </div>

                   {/* Node 3: Algorithm (Locked) */}
                   <div className="absolute top-44 left-52 bg-slate-100 border-2 border-slate-300 text-slate-400 px-4 py-2 rounded-lg text-xs font-bold z-10">
                      알고리즘 (잠김)
                      <div className="absolute top-[-6px] left-1/2 w-2 h-2 bg-slate-300 rounded-full -translate-x-1/2"></div>
                   </div>

                   {/* Lines (SVG) */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M 90 45 C 90 65, 170 65, 170 90" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <path d="M 170 135 C 170 155, 250 155, 250 170" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="4"/>
                   </svg>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                   <h3 className="text-2xl font-bold text-slate-900">
                    학기별 학점 제한 고려,<br/>
                    <span style={{ color: SEJONG_RED }}>최적 스케줄링</span> 자동 배치
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>위상정렬(Topological Sort):</strong> 선수과목을 먼저 듣도록 순서를 정렬하여, &#39;수강 신청 반려&#39; 위험을 없앱니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>학기 밸런싱:</strong> 최대 18학점 내에서 전공과 교양을 적절히 분배하여 무리 없는 시간표를 제안합니다.</span>
                    </li>
                  </ul>
                </div>
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="space-y-4">
                        {/* Semester 1 */}
                        <div className="border border-slate-200 bg-white rounded-lg p-3">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-500">2024-1학기</span>
                              <span className="text-xs font-bold text-[#c3002f]">18학점 (Full)</span>
                           </div>
                           <div className="flex gap-2">
                              <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded">자료구조(3)</span>
                              <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded">컴퓨터구조(3)</span>
                              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded">...</span>
                           </div>
                        </div>
                        {/* Semester 2 */}
                        <div className="border border-slate-200 bg-white rounded-lg p-3 opacity-70">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-500">2024-2학기</span>
                              <span className="text-xs font-bold text-slate-700">15학점</span>
                           </div>
                           <div className="flex gap-2">
                              <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-1 rounded">운영체제(3)</span>
                              <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-1 rounded">알고리즘(3)</span>
                           </div>
                        </div>
                        <div className="text-center">
                           <ArrowRight className="w-5 h-5 text-slate-400 mx-auto rotate-90"/>
                        </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            아직도 수강편람 PDF를<br />
            일일이 찾아보고 계신가요?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            내 진로에 딱 맞는 커리큘럼,<br/>
            SJ AI HELPER가 단 3초 만에 설계해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              학번으로 로그인하고 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-sm text-slate-500">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="font-bold text-slate-700 flex justify-center items-center gap-2">
             <Network className="w-5 h-5" color={SEJONG_RED}/> SEJONG ROADMAP
          </div>
          <p>
            세종대학교 컴퓨터공학과 캡스톤 디자인 Team 6<br/>
            Frontend: 유진 | Backend: 은서 | AI: 소희 | PM: 영빈
          </p>
          <p className="text-xs text-slate-400 mt-8">
            © {new Date().getFullYear()} Sejong Capstone Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}