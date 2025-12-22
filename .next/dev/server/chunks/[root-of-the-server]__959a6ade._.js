module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        // 1. 클라이언트에서 보낸 ID/PW 받기
        const { id, password } = await request.json();
        if (!id || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: '학번과 비밀번호를 입력해주세요.'
            }, {
                status: 400
            });
        }
        // 2. 세종대 포털로 보낼 데이터 준비 (Python 코드의 data={...} 부분)
        const formData = new URLSearchParams();
        formData.append('mainLogin', 'Y');
        formData.append('rtUrl', 'blackboard.sejong.ac.kr');
        formData.append('id', id);
        formData.append('password', password);
        // 3. 실제 세종대 서버로 요청 전송 (Python의 requests.post 번역)
        const sejongResponse = await fetch('https://portal.sejong.ac.kr/jsp/login/login_action.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': 'https://portal.sejong.ac.kr',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: formData
        });
        // 4. 응답 처리 및 성공 여부 확인
        const setCookieHeader = sejongResponse.headers.get('set-cookie') || '';
        const responseText = await sejongResponse.text();
        // Python 코드: 'ssotoken' in response.headers.get('Set-Cookie', '')
        const isLoginSuccess = setCookieHeader.includes('ssotoken');
        if (isLoginSuccess) {
            // --- 로그인 성공 ---
            // (선택사항) 학교 서버가 준 쿠키를 파싱해서 내 브라우저에 심고 싶다면 여기서 처리
            // 여기서는 간단히 성공 메시지만 보냅니다.
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: '로그인 성공',
                user: {
                    id: id
                } // 필요하면 이름 등 추가 정보 파싱 필요
            }, {
                status: 200
            });
        } else {
            // --- 로그인 실패 (에러 원인 분석) ---
            // Python 코드의 _get_response_result 함수 로직 (Regex)
            // var result = '...'; 형태를 찾습니다.
            const match = responseText.match(/var result = '(.*)';/);
            const errorCode = match ? match[1] : null;
            let errorMessage = '로그인에 실패했습니다.';
            // Python 코드의 에러 메시지 매핑 참고
            if (errorCode === 'erridpwd' || errorCode === 'Error') {
                errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.';
            } else if (errorCode === 'pwsNeedChg') {
                errorMessage = '비밀번호 변경이 필요하여 계정이 잠겼습니다.';
            } else if (errorCode === 'invalid') {
                errorMessage = '제한된 아이디입니다.';
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: errorMessage,
                code: errorCode
            }, {
                status: 401
            });
        }
    } catch (error) {
        console.error('Login Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: '서버 내부 오류가 발생했습니다.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__959a6ade._.js.map