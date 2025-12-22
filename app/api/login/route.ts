import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. 클라이언트에서 보낸 ID/PW 받기
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json(
        { message: '학번과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: formData,
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
      
      return NextResponse.json({ 
        message: '로그인 성공',
        user: { id: id } // 필요하면 이름 등 추가 정보 파싱 필요
      }, { status: 200 });

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

      return NextResponse.json(
        { message: errorMessage, code: errorCode },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}