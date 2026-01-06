/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CompleteContent() {
    const router = useRouter();
    const [isValid, setIsValid] = useState(false);
    const particles = Array.from({ length: 15 });

    useEffect(() => {
        const isSubmitted = sessionStorage.getItem("form_submitted");

        if (!isSubmitted) {
            router.replace("/");
        } else {
            sessionStorage.removeItem("form_submitted");
            setIsValid(true);
        }
    }, [router]);

    if (!isValid) return null;
    
    return (
        <div className="h-[100dvh] w-full bg-white font-sans antialiased text-slate-900 overflow-hidden flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 -z-10">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-50 rounded-full blur-[120px]"
                />
            </div>

            <main className="flex flex-col items-center px-6 w-full max-w-sm z-10">
                <div className="relative mb-14">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 border-2 border-blue-100 rounded-full"
                    />

                    {particles.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{ 
                                scale: [0, 1.2, 0],
                                x: Math.cos((i * 360 / particles.length) * (Math.PI / 180)) * 120,
                                y: Math.sin((i * 360 / particles.length) * (Math.PI / 180)) * 120,
                            }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.5, 
                                repeat: Infinity, 
                                repeatDelay: 1.5,
                                ease: "circOut"
                            }}
                            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-blue-500/40"
                        />
                    ))}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                        <svg className="w-24 h-24 text-blue-600 drop-shadow-[0_10px_10px_rgba(37,99,235,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <motion.polyline 
                                points="4 12 9 17 20 6" 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </svg>
                    </motion.div>
                </div>

                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <h1 className="text-4xl font-black tracking-tighter text-slate-950 mb-3">
                            신청이 완료되었습니다
                        </h1>
                        <p className="text-slate-500 text-[17px] font-bold leading-relaxed tracking-tight">
                            소중한 정보가 안전하게 전달되었습니다.<br />
                            <span className="text-blue-600">검토 후 이메일로 안내드리겠습니다.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2, ease: "circOut" }}
                        className="h-[1px] w-12 bg-blue-200 mx-auto"
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="w-full px-2"
                >
                    <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    >
                        <Button 
                            onClick={() => router.push("/")}
                            className="cursor-pointer w-full h-18 text-lg font-black rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-colors duration-500 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]"
                        >
                            확인
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            <footer className="absolute bottom-10">
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-[10px] font-bold text-slate-200 tracking-[0.5em] uppercase"
                >
                    Lawfirm Sim Jooyeop
                </motion.p>
            </footer>
        </div>
    );
}