/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { downloadRoadmapAsExcel } from '../../../src/lib/downloadRoadmap';
import { getRecommendedCourses, PREREQUISITES, type RecommendedCourse } from '../../../src/data/semesterCourses';

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

// --- 2. Insights 생성 함수 ---
type Insights = {
  missing: string;
  missingDescription: string;
  strategy: string;
  strategyDescription: string;
};

function generateInsights(recommendedCourses: RecommendedCourse[], careerTitle: string): Insights {
  const requiredCourses = recommendedCourses.filter(c => c.type === '전필');
  const electiveCourses = recommendedCourses.filter(c => c.type === '전선');
  
  const missingNames = requiredCourses.map(c => c.name).join(', ') || '없음';
  
  return {
    missing: missingNames,
    missingDescription: requiredCourses.length > 0 
      ? '해당 과목 이력이 확인되지 않습니다. 졸업 및 취업을 위해 다음 학기 1순위 수강을 권장합니다.'
      : '전공필수 과목은 모두 이수하셨습니다. 전공선택 과목으로 역량을 강화하세요.',
    strategy: `${careerTitle} 직무 경쟁력`,
    strategyDescription: electiveCourses.length > 0
      ? `${electiveCourses.map(c => c.name).join(', ')} 과목을 통해 실무 역량을 강화합니다.`
      : '추천 과목을 수강하여 전공 역량을 높이세요.',
  };
}

export default function RoadmapGeneratePage() {
  const { selectedCareer, studentInfo, completedCourses } = useCareerStore();
  const [loading, setLoading] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false);
  const [showInsightPanel, setShowInsightPanel] = useState(true);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 다음 학기 계산 (1 or 2)
  const nextSemesterNum = useMemo(() => {
    if (!studentInfo?.semester) return 1;
    const [, sem] = studentInfo.semester.split('-').map(Number);
    return sem === 1 ? 2 : 1;
  }, [studentInfo?.semester]);

  // 기이수 과목명 목록
  const completedCourseNames = useMemo(() => 
    completedCourses.map(c => c.name),
    [completedCourses]
  );

  // 추천 과목 생성 (학과 + 학년 + 학기 기반)
  const recommendedCourses = useMemo(() => {
    if (!studentInfo) return [];
    return getRecommendedCourses(
      studentInfo.department,
      studentInfo.grade,
      nextSemesterNum,
      completedCourseNames
    );
  }, [studentInfo, nextSemesterNum, completedCourseNames]);

  // Insights 생성
  const insights = useMemo(() => 
    generateInsights(recommendedCourses, selectedCareer?.title || '선택한 진로'),
    [recommendedCourses, selectedCareer?.title]
  );

  // 로드맵 엑셀 다운로드 핸들러
  const handleDownloadRoadmap = () => {
    if (!studentInfo || !selectedCareer) return;

    downloadRoadmapAsExcel({
      studentName: studentInfo.name,
      studentId: studentInfo.id,
      department: studentInfo.department,
      careerTitle: selectedCareer.title,
      completedCourses,
      recommendedCourses,
      insights,
    });
  };

  // 기이수 과목을 학기별로 그룹화
  const completedCoursesForGraph = completedCourses.map((course, index) => ({
    id: `c-${index}`,
    name: course.name,
    type: course.type,
    credits: course.credits,
    semester: course.semester || '기타',
  }));

  // 가장 최근 학기 계산 (추천 과목 학기 결정용)
  const getNextSemester = (): string => {
    if (completedCourses.length === 0) return '2025-2';
    
    const semesters = completedCourses
      .map(c => c.semester)
      .filter(s => s && s.includes('-'))
      .sort();
    
    if (semesters.length === 0) return '2025-2';
    
    const latest = semesters[semesters.length - 1];
    const [year, sem] = latest.split('-').map(Number);
    
    if (sem === 1) return `${year}-2`;
    return `${year + 1}-1`;
  };

  const nextSemester = getNextSemester();

  // 추천 과목에 실제 학기 적용
  const recommendedCoursesWithSemester = recommendedCourses.map(course => ({
    ...course,
    semester: nextSemester, // 다음 학기로 통일
  }));

  const generateGraph = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    const X_GAP = 300;
    const Y_GAP = 140;
    const START_X = 50;
    
    // 기이수 과목에서 학기 목록 추출 + 추천 과목 학기 추가
    const completedSemesters = [...new Set(completedCoursesForGraph.map(c => c.semester))];
    const recommendedSemesters = [...new Set(recommendedCoursesWithSemester.map(c => c.semester))];
    const allSemesters = [...new Set([...completedSemesters, ...recommendedSemesters])]
      .filter(s => s !== '기타')
      .sort((a, b) => {
        // "2021-1", "2023-2" 형식 정렬
        const [yearA, semA] = a.split('-').map(Number);
        const [yearB, semB] = b.split('-').map(Number);
        if (yearA !== yearB) return yearA - yearB;
        return semA - semB;
      });
    
    // 모든 과목 (노드 ID → 과목명 매핑)
    const allCoursesFlat = [...completedCoursesForGraph, ...recommendedCoursesWithSemester];
    const courseNameToId: Record<string, string> = {};
    allCoursesFlat.forEach(c => {
      courseNameToId[c.name] = c.id;
    });

    allSemesters.forEach((sem, colIndex) => {
      const xPos = START_X + colIndex * X_GAP;
      const isRecommendedSemester = recommendedSemesters.includes(sem);
      
      newNodes.push({
        id: `header-${sem}`,
        type: 'default',
        data: { label: sem },
        position: { x: xPos, y: -60 },
        style: { 
          width: 180, fontWeight: 'bold', border: 'none', background: 'transparent',
          fontSize: '18px', color: isRecommendedSemester ? '#c3002f' : '#64748b'
        },
        draggable: false,
        selectable: false,
      });

      const completed = completedCoursesForGraph.filter(c => c.semester === sem);
      const recommended = recommendedCoursesWithSemester.filter(c => c.semester === sem);
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
      });
    });

    // 선이수 관계 기반 엣지 생성
    allCoursesFlat.forEach(course => {
      const prereqs = PREREQUISITES[course.name];
      if (prereqs && prereqs.length > 0) {
        prereqs.forEach(prereqName => {
          const prereqId = courseNameToId[prereqName];
          if (prereqId) {
            // 선이수 과목이 그래프에 있을 때만 연결
            const isRecommended = 'reason' in course;
            newEdges.push({
              id: `prereq-${prereqId}-${course.id}`,
              source: prereqId,
              target: course.id,
              type: 'smoothstep',
              animated: isRecommended,
              style: { 
                stroke: isRecommended ? '#c3002f' : '#94a3b8',
                strokeWidth: isRecommended ? 2 : 1.5,
                opacity: isRecommended ? 1 : 0.7,
              },
              label: isRecommended ? '' : '선이수',
              labelStyle: { fontSize: 10, fill: '#94a3b8' },
              labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
            });
          }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [completedCoursesForGraph, recommendedCoursesWithSemester, setNodes, setEdges]);

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
            onClick={() => setShowInsightPanel(!showInsightPanel)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              showInsightPanel 
                ? 'bg-red-50 text-[#c3002f] hover:bg-red-100' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle size={18} />
            분석 리포트
          </button>
          <button 
            onClick={() => setShowCourseList(!showCourseList)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
          >
            <ListChecks size={18} />
            기이수 목록
          </button>
          <button 
            onClick={handleDownloadRoadmap}
            className="px-5 py-2 bg-[#c3002f] hover:bg-[#a00026] text-white rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <GraduationCap size={18} />
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

        {/* Recommendation Insight Panel - 토글 가능 */}
        {showInsightPanel && (
          <div className="absolute top-6 right-6 w-80 bg-white/95 backdrop-blur border border-red-100 p-5 rounded-xl shadow-xl z-10 animate-in slide-in-from-right-10">
            <div className="flex items-center justify-between mb-3 border-b border-red-50 pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#c3002f]" />
                <h3 className="font-bold text-slate-900">로드맵 분석 리포트</h3>
              </div>
              <button 
                onClick={() => setShowInsightPanel(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">전공 필수 미충족 감지</p>
                <p className="text-sm text-slate-700 leading-snug">
                  <strong className="text-[#c3002f]">{insights.missing}</strong> {insights.missingDescription}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">{insights.strategy}</p>
                <p className="text-sm text-slate-700 leading-snug">
                  {insights.strategyDescription}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course List Modal - 실제 데이터 사용 */}
      {showCourseList && (
        <div className="absolute inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-30 border-l animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-5 border-b flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ListChecks className="text-[#c3002f]" /> 
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