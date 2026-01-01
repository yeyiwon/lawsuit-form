import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Smartphone, 
  Home as HomeIcon, 
  Banknote, 
  CheckCircle2, 
  ShieldAlert,
  UserX,
  Clock
} from "lucide-react";

import FadeIn from "./layout/fade-in";

export default function InfoCards() {
    const cardStyles = "border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col h-full cursor-pointer";
    return (
    <section id="infocards" className="bg-slate-50 py-24 px-4 w-full">
        <div className="max-w-6xl mx-auto">
        <FadeIn>
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tight">소송 핵심 정보</h2>
            <p className="text-slate-500 font-medium">피해 규모와 승소 가능성을 한눈에 확인하세요.</p>
        </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FadeIn delay={0.2}>
        <Card className={cardStyles}>
            <div className="bg-red-500 h-1.5 w-full" />
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-red-500 font-black">01</span> 사건 개요
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
            <div className="p-5 bg-red-50 rounded-2xl text-center border border-red-100">
                <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">총 피해 규모</p>
                <p className="text-3xl font-black text-red-600">3,370만 건</p>
            </div>
            <ul className="space-y-3">
                {[
                    { label: "유출 기간", value: "약 5개월간", icon: <Clock className="w-4 h-4" /> },
                    { label: "유출 항목", value: "이름·주소·내역 등", icon: <ShieldAlert className="w-4 h-4" /> },
                    { label: "유출 주체", value: "중국 국적 직원", icon: <UserX className="w-4 h-4" /> },
                ].map((item, i) => (
                <li key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5">
                    <span className="text-slate-500 flex items-center gap-2">{item.icon} {item.label}</span>
                    <b className="text-slate-900">{item.value}</b>
                </li>
                ))}
            </ul>
            </CardContent>
        </Card>
        </FadeIn >
        <FadeIn delay={0.4}>
        <Card className={cardStyles}>
            <div className="bg-slate-800 h-1.5 w-full" />
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-slate-800 font-black">02</span> 피해 위험성
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { icon: <AlertTriangle className="text-amber-500" />, label: "2차 공격" },
                    { icon: <Smartphone className="text-blue-500" />, label: "스미싱" },
                    { icon: <HomeIcon className="text-emerald-500" />, label: "범죄 노출" },
                    { icon: <Banknote className="text-purple-500" />, label: "정신적 고통" },
                ].map((item, i) => (
                    <div key={i} className="p-4 border border-slate-100 rounded-xl text-center bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex justify-center mb-2">{item.icon}</div>
                    <p className="text-xs font-bold text-slate-700">{item.label}</p>
                </div>
                ))}
            </div>
            <p className="text-[13px] text-slate-400 text-center leading-relaxed">
                개인정보 유출 사실만으로도<br /> 
                <span className="text-slate-600 font-semibold">정신적 손해 위자료 청구</span>가 가능합니다.
            </p>
            </CardContent>
        </Card>
        </FadeIn>
        <FadeIn delay={0.6}>
        <Card className={cardStyles}>
            <div className="bg-blue-600 h-1.5 w-full" />
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-blue-600 font-black">03</span> 승소 가능성
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                {[
                    { title: "관리 부실", desc: "5개월간 유출 인지 실패" },
                    { title: "늑장 대응", desc: "피해 예방 골든타임 상실" },
                ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-sm text-slate-600 leading-tight">
                    <b className="text-slate-900 block mb-0.5">{item.title}</b>
                    {item.desc}
                    </p>
                </div>
                ))}
            </div>
            
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">예상 위자료</span>
                <span className="font-bold text-slate-900">10~20만 원</span>
                </div>
                <div className="h-px bg-blue-100 w-full" />
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">착수금</span>
                    <span className="font-extrabold text-blue-700">0원 (전액 무료)</span>
                </div>
            </div>
            </CardContent>
        </Card>
        </FadeIn>

        </div>
    </div>
    </section>
    );
}