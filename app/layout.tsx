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
    "세종대학교 학생을 위한 AI 기반 커리큘럼 추천 서비스. 학생의 진로 목표를 분석하고 기이수 과목을 바탕으로 최적의 수강 로드맵을 자동으로 생성합니다.",
  keywords: [
    "세종대학교",
    "커리큘럼 추천",
    "수강신청",
    "로드맵",
    "AI 추천",
    "진로 설계",
    "역량 분석",
    "학점 관리",
    "수강 계획",
    "GPT",
    "React Flow",
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
    url: "https://sejong-roadmap.vercel.app",
    siteName: "SEJONG ROADMAP",
    title: "SEJONG ROADMAP | AI 기반 맞춤형 커리큘럼 추천",
    description:
      "AI가 진로를 분석하고 기이수 과목 기반으로 최적의 수강 순서를 제안합니다. React Flow로 시각화된 인터랙티브 로드맵을 경험하세요.",
    images: [
      {
        url: "/og-image.png",
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
      "AI가 진로를 분석하고 기이수 과목 기반으로 최적의 수강 순서를 제안합니다.",
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
    google: "google-site-verification-code",
  },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SEJONG ROADMAP",
  description:
    "세종대학교 학생을 위한 AI 기반 커리큘럼 추천 서비스",
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
    "AI 기반 진로 역량 분석",
    "GPT를 활용한 커스텀 진로 분석",
    "선이수 관계 시각화",
    "React Flow 인터랙티브 로드맵",
    "학기별 추천 과목 생성",
    "엑셀 로드맵 다운로드",
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
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}