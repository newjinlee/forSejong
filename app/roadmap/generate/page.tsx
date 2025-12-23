/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState, useEffect } from 'react';
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
  BookOpen, GraduationCap, Loader2, ListChecks, Info, AlertTriangle 
} from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';

// --- 1. Custom Node Components ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            &rdquo;{data.reason}&rdquo;
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-[#c3002f]" />
    </div>
  );
};

const nodeTypes = { subject: SubjectNode };

// --- 2. Data Simulation (로그인 시 받아온 데이터라고 가정) ---

// CSV 파일 내용을 바탕으로 구성한 "기이수 과목"
const COMPLETED_COURSES_MOCK = [
  // 2학년 (가정)
  { id: 'c-1', name: '디지털시스템', type: '전필', credits: 3, semester: '2-1' },
  { id: 'c-2', name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '2-2' },
  { id: 'c-3', name: '고급C프로그래밍', type: '전선', credits: 3, semester: '2-2' },
  { id: 'c-4', name: '컴퓨터구조', type: '전필', credits: 3, semester: '2-2' },
  { id: 'c-5', name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2-2' },
  
  // 3학년 ~ 4학년 1학기 (최신)
  { id: 'c-6', name: '정보보호개론', type: '전선', credits: 3, semester: '3-1' }, // 2025-1
  { id: 'c-7', name: '웹프로그래밍', type: '전선', credits: 3, semester: '3-1' }, // 2025-1
  { id: 'c-8', name: '생성형인공지능입문', type: '전선', credits: 3, semester: '3-1' }, // 2025-1
  { id: 'c-9', name: 'Capstone디자인', type: '전필', credits: 3, semester: '4-1' }, // 2025-1 (졸업준비)
];

// 프론트엔드 희망자에게 부족한 과목 (4-2학기 추천)
// * 캡스톤(4-1)을 이미 들었지만, 핵심 CS 전필이 빠져있어 추천함
const RECOMMENDED_COURSES_MOCK = [
  { id: 'r-1', name: '알고리즘', type: '전필', credits: 3, semester: '4-2', reason: '코딩테스트 필수 역량' },
  { id: 'r-2', name: '운영체제', type: '전필', credits: 3, semester: '4-2', reason: '프로세스/스레드 이해' },
  { id: 'r-3', name: 'HCI개론', type: '전선', credits: 3, semester: '4-2', reason: 'UX/UI 사용자 경험 설계' },
  { id: 'r-4', name: '모바일프로그래밍', type: '전선', credits: 3, semester: '4-2', reason: 'App 개발로 스펙 확장' },
];

export default function RoadmapGeneratePage() {
  const { selectedCareer, studentInfo } = useCareerStore();
  const [loading, setLoading] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false); // 기이수 목록 모달
  
  // React Flow States
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // --- Graph Generation Logic ---
  useEffect(() => {
    // 1.5초 동안 분석하는 척 (로딩 애니메이션)
    const timer = setTimeout(() => {
      generateGraph();
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const generateGraph = () => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    // 배치 설정
    const X_GAP = 300; // 학기 간격 (가로)
    const Y_GAP = 140; // 과목 간격 (세로)
    const START_X = 50;
    
    // 학기 리스트 (데이터에 있는 학기만 추출 + 추천 학기)
    const semesters = ['2-1', '2-2', '3-1', '4-1', '4-2'];
    
    semesters.forEach((sem, colIndex) => {
      const xPos = START_X + colIndex * X_GAP;
      
      // 1. 학기 헤더 노드
      newNodes.push({
        id: `header-${sem}`,
        type: 'default',
        data: { label: `${sem}학기` },
        position: { x: xPos, y: -60 },
        style: { 
          width: 180, fontWeight: 'bold', border: 'none', background: 'transparent',
          fontSize: '18px', color: sem === '4-2' ? '#c3002f' : '#64748b'
        },
        draggable: false,
        selectable: false,
      });

      // 해당 학기 과목들 필터링
      const completed = COMPLETED_COURSES_MOCK.filter(c => c.semester === sem);
      const recommended = RECOMMENDED_COURSES_MOCK.filter(c => c.semester === sem);
      const allCourses = [...completed, ...recommended];

      allCourses.forEach((course, idx) => {
        // 노드 생성
        const isRec = (course as any).reason !== undefined;
        newNodes.push({
          id: course.id,
          type: 'subject',
          data: { 
            label: course.name, 
            type: course.type, 
            credits: course.credits, 
            status: isRec ? 'recommended' : 'completed',
            reason: (course as any).reason 
          },
          position: { x: xPos, y: idx * Y_GAP },
        });

        // 엣지(선) 연결 로직 (단순화: 이전 학기 같은 인덱스 or 마지막 노드와 연결)
        if (colIndex > 0) {
          // 이전 학기의 과목 중 하나와 연결 (그럴싸한 그래프 모양을 위해)
          const prevSem = semesters[colIndex - 1];
          const prevCourses = [...COMPLETED_COURSES_MOCK, ...RECOMMENDED_COURSES_MOCK].filter(c => c.semester === prevSem);
          
          if (prevCourses.length > 0) {
             // 인덱스가 맞으면 직렬 연결, 아니면 마지막 놈이랑 연결
             const targetPrev = prevCourses[idx] || prevCourses[prevCourses.length - 1];
             newEdges.push({
               id: `e-${targetPrev.id}-${course.id}`,
               source: targetPrev.id,
               target: course.id,
               type: 'smoothstep',
               animated: isRec, // 추천 경로는 애니메이션
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-16 h-16 text-[#c3002f] animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {studentInfo?.name || '김세종'}님의 데이터를 불러오는 중...
        </h2>
        <div className="flex flex-col gap-2 text-slate-500 text-sm text-center">
          <p className="animate-pulse">학사 정보 시스템 연동 중...</p>
          <p className="animate-pulse delay-75">기이수 과목 파싱 완료 (9과목)</p>
          <p className="animate-pulse delay-150 font-bold text-[#c3002f]">
            &rsquo;{selectedCareer?.title || '프론트엔드 개발자'}&#39; 맞춤 로드맵 생성 중...
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
               {studentInfo?.name || '김세종'}님의 커리어 로드맵
            </h1>
            <p className="text-xs text-slate-500">
               목표: <span className="font-bold text-[#c3002f]">{selectedCareer?.title || '프론트엔드 개발자'}</span>
               <span className="mx-2">|</span>
               졸업요건 충족률: <span className="font-bold text-slate-700">82%</span>
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

         {/* Recommendation Insight Panel (Overlay) */}
         <div className="absolute top-6 right-6 w-80 bg-white/95 backdrop-blur border border-red-100 p-5 rounded-xl shadow-xl z-10 animate-in slide-in-from-right-10">
            <div className="flex items-center gap-2 mb-3 border-b border-red-50 pb-2">
               <AlertTriangle className="w-5 h-5 text-[#c3002f]" />
               <h3 className="font-bold text-slate-900">로드맵 분석 리포트</h3>
            </div>
            <div className="space-y-4">
               <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">전공 필수 미충족 감지</p>
                  <p className="text-sm text-slate-700 leading-snug">
                     <strong className="text-[#c3002f]">알고리즘, 운영체제</strong> 과목 이력이 확인되지 않습니다. 졸업 및 취업을 위해 다음 학기 1순위 수강을 권장합니다.
                  </p>
               </div>
               <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">커리어 강화 전략</p>
                  <p className="text-sm text-slate-700 leading-snug">
                     프론트엔드 직무 경쟁력을 위해 <strong className="text-slate-900">HCI개론(UX)</strong>과 <strong className="text-slate-900">모바일프로그래밍</strong>을 추가 배치했습니다.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Course List Modal (Right Side) */}
      {showCourseList && (
        <div className="absolute inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-30 border-l animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-5 border-b flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ListChecks className="text-[#c3002f]" /> 기이수 과목 목록
            </h3>
            <button 
              onClick={() => setShowCourseList(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              닫기
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
             {COMPLETED_COURSES_MOCK.map((course, idx) => (
               <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded text-white ${course.type === '전필' ? 'bg-slate-600' : 'bg-slate-400'}`}>
                        {course.type}
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{course.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{course.semester}학기 수강</span>
                  </div>
                  <span className="font-bold text-slate-600 text-sm">{course.credits}학점</span>
               </div>
             ))}
             <div className="mt-4 pt-4 border-t text-center text-xs text-slate-400">
               학교 포털 데이터와 동기화된 정보입니다.
             </div>
          </div>
        </div>
      )}
    </div>
  );
}