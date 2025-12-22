"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  CheckCircle2, 
  UploadCloud, 
  FileWarning, // 복잡한 서류 아이콘
  PenTool,     // 자필 작성 아이콘
  MonitorCheck, // 디지털 심사 아이콘
  XCircle,
  ArrowRight,
  School,
  FileSpreadsheet,
  MessageSquare
} from 'lucide-react';

export default function ABEEKLandingPage() {
  const SEJONG_RED = "#c3002f";
  const [activeTab, setActiveTab] = useState<'student' | 'professor' | 'admin'>('student');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* --- 네비게이션 --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Bot color={SEJONG_RED} className="h-6 w-6" />
            <span className="text-slate-900">SJ AI HELPER <span className="text-xs font-normal text-slate-500 ml-1">for ABEEK</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#pain-point" className="hover:text-[#c3002f]">Why SJ AI?</Link>
            <Link href="#features" className="hover:text-[#c3002f]">주요 기능</Link>
            <Link href="#process" className="hover:text-[#c3002f]">이용 절차</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-[#c3002f]">로그인</Link>
            <Link
              href="/dashboard"
              style={{ backgroundColor: SEJONG_RED }}
              className="rounded-md px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition-all"
            >
              내 졸업요건 조회
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#c3002f] font-bold text-sm">
            🚨 2026년 2월 졸업예정자 필독
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6">
            출력하고, 자필로 쓰고, 방문 제출...&quot;<br />
            아직도 <span className="relative inline-block">
              <span className="relative z-10" style={{ color: SEJONG_RED }}>졸업 심사 서류</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-red-200/50 -z-0"></span>
            </span>와 싸우시나요?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            표준이수체계표 작성부터 후수과목이수능력확인서 교수님 서명까지.<br className="hidden md:block" />
            SJ AI HELPER가 복잡한 공학인증 심사를 <strong>단 3분 만에 디지털로 해결</strong>해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/start"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-8 text-lg font-bold text-white shadow-lg hover:translate-y-[-2px] transition-transform"
            >
              원클릭 졸업 자가진단
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/manual"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              소프트웨어학과/컴공과 가이드
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            * 세종대학교 포털 계정 연동 / 개인정보 보호를 위해 암호화 처리됩니다.
          </p>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 translate-y-1/3 translate-x-1/3"></div>
      </section>

      {/* --- Pain Point Solution (Before & After) --- */}
      <section id="pain-point" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">왜 SJ AI HELPER인가요?</h2>
            <p className="text-slate-600">여러분의 메일함에 도착한 그 복잡한 안내문, 이렇게 바뀝니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Before: 기존 방식 */}
            <div className="relative group rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="absolute -top-4 -left-4 bg-slate-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                기존 방식 (Before)
              </div>
              <div className="space-y-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <FileWarning className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">끝없는 서류 작업</h3>
                    <p className="text-sm text-slate-600 mt-1">졸업심사서, 선후수준수확인표, 표준이수체계표... <br/>학번별 엑셀 시트 찾아서 일일이 기입.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <PenTool className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">아날로그 제출</h3>
                    <p className="text-sm text-slate-600 mt-1">&quot;출력 후 자필 작성&quot;, &quot;스테이플러 금지&quot;, &quot;충무관 407C 방문&quot;.<br/>하나라도 틀리면 다시 출력.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <School className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">교수님 서명 받기</h3>
                    <p className="text-sm text-slate-600 mt-1">&apos;후수과목이수능력확인서&apos; 들고 교수님 연구실 노크.<br/>교수님 안 계시면 무한 대기.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* After: SJ AI 방식 */}
            <div className="relative rounded-2xl border-2 border-[#c3002f] bg-white p-8 shadow-2xl scale-105 z-10">
              <div className="absolute -top-4 -left-4 bg-[#c3002f] text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                SJ AI HELPER (After)
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <Bot color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">서류 자동 생성</h3>
                    <p className="text-sm text-slate-600 mt-1">성적증명서 PDF만 올리면, <strong className="text-[#c3002f]">AI가 모든 서류를 자동 완성</strong>합니다.<br/>빈칸 채우기 고민 끝!</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <UploadCloud color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">온라인 원클릭 제출</h3>
                    <p className="text-sm text-slate-600 mt-1">충무관 방문 필요 없음. 완성된 서류 패키지를 <strong className="text-[#c3002f]">클릭 한 번으로 학과 사무실 전송.</strong></p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <MonitorCheck color={SEJONG_RED} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">교수님 전자 결재</h3>
                    <p className="text-sm text-slate-600 mt-1">시스템에서 요청 버튼만 누르세요. <strong className="text-[#c3002f]">교수님이 온라인으로 승인</strong>하면 서명 완료.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Detailed Features (Tabs) --- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              사용자별 맞춤 기능
            </h2>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-200 p-1 rounded-lg">
              {(['student', 'professor', 'admin'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-[#c3002f] shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab === 'student' && '학생 (졸업예정자)'}
                  {tab === 'professor' && '담당 교수'}
                  {tab === 'admin' && '학과 조교/관리자'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 min-h-[400px]">
            {activeTab === 'student' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    &quot;BSM 학점이 부족한가요?&quot;<br/>
                    <span style={{ color: SEJONG_RED }}>미충족 사유</span>를 즉시 알려줍니다.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>자동 계산:</strong> 전문교양 14학점, BSM 18학점, 설계학점 10학점 등 필수 요건 달성 현황 시각화.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>선후수 체계 검증:</strong> &apos;선수과목 미이수&apos; 시 발생하는 &apos;후수과목이수능력확인서&apos;를 자동 생성.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>서류 패키징:</strong> 성적증명서, 종합설계 보고서 등 필요 서류를 누락 없이 묶어서 관리.</span>
                    </li>
                  </ul>
                </div>
                {/* Mockup UI */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
                  <div className="absolute top-4 right-4 bg-red-100 text-[#c3002f] text-xs font-bold px-2 py-1 rounded">미충족 감지</div>
                  <div className="text-sm text-slate-500 mb-2">학번: 19011*** | 이름: 김세종</div>
                  <div className="w-full bg-slate-200 h-2 rounded-full mb-4">
                    <div className="bg-[#c3002f] h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <div className="space-y-3 bg-white p-4 rounded-lg border border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span>전문교양 (14학점)</span>
                      <span className="text-green-600 font-bold">충족</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>설계학점 (10학점)</span>
                      <span className="text-[#c3002f] font-bold">2학점 부족 ⚠️</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 pt-2 border-t">
                      * &apos;종합설계&apos; 미수강 상태입니다. 사유서를 작성하시겠습니까?
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professor' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    학생 면담과 서명 요청,<br/>
                    <span style={{ color: SEJONG_RED }}>대시보드</span>에서 한 번에 처리하세요.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>전자 결재:</strong> 학생들이 요청한 &apos;후수과목이수능력확인서&apos;, &apos;졸업심사서&apos;를 온라인으로 검토하고 승인합니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>종합설계 평가:</strong> 캡스톤 디자인 최종보고서를 열람하고 바로 평가 점수를 입력할 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                   <MessageSquare className="w-12 h-12 text-[#c3002f] mb-4" />
                   <p className="font-bold text-lg mb-2">승인 대기 문서 (5건)</p>
                   <p className="text-sm text-slate-500 mb-6">
                     김세종 학생의 &apos;후수과목이수능력확인서&apos; 외 4건의<br/>
                     전자 서명 요청이 도착했습니다.
                   </p>
                   <button className="bg-slate-900 text-white text-sm px-6 py-2 rounded hover:bg-slate-800">
                     검토하러 가기
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-6">
                   <h3 className="text-2xl font-bold text-slate-900">
                    심사 기간의 폭주하는 메일,<br/>
                    <span style={{ color: SEJONG_RED }}>AI 자동 분류</span>로 해방되세요.
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>제출 현황 모니터링:</strong> 전체 대상자 중 제출/미제출/누락자를 실시간으로 파악합니다.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>자동 피드백 발송:</strong> 서류 누락(성적표 미첨부 등) 발생 시 학생에게 보완 요청 알림을 자동 발송합니다.</span>
                    </li>
                     <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-[#c3002f] mt-1 flex-shrink-0" />
                      <span><strong>데이터 엑셀 변환:</strong> 최종 심사 결과를 학교 제출 양식에 맞게 엑셀로 자동 변환합니다.</span>
                    </li>
                  </ul>
                </div>
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4 border-b pb-4">
                        <FileSpreadsheet className="text-green-600" size={20}/>
                        <span className="font-bold text-sm">2026-02 졸업심사_최종.xlsx</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>총원: 120명</span>
                            <span>처리완료: 98명</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{width: '82%'}}></div>
                        </div>
                        <div className="mt-4 p-3 bg-red-50 rounded text-xs text-red-600 font-medium">
                            ⚠️ 미제출 22명에게 리마인드 알림이 발송되었습니다.
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
            이번 학기 공학인증 심사,<br />
            스트레스 없이 <span style={{ color: SEJONG_RED }}>3분 만에 끝내세요.</span>
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            자필 서명, 방문 제출의 번거로움은 이제 그만.<br/>
            SJ AI HELPER가 여러분의 졸업 준비를 가장 스마트하게 도와드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link
              href="/login"
              style={{ backgroundColor: SEJONG_RED }}
              className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              로그인하고 심사 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-sm text-slate-500">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="font-bold text-slate-700 flex justify-center items-center gap-2">
             <Bot className="w-5 h-5" color={SEJONG_RED}/> SJ AI HELPER
          </div>
          <p>
            세종대학교 공학교육센터 공식 지원 플랫폼<br/>
            (05006) 서울시 광진구 능동로 209 충무관 407C호
          </p>
          <p className="text-xs text-slate-400 mt-8">
            © {new Date().getFullYear()} Sejong University. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}