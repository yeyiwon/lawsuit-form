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
          <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
