"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AdminLogin = ({ 
    password, 
    setPassword, 
    handleLogin 
}: { 
    password: string; 
    setPassword: (v: string) => void; 
    handleLogin: () => void; 
}) => (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] px-6">
        <div className="p-10 bg-white rounded-md shadow-sm border border-slate-100 w-full max-w-sm text-center">
            <h1 className="text-2xl font-black mb-8 text-slate-900">관리자 전용</h1>
            <Input 
                type="password" 
                placeholder="접속 비밀번호" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="mb-4 h-14 rounded-2xl border-slate-100 bg-slate-50 text-center focus-visible:border-blue-500 focus-visible:ring-0"
            />
            <Button onClick={handleLogin} className="w-full h-14 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-colors">
                접속하기
            </Button>
        </div>
    </div>
);

export const AdminHeader = ({ count, onDownload }: { count: number; onDownload: () => void }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">신청자 관리 시스템</h1>
            <p className="text-slate-400 font-medium mt-1">전체 <span className="text-blue-600 font-bold">{count}</span>명 접수됨</p>
        </div>
        <Button onClick={onDownload} className="w-full md:w-auto h-14 px-8 rounded-2xl bg-[#1D6F42] hover:bg-[#155231] text-white font-black shadow-lg shadow-green-100 transition-all active:scale-95">
            Excel 명단 다운로드
        </Button>
    </div>
);

export const AdminPagination = ({ 
    current, 
    total, 
    onPageChange 
}: { 
    current: number; 
    total: number; 
    onPageChange: (p: number) => void 
}) => (
    <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center items-center gap-1">
        <Button disabled={current === 1} onClick={() => onPageChange(current - 1)} variant="ghost">이전</Button>
        {[...Array(total)].map((_, i) => (
            <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${current === i + 1 ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-100"}`}
            >
                {i + 1}
            </button>
        ))}
        <Button disabled={current === total} onClick={() => onPageChange(current + 1)} variant="ghost">다음</Button>
    </div>
);