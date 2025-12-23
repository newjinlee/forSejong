// ===================================
// 학과별 직업 데이터 (하드코딩)
// competencies는 API에서 받아옴
// ===================================

export type CareerInput = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

// ===================================
// 컴퓨터공학과 (10개, 인기순)
// ===================================
export const COMPUTER_SCIENCE_CAREERS: CareerInput[] = [
  { id: 'ai-engineer', title: '인공지능 엔지니어', description: '머신러닝/딥러닝 모델 개발 및 AI 서비스 구축', tags: ['Python', 'PyTorch', 'TensorFlow'] },
  { id: 'backend', title: '백엔드 개발자', description: '대용량 트래픽 처리 및 서버 아키텍처 설계', tags: ['Java', 'Spring', 'AWS'] },
  { id: 'cloud-engineer', title: '클라우드 컴퓨팅 엔지니어', description: '클라우드 인프라 설계 및 DevOps 파이프라인 구축', tags: ['AWS', 'Kubernetes', 'Terraform'] },
  { id: 'data-analyst', title: '빅데이터 분석가', description: '대규모 데이터 분석 및 비즈니스 인사이트 도출', tags: ['Python', 'SQL', 'Spark'] },
  { id: 'security-engineer', title: '정보보안 엔지니어', description: '시스템 보안 설계 및 침해사고 대응', tags: ['Linux', 'Python', 'Network'] },
  { id: 'software-developer', title: '소프트웨어 개발자', description: '애플리케이션 설계, 개발, 테스트 및 유지보수', tags: ['Java', 'Python', 'Git'] },
  { id: 'frontend', title: '프론트엔드 개발자', description: '웹/앱 사용자 인터페이스 구현 및 UX 최적화', tags: ['React', 'TypeScript', 'Next.js'] },
  { id: 'system-engineer', title: '시스템 엔지니어', description: 'IT 인프라 설계, 구축 및 운영 관리', tags: ['Linux', 'Docker', 'Shell'] },
  { id: 'dba', title: '데이터베이스 관리자', description: 'DB 설계, 최적화 및 데이터 무결성 관리', tags: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { id: 'network-engineer', title: '네트워크 설계 엔지니어', description: '네트워크 아키텍처 설계 및 최적화', tags: ['Cisco', 'TCP/IP', 'VPN'] },
];

// ===================================
// 전자정보통신공학과 (10개, 인기순)
// ===================================
export const ELECTRONIC_COMM_CAREERS: CareerInput[] = [
  { id: 'ai-electronic-engineer', title: 'AI 융합 전자공학 엔지니어', description: 'AI 기술을 활용한 전자 시스템 설계 및 개발', tags: ['Python', 'Verilog', 'FPGA'] },
  { id: 'semiconductor-design', title: '반도체 설계 엔지니어', description: 'IC/SoC 설계 및 검증', tags: ['Verilog', 'VHDL', 'Cadence'] },
  { id: 'mobile-network-engineer', title: '이동통신 네트워크 엔지니어', description: '5G/6G 네트워크 설계 및 최적화', tags: ['5G/LTE', 'RF설계', 'Python'] },
  { id: 'embedded-engineer', title: '임베디드 시스템 엔지니어', description: '펌웨어 및 임베디드 소프트웨어 개발', tags: ['C/C++', 'RTOS', 'ARM'] },
  { id: 'semiconductor-process', title: '반도체 공정 엔지니어', description: '반도체 제조 공정 개발 및 최적화', tags: ['공정설계', 'SPC', 'Python'] },
  { id: 'comm-system-engineer', title: '통신 시스템 엔지니어', description: '유무선 통신 시스템 설계 및 구현', tags: ['MATLAB', 'C++', 'DSP'] },
  { id: 'circuit-design-engineer', title: '전자회로 설계 엔지니어', description: '아날로그/디지털 회로 설계 및 검증', tags: ['OrCAD', 'SPICE', 'PCB'] },
  { id: 'research-institute', title: '전자·정보통신 연구소 연구원', description: '차세대 통신/전자 기술 연구개발', tags: ['논문작성', 'MATLAB', 'Python'] },
  { id: 'tech-startup-founder', title: '기술 기반 스타트업 창업가', description: '기술 혁신 기반 스타트업 창업 및 운영', tags: ['비즈니스', '기술기획', '투자유치'] },
  { id: 'public-tech-officer', title: '전자·통신 분야 공공기관 기술직', description: '공공기관 IT/통신 인프라 관리 및 정책 수립', tags: ['정책분석', '기술표준', '프로젝트관리'] },
];

// ===================================
// 반도체시스템공학과 (10개, 인기순)
// ===================================
export const SEMICONDUCTOR_CAREERS: CareerInput[] = [
  { id: 'digital-circuit-design', title: '시스템 반도체 디지털 회로 설계 엔지니어', description: 'SoC/ASIC 디지털 회로 설계 및 검증', tags: ['Verilog', 'SystemVerilog', 'Synopsys'] },
  { id: 'foundry-process', title: '반도체 파운드리 공정 엔지니어', description: '첨단 파운드리 공정 개발 및 양산', tags: ['공정개발', 'SPC', 'Python'] },
  { id: 'analog-circuit-design', title: '아날로그 반도체 회로 설계 엔지니어', description: '아날로그/Mixed-Signal IC 설계', tags: ['Cadence', 'SPICE', 'Schematic'] },
  { id: 'foundry-process-dev', title: '반도체 파운드리 공정 개발 엔지니어', description: '차세대 공정 기술 연구개발', tags: ['TCAD', 'DOE', '공정시뮬레이션'] },
  { id: 'equipment-engineer', title: '반도체 제조 장비 엔지니어', description: '반도체 장비 운영 및 유지보수', tags: ['장비운용', 'PLC', '설비관리'] },
  { id: 'equipment-dev-engineer', title: '반도체 장비 개발 엔지니어', description: '신규 반도체 장비 설계 및 개발', tags: ['CAD', 'PLC', 'Python'] },
  { id: 'test-engineer', title: '반도체 테스트 엔지니어', description: '반도체 칩 테스트 및 품질 검증', tags: ['ATE', 'TestProgramming', 'LabVIEW'] },
  { id: 'power-semiconductor', title: '전력 반도체 개발 엔지니어', description: '전력 반도체 소자 설계 및 개발', tags: ['MOSFET', 'IGBT', 'SiC/GaN'] },
  { id: 'semiconductor-researcher', title: '반도체 연구소 연구원', description: '차세대 반도체 기술 연구개발', tags: ['논문작성', 'TCAD', 'Python'] },
  { id: 'semiconductor-startup', title: '반도체 기술 창업가', description: '반도체 기술 기반 스타트업 창업', tags: ['비즈니스', '기술기획', '투자유치'] },
];

// ===================================
// 정보보호학과 (10개, 인기순)
// ===================================
export const SECURITY_CAREERS: CareerInput[] = [
  { id: 'security-engineer', title: '정보보안 엔지니어', description: '기업 정보 자산 보호 및 보안 시스템 구축', tags: ['Linux', 'SIEM', 'Firewall'] },
  { id: 'cyber-security-analyst', title: '사이버 보안 분석가', description: '보안 위협 탐지 및 분석, 대응 전략 수립', tags: ['SIEM', 'Splunk', 'Python'] },
  { id: 'incident-response', title: '침해사고 대응 전문가', description: '보안 침해사고 조사 및 복구', tags: ['Forensic', 'Malware분석', 'Linux'] },
  { id: 'security-developer', title: '보안 소프트웨어 개발자', description: '보안 솔루션 및 도구 개발', tags: ['C/C++', 'Python', 'Cryptography'] },
  { id: 'network-security', title: '네트워크 보안 엔지니어', description: '네트워크 보안 아키텍처 설계 및 운영', tags: ['Firewall', 'VPN', 'IDS/IPS'] },
  { id: 'finance-security', title: '금융·보험 정보보호 담당자', description: '금융권 정보보호 정책 수립 및 감사', tags: ['ISMS', 'ISO27001', '컴플라이언스'] },
  { id: 'infra-security', title: '인프라 보안 관리자', description: 'IT 인프라 보안 정책 수립 및 관리', tags: ['Linux', 'AWS Security', 'IAM'] },
  { id: 'gov-security', title: '국방·국가기관 보안 기술직', description: '국가 사이버 보안 정책 및 방어체계 구축', tags: ['정보보안', '정책분석', '암호학'] },
  { id: 'security-researcher', title: '정보보호 연구소 연구원', description: '차세대 보안 기술 연구개발', tags: ['논문작성', 'Python', '취약점분석'] },
  { id: 'privacy-consultant', title: '개인정보보호 컨설턴트', description: '개인정보 보호 정책 컨설팅 및 컴플라이언스', tags: ['GDPR', 'PIMS', '개인정보보호법'] },
];

// ===================================
// 소프트웨어학과/콘텐츠소프트웨어학과 (10개, 인기순)
// ===================================
export const SOFTWARE_CAREERS: CareerInput[] = [
  { id: 'ai-engineer-sw', title: '인공지능 엔지니어', description: 'AI 모델 개발 및 ML 파이프라인 구축', tags: ['Python', 'PyTorch', 'MLOps'] },
  { id: 'sw-developer', title: '소프트웨어 개발자', description: '애플리케이션 설계, 개발, 유지보수', tags: ['Java', 'Python', 'Git'] },
  { id: 'data-analyst-sw', title: '빅데이터 분석가', description: '대규모 데이터 수집, 분석, 시각화', tags: ['Python', 'SQL', 'Tableau'] },
  { id: 'sw-security', title: '소프트웨어 보안 전문가', description: '애플리케이션 보안 취약점 분석 및 대응', tags: ['OWASP', 'Secure Coding', 'Burp Suite'] },
  { id: 'cloud-service-engineer', title: '클라우드 서비스 엔지니어', description: '클라우드 기반 서비스 설계 및 운영', tags: ['AWS', 'GCP', 'Docker'] },
  { id: 'it-consultant', title: 'IT 컨설턴트', description: 'IT 전략 수립 및 디지털 전환 컨설팅', tags: ['분석', '전략기획', 'PPT'] },
  { id: 'dba-sw', title: '데이터베이스 관리자', description: 'DB 설계, 성능 최적화, 백업/복구', tags: ['MySQL', 'Oracle', 'Redis'] },
  { id: 'system-admin', title: '시스템 관리자', description: '서버 및 인프라 운영 관리', tags: ['Linux', 'Shell', 'Monitoring'] },
  { id: 'sw-educator', title: '소프트웨어 교육자', description: 'SW 교육 콘텐츠 개발 및 강의', tags: ['교수법', 'Python', '커리큘럼설계'] },
  { id: 'sw-startup-founder', title: '소프트웨어 기술 창업가', description: 'SW 기술 기반 스타트업 창업', tags: ['비즈니스', '기술기획', '투자유치'] },
];

// ===================================
// 데이터사이언스학과/인공지능학과 (10개, 인기순)
// ===================================
export const DATA_AI_CAREERS: CareerInput[] = [
  { id: 'ai-engineer-ds', title: '인공지능 엔지니어', description: 'AI 모델 설계, 학습, 배포', tags: ['Python', 'PyTorch', 'TensorFlow'] },
  { id: 'data-scientist', title: '데이터 사이언티스트', description: '데이터 기반 문제 해결 및 예측 모델 개발', tags: ['Python', 'R', 'Statistics'] },
  { id: 'ml-engineer', title: '머신러닝 엔지니어', description: 'ML 파이프라인 구축 및 모델 서빙', tags: ['Python', 'MLflow', 'Kubernetes'] },
  { id: 'data-analyst-ds', title: '빅데이터 분석가', description: '대규모 데이터 분석 및 인사이트 도출', tags: ['Python', 'SQL', 'Spark'] },
  { id: 'ai-researcher', title: 'AI 연구소 연구원', description: '최신 AI 기술 연구개발', tags: ['논문작성', 'PyTorch', 'Math'] },
  { id: 'finance-ai', title: '금융 AI 분석 전문가', description: '금융 데이터 분석 및 AI 모델 개발', tags: ['Python', 'Quant', 'Time-Series'] },
  { id: 'healthcare-data', title: '헬스케어 데이터 분석 전문가', description: '의료 데이터 분석 및 AI 진단 모델 개발', tags: ['Python', 'Medical-AI', 'HIPAA'] },
  { id: 'manufacturing-ai', title: '제조 AI 공정 엔지니어', description: 'AI 기반 스마트팩토리 공정 최적화', tags: ['Python', 'IIoT', 'PLC'] },
  { id: 'public-data-analyst', title: '공공기관 데이터 분석 전문가', description: '공공 데이터 분석 및 정책 지원', tags: ['Python', 'SQL', '공공데이터'] },
  { id: 'ai-data-startup', title: 'AI·데이터 기술 스타트업 창업가', description: 'AI/데이터 기술 스타트업 창업', tags: ['비즈니스', 'AI', '투자유치'] },
];

// ===================================
// 지능기전공학부 무인이동체공학전공 (10개, 인기순)
// ===================================
export const UNMANNED_VEHICLE_CAREERS: CareerInput[] = [
  { id: 'autonomous-robot', title: '자율주행 로봇 엔지니어', description: '자율주행 로봇 개발 및 제어 시스템 구축', tags: ['ROS', 'Python', 'SLAM'] },
  { id: 'drone-engineer', title: '무인항공기(드론) 시스템 엔지니어', description: '드론 시스템 설계 및 비행 제어', tags: ['Ardupilot', 'C++', 'PX4'] },
  { id: 'autonomous-control', title: '자율이동체 제어 엔지니어', description: '자율이동체 제어 알고리즘 개발', tags: ['MATLAB', 'C++', 'Control Theory'] },
  { id: 'intelligent-robotics', title: '지능형 로보틱스 개발자', description: 'AI 기반 지능형 로봇 개발', tags: ['ROS', 'PyTorch', 'Computer Vision'] },
  { id: 'autonomous-sw', title: '자율지능시스템 소프트웨어 엔지니어', description: '자율시스템 소프트웨어 개발', tags: ['C++', 'ROS2', 'Python'] },
  { id: 'digital-twin', title: '디지털트윈 시스템 개발자', description: '물리적 시스템의 디지털 복제 모델 개발', tags: ['Unity', 'Python', 'IoT'] },
  { id: 'autonomous-twin', title: '자율트윈 시스템 엔지니어', description: '자율시스템과 디지털트윈 연동 개발', tags: ['ROS', 'Unity', 'Python'] },
  { id: 'smart-sensor', title: '스마트 센서 개발자', description: '지능형 센서 시스템 개발', tags: ['Embedded', 'C', 'Signal Processing'] },
  { id: 'radar-engineer', title: '차세대 레이더 시스템 엔지니어', description: '레이더 시스템 설계 및 신호처리', tags: ['MATLAB', 'DSP', 'RF설계'] },
  { id: 'unmanned-researcher', title: '무인이동체 연구소 연구원', description: '차세대 무인이동체 기술 연구', tags: ['논문작성', 'ROS', 'Python'] },
];

// ===================================
// 지능기전공학부 스마트기기공학전공 (10개, 인기순)
// ===================================
export const SMART_DEVICE_CAREERS: CareerInput[] = [
  { id: 'iot-developer', title: '지능형 IoT 시스템 개발자', description: 'IoT 기반 지능형 시스템 개발', tags: ['MQTT', 'Python', 'AWS IoT'] },
  { id: 'mobile-comm-engineer', title: '이동통신 시스템 엔지니어', description: '모바일 통신 시스템 설계 및 최적화', tags: ['5G/LTE', 'RF설계', 'Python'] },
  { id: 'iot-platform-engineer', title: 'IoT 플랫폼 엔지니어', description: 'IoT 플랫폼 아키텍처 설계 및 구현', tags: ['Kubernetes', 'MQTT', 'Node.js'] },
  { id: 'firmware-developer', title: '스마트기기 펌웨어 개발자', description: '스마트 디바이스 펌웨어 개발', tags: ['C/C++', 'RTOS', 'ARM'] },
  { id: 'sensing-engineer', title: '지능형 센싱 시스템 엔지니어', description: '센서 융합 기반 지능형 시스템 개발', tags: ['Sensor Fusion', 'Python', 'Edge AI'] },
  { id: 'control-system', title: '자동 제어 시스템 개발자', description: '자동화 제어 시스템 설계 및 구현', tags: ['PLC', 'MATLAB', 'C++'] },
  { id: 'modem-developer', title: '통신 모뎀 개발 엔지니어', description: '통신 모뎀 하드웨어/소프트웨어 개발', tags: ['DSP', 'C', 'Verilog'] },
  { id: 'comm-security', title: '통신 보안 전문가', description: '통신 시스템 보안 설계 및 구현', tags: ['암호화', 'Network Security', 'Python'] },
  { id: 'network-design', title: '네트워크 설계 엔지니어', description: '네트워크 아키텍처 설계 및 최적화', tags: ['Cisco', 'TCP/IP', 'SDN'] },
  { id: 'comm-standard-researcher', title: '차세대 통신 표준 연구원', description: '6G 등 차세대 통신 표준 연구', tags: ['논문작성', 'MATLAB', '표준화'] },
];

// ===================================
// 창의소프트학부 디자인이노베이션전공 (10개, 인기순)
// ===================================
export const DESIGN_INNOVATION_CAREERS: CareerInput[] = [
  { id: 'ux-designer', title: 'UX 디자이너', description: '사용자 경험 연구 및 인터페이스 설계', tags: ['Figma', 'User Research', 'Prototyping'] },
  { id: 'product-interface-designer', title: '제품 그래픽 인터페이스 디자이너', description: '디지털 제품 GUI 디자인', tags: ['Figma', 'Adobe XD', 'Illustrator'] },
  { id: 'digital-video-designer', title: '디지털 영상 디자이너', description: '모션그래픽 및 영상 콘텐츠 제작', tags: ['After Effects', 'Premiere', 'Cinema 4D'] },
  { id: 'graphic-designer', title: '그래픽 디자이너', description: '브랜딩 및 시각 디자인', tags: ['Photoshop', 'Illustrator', 'InDesign'] },
  { id: 'ad-designer', title: '광고·홍보 디자이너', description: '광고 캠페인 디자인 및 마케팅 콘텐츠 제작', tags: ['Photoshop', 'Illustrator', '마케팅'] },
  { id: 'it-device-designer', title: '전자·IT기기 디자이너', description: '전자제품 및 IT 기기 외관 디자인', tags: ['Rhino', 'KeyShot', 'SolidWorks'] },
  { id: 'package-designer', title: '패키지 디자이너', description: '제품 패키지 및 포장 디자인', tags: ['Illustrator', '구조설계', '인쇄이해'] },
  { id: 'editorial-designer', title: '편집 디자이너', description: '출판물 및 디지털 콘텐츠 편집 디자인', tags: ['InDesign', 'Illustrator', '타이포그래피'] },
  { id: 'car-designer', title: '자동차·운송기기 디자이너', description: '자동차 및 운송기기 디자인', tags: ['Alias', 'CATIA', 'Sketch'] },
  { id: 'design-researcher', title: '디자인 연구소 연구원', description: '디자인 트렌드 및 사용자 연구', tags: ['리서치', 'Figma', '논문작성'] },
];

// ===================================
// 창의소프트학부 만화애니메이션텍전공 (10개, 인기순)
// ===================================
export const ANIMATION_CAREERS: CareerInput[] = [
  { id: 'webtoon-artist', title: '웹툰 작가', description: '웹툰 스토리 기획 및 연재', tags: ['Clip Studio', 'Photoshop', '스토리텔링'] },
  { id: 'animation-director', title: '애니메이션 연출가', description: '애니메이션 연출 및 제작 총괄', tags: ['Storyboard', 'After Effects', 'Direction'] },
  { id: '3d-animator', title: '3D 애니메이터', description: '3D 캐릭터 및 오브젝트 애니메이션', tags: ['Maya', 'Blender', 'ZBrush'] },
  { id: 'character-designer', title: '캐릭터 디자이너', description: '캐릭터 콘셉트 및 디자인', tags: ['Photoshop', 'Clip Studio', '콘셉트아트'] },
  { id: 'storyboard-artist', title: '스토리보드 아티스트', description: '영상/애니메이션 스토리보드 제작', tags: ['Storyboard Pro', 'Photoshop', '연출'] },
  { id: 'ai-content-creator', title: '생성형 AI 콘텐츠 크리에이터', description: 'AI 도구 활용 콘텐츠 제작', tags: ['Midjourney', 'Stable Diffusion', 'ComfyUI'] },
  { id: 'previs-artist', title: '프리비주얼 아티스트', description: '영화/게임 프리비주얼 제작', tags: ['Maya', 'Unreal Engine', 'Motion Capture'] },
  { id: 'xr-content-director', title: 'XR 콘텐츠 디렉터', description: 'VR/AR/MR 콘텐츠 기획 및 제작', tags: ['Unity', 'Unreal', 'VR/AR'] },
  { id: 'vfx-designer', title: 'VFX 디자이너', description: '시각효과 디자인 및 합성', tags: ['Nuke', 'Houdini', 'After Effects'] },
  { id: 'animation-researcher', title: '만화·애니메이션 연구자', description: '만화/애니메이션 이론 연구', tags: ['연구', '논문작성', '비평'] },
];

// ===================================
// AI로봇학과 (10개, 인기순)
// ===================================
export const AI_ROBOT_CAREERS: CareerInput[] = [
  { id: 'ai-engineer-robot', title: '인공지능 엔지니어', description: 'AI 모델 개발 및 로봇 지능화', tags: ['Python', 'PyTorch', 'ROS'] },
  { id: 'robot-control-engineer', title: '로봇 제어 엔지니어', description: '로봇 제어 시스템 설계 및 개발', tags: ['C++', 'ROS', 'Control Theory'] },
  { id: 'autonomous-driving', title: '자율주행 시스템 엔지니어', description: '자율주행 시스템 개발', tags: ['ROS', 'Python', 'SLAM'] },
  { id: 'robotics-sw-developer', title: '로보틱스 소프트웨어 개발자', description: '로봇 소프트웨어 플랫폼 개발', tags: ['C++', 'ROS2', 'Python'] },
  { id: 'ai-algorithm-developer', title: 'AI 알고리즘 개발자', description: 'AI 알고리즘 설계 및 최적화', tags: ['Python', 'C++', 'CUDA'] },
  { id: 'smart-factory-engineer', title: '스마트팩토리 자동화 엔지니어', description: 'AI 기반 스마트팩토리 구축', tags: ['PLC', 'Python', 'IIoT'] },
  { id: 'defense-robot-engineer', title: '국방·방위산업 로봇 기술 엔지니어', description: '국방용 로봇 시스템 개발', tags: ['C++', 'ROS', 'Embedded'] },
  { id: 'industrial-robot-engineer', title: '산업용 로봇 시스템 엔지니어', description: '산업용 로봇 시스템 설계 및 통합', tags: ['로봇프로그래밍', 'PLC', 'CAD'] },
  { id: 'ai-robot-researcher', title: '인공지능·로봇 연구소 연구원', description: '차세대 AI 로봇 기술 연구', tags: ['논문작성', 'Python', 'ROS'] },
  { id: 'ai-robot-startup', title: 'AI·로봇 기술 스타트업 창업가', description: 'AI/로봇 기술 스타트업 창업', tags: ['비즈니스', 'AI', '투자유치'] },
];

// ===================================
// 지능IoT학과 (10개, 인기순)
// ===================================
export const IOT_CAREERS: CareerInput[] = [
  { id: 'iot-system-engineer', title: '지능형 IoT 시스템 엔지니어', description: 'IoT 시스템 설계 및 구축', tags: ['MQTT', 'Python', 'AWS IoT'] },
  { id: 'iot-service-developer', title: 'IoT 서비스 개발자', description: 'IoT 기반 서비스 개발', tags: ['Node.js', 'React', 'MQTT'] },
  { id: 'smart-city-engineer', title: '스마트시티 솔루션 엔지니어', description: '스마트시티 인프라 설계 및 구축', tags: ['IoT', 'GIS', 'Big Data'] },
  { id: 'industrial-iot-developer', title: '산업용 IoT 플랫폼 개발자', description: 'IIoT 플랫폼 설계 및 개발', tags: ['Kubernetes', 'Python', 'OPC-UA'] },
  { id: 'robot-iot-engineer', title: '로봇·IoT 융합 엔지니어', description: '로봇과 IoT 연동 시스템 개발', tags: ['ROS', 'MQTT', 'Python'] },
  { id: 'digital-healthcare-iot', title: '디지털 헬스케어 IoT 개발자', description: '헬스케어 IoT 시스템 개발', tags: ['BLE', 'Python', 'HIPAA'] },
  { id: 'ai-iot-analyst', title: 'AI 기반 IoT 데이터 분석가', description: 'IoT 데이터 분석 및 AI 모델 개발', tags: ['Python', 'TensorFlow', 'Spark'] },
  { id: 'public-iot-specialist', title: '국방·공공 IoT 기술 전문가', description: '국방/공공 부문 IoT 시스템 구축', tags: ['IoT', '보안', '정책'] },
  { id: 'iot-researcher', title: '지능형 IoT 연구소 연구원', description: '차세대 IoT 기술 연구', tags: ['논문작성', 'Python', 'IoT'] },
  { id: 'iot-startup', title: 'IoT 기술 스타트업 창업가', description: 'IoT 기술 스타트업 창업', tags: ['비즈니스', 'IoT', '투자유치'] },
];

// ===================================
// 학과별 매핑
// ===================================
export const DEPARTMENT_CAREERS: Record<string, CareerInput[]> = {
  '컴퓨터공학과': COMPUTER_SCIENCE_CAREERS,
  '컴퓨터공학': COMPUTER_SCIENCE_CAREERS,
  '전자정보통신공학과': ELECTRONIC_COMM_CAREERS,
  '반도체시스템공학과': SEMICONDUCTOR_CAREERS,
  '정보보호학과': SECURITY_CAREERS,
  '소프트웨어학과': SOFTWARE_CAREERS,
  '콘텐츠소프트웨어학과': SOFTWARE_CAREERS,
  '데이터사이언스학과': DATA_AI_CAREERS,
  '인공지능학과': DATA_AI_CAREERS,
  '인공지능데이터사이언스학과': DATA_AI_CAREERS,
  '지능기전공학부 무인이동체공학전공': UNMANNED_VEHICLE_CAREERS,
  '무인이동체공학전공': UNMANNED_VEHICLE_CAREERS,
  '지능기전공학부 스마트기기공학전공': SMART_DEVICE_CAREERS,
  '스마트기기공학전공': SMART_DEVICE_CAREERS,
  '창의소프트학부 디자인이노베이션전공': DESIGN_INNOVATION_CAREERS,
  '디자인이노베이션전공': DESIGN_INNOVATION_CAREERS,
  '창의소프트학부 만화애니메이션텍전공': ANIMATION_CAREERS,
  '만화애니메이션텍전공': ANIMATION_CAREERS,
  'AI로봇학과': AI_ROBOT_CAREERS,
  '지능IoT학과': IOT_CAREERS,
};

// ===================================
// 유틸리티 함수
// ===================================
export function getCareersByDepartment(department: string): CareerInput[] {
  return DEPARTMENT_CAREERS[department] || COMPUTER_SCIENCE_CAREERS;
}

export function getAllDepartments(): string[] {
  return [
    '컴퓨터공학과',
    '전자정보통신공학과',
    '반도체시스템공학과',
    '정보보호학과',
    '소프트웨어학과',
    '콘텐츠소프트웨어학과',
    '데이터사이언스학과',
    '인공지능학과',
    '인공지능데이터사이언스학과',
    '지능기전공학부 무인이동체공학전공',
    '지능기전공학부 스마트기기공학전공',
    '창의소프트학부 디자인이노베이션전공',
    '창의소프트학부 만화애니메이션텍전공',
    'AI로봇학과',
    '지능IoT학과',
  ];
}