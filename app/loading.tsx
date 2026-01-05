"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        
        <h2 className="text-[13px] font-black text-slate-800 tracking-[0.8em] uppercase leading-none">
          Lawfirm Sim Jooyeop
        </h2>

        <div className="flex items-end">
          <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase leading-none">
            Loading
          </span>
          <div className="flex gap-1.5 ml-1.5 pb-0.5">
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-dot-wave" 
                  style={{ animationDelay: '0s' }} />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-dot-wave" 
                  style={{ animationDelay: '0.2s' }} />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-dot-wave" 
                  style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes dot-wave {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }
        .animate-dot-wave {
          animation: dot-wave 0.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}