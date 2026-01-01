"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 
import Logo from "../common/logo";
import NavLink from "./nav-link";

const NAV_MENU = [
    { name: "소송 정보", href: "/#infocards" },
    { name: "타임라인", href: "/#timeline" },
    { name: "자주 묻는 질문", href: "/#faq" },
];

interface HeaderProps {
    title?: string; // 외부에서 제목을 받아옴
}

export default function Header({ title }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname(); 
    const router = useRouter();

    const isSubPage = pathname !== "/";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerStyle = isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 h-16" 
        : "bg-transparent h-20";

    const buttonStyle = isScrolled 
        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
        : "bg-slate-900 text-white hover:bg-slate-800";

    return (
        <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
            <div className={`mx-auto flex items-center justify-between px-6 transition-all ${headerStyle}`}>
                
                <div className="flex items-center min-w-[100px]">
                    {!isSubPage ? (
                        <Logo />
                    ) : (
                        <button onClick={() => router.back()} className="cursor-pointer p-1 hover:bg-slate-100 rounded-full transition-colors">
                            <ChevronLeft className="w-6 h-6 text-slate-900" />
                        </button>
                    )}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                    {!isSubPage ? (
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_MENU.map((item) => (
                                <NavLink key={item.name} href={item.href}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    ) : (
                        <h2 className="text-md font-black text-slate-900 tracking-tight whitespace-nowrap">
                            {title}
                        </h2>
                    )}
                </div>
                
                <div className="flex items-center justify-end min-w-[100px]">
                    {!isSubPage && (
                        <Link 
                            href="/lawsuit" 
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${buttonStyle}`}
                        >
                            참여하기
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}