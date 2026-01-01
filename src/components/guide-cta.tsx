import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GuideCTA() {
return (
    <>
        <section className="bg-white py-20 px-4 w-full">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12 text-slate-900">소송 참여 안내</h2>
            <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> 모집 대상
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                2025. 06. 24. ~ 11. 08. 기준 쿠팡 회원이었던 자<br />
                <span className="text-blue-600 font-medium">
                    (유출 안내 문자/이메일을 수신하신 분)
                </span>
            </p>
            </div>
            </div>
        </div>
        <div className="w-full mt-24 mb-12 flex flex-col items-center text-center px-4">
        <p className="text-blue-600 font-bold mb-2 tracking-widest text-sm uppercase">Settlement Cost Zero</p>
        <h2 className="text-3xl font-black text-slate-900 mb-4">
        변호사 수임료 부담 없이 <br /> 지금 바로 신청하세요
        </h2>
        <p className="text-slate-500 mb-10 max-w-md">
            본 사건은 초기 착수금 없이 진행됩니다.
        </p>
        <Button asChild className="h-16 px-12 text-lg font-extrabold bg-slate-900 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all hover:-translate-y-1">
            <Link href="/lawsuit" scroll={true}>지금 소송 참여하기</Link>
        </Button>
        </div>
        </section>
    </>
    );
}