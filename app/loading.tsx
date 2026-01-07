"use client";

import { Scale } from "lucide-react";


export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white">
    <div className="flex flex-col items-center">
      
      <div className="relative w-24 h-24 flex items-center justify-center">

        <div className="absolute opacity-10">
          <Scale size={60} strokeWidth={1.2} className="text-slate-900" />
        </div>

        <div className="relative text-blue-600 animate-single-path-flow">
          <Scale size={60} strokeWidth={1.5} />
        </div>

      </div>
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-[15px] font-black text-slate-900 tracking-[0.5em] uppercase pl-[0.5em]">
          Looding ...
        </h2>
        <div className="w-40 h-[1px] bg-slate-100 mt-4 relative overflow-hidden">
          <div className="absolute h-full bg-blue-500 w-1/4 animate-progress-flow" />
        </div>
      </div>
      <p className="mt-16 text-[10px] font-bold text-slate-300 tracking-[0.4em] uppercase">
        Lawfirm Sim Jooyeop
      </p>
    </div>

    <style jsx global>{`
      .animate-single-path-flow svg path {
        stroke-dasharray: 60;
        stroke-dashoffset: 60;
        animation: single-flow 3s linear infinite;
      }

      @keyframes single-flow {
        0% {
          stroke-dashoffset: 60;
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          stroke-dashoffset: -60;
          opacity: 0;
        }
      }

      @keyframes progress-flow {
        0% { transform: translateX(-150%); }
        100% { transform: translateX(400%); }
      }

      .animate-progress-flow {
        animation: progress-flow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
    `}</style>
  </div>
  );
}