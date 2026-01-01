"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // 아이콘
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // shadcn 기본 유틸리티

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 올라가는 핵심 설정
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="h-12 w-12 rounded-full bg-white shadow-xl border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group"
        aria-label="페이지 상단으로 이동"
      >
        <ArrowUp className="h-6 w-6 transition-transform" />
      </Button>
    </div>
  );
}