import { Metadata, Viewport } from "next";
import NotFoundView from "@/src/components/common/not-found";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | 법률사무소 심주엽",
  description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return <NotFoundView />;
}