"use client";
import FadeIn from "./layout/fade-in";

export default function Timeline() {
const events = [
    { date: "2025. 06. 24", title: "개인정보 무단 유출 시작", desc: "중국 국적 내부 직원이 메인 서버에 무단 접근하여 유출을 시작한 시점입니다.", color: "text-red-600", dot: "bg-red-600", side: "left" },
    { date: "2025. 06. 24 ~ 11. 08", title: "5개월간 대규모 유출 방치", desc: "약 3,370만여 개의 고객 정보 유출. 쿠팡 측은 인지하지 못했습니다.", color: "text-red-600", dot: "bg-red-600", side: "right" },
    { date: "2025. 11. 25 이전", title: "혐의자 중국 출국", desc: "유출 주도 직원이 퇴사 후 중국으로 출국하여 수사에 난항을 겪고 있습니다.", color: "text-slate-400", dot: "bg-slate-400", side: "left" },
    { date: "2025. 11. 18", title: "초기 인지 및 신고", desc: "유출 정황 포착 후 유관 기관에 신고 조치를 취했습니다.", color: "text-blue-600", dot: "bg-blue-600", side: "right" },
];

return (
    <section id="timeline" className="w-full bg-slate-100 py-20 overflow-hidden">
    <h2 className="text-center mb-20 text-3xl md:text-5xl font-black">사건 전개 타임라인</h2>
    
    <div className="relative max-w-5xl mx-auto px-6">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-12">
            {events.map((ev, i) => (
            <div key={i} className={`relative flex items-center md:justify-between ${ev.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
            
            <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <FadeIn direction="up">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 border-none shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                    <span className={`${ev.color} font-bold text-sm`}>{ev.date}</span>
                    <h3 className="text-lg font-bold mt-1 text-slate-900">{ev.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 break-keep">{ev.desc}</p>
                    </div>
                </FadeIn>
                </div>

            <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${ev.dot} ring-4 ring-white z-10`} />
            
            <div className="hidden md:block md:w-[45%]" />
            </div>
        ))}
        </div>
    </div>
    </section>
);
}