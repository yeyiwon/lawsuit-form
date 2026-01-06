"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

import { Application } from "./admin-types"; 

export const AdminLogin = ({ 
    email,
    setEmail,
    password, 
    setPassword, 
    handleLogin 
}: { 
    email: string;
    setEmail: (v: string) => void;
    password: string; 
    setPassword: (v: string) => void; 
    handleLogin: () => void; 
}) => (
    <div className="flex items-center justify-center min-h-screen bg-[#F1F5F9] px-6">
        <div className="p-12 bg-white rounded-[40px] shadow-2xl shadow-slate-300/50 border border-white w-full max-w-md text-center">
            <div className="mb-10">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black tracking-widest uppercase mb-4">
                    Secure Access
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">관리자 로그인</h1>
                <p className="text-slate-400 text-sm mt-2 font-medium">대시보드 접속을 위해 인증이 필요합니다.</p>
            </div>
            
            <div className="space-y-3">
                <Input 
                    type="email" 
                    placeholder="관리자 이메일" 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="h-15 py-7 rounded-[22px] border-none bg-slate-50 px-6 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white font-bold text-slate-700 transition-all"
                />
                <Input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleLogin()}
                    className="h-15 py-7 rounded-[22px] border-none bg-slate-50 px-6 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white font-bold text-slate-700 transition-all"
                />
            </div>
            
            <Button 
                onClick={handleLogin} 
                className="cursor-pointer w-full h-16 bg-slate-900 hover:bg-blue-600 text-white font-black text-lg rounded-[22px] mt-8 transition-all active:scale-[0.98] shadow-xl shadow-slate-200"
            >
                인증 및 접속하기
            </Button>
        </div>
    </div>
);

export const AdminHeader = ({ 
    count, 
    filteredCount,
    onDownload 
}: { 
    count: number; 
    filteredCount: number;
    onDownload: (format: 'xlsx' | 'csv') => void 
}) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tightest flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full inline-block" />
                신청자 명단
            </h1>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm ml-5">
                <span>Total {count.toLocaleString()}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-blue-600">Filtered {filteredCount.toLocaleString()}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
                onClick={() => onDownload('xlsx')} 
                className="cursor-pointer flex-1 md:flex-none h-14 px-8 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Excel
            </button>
            <button 
                onClick={() => onDownload('csv')} 
                className="cursor-pointer flex-1 md:flex-none h-14 px-8 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
            >
                CSV
            </button>
        </div>
    </div>
);

export const AdminFilter = ({
    searchTerm,
    setSearchTerm,
    filterGuardian,
    setFilterGuardian,
    filterLeak,
    setFilterLeak,
    setCurrentPage,
    onReset
}: {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    filterGuardian: string;
    setFilterGuardian: (v: string) => void;
    filterLeak: string;
    setFilterLeak: (v: string) => void;
    setCurrentPage: (p: number) => void;
    onReset: () => void;
}) => (
    <div className="bg-white p-2 rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 mt-6">
        <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full md:w-auto">
                <Input 
                    placeholder="성함 또는 연락처로 검색..." 
                    value={searchTerm} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="h-14 w-full rounded-[22px] border-none bg-slate-50 px-6 font-bold text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:bg-white transition-all"
                />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                <Select value={filterGuardian} onValueChange={(v: string) => { setFilterGuardian(v); setCurrentPage(1); }}>
                    <SelectTrigger className="cursor-pointer h-14 w-full md:w-[180px] rounded-[22px] border-none bg-slate-50 px-6 font-bold text-slate-600 focus:ring-0 focus:bg-slate-100 transition-colors">
                        <SelectValue placeholder="미성년 여부" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                        <SelectItem value="all" className="font-bold rounded-xl focus:bg-slate-100 py-3 cursor-pointer">전체 연령</SelectItem>
                        <SelectItem value="yes" className="font-bold rounded-xl focus:bg-blue-50 text-blue-600 py-3 cursor-pointer">미성년자</SelectItem>
                        <SelectItem value="no" className="font-bold rounded-xl focus:bg-slate-100 py-3 cursor-pointer">성인</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterLeak} onValueChange={(v: string) => { setFilterLeak(v); setCurrentPage(1); }}>
                    <SelectTrigger className="cursor-pointer h-14 w-full md:w-[180px] rounded-[22px] border-none bg-slate-50 px-6 font-bold text-slate-600 focus:ring-0 focus:bg-slate-100 transition-colors">
                        <SelectValue placeholder="유출 여부" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                        <SelectItem value="all" className="font-bold rounded-xl focus:bg-slate-100 py-3 cursor-pointer">전체 유출</SelectItem>
                        <SelectItem value="yes" className="font-bold rounded-xl focus:bg-blue-50 text-blue-600 py-3 cursor-pointer">유출확인</SelectItem>
                        <SelectItem value="no" className="font-bold rounded-xl focus:bg-slate-100 py-3 cursor-pointer">미확인</SelectItem>
                    </SelectContent>
                </Select>

                <button 
                    onClick={onReset}
                    className="cursor-pointer h-14 w-full md:w-[60px] flex items-center justify-center bg-slate-900 text-white rounded-[22px] hover:bg-blue-600 transition-all active:scale-95"
                    title="필터 초기화"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

/* 4. 테이블 컴포넌트 */
export const AdminTable = ({ currentItems }: { currentItems: Application[] }) => (
    <div className="overflow-x-auto">
        <style jsx global>{`
            .overflow-x-auto::-webkit-scrollbar { height: 8px; }
            .overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
            .overflow-x-auto::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            .overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        `}</style>
        <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">신청인 정보</th>
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">자격체크</th>
                    <th className="px-8 py-6 text-[11px] font-black text-blue-500 uppercase tracking-widest bg-blue-50/30">법정대리인 정보</th>
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">송달 주소</th>
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">상태</th>
                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">접수일시</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {currentItems.length > 0 ? currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6 whitespace-nowrap">
                            <div className="mb-1.5 font-black text-slate-900 text-[15px]">{item.name}</div>
                            <div className="text-[12px] text-slate-600 font-bold">{item.phone}</div>
                            <div className="text-[11px] text-slate-400">{item.birth} · {item.email}</div>
                        </td>
                        <td className="px-4 py-6 text-center">
                            <div className="flex flex-col gap-1 items-center">
                                <span className={`w-[75px] py-1 rounded-lg text-[10px] font-black border ${item.has_leak_notice === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-200 border-slate-100'}`}>유출확인</span>
                                <span className={`w-[75px] py-1 rounded-lg text-[10px] font-black border ${item.is_member_during_period === 'yes' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-200 border-slate-100'}`}>기간가입</span>
                            </div>
                        </td>
                        <td className="px-8 py-6 bg-blue-50/5 min-w-[150px]">
                            {item.has_guardian === 'yes' ? (
                                <div className="space-y-1">
                                    <div className="text-[13px] font-black text-blue-700">{item.guardian_name} <span className="text-[10px] text-blue-300">({item.guardian_relation})</span></div>
                                    <div className="text-[12px] text-slate-500 font-bold">{item.guardian_birth}</div>
                                    <div className="text-[12px] text-slate-500 font-bold">{item.guardian_phone}</div>
                                </div>
                            ) : (
                                <span className="text-slate-200 text-[10px] font-black tracking-widest italic text-center block">N/A</span>
                            )}
                        </td>
                        <td className="px-8 py-6 text-[13px] max-w-[350px]">
                            <div className="text-slate-500 truncate">{item.address}</div>
                            <div className="text-slate-900 font-black truncate">{item.address_detail}</div>
                        </td>
                        <td className="px-8 py-6 text-center">
                            <div className="flex flex-col gap-1.5 items-center">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${item.privacy_agree === 'agree' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>동의함</span>
                                <span className={`text-[11px] font-black px-2.5 py-1 rounded-md ${item.contract_confirm === '동의합니다' ? "text-blue-600 bg-blue-50" : "text-slate-300 bg-slate-50"}`}>
                                    {item.contract_confirm === '동의합니다' ? "계약완료" : "미완료"}
                                </span>
                            </div>
                        </td>
                        <td className="px-8 py-6 text-[12px] text-slate-500 font-medium whitespace-nowrap">
                            {new Date(item.created_at).toLocaleString('ko-KR')}
                        </td>
                    </tr>
                )) : (
                    <tr><td colSpan={6} className="py-24 text-center text-slate-300 font-bold tracking-tighter">데이터가 없습니다.</td></tr>
                )}
            </tbody>
        </table>
    </div>
);

/* 5. 페이지네이션 컴포넌트 */
export const AdminPagination = ({ 
    current, 
    total, 
    onPageChange 
}: { 
    current: number; 
    total: number; 
    onPageChange: (p: number) => void 
}) => (
    <div className="p-8 bg-white border-t border-slate-50 flex justify-between items-center">
        <button 
            disabled={current === 1} 
            onClick={() => onPageChange(current - 1)} 
            className="cursor-pointer px-5 py-2.5 font-black text-[12px] text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
        >
            PREV
        </button>
        
        <div className="flex items-center gap-2">
            {[...Array(total)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`cursor-pointer w-10 h-10 rounded-xl text-[13px] font-black transition-all ${
                        current === i + 1 
                        ? "bg-slate-800 text-white shadow-lg shadow-blue-200 scale-110" 
                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>

        <button 
            disabled={current === total} 
            onClick={() => onPageChange(current + 1)} 
            className="cursor-pointer px-5 py-2.5 font-black text-[12px] text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
        >
            NEXT
        </button>
    </div>
);