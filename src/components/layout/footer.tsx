import { Scale } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-400 py-16">
        <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col gap-10">
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                <div className="flex items-center gap-2 mb-4">
                    <Scale className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold text-white tracking-tight">법률사무소 심주엽</span>
                </div>
                <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                    쿠팡 개인정보 유출 피해자 집단소송을 위해<br />
                    정직하고 투명하게 앞장서겠습니다.
                </p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div className="flex flex-col gap-2">
                    <p className="text-white font-semibold">Contact</p>
                    <p>02-1234-5678</p>
                    <p className="hover:text-white transition-colors">contact@lawfirm.com</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-white font-semibold">Address</p>
                    <p>서울 강남구 테헤란로 123</p>
                    <p>화음빌딩 15층</p>
                </div>
                </div>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px]">
                <div className="flex flex-wrap justify-center gap-4 opacity-70">
                <p>대표변호사 심주엽</p>
                <p>사업자등록번호 123-45-67890</p>
                </div>
                <p className="font-bold text-slate-500 tracking-[0.2em] uppercase text-center">
                            © 2026 Lawfirm Sim Jooyeop.
                        </p>
            </div>
            </div>
        </div>
        </footer>
    );
}