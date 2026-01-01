import { Scale } from "lucide-react";

export default function Footer() {
return (
    <footer className="bg-white border-t border-slate-100 py-12">
    <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
        
        <div className="flex items-center gap-2 mb-6">
            <Scale className="h-5 w-5 text-slate-400" />
            <span className="text-lg font-bold text-slate-900 tracking-tight">법률사무소</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-8">
            <p>대표변호사 심주엽</p>
            <p>사업자등록번호 123-45-67890</p>
            <p>서울특별시 강남구 테헤란로 123, 화음빌딩 15층</p>
            <p>T. 02-1234-5678</p>
            <p>E. contact@lawfirm.com</p>
        </div>

        <div className="w-full pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-xs font-medium text-slate-400">
        
            </div>
            <p className="text-xs text-slate-400">
            © 2025 법률사무소. All Rights Reserved.
            </p>
        </div>
        
        </div>
    </div>
    </footer>
);
}