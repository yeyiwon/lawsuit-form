"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import { AdminLogin, AdminHeader, AdminPagination } from "./admin-components";

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
    contract_confirm: string;
}

export default function AdminDashboard() {
    const [data, setData] = useState<Application[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setData(data as Application[]);
    };

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            fetchData();
        } else {
            toast.error("비밀번호가 틀렸습니다.");
        }
    };

    const downloadExcel = () => {
        const excelData = data.map(item => ({
            "접수일시": new Date(item.created_at).toLocaleString('ko-KR'),
            "성명": item.name,
            "국적": item.nationality === 'native' ? '내국인' : '외국인',
            "생년월일/등록번호": item.birth,
            "연락처": item.phone,
            "이메일": item.email,
            "유출문자수신": item.has_leak_notice === 'yes' ? '예' : '아니오',
            "해당기간가입": item.is_member_during_period === 'yes' ? '예' : '아니오',
            "미성년여부": item.has_guardian === 'yes' ? '예' : '아니오',
            "법정대리인성명": item.guardian_name || "-",
            "법정대리인연락처": item.guardian_phone || "-",
            "법정대리인관계": item.guardian_relation || "-",
            "주소": `${item.address} ${item.address_detail}`,
            "위임계약확인": item.contract_confirm || "-"
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "신청자명단");
        const fileName = `쿠팡소송_명단_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(workbook, fileName, { compression: true, bookType: 'xlsx' });
        
        toast.success("엑셀 다운로드 완료");
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (!isLoggedIn) return <AdminLogin password={password} setPassword={setPassword} handleLogin={handleLogin} />;

    return (
        <div className="p-4 md:p-8 max-w-[1800px] mx-auto min-h-screen bg-white">
            <AdminHeader count={data.length} onDownload={downloadExcel} />

            <div className="rounded-[30px] border border-slate-100 overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1600px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">접수일시</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">신청인(본인) 정보</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">자격체크</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50/30">법정대리인 정보</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">송달 주소</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">계약 확인</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-6 py-5 text-[12px] text-slate-500 whitespace-nowrap">
                                        {new Date(item.created_at).toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="mb-2"><span className="text-slate-400 text-[10px] font-bold mr-2">[성명]</span><span className="text-[14px] font-bold text-slate-900">{item.name} ({item.nationality === 'native' ? '내국인' : '외국인'})</span></div>
                                        <div className="mb-1"><span className="text-slate-400 text-[10px] font-bold mr-2">[연락처]</span><span className="text-[12px] text-slate-600 font-medium">{item.phone}</span></div>
                                        <div><span className="text-slate-400 text-[10px] font-bold mr-2">[생년/이메일]</span><span className="text-[11px] text-slate-500">{item.birth} / {item.email}</span></div>
                                    </td>
                                    <td className="px-4 py-5 text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <span className={`w-[75px] py-1 rounded-full text-[10px] font-black border ${item.has_leak_notice === 'yes' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>유출확인</span>
                                            <span className={`w-[75px] py-1 rounded-full text-[10px] font-black border ${item.is_member_during_period === 'yes' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>기간가입</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-blue-50/10 min-w-[150px]">
                                        {item.has_guardian === 'yes' ? (
                                            <div className="space-y-1.5">
                                                <div><span className="text-blue-400 text-[10px] font-bold mr-2">[성명/관계]</span><span className="text-[13px] font-bold text-blue-700">{item.guardian_name} ({item.guardian_relation})</span></div>
                                                <div><span className="text-blue-400 text-[10px] font-bold mr-2">[연락처]</span><span className="text-[12px] text-slate-600 font-medium">{item.guardian_phone}</span></div>
                                            </div>
                                        ) : (
                                            <span className="text-slate-200 text-xs">- 해당없음 -</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-[13px] text-slate-500 max-w-[350px]">
                                        <div className="mb-1 text-slate-700 leading-snug">{item.address}</div>
                                        <div className="text-slate-900 font-bold">{item.address_detail}</div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black border ${item.privacy_agree === 'agree' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                                정보동의
                                            </span>
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${item.contract_confirm === '동의합니다' ? "text-blue-600 bg-blue-50" : "text-slate-400 bg-slate-50"}`}>
                                                {item.contract_confirm === '동의합니다' ? "계약완료" : "미완료"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <AdminPagination 
                    current={currentPage} 
                    total={totalPages} 
                    onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }} 
                />
            </div>
        </div>
    );
}