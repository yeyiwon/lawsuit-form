import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // [모바일 핵심 변화] 
  // 1. active:scale-[0.97] - 눌렀을 때 쫀득하게 들어가는 효과
  // 2. rounded-2xl - 모바일에서 훨씬 트렌디하고 부드러운 인상
  // 3. tracking-tight - 굵은 폰트일 때 더 세련되게 보임
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
  {
    variants: {
      variant: {
        // [Default] 블랙은 묵직하게, 블루는 쨍하게
        default: "bg-slate-950 text-white hover:bg-blue-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100",
        outline: "border-2 border-slate-100 bg-white hover:bg-slate-50 text-slate-900 shadow-sm",
        secondary: "bg-blue-50 text-blue-600 hover:bg-blue-100",
        ghost: "hover:bg-slate-50 text-slate-600",
        link: "text-blue-600 underline-offset-4 hover:underline",
        // [추가] 고급스러운 '네온' 스타일 (완료 페이지용)
        premium: "bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700",
      },
      size: {
        default: "h-14 px-6 text-[16px]", // 모바일은 엄지손가락 크기에 맞춰 높이(h-14)를 키워야 함
        sm: "h-10 px-4 text-[14px] rounded-xl",
        lg: "h-18 px-10 text-[18px] rounded-[22px]", // 더 큼직하고 묵직한 버튼
        icon: "size-12 rounded-xl",
        "icon-sm": "size-10 rounded-lg",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }