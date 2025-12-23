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
import { 
  getAllRemainingRecommendations, 
  PREREQUISITES, 
  type SemesterRecommendation 
} from '../../../src/data/semesterCourses';

// --- 1. Custom Node Components ---
const SubjectNode = ({ data }: { data: any }) => {
  const isCompleted = data.status === 'completed';
  const isRecommended = data.status === 'recommended';
  const hasPrereqConnection = data.hasPrereqConnection;

  return (
    <div className={`w-[180px] rounded-lg shadow-md border-2 transition-all hover:scale-105 ${
      isCompleted 
        ? 'bg-slate-50 border-slate-300 opacity-90' 
        : isRecommended 
          ? 'bg-white border-[#c3002f] ring-4 ring-red-50 shadow-lg shadow-red-100' 
          : 'bg-white border-slate-200'
    }`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        className={`!w-3 !h-3 ${hasPrereqConnection ? '!bg-blue-500' : '!bg-slate-400'}`} 
      />
      
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
          {isCompleted ? (
            <span className="text-slate-500">이수 완료</span>
          ) : (
            <span className="text-[#c3002f] font-bold">🔥 {data.gradeLabel || 'AI 추천'}</span>
          )}
        </p>
        {isRecommended && data.reason && (
          <div className="mt-2 text-[10px] bg-red-50 text-[#c3002f] p-1 rounded border border-red-100">
            &ldquo;{data.reason}&rdquo;
          </div>
        )}
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className={`!w-3 !h-3 ${hasPrereqConnection ? '!bg-blue-500' : '!bg-[#c3002f]'}`} 
      />
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

function generateInsights(
  allRecommendations: SemesterRecommendation[], 
  careerTitle: string
): Insights {
  // 모든 추천 과목 평탄화
  const allCourses = allRecommendations.flatMap(r => r.courses);
  const requiredCourses = allCourses.filter(c => c.type === '전필');
  const electiveCourses = allCourses.filter(c => c.type === '전선');
  
  const missingNames = requiredCourses.slice(0, 5).map(c => c.name).join(', ') || '없음';
  const remainingSemesters = allRecommendations.length;
  
  return {
    missing: missingNames,
    missingDescription: requiredCourses.length > 0 
      ? `앞으로 ${remainingSemesters}개 학기 동안 ${requiredCourses.length}개의 전공필수 과목을 이수해야 합니다.`
      : '전공필수 과목은 모두 이수하셨습니다. 전공선택 과목으로 역량을 강화하세요.',
    strategy: `${careerTitle} 직무 경쟁력`,
    strategyDescription: electiveCourses.length > 0
      ? `총 ${electiveCourses.length}개의 전공선택 과목으로 실무 역량을 강화합니다.`
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

  // 현재 학기 정보 파싱
  const currentSemesterInfo = useMemo(() => {
    if (!studentInfo?.semester) {
      return { year: 2025, semNum: 1 };
    }
    const [year, sem] = studentInfo.semester.split('-').map(Number);
    return { year: year || 2025, semNum: sem || 1 };
  }, [studentInfo?.semester]);

  // 기이수 과목명 목록
  const completedCourseNames = useMemo(() => 
    completedCourses.map(c => c.name),
    [completedCourses]
  );

  // 기이수 과목 학기 정보 목록 (추가!)
  const completedCourseSemesters = useMemo(() => 
    completedCourses.map(c => c.semester).filter((s): s is string => !!s),
    [completedCourses]
  );

  // 남은 학기 전체 추천 과목 생성 (학기 정보도 전달!)
  const allRecommendations = useMemo(() => {
    if (!studentInfo) return [];
    return getAllRemainingRecommendations(
      studentInfo.department,
      studentInfo.grade,
      currentSemesterInfo.semNum,
      currentSemesterInfo.year,
      completedCourseNames,
      completedCourseSemesters  // 학기 정보 추가!
    );
  }, [studentInfo, currentSemesterInfo, completedCourseNames, completedCourseSemesters]);

  // 모든 추천 과목 평탄화 (엑셀 다운로드용)
  const allRecommendedCourses = useMemo(() => 
    allRecommendations.flatMap(r => r.courses),
    [allRecommendations]
  );

  // Insights 생성
  const insights = useMemo(() => 
    generateInsights(allRecommendations, selectedCareer?.title || '선택한 진로'),
    [allRecommendations, selectedCareer?.title]
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
      recommendedCourses: allRecommendedCourses,
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

  // 추천 과목에 ID 부여
  const recommendedCoursesForGraph = useMemo(() => {
    let idx = 0;
    return allRecommendations.flatMap(semRec => 
      semRec.courses.map(course => ({
        id: `r-${idx++}`,
        name: course.name,
        type: course.type,
        credits: course.credits,
        semester: course.semester,
        reason: course.reason,
        grade: semRec.grade,
        semesterNum: semRec.semesterNum,
      }))
    );
  }, [allRecommendations]);

  const generateGraph = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    const X_GAP = 280;
    const Y_GAP = 160;  // 세로 간격 늘림
    const START_X = 50;
    
    // 학기 목록 추출
    const completedSemesters = [...new Set(completedCoursesForGraph.map(c => c.semester))];
    const recommendedSemesters = [...new Set(recommendedCoursesForGraph.map(c => c.semester))];
    const allSemesters = [...new Set([...completedSemesters, ...recommendedSemesters])]
      .filter(s => s !== '기타')
      .sort((a, b) => {
        const [yearA, semA] = a.split('-').map(Number);
        const [yearB, semB] = b.split('-').map(Number);
        if (yearA !== yearB) return yearA - yearB;
        return semA - semB;
      });
    
    // 모든 과목
    const allCoursesFlat = [
      ...completedCoursesForGraph, 
      ...recommendedCoursesForGraph
    ];
    const courseNameToId: Record<string, string> = {};
    allCoursesFlat.forEach(c => {
      courseNameToId[c.name] = c.id;
    });

    // 선이수 연결이 있는 과목 ID 집합
    const hasPrereqConnectionIds = new Set<string>();
    allCoursesFlat.forEach(course => {
      const prereqs = PREREQUISITES[course.name];
      if (prereqs && prereqs.length > 0) {
        prereqs.forEach(prereqName => {
          const prereqId = courseNameToId[prereqName];
          if (prereqId) {
            hasPrereqConnectionIds.add(course.id);
            hasPrereqConnectionIds.add(prereqId);
          }
        });
      }
    });

    // 학기별 학년 정보 매핑
    const semesterToGrade: Record<string, number> = {};
    recommendedCoursesForGraph.forEach(c => {
      semesterToGrade[c.semester] = c.grade;
    });

    // 학기별 노드 생성
    allSemesters.forEach((sem, colIndex) => {
      const xPos = START_X + colIndex * X_GAP;
      const isRecommendedSemester = recommendedSemesters.includes(sem);
      const gradeInfo = semesterToGrade[sem];
      
      // 학기 헤더 (학년 정보 포함)
      const headerLabel = gradeInfo 
        ? `${sem} (${gradeInfo}학년)` 
        : sem;
      
      newNodes.push({
        id: `header-${sem}`,
        type: 'default',
        data: { label: headerLabel },
        position: { x: xPos, y: -60 },
        style: { 
          width: 200, 
          fontWeight: 'bold', 
          border: 'none', 
          background: 'transparent',
          fontSize: '16px', 
          color: isRecommendedSemester ? '#c3002f' : '#64748b'
        },
        draggable: false,
        selectable: false,
      });

      const completed = completedCoursesForGraph.filter(c => c.semester === sem);
      const recommended = recommendedCoursesForGraph.filter(c => c.semester === sem);
      const allCourses = [...completed, ...recommended];

      allCourses.forEach((course, idx) => {
        const isRec = 'reason' in course;
        const hasConnection = hasPrereqConnectionIds.has(course.id);
        const gradeLabel = isRec && 'grade' in course 
          ? `${(course as any).grade}학년 추천` 
          : undefined;
        
        newNodes.push({
          id: course.id,
          type: 'subject',
          data: { 
            label: course.name, 
            type: course.type, 
            credits: course.credits, 
            status: isRec ? 'recommended' : 'completed',
            reason: isRec ? (course as any).reason : undefined,
            hasPrereqConnection: hasConnection,
            gradeLabel,
          },
          position: { x: xPos, y: idx * Y_GAP },
        });
      });
    });

    // 선이수 관계 엣지 생성
    allCoursesFlat.forEach(course => {
      const prereqs = PREREQUISITES[course.name];
      if (prereqs && prereqs.length > 0) {
        prereqs.forEach(prereqName => {
          const prereqId = courseNameToId[prereqName];
          if (prereqId) {
            const isRecommended = 'reason' in course;
            newEdges.push({
              id: `prereq-${prereqId}-${course.id}`,
              source: prereqId,
              target: course.id,
              type: 'smoothstep',
              animated: isRecommended,
              style: { 
                stroke: isRecommended ? '#c3002f' : '#3b82f6',
                strokeWidth: 3,
                strokeDasharray: isRecommended ? '0' : '8 4',
              },
            });
          }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [completedCoursesForGraph, recommendedCoursesForGraph, setNodes, setEdges]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateGraph();
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [generateGraph]);

  // 총 이수 학점 계산
  const totalCredits = completedCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalRecommendedCredits = allRecommendedCourses.reduce((sum, c) => sum + c.credits, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-16 h-16 text-[#c3002f] animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          데이터를 불러오는 중...
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
          <p className="animate-pulse delay-200 text-slate-400">
            졸업까지 {allRecommendations.length}개 학기 로드맵 구성 중...
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
              커리어 로드맵
            </h1>
            <p className="text-xs text-slate-500">
              목표: <span className="font-bold text-[#c3002f]">{selectedCareer?.title || '미선택'}</span>
              <span className="mx-2">|</span>
              이수: <span className="font-bold text-slate-700">{completedCourses.length}과목 ({totalCredits}학점)</span>
              <span className="mx-2">|</span>
              추천: <span className="font-bold text-[#c3002f]">{allRecommendedCourses.length}과목 ({totalRecommendedCredits}학점)</span>
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
          minZoom={0.2}
          maxZoom={1.5}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <Background color="#e2e8f0" gap={24} size={1} />
          <Controls showInteractive={false} />
          <MiniMap 
            nodeColor={(n) => n.data?.status === 'recommended' ? '#c3002f' : '#cbd5e1'} 
            maskColor="rgba(241, 245, 249, 0.7)"
            className="!bg-white !border-slate-200 !shadow-lg !rounded-lg"
          />
        </ReactFlow>

        {/* Floating Legend */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-lg z-10 flex flex-col gap-3">
          <p className="text-xs font-bold text-slate-700 border-b pb-2">범례</p>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-4 h-4 bg-slate-100 border-2 border-slate-400 rounded"></span>
            기이수 (수강 완료)
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#c3002f]">
            <span className="w-4 h-4 bg-white border-2 border-[#c3002f] ring-2 ring-red-100 rounded"></span>
            AI 추천 (수강 필요)
          </div>
          <div className="border-t pt-3 mt-1 space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <svg width="32" height="8">
                <line x1="0" y1="4" x2="32" y2="4" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8 4"/>
              </svg>
              <span>선이수 관계</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#c3002f]">
              <svg width="32" height="8">
                <line x1="0" y1="4" x2="32" y2="4" stroke="#c3002f" strokeWidth="3"/>
              </svg>
              <span>추천 연결</span>
            </div>
          </div>
          <div className="border-t pt-3 mt-1 text-xs text-slate-500">
            <p>📅 총 {allRecommendations.length}개 학기 로드맵</p>
          </div>
        </div>

        {/* Recommendation Insight Panel */}
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
                <p className="text-xs text-slate-400 font-bold mb-1">📚 남은 학기</p>
                <p className="text-sm text-slate-700 leading-snug">
                  <strong className="text-[#c3002f]">{allRecommendations.length}개 학기</strong> 동안{' '}
                  <strong>{allRecommendedCourses.length}개 과목</strong>({totalRecommendedCredits}학점) 추천
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">⚠️ 전공 필수 미이수</p>
                <p className="text-sm text-slate-700 leading-snug">
                  <strong className="text-[#c3002f]">{insights.missing}</strong>
                </p>
                <p className="text-xs text-slate-500 mt-1">{insights.missingDescription}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">🎯 {insights.strategy}</p>
                <p className="text-sm text-slate-700 leading-snug">
                  {insights.strategyDescription}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course List Modal */}
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