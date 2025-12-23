(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/store/useCareerStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCareerStore",
    ()=>useCareerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useCareerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        studentInfo: {
            name: '이유진',
            department: '컴퓨터공학과',
            grade: 3,
            semester: '2024-1'
        },
        selectedCareer: null,
        setStudentInfo: (info)=>set({
                studentInfo: info
            }),
        setSelectedCareer: (career)=>set({
                selectedCareer: career
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/roadmap/generate/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoadmapGeneratePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-client] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCareerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/useCareerStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// --- 1. Custom Node Components ---
// 커스텀 노드: 과목 카드
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubjectNode = ({ data })=>{
    const isCompleted = data.status === 'completed';
    const isRecommended = data.status === 'recommended';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-[180px] rounded-lg shadow-md border-2 transition-all hover:scale-105 ${isCompleted ? 'bg-slate-50 border-slate-300 opacity-80' : isRecommended ? 'bg-white border-[#c3002f] ring-2 ring-red-50' : 'bg-white border-slate-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Left,
                className: "!bg-slate-400"
            }, void 0, false, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-3 py-2 text-xs font-bold text-white rounded-t-[5px] flex justify-between ${isCompleted ? 'bg-slate-500' : isRecommended ? 'bg-[#c3002f]' : 'bg-slate-700'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: data.type
                    }, void 0, false, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            data.credits,
                            "학점"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-sm text-slate-800 leading-tight mb-1",
                        children: data.label
                    }, void 0, false, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-slate-500",
                        children: isCompleted ? '이수 완료' : '추천 과목'
                    }, void 0, false, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Right,
                className: "!bg-[#c3002f]"
            }, void 0, false, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/roadmap/generate/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SubjectNode;
const nodeTypes = {
    subject: SubjectNode
};
// --- 2. Mock Data based on User CSV ---
// 사용자가 업로드한 CSV 파일 내용을 바탕으로 구성
const PARSED_COURSES = [
    {
        name: 'C프로그래밍',
        type: '전필',
        credits: 3,
        semester: '1-1'
    },
    {
        name: '디지털시스템',
        type: '전필',
        credits: 3,
        semester: '1-1'
    },
    {
        name: '이산수학및프로그래밍',
        type: '전선',
        credits: 3,
        semester: '1-2'
    },
    {
        name: '고급C프로그래밍',
        type: '전선',
        credits: 3,
        semester: '1-2'
    },
    {
        name: '자료구조',
        type: '전필',
        credits: 3,
        semester: '2-1'
    },
    {
        name: '컴퓨터구조',
        type: '전필',
        credits: 3,
        semester: '2-2'
    },
    {
        name: '컴퓨터네트워크',
        type: '전필',
        credits: 3,
        semester: '2-2'
    },
    {
        name: '웹프로그래밍',
        type: '전선',
        credits: 3,
        semester: '3-1'
    },
    {
        name: '정보보호개론',
        type: '전선',
        credits: 3,
        semester: '3-1'
    },
    {
        name: 'Capstone디자인',
        type: '전필',
        credits: 3,
        semester: '3-1'
    }
];
// 프론트엔드 로드맵 추천 (남은 학기 시뮬레이션)
const RECOMMENDED_COURSES = [
    // 3-2학기 추천 (전필2 + 전선2)
    {
        id: 'rec-1',
        name: '알고리즘',
        type: '전필',
        credits: 3,
        semester: '3-2',
        reason: '코딩테스트 필수'
    },
    {
        id: 'rec-2',
        name: '운영체제',
        type: '전필',
        credits: 3,
        semester: '3-2',
        reason: 'CS 기초'
    },
    {
        id: 'rec-3',
        name: 'HCI개론',
        type: '전선',
        credits: 3,
        semester: '3-2',
        reason: 'UX/UI 이해'
    },
    {
        id: 'rec-4',
        name: '데이터베이스',
        type: '전선',
        credits: 3,
        semester: '3-2',
        reason: '백엔드 데이터 연동'
    },
    // 4-1학기 추천
    {
        id: 'rec-5',
        name: '소프트웨어공학',
        type: '전필',
        credits: 3,
        semester: '4-1',
        reason: '협업 프로세스'
    },
    {
        id: 'rec-6',
        name: '인공지능',
        type: '전필',
        credits: 3,
        semester: '4-1',
        reason: '최신 트렌드'
    },
    {
        id: 'rec-7',
        name: '모바일프로그래밍',
        type: '전선',
        credits: 3,
        semester: '4-1',
        reason: 'React Native 연계'
    },
    {
        id: 'rec-8',
        name: '멀티미디어',
        type: '전선',
        credits: 3,
        semester: '4-1',
        reason: '이미지/영상 처리'
    }
];
function RoadmapGeneratePage() {
    _s();
    const { selectedCareer, studentInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCareerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCareerStore"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('upload');
    // React Flow States
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    // --- Functions ---
    const handleFileUpload = ()=>{
        // 실제 파일 처리 로직 대신 시뮬레이션
        setStep('analyzing');
        setTimeout(()=>{
            generateGraph();
            setStep('result');
        }, 2000);
    };
    const generateGraph = ()=>{
        const newNodes = [];
        const newEdges = [];
        let xPos = 0;
        let yPos = 0;
        const X_GAP = 250; // 학기 간격
        const Y_GAP = 120; // 과목 간격
        // 1. Semester Grouping (Mock Logic)
        const semesters = [
            '1-1',
            '1-2',
            '2-1',
            '2-2',
            '3-1',
            '3-2',
            '4-1'
        ];
        semesters.forEach((sem, colIndex)=>{
            xPos = colIndex * X_GAP;
            yPos = 0;
            // Header Node (학기 표시)
            newNodes.push({
                id: `header-${sem}`,
                type: 'default',
                data: {
                    label: `${sem}학기`
                },
                position: {
                    x: xPos,
                    y: -50
                },
                style: {
                    width: 180,
                    fontWeight: 'bold',
                    border: 'none',
                    background: 'transparent'
                },
                draggable: false
            });
            // 1. 기이수 과목 배치
            const completedInSem = PARSED_COURSES.filter((c)=>c.semester === sem);
            completedInSem.forEach((course, idx)=>{
                newNodes.push({
                    id: `comp-${course.name}`,
                    type: 'subject',
                    data: {
                        label: course.name,
                        type: course.type,
                        credits: course.credits,
                        status: 'completed'
                    },
                    position: {
                        x: xPos,
                        y: yPos + idx * Y_GAP
                    }
                });
            });
            // 2. 추천 과목 배치 (3-2, 4-1 학기)
            const recommendedInSem = RECOMMENDED_COURSES.filter((c)=>c.semester === sem);
            recommendedInSem.forEach((course, idx)=>{
                // 기존 과목 아래에 배치하기 위해 offset 계산
                const offset = completedInSem.length;
                const nodeId = course.id;
                newNodes.push({
                    id: nodeId,
                    type: 'subject',
                    data: {
                        label: course.name,
                        type: course.type,
                        credits: course.credits,
                        status: 'recommended'
                    },
                    position: {
                        x: xPos,
                        y: yPos + (offset + idx) * Y_GAP
                    }
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
                        style: {
                            stroke: '#c3002f',
                            strokeWidth: 2,
                            opacity: 0.5
                        }
                    });
                }
            });
        });
        setNodes(newNodes);
        setEdges(newEdges);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex flex-col",
        children: [
            step === 'upload' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-slate-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-red-50 text-[#c3002f] rounded-full flex items-center justify-center mx-auto mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 194,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 193,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-900 mb-2",
                            children: "기이수 성적표를 업로드해주세요"
                        }, void 0, false, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 mb-8",
                            children: [
                                "학교 포털에서 다운로드 받은 엑셀(CSV) 파일을 올려주시면,",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 51
                                }, this),
                                "현재까지의 이수 현황을 분석하여 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "맞춤형 로드맵"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 35
                                }, this),
                                "을 설계합니다."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: handleFileUpload,
                            className: "border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:border-[#c3002f] hover:bg-red-50/30 transition-all group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                    className: "mx-auto h-12 w-12 text-slate-400 group-hover:text-[#c3002f] mb-4 transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-slate-700",
                                    children: "클릭하여 파일 선택 또는 여기로 드래그"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400 mt-2",
                                    children: "지원 형식: .csv, .xlsx (최대 5MB)"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 203,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 pt-6 border-t border-slate-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleFileUpload,
                                className: "text-sm text-slate-500 hover:text-[#c3002f] underline decoration-dotted",
                                children: "(데모용) ’기이수성적조회_20251223.csv’ 자동 적용하기"
                            }, void 0, false, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 218,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 217,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/roadmap/generate/page.tsx",
                    lineNumber: 192,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this),
            step === 'analyzing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-12 h-12 text-[#c3002f] animate-spin mx-auto mb-6"
                        }, void 0, false, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 233,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-900 mb-2",
                            children: "성적 데이터를 분석 중입니다..."
                        }, void 0, false, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 234,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 text-slate-500 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "animate-pulse",
                                    children: "📂 파일 파싱 중... (완료)"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "animate-pulse delay-75",
                                    children: "🔍 전공 필수 요건 대조 중... (진행 중)"
                                }, void 0, false, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "animate-pulse delay-150",
                                    children: [
                                        "🤖 ",
                                        selectedCareer?.title || '프론트엔드',
                                        " 역량 기반 로드맵 생성 중..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/roadmap/generate/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/roadmap/generate/page.tsx",
                            lineNumber: 235,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/roadmap/generate/page.tsx",
                    lineNumber: 232,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 231,
                columnNumber: 9
            }, this),
            step === 'result' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-screen flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bold text-xl text-slate-900 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                                className: "text-[#c3002f]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 18
                                            }, this),
                                            "AI 추천 로드맵"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold",
                                                children: [
                                                    "이수학점: ",
                                                    PARSED_COURSES.reduce((acc, cur)=>acc + cur.credits, 0),
                                                    "학점"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-red-50 text-[#c3002f] px-3 py-1 rounded-full text-xs font-bold border border-red-100",
                                                children: "졸업까지: +24학점 필요"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-3 h-3 bg-slate-300 rounded-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500",
                                                children: "기이수"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-3 h-3 bg-[#c3002f] rounded-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-[#c3002f]",
                                                children: "AI 추천"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-slate-50 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
                                nodes: nodes,
                                edges: edges,
                                onNodesChange: onNodesChange,
                                onEdgesChange: onEdgesChange,
                                nodeTypes: nodeTypes,
                                fitView: true,
                                attributionPosition: "bottom-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
                                        gap: 20,
                                        size: 1
                                    }, void 0, false, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {
                                        nodeColor: (n)=>{
                                            return n.data.status === 'recommended' ? '#c3002f' : '#cbd5e1';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 278,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-4 w-80 bg-white/90 backdrop-blur border border-slate-200 p-5 rounded-xl shadow-lg z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-slate-800 mb-3 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "w-4 h-4 text-[#c3002f]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this),
                                            "이번 학기 추천 전략"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "text-sm text-slate-600 border-l-2 border-[#c3002f] pl-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "block text-slate-800",
                                                        children: "전공 필수 우선"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 23
                                                    }, this),
                                                    "’알고리즘’, ’운영체제’는 4학년 캡스톤 이전에 반드시 수강해야 합니다."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 301,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "text-sm text-slate-600 border-l-2 border-slate-300 pl-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "block text-slate-800",
                                                        children: "프론트엔드 역량 강화"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 23
                                                    }, this),
                                                    "’HCI개론’을 통해 UX 이론을, ’모바일프로그래밍’으로 클라이언트 확장을 추천합니다."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/roadmap/generate/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/roadmap/generate/page.tsx",
                                lineNumber: 295,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/roadmap/generate/page.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/roadmap/generate/page.tsx",
                lineNumber: 246,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/roadmap/generate/page.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_s(RoadmapGeneratePage, "5MtjQj1jp7ixZJZIJlVY46NCMMM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$useCareerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCareerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"]
    ];
});
_c1 = RoadmapGeneratePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "SubjectNode");
__turbopack_context__.k.register(_c1, "RoadmapGeneratePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_f64f3636._.js.map