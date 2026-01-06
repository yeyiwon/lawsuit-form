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
import { 
    Search, Users, ShieldAlert, RotateCcw, User, ShieldCheck, 
    MapPin, Calendar, Clock, CheckCircle2, XCircle, Download,
    ChevronLeft, ChevronRight, Lock
} from "lucide-react";

import { Application } from "./admin-types"; 

/** 1. 로그인 컴포넌트 **/
export const AdminLogin = ({ 
    email, setEmail, password, setPassword, handleLogin 
}: { 
    email: string; setEmail: (v: string) => void;
    password: string; setPassword: (v: string) => void; 
    handleLogin: () => void; 
}) => (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] px-6">
        <div className="p-10 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 w-full max-w-md text-center">
            <div className="mb-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
                    <Lock className="text-white w-4 h-4" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">관리자용</h1>
                <p className="text-slate-400 text-sm mt-2 font-medium">관리자 계정으로 로그인이 필요합니다.</p>
            </div>
            
            <div className="space-y-4">
                <Input 
                    type="email" placeholder="이메일 주소" value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="h-14 rounded-2xl border-none bg-slate-50 px-6 font-bold text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white transition-all"
                />
                <Input 
                    type="password" placeholder="비밀번호" value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleLogin()}
                    className="h-14 rounded-2xl border-none bg-slate-50 px-6 font-bold text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white transition-all"
                />
            </div>
            
            <Button 
                onClick={handleLogin} 
                className="cursor-pointer w-full h-15 bg-slate-900 hover:bg-blue-600 text-white font-black text-lg rounded-2xl mt-8 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
            >
                로그인하기
            </Button>
        </div>
    </div>
);

/** 2. 헤더 컴포넌트 **/
export const AdminHeader = ({ 
    count, filteredCount, onDownload 
}: { 
    count: number; filteredCount: number;
    onDownload: (format: 'xlsx' | 'csv') => void 
}) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 px-1">
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">신청자 관리</h1>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold ml-4.5">
                <span className="text-slate-400">전체 <b className="text-slate-600 ml-1">{count.toLocaleString()}</b></span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-blue-500">검색결과 <b className="text-blue-600 ml-1">{filteredCount.toLocaleString()}</b></span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
                onClick={() => onDownload('xlsx')} 
                className="cursor-pointer flex-1 md:flex-none h-13 px-6 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[13px] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
                <Download size={16} className="text-green-500" /> Excel
            </button>
            <button 
                onClick={() => onDownload('csv')} 
                className="cursor-pointer flex-1 md:flex-none h-13 px-6 rounded-xl bg-slate-900 text-white font-bold text-[13px] shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
                <Download size={16} /> CSV
            </button>
        </div>
    </div>
);

// 3. 필터 컴포넌트 **/

export const AdminFilter = ({
    searchTerm, setSearchTerm, filterGuardian, setFilterGuardian, filterLeak, setFilterLeak, setCurrentPage, onReset
}: {
    searchTerm: string; setSearchTerm: (v: string) => void;
    filterGuardian: string; setFilterGuardian: (v: string) => void;
    filterLeak: string; setFilterLeak: (v: string) => void;
    setCurrentPage: (p: number) => void; onReset: () => void;
}) => (

    <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-[2] min-w-[240px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                <Input 
                    placeholder="성함 또는 연락처 검색..." 
                    value={searchTerm} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                        setSearchTerm(e.target.value); 
                        setCurrentPage(1); 
                    }}
                    className="h-11 w-full rounded-xl border-none bg-slate-50 pl-10 pr-4 font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium placeholder:text-[13px] focus-visible:ring-2 focus-visible:ring-blue-500/10 focus-visible:bg-white transition-all outline-none"
                />
</div>

                <div className="flex flex-1 items-center gap-2 min-w-fit">
                    <div className="relative flex-1">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 z-10 pointer-events-none" />
                        <Select value={filterGuardian} onValueChange={(v: string) => { setFilterGuardian(v); setCurrentPage(1); }}>
                            <SelectTrigger className="h-11 w-full rounded-xl border-none bg-slate-50 pl-8 pr-2 text-xs font-bold text-slate-600 focus:ring-0">
                                <SelectValue placeholder="연령" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl font-bold">
                                <SelectItem value="all">전체 연령</SelectItem>
                                <SelectItem value="yes">미성년자</SelectItem>
                                <SelectItem value="no">성인</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 z-10 pointer-events-none" />
                        <Select value={filterLeak} onValueChange={(v: string) => { setFilterLeak(v); setCurrentPage(1); }}>
                            <SelectTrigger className="h-11 w-full rounded-xl border-none bg-slate-50 pl-8 pr-2 text-xs font-bold text-slate-600 focus:ring-0">
                                <SelectValue placeholder="유출" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl font-bold">
                                <SelectItem value="all">전체 여부</SelectItem>
                                <SelectItem value="yes">유출 확인</SelectItem>
                                <SelectItem value="no">정상</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <button 
                    type="button"
                    onClick={onReset}
                    className="h-11 flex-grow sm:flex-none sm:w-11 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shrink-0"
                >
                    <RotateCcw className="h-4 w-4" />
                </button>
            </div>
        </div>

);

/** 4. 테이블 컴포넌트 **/
export const AdminTable = ({ currentItems }: { currentItems: Application[] }) => (
    <div className="w-full bg-white border-y border-slate-200">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-6 py-4"><div className="flex items-center gap-2"><User size={14} /> 신청인 정보</div></th>
                        <th className="px-4 py-4 text-center"><div className="flex items-center justify-center gap-2"><ShieldCheck size={14} /> 자격/동의</div></th>
                        <th className="px-6 py-4 bg-blue-50/30 text-blue-600 border-x border-slate-100">법정대리인 상세</th>
                        <th className="px-6 py-4"><div className="flex items-center gap-2"><MapPin size={14} /> 송달 주소지</div></th>
                        <th className="px-4 py-4 text-center">진행 상태</th>
                        <th className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><Clock size={14} /> 접수일시</div></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {currentItems.length > 0 ? currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                            <td className="px-6 py-5">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-black text-slate-900 leading-none">{item.name}</span>
                                        <span className="text-[12px] text-slate-500 font-bold">{item.phone}</span>
                                    </div>
                                    <div className="flex flex-col text-[11px] text-slate-400 font-bold">
                                        <span>생년월일 : {item.birth}</span>
                                        <span className="truncate max-w-[180px]">이메일 : {item.email}</span>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-5 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex gap-1">
                                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black border ${item.has_leak_notice === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-300 border-slate-200'}`}>유출확인</span>
                                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black border ${item.is_member_during_period === 'yes' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-300 border-slate-200'}`}>가입기간</span>
                                    </div>
                                    <div className={`text-[10px] font-black flex items-center gap-1 ${item.privacy_agree === 'agree' ? "text-blue-500" : "text-slate-300"}`}>
                                        {item.privacy_agree === 'agree' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                        개인정보동의완료
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-5 bg-blue-50/10 border-x border-slate-50">
                                {item.has_guardian === 'yes' ? (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 font-black text-[13px] text-blue-900">
                                            {item.guardian_name}
                                            <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase">관계: {item.guardian_relation}</span>
                                        </div>
                                        <div className="text-[11px] text-blue-700/60 font-bold leading-none space-y-0.5">
                                            <p>생년월일 : {item.guardian_birth}</p>
                                            <p>연락처 : {item.guardian_phone}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-300 text-[11px] font-bold tracking-tight">해당 없음</div>
                                )}
                            </td>

                            <td className="px-6 py-5 max-w-[300px]">
                                <div className="space-y-0.5">
                                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">송달지</div>
                                    <div className="text-slate-500 text-[12px] font-medium truncate">{item.address}</div>
                                    <div className="text-slate-900 text-[13px] font-black truncate tracking-tight">{item.address_detail}</div>
                                </div>
                            </td>

                            <td className="px-4 py-5 text-center">
                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black border ${
                                    item.contract_confirm === '동의합니다' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
                                }`}>
                                    {item.contract_confirm === '동의합니다' ? "동의완료" : "미동의"}
                                </span>
                            </td>

                            <td className="px-6 py-5 text-right">
                                <div className="flex flex-col items-end gap-1">
                                    <div className="text-[12px] font-black text-slate-700 flex items-center gap-1.5">
                                        <Calendar size={12} className="text-slate-300" />
                                        {new Date(item.created_at).toLocaleDateString('ko-KR')}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold">
                                        {new Date(item.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={6} className="py-32 text-center text-slate-300 font-black text-lg">데이터가 존재하지 않습니다.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

/** 5. 페이지네이션 컴포넌트 **/
export const AdminPagination = ({ 
    current, total, onPageChange 
}: { 
    current: number; total: number; onPageChange: (p: number) => void 
}) => (
    <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
        <button 
            disabled={current === 1} onClick={() => onPageChange(current - 1)} 
            className="cursor-pointer flex items-center gap-1 px-4 py-2 font-black text-[11px] text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
        >
            <ChevronLeft size={16} /> PREV
        </button>
        
        <div className="flex items-center gap-1.5">
            {[...Array(total)].map((_, i) => (
                <button
                    key={i} onClick={() => onPageChange(i + 1)}
                    className={`cursor-pointer w-9 h-9 rounded-lg text-[13px] font-black transition-all ${
                        current === i + 1 
                        ? "bg-slate-900 text-white shadow-lg scale-110" 
                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>

        <button 
            disabled={current === total} onClick={() => onPageChange(current + 1)} 
            className="cursor-pointer flex items-center gap-1 px-4 py-2 font-black text-[11px] text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
        >
            NEXT <ChevronRight size={16} />
        </button>
    </div>
);