import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span className="text-xs font-bold text-slate-600 tracking-tight uppercase">
            착수금 0원 · 온라인 접수 가능
        </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.15] tracking-tighter">
        <span className="text-blue-600">쿠팡</span> 개인정보 유출 <br />
        피해자 집단소송
        </h1>

        <div className="max-w-2xl mx-auto mt-8 mb-10">
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            "내 정보가 범죄에 이용될 수 있습니다."
        </p>
        <p className="text-base md:text-lg text-slate-500 mt-2 leading-relaxed break-keep">
            전 국민의 70%에 달하는 3,370만 건 유출 사태. <br className="hidden md:block" />
            법률사무소 심에서 여러분의 정당한 위자료 청구를 대리합니다.
        </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button asChild className="h-16 px-12 text-lg font-extrabold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg transition-all hover:-translate-y-1">
            <Link href="/lawsuit">지금 소송 참여하기</Link>
            {/* 여기에 링크 추가 */}
        </Button>
        {/* <Button variant="outline" asChild className="h-16 px-8 text-lg font-bold rounded-xl border-slate-200">
            <Link href="#timeline">사건 경과 보기</Link>
        </Button> */}
        </div>

        <p className="mt-8 text-sm text-slate-400">
        현재 <span className="text-blue-600 font-semibold underline underline-offset-4">12,450명</span>이 소송 참여를 신청했습니다.
        </p>
    </section>
    );
}