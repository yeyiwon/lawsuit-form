import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center w-full max-w-[280px] text-center">
        
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
          <span className="text-[22px] font-black text-slate-200 tracking-tighter">404</span>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-[14px] text-slate-500 font-medium">
            주소가 잘못되었거나<br />
            이동된 페이지입니다.
          </p>
        </div>

        <Button 
          asChild 
          className="w-full py-7 hover:bg-blue-700 text-white rounded-2xl font-bold text-[15px] shadow-lg shadow-blue-100 active:scale-[0.98] transition-all"
        >
          <Link href="/">
            홈으로 돌아가기
          </Link>
        </Button>

        <p className="mt-12 text-[11px] font-bold text-slate-300 tracking-[0.2em] uppercase">
          법무법인 심주엽
        </p>
      </div>
    </div>
  );
}