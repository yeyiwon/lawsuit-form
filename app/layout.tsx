import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "쿠팡 개인정보 유출 집단소송",
  description: '"전 국민의 70%가 털렸습니다. 피해는 확대될 수 있습니다." 법률사무소 심주엽 쿠팡 개인정보 유출 사태 집단소송 참여 모집',
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
                background: '#121212', // 블랙
                color: '#fff',          // 화이트 글자
                padding: '16px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#3b82f6', // 성공 아이콘은 블루로 포인트
                  secondary: '#fff',
                },
              },
            }}
          />
      </body>
    </html>
  );
}
