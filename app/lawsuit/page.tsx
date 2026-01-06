import { Metadata } from "next";
import LawsuitForm from "@/src/components/form/lawsuit-form";

export const metadata: Metadata = {
    title: "소송 신청하기 | 쿠팡 개인정보 유출 단체소송",
    description: "1분 만에 끝나는 간편 신청. 쿠팡 개인정보 유출 피해 위자료 청구 소송에 지금 참여하세요.",
    };

export default function Lawsuit() {
    return <LawsuitForm />;
}