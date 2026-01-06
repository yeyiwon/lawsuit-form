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
import { LogOut } from "lucide-react";

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

                <AlertDialogContent 
                    className="w-[calc(100%-32px)] max-w-[400px] rounded-[32px] bg-white dark:bg-white border-none shadow-2xl p-8 flex flex-col items-center text-center outline-none"
                    style={{ isolation: 'isolate' }}
                >
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <LogOut className="w-8 h-8 text-red-500" />
                    </div>
                    
                    <AlertDialogHeader className="space-y-2">
                        <AlertDialogTitle className="text-2xl font-black text-slate-900 dark:text-slate-900 leading-tight">
                            관리자 세션을<br />종료하시겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 dark:text-slate-500 font-medium">
                            보안을 위해 로그아웃 후에는<br />다시 인증이 필요합니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex flex-col gap-3 w-full mt-8 sm:flex-col sm:space-x-0">
                        <AlertDialogAction 
                            onClick={auth.handleLogout} 
                            className="cursor-pointer w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-base hover:bg-red-600 transition-all border-none shadow-lg shadow-slate-200"
                        >
                            로그아웃 하기
                        </AlertDialogAction>
                        <AlertDialogCancel 
                            className="cursor-pointer w-full h-14 rounded-2xl font-bold text-slate-400 dark:text-slate-400 bg-transparent border-none hover:bg-slate-50 hover:text-slate-600 transition-all"
                        >
                            돌아가기
                        </AlertDialogCancel>
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
                    setCurrentPage(1);
                }}
            />
            
            <div className="rounded-[32px] border border-slate-200 overflow-hidden bg-white shadow-sm">
                <AdminTable currentItems={filteredData.slice((currentPage - 1) * 15, currentPage * 15)} />
                <AdminPagination current={currentPage} total={Math.ceil(filteredData.length / 15)} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}