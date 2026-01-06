"use client";

import { useEffect } from "react";
import { useWatch, UseFormSetValue, Control, FieldPath } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FormInputField, PrivacyPolicyBox } from "./form-fields";
import { ContractContent } from "./contract-content";
import { FormValues } from "./form-schema";
import { MapPin, Search, RefreshCw } from "lucide-react";

const SectionHeader = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="mb-6">
        <h2 className="text-lg font-black tracking-tight">{title}</h2>
        <div className="w-8 h-1 bg-blue-600 mt-1.5 rounded-full"></div>
        {desc && <p className="text-[13px] font-medium text-slate-400 mt-2">{desc}</p>}
    </div>
);

// 1. 신청 자격 섹션
export const QualificationSection = ({ control }: { control: Control<FormValues> }) => {
    const qualificationFields: { name: FieldPath<FormValues>; label: string }[] = [
        { 
            name: "has_leak_notice", 
            label: "쿠팡으로부터 개인정보 유출 확인 문자 또는 이메일을 받으셨나요?" 
        },
        { 
            name: "is_member_during_period", 
            label: "2025. 6. 24. 부터 2025. 11. 08. 사이에 쿠팡에 본인 명의로 가입되어 있으셨나요?" 
        }
    ];

    return (
        <section className="space-y-4 pt-6">
            <SectionHeader title="신청 자격 확인" desc="정확한 소송 참여를 위해 아래 항목을 체크해주세요." />
            <div className="space-y-10">
                {qualificationFields.map((f) => (
                    <FormField 
                        key={f.name} 
                        control={control} 
                        name={f.name} 
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-[15px] font-bold text-slate-700">{f.label}</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-2">
                                        {(["yes", "no"] as const).map((v) => (
                                            <label 
                                                key={v} 
                                                className={`flex-1 py-4 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 font-bold text-sm active:scale-[0.96] 
                                                ${field.value === v 
                                                    ? (v === 'yes' ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-inner" : "border-red-500 bg-red-50/50 text-red-500 shadow-inner") 
                                                    : "border-slate-100 bg-white text-slate-400 hover:border-slate-200 shadow-sm"}`}
                                            >
                                                <RadioGroupItem value={v} className="sr-only" /> {v === "yes" ? "예" : "아니오"}
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )} 
                    />
                ))}
            </div>
        </section>
    );
};

// 2. 개인정보 동의 섹션
export const PrivacyAgreeSection = ({ control }: { control: Control<FormValues> }) => (
    <section className="space-y-4 pt-6 border-t border-slate-100">
        <SectionHeader title="개인정보 수집 동의" />
        <PrivacyPolicyBox />
        <FormField control={control} name="privacy_agree" render={({ field }) => (
            <FormItem>
                <FormControl>
                    <label 
                        className={`group relative flex items-center justify-between p-5 rounded-xl border-2 transition-all cursor-pointer ${
                            field.value === 'agree' 
                            ? 'border-blue-600 bg-blue-50/30' 
                            : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                        }`}
                        onClick={() => field.onChange(field.value === 'agree' ? "" : "agree")}
                    >
                        <span className={`text-sm font-bold ${field.value === 'agree' ? 'text-blue-600' : 'text-slate-500'}`}>
                            위 내용을 확인했으며, 이에 동의합니다
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            field.value === 'agree' ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'
                        }`}>
                            <div className={`w-2 h-2 rounded-full bg-white transition-all ${field.value === 'agree' ? 'scale-100' : 'scale-0'}`} />
                        </div>
                    </label>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    </section>
);

// 3. 신청인 정보 섹션
export const ApplicantInfoSection = ({ control, nationality }: { control: Control<FormValues>, nationality: string }) => (
    <section className="space-y-4 pt-6 border-t border-slate-100">
        <SectionHeader title="신청인 상세 정보" />
        <div className="grid gap-8">
            <FormInputField control={control} name="name" label="성명" placeholder="쿠팡 가입자 본인 성함" />
            <FormField control={control} name="nationality" render={({ field }) => (
                <FormItem className="space-y-4">
                    <FormLabel className="font-bold text-slate-700">국적</FormLabel>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-2">
                        {(["native", "foreigner"] as const).map((v) => (
                            <label key={v} className={`flex-1 py-4 border-2 rounded-xl text-center cursor-pointer font-bold text-sm transition-all ${field.value === v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-400"}`}>
                                <RadioGroupItem value={v} className="sr-only" /> {v === "native" ? "내국인" : "외국인"}
                            </label>
                        ))}
                    </RadioGroup>
                </FormItem>
            )} />
            <FormInputField 
                control={control} 
                name="birth" 
                label={nationality === "foreigner" ? "외국인 등록번호 (앞 6자리)" : "생년월일 (6자리)"} 
                placeholder="예: 850101" 
                maxLength={6} 
            />
            <FormInputField control={control} name="phone" label="휴대폰 번호" placeholder="01012345678" maxLength={11} />
            <div className="space-y-4">
                <FormInputField control={control} name="email" label="이메일 주소" placeholder="12345@gmail.com" />
                <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-blue-500 text-lg">ⓘ</span>
                    <p className="text-[13px] text-blue-700 leading-relaxed font-medium">
                        소송 진행 상황에 대한 안내문이 해당 이메일로 발송되오니 <br className="hidden sm:block" />
                        <span className="font-bold underline">정확한 이메일 주소</span>를 입력해 주세요.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// 4. 법정대리인 정보 섹션
export const GuardianSection = ({ 
    control, 
    hasGuardian, 
    setValue 
}: { 
    control: Control<FormValues>, 
    hasGuardian: string, 
    setValue: UseFormSetValue<FormValues> 
}) => {
    const birth = useWatch({ control, name: "birth" });
    
    const now = new Date();
    const todayStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}.`;

    useEffect(() => {
        if (birth?.length === 6) {
            const yearShort = parseInt(birth.substring(0, 2));
            const month = parseInt(birth.substring(2, 4));
            const day = parseInt(birth.substring(4, 6));
            
            const fullYear = yearShort <= (new Date().getFullYear() % 100) ? 2000 + yearShort : 1900 + yearShort;

            const today = new Date();
            const birthDate = new Date(fullYear, month - 1, day);
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
    
            const isMinor = age < 19; 
            const target = isMinor ? "yes" : "no";
            
            if (hasGuardian !== target) {
                setTimeout(() => {
                    setValue("has_guardian", target, { shouldValidate: true });
                }, 0);
            }
        }
    }, [birth, hasGuardian, setValue]);

    return (
        <section className="space-y-4 pt-6 border-t border-slate-100">
            <SectionHeader 
                title="법정대리인 정보" 
                desc={`현재(${todayStr}) 기준 만 19세 미만 여부를 판정합니다.`} 
            />
            <FormField control={control} name="has_guardian" render={({ field }) => (
                <FormItem className="space-y-4">
                    <FormLabel className="font-bold text-slate-700">신청인이 미성년자인가요?</FormLabel>
                    <FormControl>
                        <RadioGroup 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            className="flex gap-2 pointer-events-none opacity-90"
                        >
                            {(["no", "yes"] as const).map((v) => (
                                <label key={v} className={`flex-1 py-4 border-2 rounded-xl text-center font-bold text-sm transition-all ${field.value === v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-300"}`}>
                                    <RadioGroupItem value={v} className="sr-only" /> 
                                    {v === "no" ? "아니오 (성인)" : "예 (미성년자)"}
                                </label>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )} />

            {hasGuardian === "yes" && (
                <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-top-4">
                    <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <span className="text-blue-500">ⓘ</span>
                        <p className="text-[13px] text-blue-700 font-bold leading-relaxed">
                            현재 날짜 ({todayStr}) 기준 만 19세 미만은 미성년자로 분류되어 법정대리인 정보 입력이 필요합니다.
                        </p>
                    </div>
                    {/* 순서: 성명 -> 주민번호 -> 휴대폰 -> 관계 */}
                    <FormInputField control={control} name="guardian_name" label="법정대리인 성명" placeholder="보호자 성함" />
                    <FormInputField control={control} name="guardian_birth" label="법정대리인 주민번호 (앞 6자리)" placeholder="850101" maxLength={6} />
                    <FormInputField control={control} name="guardian_phone" label="법정대리인 휴대폰 번호" placeholder="01012345678" maxLength={11} />
                    <FormInputField control={control} name="guardian_relation" label="신청인과의 관계" placeholder="예: 부, 모" />
                </div>
            )}
        </section>
    );
};

// 5. 주소 입력 섹션
export const AddressSection = ({ 
    control, 
    currentAddress, 
    onSearch 
}: { 
    control: Control<FormValues>, 
    currentAddress: string, 
    onSearch: () => void 
}) => (
    <section className="space-y-4 pt-8 border-t border-slate-100">
        <SectionHeader title="송달 주소" desc="서류를 송달받을 도로명 주소입니다." />
        <div className="space-y-3">
            {!currentAddress ? (
                <Button 
                    type="button" 
                    onClick={onSearch} 
                    className="cursor-pointer w-full h-24 flex items-center justify-between px-6 bg-slate-50 border-2 border-dashed border-slate-400 rounded-3xl hover:bg-slate-100 hover:border-slate-500 active:scale-[0.98] transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <Search className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[16px] font-black text-slate-900">주소 검색</span>
                            <span className="text-[12px] text-slate-400 font-bold">도로명 주소로 검색해 주세요</span>
                        </div>
                    </div>
                </Button>
            ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    <div className="relative overflow-hidden group">
                        <div onClick={onSearch} className="flex flex-col gap-2 p-6 bg-blue-50/50 border-2 border-blue-100 rounded-3xl cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 rounded-full shadow-sm text-[11px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                                <RefreshCw className="w-3 h-3" /> 재검색
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1.5 bg-blue-600 rounded-lg">
                                    <MapPin className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[11px] font-black text-blue-600/60 uppercase tracking-widest">선택된 주소</span>
                            </div>
                            <span className="text-[17px] font-black text-slate-900 leading-tight pr-16">{currentAddress}</span>
                        </div>
                        <input type="hidden" {...control.register("address")} value={currentAddress} />
                    </div>
                    <div className="relative animate-in slide-in-from-top-4 duration-500 delay-150">
                        <FormInputField 
                            control={control} 
                            name="address_detail" 
                            label="" 
                            placeholder="동, 호수 등 상세 주소를 입력하세요" 
                            className="h-16 bg-white border-2 border-slate-100 focus:border-blue-500 focus:ring-8 focus:ring-blue-50 rounded-2xl transition-all font-bold text-[15px] px-6 shadow-sm"
                        />
                    </div>
                </div>
            )}
        </div>
    </section>
);

// 6. 위임 계약 섹션
export const ContractSection = ({ control }: { control: Control<FormValues> }) => (
    <section className="space-y-4 pt-6 border-t border-slate-100">
        <SectionHeader title="위임 계약 동의" />
        <ContractContent />
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
            <p className="text-[13px] text-slate-600 font-medium text-center leading-relaxed px-4">
                위 계약에 동의하신다면 하단에 <span className="text-blue-600 font-black">&quot;동의합니다&quot;</span>를 직접 입력해 주세요.
            </p>
            <FormInputField
                control={control} 
                name="contract_confirm" 
                label="" 
                placeholder="여기에 '동의합니다'를 입력하세요" 
                className="h-16 border-2 focus:ring-4 font-black text-center text-md placeholder:text-slate-400 placeholder:font-normal placeholder:text-[14px]"
            />
        </div>
    </section>
);