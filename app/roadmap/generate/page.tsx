"use client";

import React, { useState, useCallback, useMemo } from 'react';
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
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, 
  ArrowRight, Loader2, BookOpen, GraduationCap 
} from 'lucide-react';
import { useCareerStore } from '@/app/store/useCareerStore';

// --- 1. Custom Node Components ---

// 커스텀 노드: 과목 카드
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubjectNode = ({ data }: { data: any }) => {
  const isCompleted = data.status === 'completed';
  const isRecommended = data.status === 'recommended';

  return (
    <div className={`w-[180px] rounded-lg shadow-md border-2 transition-all hover:scale-105 ${
      isCompleted 
        ? 'bg-slate-50 border-slate-300 opacity-80' 
        : isRecommended 
          ? 'bg-white border-[#c3002f] ring-2 ring-red-50' 
          : 'bg-white border-slate-200'
    }`}>
      {/* Handle for connection */}
      <Handle type="target" position={Position.Left} className="!bg-slate-400" />
      
      <div className={`px-3 py-2 text-xs font-bold text-white rounded-t-[5px] flex justify-between ${
        isCompleted ? 'bg-slate-500' : isRecommended ? 'bg-[#c3002f]' : 'bg-slate-700'
      }`}>
        <span>{data.type}</span> {/* 전필/전선 */}
        <span>{data.credits}학점</span>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-800 leading-tight mb-1">
          {data.label}
        </h3>
        <p className="text-[10px] text-slate-500">
          {isCompleted ? '이수 완료' : '추천 과목'}
        </p>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-[#c3002f]" />
    </div>
  );
};

const nodeTypes = { subject: SubjectNode };

// --- 2. Mock Data based on User CSV ---
// 사용자가 업로드한 CSV 파일 내용을 바탕으로 구성
const PARSED_COURSES = [
  { name: 'C프로그래밍', type: '전필', credits: 3, semester: '1-1' },
  { name: '디지털시스템', type: '전필', credits: 3, semester: '1-1' },
  { name: '이산수학및프로그래밍', type: '전선', credits: 3, semester: '1-2' },
  { name: '고급C프로그래밍', type: '전선', credits: 3, semester: '1-2' },
  { name: '자료구조', type: '전필', credits: 3, semester: '2-1' },
  { name: '컴퓨터구조', type: '전필', credits: 3, semester: '2-2' },
  { name: '컴퓨터네트워크', type: '전필', credits: 3, semester: '2-2' },
  { name: '웹프로그래밍', type: '전선', credits: 3, semester: '3-1' }, // 프론트엔드 관련 중요!
  { name: '정보보호개론', type: '전선', credits: 3, semester: '3-1' },
  { name: 'Capstone디자인', type: '전필', credits: 3, semester: '3-1' },
];

// 프론트엔드 로드맵 추천 (남은 학기 시뮬레이션)
const RECOMMENDED_COURSES = [
  // 3-2학기 추천 (전필2 + 전선2)
  { id: 'rec-1', name: '알고리즘', type: '전필', credits: 3, semester: '3-2', reason: '코딩테스트 필수' },
  { id: 'rec-2', name: '운영체제', type: '전필', credits: 3, semester: '3-2', reason: 'CS 기초' },
  { id: 'rec-3', name: 'HCI개론', type: '전선', credits: 3, semester: '3-2', reason: 'UX/UI 이해' },
  { id: 'rec-4', name: '데이터베이스', type: '전선', credits: 3, semester: '3-2', reason: '백엔드 데이터 연동' },
  
  // 4-1학기 추천
  { id: 'rec-5', name: '소프트웨어공학', type: '전필', credits: 3, semester: '4-1', reason: '협업 프로세스' },
  { id: 'rec-6', name: '인공지능', type: '전필', credits: 3, semester: '4-1', reason: '최신 트렌드' },
  { id: 'rec-7', name: '모바일프로그래밍', type: '전선', credits: 3, semester: '4-1', reason: 'React Native 연계' },
  { id: 'rec-8', name: '멀티미디어', type: '전선', credits: 3, semester: '4-1', reason: '이미지/영상 처리' },
];


export default function RoadmapGeneratePage() {
  const { selectedCareer, studentInfo } = useCareerStore();
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  
  // React Flow States
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // --- Functions ---

  const handleFileUpload = () => {
    // 실제 파일 처리 로직 대신 시뮬레이션
    setStep('analyzing');
    
    setTimeout(() => {
      generateGraph();
      setStep('result');
    }, 2000);
  };

  const generateGraph = () => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let xPos = 0;
    let yPos = 0;
    const X_GAP = 250; // 학기 간격
    const Y_GAP = 120; // 과목 간격

    // 1. Semester Grouping (Mock Logic)
    const semesters = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1'];
    
    semesters.forEach((sem, colIndex) => {
      xPos = colIndex * X_GAP;
      yPos = 0;

      // Header Node (학기 표시)
      newNodes.push({
        id: `header-${sem}`,
        type: 'default',
        data: { label: `${sem}학기` },
        position: { x: xPos, y: -50 },
        style: { width: 180, fontWeight: 'bold', border: 'none', background: 'transparent' },
        draggable: false,
      });

      // 1. 기이수 과목 배치
      const completedInSem = PARSED_COURSES.filter(c => c.semester === sem);
      completedInSem.forEach((course, idx) => {
        newNodes.push({
          id: `comp-${course.name}`,
          type: 'subject',
          data: { label: course.name, type: course.type, credits: course.credits, status: 'completed' },
          position: { x: xPos, y: yPos + (idx * Y_GAP) },
        });
      });

      // 2. 추천 과목 배치 (3-2, 4-1 학기)
      const recommendedInSem = RECOMMENDED_COURSES.filter(c => c.semester === sem);
      recommendedInSem.forEach((course, idx) => {
        // 기존 과목 아래에 배치하기 위해 offset 계산
        const offset = completedInSem.length; 
        const nodeId = course.id;
        
        newNodes.push({
          id: nodeId,
          type: 'subject',
          data: { label: course.name, type: course.type, credits: course.credits, status: 'recommended' },
          position: { x: xPos, y: yPos + ((offset + idx) * Y_GAP) },
        });

        // Edge 연결 (단순화를 위해 이전 학기 마지막 노드와 연결하는 시늉)
        if (colIndex > 0) {
           // 실제로는 선수과목 로직이 들어가야 함
           // 여기서는 시각적 연결만 보여줌
           const prevSem = semesters[colIndex - 1];
           const prevNodeId = `header-${prevSem}`; // 임시 연결
           newEdges.push({
             id: `e-${prevSem}-${course.name}`,
             source: prevNodeId,
             target: nodeId,
             animated: true,
             style: { stroke: '#c3002f', strokeWidth: 2, opacity: 0.5 },
           });
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* --- Step 1: Upload --- */}
      {step === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4">
           <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-slate-100">
              <div className="w-16 h-16 bg-red-50 text-[#c3002f] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSpreadsheet size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">기이수 성적표를 업로드해주세요</h2>
              <p className="text-slate-500 mb-8">
                학교 포털에서 다운로드 받은 엑셀(CSV) 파일을 올려주시면,<br/>
                현재까지의 이수 현황을 분석하여 <strong>맞춤형 로드맵</strong>을 설계합니다.
              </p>

              {/* Drag Drop Zone (Simulation) */}
              <div 
                onClick={handleFileUpload}
                className="border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:border-[#c3002f] hover:bg-red-50/30 transition-all group"
              >
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-[#c3002f] mb-4 transition-colors" />
                <p className="text-sm font-medium text-slate-700">
                  클릭하여 파일 선택 또는 여기로 드래그
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  지원 형식: .csv, .xlsx (최대 5MB)
                </p>
              </div>

              {/* Demo Button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={handleFileUpload}
                  className="text-sm text-slate-500 hover:text-[#c3002f] underline decoration-dotted"
                >
                  (데모용) &rsquo;기이수성적조회_20251223.csv&rsquo; 자동 적용하기
                </button>
              </div>
           </div>
        </div>
      )}

      {/* --- Step 2: Analyzing --- */}
      {step === 'analyzing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
           <div className="text-center">
             <Loader2 className="w-12 h-12 text-[#c3002f] animate-spin mx-auto mb-6" />
             <h2 className="text-2xl font-bold text-slate-900 mb-2">성적 데이터를 분석 중입니다...</h2>
             <div className="space-y-2 text-slate-500 text-sm">
                <p className="animate-pulse">📂 파일 파싱 중... (완료)</p>
                <p className="animate-pulse delay-75">🔍 전공 필수 요건 대조 중... (진행 중)</p>
                <p className="animate-pulse delay-150">🤖 {selectedCareer?.title || '프론트엔드'} 역량 기반 로드맵 생성 중...</p>
             </div>
           </div>
        </div>
      )}

      {/* --- Step 3: Result (Roadmap) --- */}
      {step === 'result' && (
        <div className="h-screen flex flex-col">
          {/* Top Bar */}
          <header className="bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                 <GraduationCap className="text-[#c3002f]" /> 
                 AI 추천 로드맵
              </h1>
              <div className="flex gap-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                  이수학점: {PARSED_COURSES.reduce((acc, cur) => acc + cur.credits, 0)}학점
                </span>
                <span className="bg-red-50 text-[#c3002f] px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                  졸업까지: +24학점 필요
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-slate-300 rounded-sm"></span>
                  <span className="text-slate-500">기이수</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#c3002f] rounded-sm"></span>
                  <span className="font-bold text-[#c3002f]">AI 추천</span>
               </div>
            </div>
          </header>

          {/* Flow Area */}
          <div className="flex-1 bg-slate-50 relative">
             <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
             >
                <Background gap={20} size={1} />
                <Controls />
                <MiniMap nodeColor={(n) => {
                   return n.data.status === 'recommended' ? '#c3002f' : '#cbd5e1';
                }} />
             </ReactFlow>

             {/* Recommendation Panel Overlay */}
             <div className="absolute top-4 right-4 w-80 bg-white/90 backdrop-blur border border-slate-200 p-5 rounded-xl shadow-lg z-10">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#c3002f]" />
                  이번 학기 추천 전략
                </h3>
                <ul className="space-y-3">
                   <li className="text-sm text-slate-600 border-l-2 border-[#c3002f] pl-3">
                      <strong className="block text-slate-800">전공 필수 우선</strong>
                      &rsquo;알고리즘&rsquo;, &rsquo;운영체제&rsquo;는 4학년 캡스톤 이전에 반드시 수강해야 합니다.
                   </li>
                   <li className="text-sm text-slate-600 border-l-2 border-slate-300 pl-3">
                      <strong className="block text-slate-800">프론트엔드 역량 강화</strong>
                      &rsquo;HCI개론&rsquo;을 통해 UX 이론을, &rsquo;모바일프로그래밍&rsquo;으로 클라이언트 확장을 추천합니다.
                   </li>
                </ul>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}