"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "../../lib/supabase"; 

export default function Hero() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            const { count, error } = await supabase
                .from('applications')
                .select('*', { count: 'exact', head: true });

            if (!error && count !== null) {
                setCount(count); 
            }
        };
        fetchCount();
    }, []);

    return (
        <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-600 tracking-tight uppercase">착수금 0원 · 온라인 접수 가능</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.15] tracking-tighter">
                <span className="text-blue-600">쿠팡</span> 개인정보 유출 <br />
                피해자 집단소송
            </h1>

            <div className="max-w-2xl mx-auto mt-8 mb-10">
                <p className="text-lg md:text-xl text-red-600 font-extrabold leading-relaxed">
                    &quot;내 정보가 범죄에 이용될 수 있습니다.&quot;
                </p>
                <p className="text-base md:text-lg text-slate-500 mt-2 leading-relaxed break-keep">
                    전 국민의 70%에 달하는 3,370만 건 유출 사태. <br className="hidden md:block" />
                    법무법인 심주엽이 여러분의 정당한 위자료 청구를 대리합니다.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild className="h-16 px-12 text-lg font-extrabold bg-slate-900 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all hover:-translate-y-1">
                    <Link href="/lawsuit">지금 소송 참여하기</Link>
                </Button>
            </div>

            {count !== null && (
                <div className="mt-8 flex flex-col items-center gap-2 animate-in fade-in duration-700">
                    <p className="text-sm text-slate-400">
                        현재 <span className="text-blue-600 font-bold underline underline-offset-4 text-base">
                            {count.toLocaleString()}명
                        </span>이 소송 참여를 신청했습니다.
                    </p>
                </div>
            )}
        </section>
    );
}