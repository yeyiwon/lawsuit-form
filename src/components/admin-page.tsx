"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
import { parse } from "json2csv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface Application {
    id: string;
    created_at: string;
    has_leak_notice: string;
    is_member_during_period: string;
    name: string;
    phone: string;
    nationality: string;
    birth: string;
    email: string;
    has_guardian: string;
    guardian_name?: string;
    guardian_phone?: string;
    guardian_birth?: string;
    guardian_relation?: string;
    address: string;
    address_detail: string;
    privacy_agree: string;
}

export default function AdminDashboard() {
    const [data, setData] = useState<Application[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const ADMIN_PASSWORD = "sim1004"; 

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setData(data as Application[]);
        } else {
            toast.error("데이터를 불러오지 못했습니다.");
        }
    };

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            fetchData();
            toast.success("관리자 인증 성공!");
        } else {
            toast.error("비밀번호가 틀렸습니다.");
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "전체명단");
        XLSX.writeFile(workbook, `쿠팡소송_명단_${new Date().toISOString().slice(0,10)}.xlsx`);
        toast.success("엑셀 다운로드 완료");
    };

    const downloadCSV = () => {
        try {
            const csv = parse(data);
            const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `쿠팡소송_명단_${new Date().toISOString().slice(0,10)}.csv`);
            link.click();
            toast.success("CSV 다운로드 완료");
        } catch (err) {
            toast.error("CSV 생성 실패");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
                <div className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 w-full max-w-sm text-center">
                    <h1 className="text-2xl font-black mb-8">관리자 전용</h1>
                    <Input 
                        type="password" 
                        placeholder="접속 비밀번호" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        className="mb-4 h-14 rounded-2xl border-slate-100 bg-slate-50 text-center focus-visible:border-blue-500 focus-visible:ring-0"
                    />
                    <Button onClick={handleLogin} className="w-full h-14 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-colors cursor-pointer">
                        접속하기
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-[1800px] mx-auto min-h-screen bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">신청자 관리 시스템</h1>
                    <p className="text-slate-400 font-medium mt-1">전체 <span className="text-blue-600 font-bold">{data.length}</span>명 접수됨</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button onClick={downloadCSV} variant="outline" className="h-12 px-6 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 flex-1 md:flex-none">
                        CSV 다운로드
                    </Button>
                    <Button onClick={downloadExcel} className="h-12 px-6 rounded-xl bg-[#1D6F42] hover:bg-[#155231] text-white font-bold shadow-lg shadow-green-100 flex-1 md:flex-none">
                        Excel 다운로드
                    </Button>
                </div>
            </div>

            <div className="rounded-[30px] border border-slate-100 overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1600px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">접수일시</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">신청인(본인) 정보</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">자격체크</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50/30">법정대리인(부모) 정보</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">송달 주소</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">개인정보 동의</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-6 py-5 text-[12px] text-slate-500 whitespace-nowrap">
                                        {new Date(item.created_at).toLocaleString('ko-KR')}
                                    </td>
                                    {/* 신청인 본인 정보 상세 라벨 */}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="mb-2"><span className="text-slate-400 text-[10px] font-bold mr-2">[성명]</span><span className="text-[14px] font-bold text-slate-900">{item.name} ({item.nationality === 'native' ? '내국인' : '외국인'})</span></div>
                                        <div className="mb-1"><span className="text-slate-400 text-[10px] font-bold mr-2">[연락처]</span><span className="text-[12px] text-slate-600 font-medium">{item.phone}</span></div>
                                        <div><span className="text-slate-400 text-[10px] font-bold mr-2">[주민번호앞/이메일]</span><span className="text-[11px] text-slate-500">{item.birth} / {item.email}</span></div>
                                    </td>
                                    <td className="px-4 py-5 text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <span className={`w-[75px] py-1 rounded-full text-[10px] font-black border ${item.has_leak_notice === 'yes' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>유출확인</span>
                                            <span className={`w-[75px] py-1 rounded-full text-[10px] font-black border ${item.is_member_during_period === 'yes' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>기간가입</span>
                                        </div>
                                    </td>
                                    {/* 부모 정보 상세 라벨 */}
                                    <td className="px-6 py-5 bg-blue-50/10 min-w-[150px]">
                                        {item.has_guardian === 'yes' ? (
                                            <div className="space-y-1.5">
                                                <div><span className="text-blue-400 text-[10px] font-bold mr-2">[성명/관계]</span><span className="text-[13px] font-bold text-blue-700">{item.guardian_name} ({item.guardian_relation})</span></div>
                                                <div><span className="text-blue-400 text-[10px] font-bold mr-2">[연락처]</span><span className="text-[12px] text-slate-600 font-medium">{item.guardian_phone}</span></div>
                                                <div><span className="text-blue-400 text-[10px] font-bold mr-2">[주민번호앞]</span><span className="text-[11px] text-slate-500">{item.guardian_birth}</span></div>
                                            </div>
                                        ) : (
                                            <span className="text-slate-200 text-xs">- 해당없음 -</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-[13px] text-slate-500 max-w-[350px]">
                                        <div className="mb-1"><span className="text-slate-400 text-[10px] font-bold mr-2">[기본주소]</span><span className="font-medium text-slate-700">{item.address}</span></div>
                                        <div><span className="text-slate-400 text-[10px] font-bold mr-2">[상세주소]</span><span className="text-slate-900 font-bold">{item.address_detail}</span></div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black border ${item.privacy_agree === 'agree' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                            {item.privacy_agree === 'agree' ? "동의완료" : "미동의"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center items-center gap-1">
                    <Button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0, 0);}} variant="ghost" className="text-slate-400">이전</Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 0); }}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="ghost" className="text-slate-400">다음</Button>
                </div>
            </div>
        </div>
    );
}