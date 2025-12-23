import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c3002f",
};

export const metadata: Metadata = {
  // 기본 메타데이터
  title: {
    default: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천 서비스",
    template: "%s | SEJONG ROADMAP",
  },
  description:
    "세종대학교 컴퓨터공학과 학생을 위한 AI 기반 커리큘럼 추천 서비스. DAG 알고리즘과 위상정렬을 활용해 선수과목 의존성을 분석하고, 진로에 맞는 최적의 수강 로드맵을 자동으로 생성합니다.",
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
    "수강 계획",
  ],
  authors: [{ name: "SEJONG ROADMAP Team" }],
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
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, KakaoTalk 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://sejong-roadmap.vercel.app", // 실제 배포 URL로 변경
    siteName: "SEJONG ROADMAP",
    title: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천",
    description:
      "복잡한 선수과목 의존성, DAG 알고리즘으로 완벽하게 풀어냅니다. AI가 진로를 분석하고 최적의 수강 순서를 제안합니다.",
    images: [
      {
        url: "/og-image.png", // public/og-image.png 준비 필요 (1200x630 권장)
        width: 1200,
        height: 630,
        alt: "SEJONG ROADMAP - AI 기반 커리큘럼 추천 서비스",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천",
    description:
      "복잡한 선수과목 의존성, DAG 알고리즘으로 완벽하게 풀어냅니다.",
    images: ["/og-image.png"],
    creator: "@sejong_roadmap",
  },

  // 파비콘 및 아이콘
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

  // 매니페스트 (PWA)
  manifest: "/manifest.json",

  // 추가 메타 태그
  alternates: {
    canonical: "https://sejong-roadmap.vercel.app",
  },

  // 앱 관련
  applicationName: "SEJONG ROADMAP",
  category: "education",

  // 검증 (필요시 실제 값으로 교체)
  verification: {
    google: "google-site-verification-code", // Google Search Console
    // naver: "naver-site-verification-code", // 네이버 서치어드바이저
  },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SEJONG ROADMAP",
  description:
    "세종대학교 컴퓨터공학과 학생을 위한 AI 기반 커리큘럼 추천 서비스",
  url: "https://sejong-roadmap.vercel.app",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  creator: {
    "@type": "Organization",
    name: "세종대학교 컴퓨터공학과 캡스톤 Team 6",
  },
  featureList: [
    "AI 기반 진로 분석",
    "DAG 알고리즘 선수과목 시각화",
    "위상정렬 기반 최적 스케줄링",
    "React Flow 인터랙티브 로드맵",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 네이버 서치어드바이저 (필요시) */}
        {/* <meta name="naver-site-verification" content="verification-code" /> */}
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}