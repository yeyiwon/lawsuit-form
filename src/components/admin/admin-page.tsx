"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./useadmin-auth";
import { downloadFileData } from "./admin-utils";
import { 
    AdminLogin, AdminHeader, AdminPagination, AdminFilter, AdminTable 
} from "./admin-components";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
    const pathname = usePathname();
    const auth = useAdminAuth();
    
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [searchTerm, setSearchTerm] = useState(() => typeof window !== "undefined" ? sessionStorage.getItem("admin_searchTerm") || "" : "");
    const [filterLeak, setFilterLeak] = useState(() => typeof window !== "undefined" ? sessionStorage.getItem("admin_filterLeak") || "all" : "all");
    const [filterGuardian, setFilterGuardian] = useState(() => typeof window !== "undefined" ? sessionStorage.getItem("admin_filterGuardian") || "all" : "all");
    const [currentPage, setCurrentPage] = useState(() => typeof window !== "undefined" ? Number(sessionStorage.getItem("admin_currentPage")) || 1 : 1);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        if (!auth.user) return;
        
        window.history.pushState(null, "", pathname);
        const handlePopState = () => {
            setIsExitModalOpen(true);
            window.history.pushState(null, "", pathname);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [auth.user, pathname]);

    const filteredData = useMemo(() => {
        return auth.data.filter((item) => {
            const mSearch = item.name.includes(searchTerm) || item.phone.includes(searchTerm);
            const mLeak = filterLeak === "all" || item.has_leak_notice === filterLeak;
            const mGuardian = filterGuardian === "all" || item.has_guardian === filterGuardian;
            return mSearch && mLeak && mGuardian;
        });
    }, [auth.data, searchTerm, filterLeak, filterGuardian]);

    useEffect(() => {
        if (!isMounted) return;
        sessionStorage.setItem("admin_searchTerm", searchTerm);
        sessionStorage.setItem("admin_filterLeak", filterLeak);
        sessionStorage.setItem("admin_filterGuardian", filterGuardian);
        sessionStorage.setItem("admin_currentPage", String(currentPage));
    }, [searchTerm, filterLeak, filterGuardian, currentPage, isMounted]);

    if (!isMounted || auth.isLoading) return null;

    if (!auth.user) return (
        <AdminLogin 
            email={auth.email} 
            setEmail={auth.setEmail} 
            password={auth.password} 
            setPassword={auth.setPassword} 
            handleLogin={auth.handleLogin} 
        />
    );

    return (
        <div className="p-10 max-w-[1800px] mx-auto min-h-screen bg-[#F1F5F9]">
            <AlertDialog open={isExitModalOpen} onOpenChange={setIsExitModalOpen}>
                <AlertDialogContent className="rounded-[32px] border-none shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-slate-900">로그아웃 하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-bold py-2">
                            안전한 보안을 위해 관리자 세션을 종료합니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="cursor-pointer h-14 rounded-2xl font-black bg-white border-slate-200">머무르기</AlertDialogCancel>
                        <AlertDialogAction onClick={auth.handleLogout} className="cursor-pointer h-14 rounded-2xl bg-slate-900 text-white font-black px-8 hover:bg-red-600 transition-colors">
                            로그아웃
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-end items-center gap-6 mb-4">
                <div className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-black text-slate-500">
                    남은 시간: {Math.floor(auth.timeLeft / 60)}:{(auth.timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <button 
                    onClick={() => setIsExitModalOpen(true)} 
                    className="cursor-pointer text-[12px] font-bold text-slate-400 underline hover:text-red-500 transition-colors"
                >
                    LOGOUT
                </button>
            </div>

            <AdminHeader 
                count={auth.data.length} 
                filteredCount={filteredData.length} 
                onDownload={(f) => downloadFileData(filteredData, f as 'xlsx' | 'csv')} 
            />
            
            <AdminFilter 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                filterGuardian={filterGuardian} setFilterGuardian={setFilterGuardian}
                filterLeak={filterLeak} setFilterLeak={setFilterLeak}
                setCurrentPage={setCurrentPage}
                onReset={() => { 
                    setSearchTerm(""); setFilterLeak("all"); setFilterGuardian("all"); 
                    setCurrentPage(1); sessionStorage.clear(); 
                }}
            />
            
            <div className="rounded-[32px] border border-slate-200 overflow-hidden bg-white shadow-sm">
                <AdminTable currentItems={filteredData.slice((currentPage - 1) * 15, currentPage * 15)} />
                <AdminPagination current={currentPage} total={Math.ceil(filteredData.length / 15)} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}