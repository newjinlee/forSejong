import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  FileText, 
  Search, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  // 세종대 크림슨 레드 색상 상수
  const SEJONG_RED = "#c3002f";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* --- 네비게이션 바 --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Bot color={SEJONG_RED} className="h-6 w-6" />
            <span className="text-slate-900">SJ AI HELPER</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-[#c3002f] transition-colors">주요 기능</Link>
            <Link href="#how-it-works" className="hover:text-[#c3002f] transition-colors">이용 안내</Link>
            <Link href="#faq" className="hover:text-[#c3002f] transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden md:block text-sm font-medium hover:text-[#c3002f]"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              style={{ backgroundColor: SEJONG_RED }}
              className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 히어로 섹션 (메인 배너) --- */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-slate-50 text-slate-600">
              <span style={{ backgroundColor: SEJONG_RED }} className="mr-2 inline-block h-2 w-2 rounded-full"></span>
              세종대학교 교직원을 위한 스마트 솔루션
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              복잡한 행정 업무,<br />
              <span style={{ color: SEJONG_RED }}>AI HELPER</span>가 도와드립니다.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
              문서 초안 작성부터 학사 규정 검색까지. <br className="md:hidden"/>
              SJ AI HELPER와 함께 업무 효율을 극대화하고 더 가치 있는 일에 집중하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <Link
                href="/start"
                style={{ backgroundColor: SEJONG_RED }}
                className="inline-flex h-12 items-center justify-center rounded-md px-8 text-base font-medium text-white shadow transition-all hover:scale-105"
              >
                무료로 체험하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/intro"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-base font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#c3002f]"
              >
                서비스 소개 영상
              </Link>
            </div>
          </div>
        </div>
        {/* 배경 장식 요소 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
           <div className="absolute top-20 right-10 w-72 h-72 bg-gray-100 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* --- 주요 기능 (Grid) --- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              교직원 업무에 특화된 기능
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              반복적인 업무는 AI에게 맡기고 핵심 업무에 집중할 수 있도록 설계되었습니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 기능 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-slate-100">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                <FileText color={SEJONG_RED} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">스마트 공문 작성</h3>
              <p className="text-slate-600 leading-relaxed">
                키워드만 입력하면 대학 표준 양식에 맞는 공문과 안내문을 자동으로 생성해 줍니다. 문체 교정까지 한 번에 해결하세요.
              </p>
            </div>

            {/* 기능 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-slate-100">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                <Search color={SEJONG_RED} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">학사 규정 Q&A</h3>
              <p className="text-slate-600 leading-relaxed">
                "졸업 요건이 어떻게 되지?" 방대한 학칙집을 뒤질 필요 없이, AI 챗봇에게 자연어로 물어보고 즉시 답변을 받으세요.
              </p>
            </div>

            {/* 기능 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-slate-100">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                <Sparkles color={SEJONG_RED} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">회의록 자동 요약</h3>
              <p className="text-slate-600 leading-relaxed">
                녹음 파일이나 메모를 업로드하면 주요 안건, 결정 사항, 향후 일정(Action Item)을 자동으로 정리해 줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 기대 효과 (Stats) --- */}
      <section className="py-20 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-3 text-center">
            <div className="space-y-2">
              <h3 style={{ color: SEJONG_RED }} className="text-4xl font-extrabold">50% +</h3>
              <p className="text-sm font-medium text-slate-900 uppercase tracking-wide">문서 작성 시간 단축</p>
            </div>
            <div className="space-y-2">
              <h3 style={{ color: SEJONG_RED }} className="text-4xl font-extrabold">24/7</h3>
              <p className="text-sm font-medium text-slate-900 uppercase tracking-wide">언제 어디서나 접속 가능</p>
            </div>
            <div className="space-y-2">
              <h3 style={{ color: SEJONG_RED }} className="text-4xl font-extrabold">Top-Tier</h3>
              <p className="text-sm font-medium text-slate-900 uppercase tracking-wide">보안 등급 준수</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 이용 방법 --- */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                복잡한 설치 없이 <br/>
                <span style={{ color: SEJONG_RED }}>세종대 포털 계정</span>으로 바로 시작.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">로그인</h4>
                    <p className="text-slate-600 text-sm">세종대학교 포털 아이디로 별도 가입 없이 로그인하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">서비스 선택</h4>
                    <p className="text-slate-600 text-sm">공문 작성, 규정 검색 등 필요한 AI 도구를 선택합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">결과 확인</h4>
                    <p className="text-slate-600 text-sm">생성된 결과를 확인하고 다운로드하거나 메일로 바로 전송하세요.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 이미지 영역 (Placeholder) */}
            <div className="w-full md:w-1/2 bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border border-slate-200">
               <div className="text-slate-400 text-center">
                 <Bot className="w-16 h-16 mx-auto mb-2 opacity-20" />
                 <span className="text-sm">Service Dashboard UI Mockup</span>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- 보안 강조 --- */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-12 w-12 text-[#c3002f]" />
            <div>
              <h3 className="text-xl font-bold">철저한 데이터 보안</h3>
              <p className="text-slate-400 mt-2 max-w-xl">
                교내 데이터는 외부로 유출되지 않으며, 세종대학교 내부망 보안 규정을 철저히 준수하여 암호화 처리됩니다.
              </p>
            </div>
          </div>
          <button className="whitespace-nowrap rounded-md border border-slate-700 px-6 py-3 hover:bg-slate-800 transition-colors">
            보안 정책 자세히 보기
          </button>
        </div>
      </section>

      {/* --- CTA (Call to Action) --- */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            지금 바로 업무 혁신을 경험하세요.
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            SJ AI HELPER는 세종대학교 교직원 여러분의 든든한 파트너가 되어드릴 준비가 되어있습니다.
          </p>
          <Link
            href="/start"
            style={{ backgroundColor: SEJONG_RED }}
            className="inline-flex h-14 items-center justify-center rounded-md px-10 text-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1"
          >
            SJ AI HELPER 시작하기
          </Link>
        </div>
      </section>

      {/* --- 푸터 --- */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Bot color={SEJONG_RED} className="h-5 w-5" />
                <span>SJ AI HELPER</span>
              </div>
              <p className="text-sm text-slate-500">
                세종대학교 교직원을 위한<br/>인공지능 업무 보조 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-[#c3002f]">기능 소개</Link></li>
                <li><Link href="#" className="hover:text-[#c3002f]">업데이트 노트</Link></li>
                <li><Link href="#" className="hover:text-[#c3002f]">API 문서</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-[#c3002f]">이용 가이드</Link></li>
                <li><Link href="#" className="hover:text-[#c3002f]">자주 묻는 질문</Link></li>
                <li><Link href="#" className="hover:text-[#c3002f]">문의하기</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">관련 사이트</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="http://sejong.ac.kr" target="_blank" className="hover:text-[#c3002f]">세종대학교 홈페이지</Link></li>
                <li><Link href="http://portal.sejong.ac.kr" target="_blank" className="hover:text-[#c3002f]">세종대 포털</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} SJ AI HELPER. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}