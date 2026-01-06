import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

export const metadata: Metadata = {
  title: "쿠팡 개인정보 유출 단체소송 신청센터 | 법률사무소 심주엽",
  description: "3,370만 명의 쿠팡 개인정보 유출 피해자를 위한 단체소송 접수처입니다. 착수금 0원, 온라인으로 1분 만에 간편하게 위자료 청구 소송에 참여하세요.",
  keywords: ["쿠팡", "개인정보유출", "단체소송", "집단소송", "쿠팡소송", "위자료청구", "심주엽변호사"],
  // metadataBase: new URL("https://domain.com"), 
  openGraph: {
    title: "쿠팡 개인정보 유출 단체소송 법률사무소 심주엽에서 지금 바로 신청하세요",
    description: "내 정보 유출 확인하고 정당한 보상을 받으세요. (온라인 접수 중)",
    siteName: "쿠팡 단체소송 센터",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/og-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "쿠팡 개인정보 유출 단체소송 안내",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
          {children}
          <Toaster 
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
              style: {
                background: '#121212', 
                color: '#fff',          
                padding: '16px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#3b82f6', 
                  secondary: '#fff',
                },
              },
            }}
          />
      </body>
    </html>
  );
}