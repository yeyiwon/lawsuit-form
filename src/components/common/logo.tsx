import Link from "next/link";
import { Scale } from "lucide-react";

interface LogoProps {
  className?: string;
  iconSize?: number;
}

export default function Logo({ className = "", iconSize = 20 }: LogoProps) {
    return (
    <Link href="/" id="#logo"  className={`flex items-center gap-2 group ${className}`}>
        <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-blue-600 transition-colors">
        <Scale size={iconSize} className="text-white" />
        </div>
    
        <span className="text-xl font-black tracking-tight text-slate-900">
        법률사무소 <span className="text-blue-600">심주엽</span>
        </span>
    </Link>
    );
}