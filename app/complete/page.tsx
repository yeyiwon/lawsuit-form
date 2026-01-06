import { Metadata } from "next";
import CompleteContent from "@/src/components/common/complete-content";

export const metadata: Metadata = {
    title: "신청 완료 | 쿠팡 개인정보 유출 단체소송",
    description: "쿠팡 개인정보 유출 단체소송 신청이 정상적으로 완료되었습니다.",
};

export default function Page() {
    return <CompleteContent />;
}