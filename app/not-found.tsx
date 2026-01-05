"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white px-6">
      
      {/* 배경: 아주 은은하게 고정된 미니멀한 원형 빛 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px]" />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-[320px] text-center"
      >
        
        {/* 1. 심플한 숫자 표시: 과한 애니메이션 제거 */}
        <div className="mb-10 relative">
          <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center shadow-sm">
            <span className="text-[24px] font-black text-slate-300 tracking-tighter">404</span>
          </div>
        </div>

        {/* 2. 담백한 메시지: 감성적인 문구 배제 */}
        <div className="mb-12 space-y-3">
          <h2 className="text-[22px] font-bold text-slate-950 tracking-tight">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-[15px] text-slate-400 font-medium leading-relaxed">
            입력하신 주소가 잘못되었거나<br />
            삭제된 페이지입니다.
          </p>
        </div>

        {/* 3. 버튼: 신뢰감 있는 블랙 & 넉넉한 사이즈 */}
        <div className="w-full">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button 
              asChild 
              className="w-full h-16 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-[15px] transition-all duration-200"
            >
              <Link href="/">
                홈으로 돌아가기
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* 4. 하단 브랜드 네임 */}
        <p className="mt-16 text-[10px] font-bold text-slate-300 tracking-[0.4em] uppercase">
          Lawfirm Sim Jooyeoob
        </p>
      </motion.main>
      
    </div>
  );
}