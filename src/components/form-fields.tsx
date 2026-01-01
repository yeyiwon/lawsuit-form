import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; 

interface FormInputFieldProps<TFieldValues extends FieldValues> {
  formControl: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string; 
  maxLength?: number;
  readOnly?: boolean;
  className?: string;
}

export const FormInputField = <TFieldValues extends FieldValues>({
  formControl,
  name,
  label,
  placeholder,
  maxLength,
  className,
  readOnly = false,
}: FormInputFieldProps<TFieldValues>) => (
  <FormField
    control={formControl}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-bold text-slate-700">{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            {...field}
            className={cn(
              "h-14 rounded-xl border-slate-200 focus:ring-blue-500", 
              className
            )}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const Required = () => <span className="text-red-500 ml-1 font-bold">*</span>;

export const PrivacyPolicyBox = () => (
  <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6 space-y-5">
    <div className="space-y-2">
      <p className="text-[14px] font-bold text-slate-800 leading-relaxed">
        법무법인 심주엽은 본 단체소송 진행을 위해 신청자의 개인정보를 수집하고자 합니다.
      </p>
      <p className="text-[13px] text-red-600 font-black flex items-start gap-1">
        <span>•</span> <span>동의를 거부하실 수 있으나, 거부 시 소송 참여가 불가능합니다.</span>
      </p>
    </div>
    <div className="pt-4 border-t border-blue-200/50 space-y-3">
      {[
        { 
          label: "수집항목", 
          content: (
            <>
              성명, 생년월일, 주소, 휴대전화번호, 이메일 주소, <br className="hidden sm:block" /> 
              <span className="text-blue-700/80 font-medium">(미성년자)</span> 친권자 정보, 
              <span className="text-blue-700/80 font-medium">(외국인)</span> 국적 및 외국인등록번호
            </>
          ) 
        },
        { label: "수집 및 목적", content: "쿠팡 개인정보 유출 피해 단체소송 진행" },
        { label: "보유 및 기간", content: <span className="text-slate-900 font-bold">소송 종료 시까지</span> },
      ].map((item, idx) => (
        <div key={idx} className="flex gap-3 text-[13px]">
          <span className="font-bold text-slate-500 w-24 shrink-0 text-xs uppercase tracking-tight">{item.label}</span>
          <span className="text-slate-700 leading-snug">{item.content}</span>
        </div>
      ))}
    </div>
  </div>
);