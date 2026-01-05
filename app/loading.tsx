"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full max-w-[200px]">
        
        <div className="text-center mb-6">
          <h2 className="text-[16px] font-black text-slate-900 tracking-tight mb-1">
            법률사무소 심주엽
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
              Loading
            </span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-pulse [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-pulse [animation-delay:0.4s]" />
            </span>
          </div>
        </div>

        <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 w-[40%] bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)] animate-loading-bar" />
        </div>

      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.8s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}</style>
    </div>
  );
}