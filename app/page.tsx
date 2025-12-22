"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  CheckCircle, 
  UploadCloud, 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  UserCheck, 
  GraduationCap, 
  FileText,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ABEEKLandingPage() {
  const SEJONG_RED = "#c3002f";
  const [activeTab, setActiveTab] = useState<'student' | 'admin' | 'professor'>('student');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* --- 네비게이션 바 --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Bot color={SEJONG_RED} className="h-6 w-6" />
            <span className="text-slate-900">SJ AI HELPER <span className="text-xs font-normal text-slate-500 ml-1">for ABEEK</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-[#c3002f] transition-colors">주요 기능</Link>
            <Link href="#process" className="hover:text-[#c3002f] transition-colors">진행 절차</Link>
            <Link href="#contact" className="hover:text-[#c3002f] transition-colors">문의하기</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium hover:text-[#c3002f]"
            >
              로그인
            </Link>
            <Link
              href="/dashboard"
              style={{ backgroundColor: SEJONG_RED }}
              className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              심사 시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 히어로 섹션 --- */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-48 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white text-slate-600 mb-6 shadow-sm">
            <span style={{ color: SEJONG_RED }} className="font-bold mr-1">New</span>
            복잡한 공학인증 엑셀 계산은 이제 그만
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            공학인증 졸업 심사,<br />
            <span style={{ color: SEJONG_RED }}>AI 자동화 플랫폼</span>으로 완벽하게.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            학점 입력 한 번으로 BSM, 전문교양, 설계학점 충족 여부를 자동 판별합니다.<br className="hidden md:block"/>
            학생, 조교, 담당 교수님 모두를 위한 통합 관리 솔루션입니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/student/check"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-12 items-center justify-center rounded-md px-8 text-base font-medium text-white shadow-lg transition-transform hover:-translate-y-1"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              내 졸업요건 확인하기
            </Link>
            <Link
              href="/admin/demo"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-8 text-base font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#c3002f]"
            >
              관리자 데모 보기
            </Link>
          </div>
        </div>
        {/* 배경 장식 */}
        <div className="absolute top-0 w-full h-full -z-10 overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-red-50 blur-3xl opacity-60"></div>
           <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-slate-200 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* --- 사용자별 기능 (탭 인터페이스) --- */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              사용자별 맞춤 기능
            </h2>
            <p className="mt-4 text-slate-600">
              학생, 관리자, 교수님 각각에게 꼭 필요한 기능을 제공합니다.
            </p>
          </div>

          {/* 탭 버튼 */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              {(['student', 'admin', 'professor'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-3 rounded-md text-sm font-bold transition-all duration-200
                    ${activeTab === tab 
                      ? 'bg-white text-[#c3002f] shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'}
                  `}
                >
                  {tab === 'student' && '학생 (졸업예정자)'}
                  {tab === 'admin' && '행정 관리자'}
                  {tab === 'professor' && '담당 교수'}
                </button>
              ))}
            </div>
          </div>

          {/* 탭 컨텐츠 영역 */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm min-h-[400px]">
            
            {/* 1. 학생 기능 */}
            {activeTab === 'student' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-[#c3002f] font-bold">
                    <GraduationCap className="h-5 w-5" /> Student Feature
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">클릭 한 번으로<br/>복잡한 졸업 요건 정복</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">졸업요건 자동 체크</span>
                        <p className="text-sm text-slate-600">BSM(기초과학), 전문교양, 설계학점 등 복잡한 이수 구분을 자동으로 계산합니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">선·후수 체계 검증</span>
                        <p className="text-sm text-slate-600">선수 과목을 듣지 않고 후수 과목을 수강했는지 AI가 즉시 판별하여 알려줍니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <UploadCloud className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">간편한 서류 제출</span>
                        <p className="text-sm text-slate-600">성적증명서 및 포트폴리오 업로드 시 누락된 항목이 없는지 체크리스트를 제공합니다.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* UI Mockup Placeholder */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 aspect-[4/3] flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-bold">졸업 요건 달성률</span>
                    <span className="text-[#c3002f] font-bold">85%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-[#c3002f] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="text-xs text-slate-500 flex justify-between">
                       <span>전문교양: 충족</span>
                       <span className="text-red-500">설계학점: 2학점 부족</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    💡 <strong>Tip:</strong> &apos;종합설계&apos; 과목을 수강하면 졸업 요건이 충족됩니다.
                  </div>
                </div>
              </div>
            )}

            {/* 2. 관리자 기능 */}
            {activeTab === 'admin' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-[#c3002f] font-bold">
                    <LayoutDashboard className="h-5 w-5" /> Admin Feature
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">수백 명의 학생 심사,<br/>대시보드 하나로 끝.</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                      <BarChart3 className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">실시간 현황 대시보드</span>
                        <p className="text-sm text-slate-600">제출 완료, 검토 중, 미제출 학생 현황을 한눈에 파악하고 엑셀로 내보냅니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">자동 알림 발송</span>
                        <p className="text-sm text-slate-600">서류 누락자나 미제출자에게 클릭 한 번으로 독촉 알림(카톡/메일)을 발송합니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <UserCheck className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">미충족자 자동 분류</span>
                        <p className="text-sm text-slate-600">학번별, 미충족 사유별(설계학점 부족 등)로 학생을 자동 그룹화하여 통계를 제공합니다.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                 {/* UI Mockup Placeholder */}
                 <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 aspect-[4/3] relative overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 p-3 rounded-lg border">
                            <div className="text-xs text-slate-500">심사 완료</div>
                            <div className="text-xl font-bold text-slate-800">124명</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="text-xs text-red-500">요건 미충족</div>
                            <div className="text-xl font-bold text-[#c3002f]">12명</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                            <span>학번</span>
                            <span>이름</span>
                            <span>상태</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span>19010001</span>
                            <span>김세종</span>
                            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">통과</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span>20010234</span>
                            <span>이공학</span>
                            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">미충족</span>
                        </div>
                    </div>
                    {/* Floating Alert */}
                    <div className="absolute bottom-4 right-4 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl flex items-center gap-2">
                        <AlertTriangle size={14} className="text-yellow-400"/>
                        미제출자 5명에게 알림 발송됨
                    </div>
                 </div>
              </div>
            )}

            {/* 3. 교수 기능 */}
            {activeTab === 'professor' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-[#c3002f] font-bold">
                    <FileText className="h-5 w-5" /> Professor Feature
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">페이퍼리스 심사,<br/>정확하고 빠르게.</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">원클릭 서류 심사</span>
                        <p className="text-sm text-slate-600">학생들이 제출한 포트폴리오와 성적표를 온라인에서 바로 열람하고 승인/반려할 수 있습니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="h-6 w-6 text-[#c3002f] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">최종 승인 권한</span>
                        <p className="text-sm text-slate-600">AI가 1차 검증한 데이터를 바탕으로, 교수님은 최종 승인만 하시면 됩니다.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                 {/* UI Mockup Placeholder */}
                 <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 aspect-[4/3] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle size={32} />
                        </div>
                        <h4 className="text-lg font-bold">심사 승인 완료</h4>
                        <p className="text-slate-500 text-sm">
                            2024학년도 전기 졸업심사 대상자<br/>
                            전원 검토가 완료되었습니다.
                        </p>
                        <button className="text-[#c3002f] text-sm font-bold hover:underline">
                            심사 결과 보고서 다운로드 &rarr;
                        </button>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- 프로세스 (How it works) --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            졸업 심사 프로세스 혁신
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "학생 데이터 연동", desc: "학사정보시스템의 성적 데이터를 안전하게 불러옵니다." },
              { step: "02", title: "AI 요건 분석", desc: "공학인증 기준(KEC)에 맞춰 이수 학점을 정밀 분석합니다." },
              { step: "03", title: "부족 요건 알림", desc: "요건 미달 시 학생에게 구체적인 사유와 함께 알림을 보냅니다." },
              { step: "04", title: "교수 최종 승인", desc: "충족된 건에 대해 담당 교수님의 전자 서명으로 심사가 종료됩니다." }
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 border border-slate-700 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <div className="text-4xl font-extrabold text-[#c3002f]/50 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                {idx !== 3 && (
                    <ChevronRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 text-center bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            이번 학기 졸업 심사, <br/>
            SJ AI HELPER와 함께 스마트하게 시작하세요.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-md px-10 text-lg font-bold text-white shadow-lg hover:brightness-110 transition-all"
            >
              지금 바로 로그인
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            * 본 서비스는 세종대학교 포털 계정(Sejong Portal ID)으로 이용 가능합니다.
          </p>
        </div>
      </section>

      {/* --- 푸터 --- */}
      <footer className="bg-slate-50 py-10 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 font-bold text-xl mb-4">
            <Bot color={SEJONG_RED} className="h-6 w-6" />
            <span className="text-slate-800">SJ AI HELPER</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            세종대학교 공학인증센터 공식 지원 플랫폼
          </p>
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Sejong University. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}