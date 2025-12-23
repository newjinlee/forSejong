module.exports = [
"[next]/internal/font/google/noto_sans_kr_3eeb7d6a.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "noto_sans_kr_3eeb7d6a-module__hklaGq__className",
  "variable": "noto_sans_kr_3eeb7d6a-module__hklaGq__variable",
});
}),
"[next]/internal/font/google/noto_sans_kr_3eeb7d6a.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_sans_kr_3eeb7d6a.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Noto Sans KR', 'Noto Sans KR Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_sans_kr_3eeb7d6a.js [app-rsc] (ecmascript)");
;
;
;
const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#c3002f"
};
const metadata = {
    // 기본 메타데이터
    title: {
        default: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천 서비스",
        template: "%s | SEJONG ROADMAP"
    },
    description: "세종대학교 컴퓨터공학과 학생을 위한 AI 기반 커리큘럼 추천 서비스. DAG 알고리즘과 위상정렬을 활용해 선수과목 의존성을 분석하고, 진로에 맞는 최적의 수강 로드맵을 자동으로 생성합니다.",
    keywords: [
        "세종대학교",
        "커리큘럼 추천",
        "수강신청",
        "로드맵",
        "AI 추천",
        "컴퓨터공학",
        "선수과목",
        "위상정렬",
        "DAG",
        "진로 설계",
        "학점 관리",
        "수강 계획"
    ],
    authors: [
        {
            name: "SEJONG ROADMAP Team"
        }
    ],
    creator: "세종대학교 컴퓨터공학과 캡스톤 Team 6",
    publisher: "SEJONG ROADMAP",
    // 로봇 설정
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    // Open Graph (Facebook, LinkedIn, KakaoTalk 등)
    openGraph: {
        type: "website",
        locale: "ko_KR",
        url: "https://sejong-roadmap.vercel.app",
        siteName: "SEJONG ROADMAP",
        title: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천",
        description: "복잡한 선수과목 의존성, DAG 알고리즘으로 완벽하게 풀어냅니다. AI가 진로를 분석하고 최적의 수강 순서를 제안합니다.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SEJONG ROADMAP - AI 기반 커리큘럼 추천 서비스"
            }
        ]
    },
    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천",
        description: "복잡한 선수과목 의존성, DAG 알고리즘으로 완벽하게 풀어냅니다.",
        images: [
            "/og-image.png"
        ],
        creator: "@sejong_roadmap"
    },
    // 파비콘 및 아이콘
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "any"
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml"
            }
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180"
            }
        ]
    },
    // 매니페스트 (PWA)
    manifest: "/manifest.json",
    // 추가 메타 태그
    alternates: {
        canonical: "https://sejong-roadmap.vercel.app"
    },
    // 앱 관련
    applicationName: "SEJONG ROADMAP",
    category: "education",
    // 검증 (필요시 실제 값으로 교체)
    verification: {
        google: "google-site-verification-code"
    }
};
// JSON-LD 구조화 데이터
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SEJONG ROADMAP",
    description: "세종대학교 컴퓨터공학과 학생을 위한 AI 기반 커리큘럼 추천 서비스",
    url: "https://sejong-roadmap.vercel.app",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW"
    },
    creator: {
        "@type": "Organization",
        name: "세종대학교 컴퓨터공학과 캡스톤 Team 6"
    },
    featureList: [
        "AI 기반 진로 분석",
        "DAG 알고리즘 선수과목 시각화",
        "위상정렬 기반 최적 스케줄링",
        "React Flow 인터랙티브 로드맵"
    ]
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "ko",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    type: "application/ld+json",
                    dangerouslySetInnerHTML: {
                        __html: JSON.stringify(jsonLd)
                    }
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_kr_3eeb7d6a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} font-sans antialiased`,
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6fe26784._.js.map