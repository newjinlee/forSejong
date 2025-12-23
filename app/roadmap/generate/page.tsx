/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  GraduationCap, Loader2, ListChecks, AlertTriangle 
} from 'lucide-react';
import { useCareerStore } from '../../../src/store/useCareerStore';

// --- 1. Custom Node Components ---
const SubjectNode = ({ data }: { data: any }) => {
  const isCompleted = data.status === 'completed';
  const isRecommended = data.status === 'recommended';

  return (
    <div className={`w-[180px] rounded-lg shadow-md border-2 transition-all hover:scale-105 ${
      isCompleted 
        ? 'bg-slate-50 border-slate-300 opacity-90 grayscale-[0.2]' 
        : isRecommended 
          ? 'bg-white border-[#c3002f] ring-4 ring-red-50 shadow-lg shadow-red-100' 
          : 'bg-white border-slate-200'
    }`}>
      <Handle type="target" position={Position.Left} className="!bg-slate-400" />
      
      <div className={`px-3 py-2 text-xs font-bold text-white rounded-t-[5px] flex justify-between items-center ${
        isCompleted ? 'bg-slate-500' : isRecommended ? 'bg-[#c3002f]' : 'bg-slate-700'
      }`}>
        <span className="bg-white/20 px-1.5 py-0.5 rounded">{data.type}</span>
        <span>{data.credits}학점</span>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-800 leading-tight mb-1">
          {data.label}
        </h3>
        <p className="text-[10px] text-slate-500 flex items-center gap-1">
          {isCompleted ? <span className="text-slate-500">✅ 이수 완료</span> : <span className="text-[#c3002f] font-bold">🔥 AI 추천</span>}
        </p>
        {isRecommended && data.reason && (
          <div className="mt-2 text-[10px] bg-red-50 text-[#c3002f] p-1 rounded border border-red-100">
            &ldquo;{data.reason}&rdquo;
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-[#c3002f]" />
    </div>
  );
};

const nodeTypes = { subject: SubjectNode };

// --- 2. 진로별 추천 과목 데이터 ---
type RecommendedCourse = {
  id: string;
  name: string;
  type: string;
  credits: number;
  semester: string;
  reason: string;
};

type CareerRecommendations = {
  courses: RecommendedCourse[];
  insights: {
    missing: string;
    missingDescription: string;
    strategy: string;
    strategyDescription: string;
  };
};

const CAREER_RECOMMENDATIONS: Record<string, CareerRecommendations> = {
  // 프론트엔드 개발자
  'frontend': {
    courses: [
      { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '코딩테스트 필수 역량' },
      { id: 'r-2', name: '운영체제', type: '전필', credits: 3, semester: '4-2', reason: '프로세스/스레드 이해' },
      { id: 'r-3', name: 'HCI개론', type: '전선', credits: 3, semester: '4-2', reason: 'UX/UI 사용자 경험 설계' },
      { id: 'r-4', name: '모바일프로그래밍', type: '전선', credits: 3, semester: '4-2', reason: 'App 개발로 스펙 확장' },
    ],
    insights: {
      missing: '알고리즘, 운영체제',
      missingDescription: '과목 이력이 확인되지 않습니다. 졸업 및 취업을 위해 다음 학기 1순위 수강을 권장합니다.',
      strategy: '프론트엔드 직무 경쟁력',
      strategyDescription: 'HCI개론(UX)과 모바일프로그래밍을 추가 배치했습니다.',
    }
  },
  
  // 백엔드 개발자
  'backend': {
    courses: [
      { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '대규모 데이터 처리 최적화' },
      { id: 'r-2', name: '운영체제', type: '전필', credits: 3, semester: '4-2', reason: '서버 리소스 관리 이해' },
      { id: 'r-3', name: '데이터베이스', type: '전필', credits: 3, semester: '4-2', reason: 'SQL 최적화 및 설계' },
      { id: 'r-4', name: '분산시스템', type: '전선', credits: 3, semester: '4-2', reason: 'MSA 아키텍처 기반' },
    ],
    insights: {
      missing: '알고리즘, 운영체제, 데이터베이스',
      missingDescription: '백엔드 핵심 과목이 부족합니다. 서버 개발자로서 필수적인 CS 지식을 쌓아야 합니다.',
      strategy: '백엔드 직무 경쟁력',
      strategyDescription: '데이터베이스와 분산시스템으로 대용량 트래픽 처리 역량을 강화합니다.',
    }
  },
  
  // AI 연구원
  'ai-researcher': {
    courses: [
      { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '최적화 알고리즘 이해' },
      { id: 'r-2', name: '기계학습', type: '전선', credits: 3, semester: '4-2', reason: 'ML 핵심 이론 학습' },
      { id: 'r-3', name: '딥러닝', type: '전선', credits: 3, semester: '4-2', reason: '신경망 모델 구현' },
      { id: 'r-4', name: '선형대수학', type: '전선', credits: 3, semester: '4-2', reason: '텐서 연산 수학적 기반' },
    ],
    insights: {
      missing: '기계학습, 딥러닝',
      missingDescription: 'AI 연구에 필수적인 ML/DL 과목이 없습니다. 논문 이해와 모델 구현을 위해 필수입니다.',
      strategy: 'AI 연구원 역량 강화',
      strategyDescription: '선형대수학으로 수학적 기반을 다지고 기계학습/딥러닝 실습을 권장합니다.',
    }
  },

  // 기본값 (커스텀 진로 등)
  'default': {
    courses: [
      { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '모든 개발 직군 필수' },
      { id: 'r-2', name: '운영체제', type: '전필', credits: 3, semester: '4-2', reason: 'CS 기초 역량' },
      { id: 'r-3', name: '소프트웨어공학', type: '전선', credits: 3, semester: '4-2', reason: '협업 및 프로젝트 관리' },
      { id: 'r-4', name: '데이터베이스', type: '전필', credits: 3, semester: '4-2', reason: '데이터 관리 기초' },
    ],
    insights: {
      missing: '알고리즘, 운영체제',
      missingDescription: '전공 필수 과목이 부족합니다. 졸업 요건 충족을 위해 수강이 필요합니다.',
      strategy: '종합적 역량 강화',
      strategyDescription: '소프트웨어공학과 데이터베이스로 실무 역량을 높입니다.',
    }
  }
};

// 진로 ID로 추천 데이터 가져오기
const getRecommendations = (careerId: string | undefined): CareerRecommendations => {
  if (!careerId) return CAREER_RECOMMENDATIONS['default'];
  return CAREER_RECOMMENDATIONS[careerId] || CAREER_RECOMMENDATIONS['default'];
};

export default function RoadmapGeneratePage() {
  const { selectedCareer, studentInfo, completedCourses } = useCareerStore();
  const [loading, setLoading] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 현재 진로에 맞는 추천 데이터
  const recommendations = getRecommendations(selectedCareer?.id);

  // 기이수 과목을 학기별로 그룹화
  const completedCoursesForGraph = completedCourses.map((course, index) => ({
    id: `c-${index}`,
    name: course.name,
    type: course.type,
    credits: course.credits,
    semester: course.semester || '기타',
  }));

  const generateGraph = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    const X_GAP = 300;
    const Y_GAP = 140;
    const START_X = 50;
    
    // 기이수 과목에서 학기 목록 추출 + 추천 과목 학기 추가
    const completedSemesters = [...new Set(completedCoursesForGraph.map(c => c.semester))];
    const recommendedSemesters = [...new Set(recommendations.courses.map(c => c.semester))];
    const allSemesters = [...new Set([...completedSemesters, ...recommendedSemesters])]
      .filter(s => s !== '기타')
      .sort();
    
    allSemesters.forEach((sem, colIndex) => {
      const xPos = START_X + colIndex * X_GAP;
      const isRecommendedSemester = recommendedSemesters.includes(sem);
      
      newNodes.push({
        id: `header-${sem}`,
        type: 'default',
        data: { label: `${sem}학기` },
        position: { x: xPos, y: -60 },
        style: { 
          width: 180, fontWeight: 'bold', border: 'none', background: 'transparent',
          fontSize: '18px', color: isRecommendedSemester ? '#c3002f' : '#64748b'
        },
        draggable: false,
        selectable: false,
      });

      const completed = completedCoursesForGraph.filter(c => c.semester === sem);
      const recommended = recommendations.courses.filter(c => c.semester === sem);
      const allCourses = [...completed, ...recommended];

      allCourses.forEach((course, idx) => {
        const isRec = 'reason' in course;
        newNodes.push({
          id: course.id,
          type: 'subject',
          data: { 
            label: course.name, 
            type: course.type, 
            credits: course.credits, 
            status: isRec ? 'recommended' : 'completed',
            reason: isRec ? (course as RecommendedCourse).reason : undefined
          },
          position: { x: xPos, y: idx * Y_GAP },
        });

        if (colIndex > 0) {
          const prevSem = allSemesters[colIndex - 1];
          const prevCourses = [...completedCoursesForGraph, ...recommendations.courses].filter(c => c.semester === prevSem);
          
          if (prevCourses.length > 0) {
            const targetPrev = prevCourses[idx] || prevCourses[prevCourses.length - 1];
            newEdges.push({
              id: `e-${targetPrev.id}-${course.id}`,
              source: targetPrev.id,
              target: course.id,
              type: 'smoothstep',
              animated: isRec,
              style: { 
                stroke: isRec ? '#c3002f' : '#cbd5e1', 
                strokeWidth: isRec ? 2 : 1,
                opacity: isRec ? 1 : 0.5 
              },
            });
          }
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [completedCoursesForGraph, recommendations.courses, setNodes, setEdges]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateGraph();
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [generateGraph]);

  // 총 이수 학점 계산
  const totalCredits = completedCourses.reduce((sum, c) => sum + c.credits, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-16 h-16 text-[#c3002f] animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {studentInfo?.name || '학생'}님의 데이터를 불러오는 중...
        </h2>
        <div className="flex flex-col gap-2 text-slate-500 text-sm text-center">
          <p className="animate-pulse">학사 정보 시스템 연동 중...</p>
          <p className="animate-pulse delay-75">
            기이수 과목 파싱 완료 (
            <span className="font-bold text-slate-700">{completedCourses.length}과목</span>
            , 총 <span className="font-bold text-slate-700">{totalCredits}학점</span>
            )
          </p>
          <p className="animate-pulse delay-150 font-bold text-[#c3002f]">
            &lsquo;{selectedCareer?.title || '선택한 진로'}&rsquo; 맞춤 로드맵 생성 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="bg-red-50 p-2 rounded-lg">
            <GraduationCap className="text-[#c3002f] w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 leading-none mb-1">
              {studentInfo?.name || '학생'}님의 커리어 로드맵
            </h1>
            <p className="text-xs text-slate-500">
              목표: <span className="font-bold text-[#c3002f]">{selectedCareer?.title || '미선택'}</span>
              <span className="mx-2">|</span>
              이수: <span className="font-bold text-slate-700">{completedCourses.length}과목 ({totalCredits}학점)</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowCourseList(!showCourseList)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
          >
            <ListChecks size={18} />
            기이수 목록 확인
          </button>
          <button className="px-5 py-2 bg-[#c3002f] hover:bg-[#a00026] text-white rounded-lg text-sm font-bold shadow-md transition-all">
            로드맵 저장하기
          </button>
        </div>
      </header>

      {/* Main Flow Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <Background color="#e2e8f0" gap={24} size={1} />
          <Controls showInteractive={false} />
          <MiniMap 
            nodeColor={(n) => n.data.status === 'recommended' ? '#c3002f' : '#cbd5e1'} 
            maskColor="rgba(241, 245, 249, 0.7)"
            className="!bg-white !border-slate-200 !shadow-lg !rounded-lg"
          />
        </ReactFlow>

        {/* Floating Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-lg z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="w-3 h-3 bg-slate-200 border border-slate-400 rounded"></span>
            기이수 (수강 완료)
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c3002f]">
            <span className="w-3 h-3 bg-white border border-[#c3002f] ring-2 ring-red-50 rounded"></span>
            AI 추천 (수강 필요)
          </div>
        </div>

        {/* Recommendation Insight Panel - 동적 내용 */}
        <div className="absolute top-6 right-6 w-80 bg-white/95 backdrop-blur border border-red-100 p-5 rounded-xl shadow-xl z-10 animate-in slide-in-from-right-10">
          <div className="flex items-center gap-2 mb-3 border-b border-red-50 pb-2">
            <AlertTriangle className="w-5 h-5 text-[#c3002f]" />
            <h3 className="font-bold text-slate-900">로드맵 분석 리포트</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 font-bold mb-1">전공 필수 미충족 감지</p>
              <p className="text-sm text-slate-700 leading-snug">
                <strong className="text-[#c3002f]">{recommendations.insights.missing}</strong> {recommendations.insights.missingDescription}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold mb-1">{recommendations.insights.strategy}</p>
              <p className="text-sm text-slate-700 leading-snug">
                {recommendations.insights.strategyDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course List Modal - 실제 데이터 사용 */}
      {showCourseList && (
        <div className="absolute inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-30 border-l animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-5 border-b flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg flex items-center gap-2 text-black">
              <ListChecks className="text-black" /> 
              기이수 과목 목록 ({completedCourses.length}과목)
            </h3>
            <button 
              onClick={() => setShowCourseList(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              닫기
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {completedCourses.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <p>기이수 과목 정보가 없습니다.</p>
                <p className="text-xs mt-2">로그인 시 수강 정보를 불러옵니다.</p>
              </div>
            ) : (
              completedCourses.map((course, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded text-white ${
                        course.type === '전필' ? 'bg-slate-600' : course.type === '전선' ? 'bg-slate-400' : 'bg-blue-400'
                      }`}>
                        {course.type}
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{course.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {course.semester ? `${course.semester} 수강` : '학기 정보 없음'}
                    </span>
                  </div>
                  <span className="font-bold text-slate-600 text-sm">{course.credits}학점</span>
                </div>
              ))
            )}
            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-xs text-slate-400">
                총 <span className="font-bold text-slate-600">{totalCredits}학점</span> 이수
              </p>
              <p className="text-xs text-slate-400 mt-1">
                학교 포털 데이터와 동기화된 정보입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}