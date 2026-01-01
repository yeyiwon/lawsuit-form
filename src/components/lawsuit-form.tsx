"use client";

import { supabase } from "../lib/supabase";
import * as z from "zod";
import toast from "react-hot-toast"; 
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormPersist from "react-hook-form-persist";
import { useRouter } from "next/navigation";

import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import Header from "./layout/header";
import { FormInputField, Required, PrivacyPolicyBox } from "./form-fields";
import { AddressModal } from "./address-modal";

const formSchema = z.object({
    has_leak_notice: z.string().min(1, "확인 여부를 선택해주세요."),
    is_member_during_period: z.string().min(1, "가입 여부를 선택해주세요."),
    name: z.string().min(2, "성함은 최소 2글자 이상 입력해주세요."),
    phone: z.string().regex(/^010\d{8}$/, "010으로 시작하는 11자리 숫자만 입력해주세요."),
    nationality: z.string().min(1),
    birth: z.string().length(6, "생년월일 6자리 숫자 (예: 850101)"),
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    has_guardian: z.string().min(1),
    guardian_name: z.string().optional(),
    guardian_phone: z.string().optional(),
    guardian_birth: z.string().optional(),
    guardian_relation: z.string().optional(),
    privacy_agree: z.string().min(1, "동의 여부를 선택해주세요."),
    address: z.string().min(1, "주소를 입력해주세요."),
    address_detail: z.string().min(1, "상세 주소를 입력해주세요."),
});

type FormValues = z.infer<typeof formSchema>;

export default function LawsuitForm() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: { 
            has_leak_notice: "", is_member_during_period: "",
            name: "", phone: "", birth: "", email: "", 
            nationality: "native", has_guardian: "no",
            address: "", address_detail: "", privacy_agree: "" 
        },
    });

    const { watch, setValue, setFocus, reset } = form;
    const nationality = watch("nationality");
    const hasGuardian = watch("has_guardian");

    useEffect(() => { setIsLoaded(true); }, []);

    useFormPersist("lawsuit-form-v5", {
        watch, setValue,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });

    const handleAddressSearch = () => setIsModalOpen(true);

    const onSubmit = async (values: FormValues) => {
        const toastId = toast.loading("신청서를 제출 중입니다...");
        try {
            const { error } = await supabase.from('applications').insert([values]);
            if (error) throw error;
            toast.success("접수되었습니다!", { id: toastId });
            localStorage.removeItem("lawsuit-form-v5");
            reset();
            setTimeout(() => router.push("/"), 500);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "전송 오류";
            toast.error("실패: " + message, { id: toastId });
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-white">
            <Header title="단체소송 신청서" />

            <main className="max-w-xl mx-auto px-6 pt-32 pb-32">
                <header className="mb-20">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        쿠팡 개인정보 유출 피해<br />단체소송 신청서
                    </h1>
                </header>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24">
                        
                        {/* 1. 신청 자격 확인 */}
                        <section className="space-y-10">
                            <div className="space-y-3">
                                <h2 className="text-lg font-black text-slate-900">신청 자격 확인</h2>
                                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                                <p className="text-sm text-slate-500 font-medium">정확한 소송 참여를 위해 아래 항목을 체크해주세요.</p>
                            </div>

                            <div className="grid gap-10">
                                <FormField control={form.control} name="has_leak_notice" render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-[16px] font-bold text-slate-800 leading-snug">
                                            쿠팡으로부터 개인정보 유출 확인 문자 또는 이메일을 받으셨나요?
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                                {["yes", "no"].map((v) => (
                                                    <label key={v} className={`flex-1 py-4 rounded-2xl border-2 text-center cursor-pointer transition-all font-bold ${field.value === v ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm" : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"}`}>
                                                        <RadioGroupItem value={v} className="sr-only" /> {v === "yes" ? "예" : "아니오"}
                                                    </label>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="is_member_during_period" render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-[16px] font-bold text-slate-800 leading-snug">
                                            2025. 6. 24. 부터 2025. 11. 08. 사이에 쿠팡에 본인 명의로 가입되어 있으셨나요?
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                                {["yes", "no"].map((v) => (
                                                    <label key={v} className={`flex-1 py-4 rounded-2xl border-2 text-center cursor-pointer transition-all font-bold ${field.value === v ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm" : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"}`}>
                                                        <RadioGroupItem value={v} className="sr-only" /> {v === "yes" ? "예" : "아니오"}
                                                    </label>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </section>

                        {/* 2. 신청인 정보 */}
                        <section className="space-y-10">
                            <div className="space-y-3">
                                <h2 className="text-lg font-black text-slate-900">신청인 정보</h2>
                                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                            </div>
                            <div className="grid gap-8">
                                <FormInputField<FormValues> formControl={form.control} name="name" label="성명" placeholder="쿠팡 가입자 본인 성함" />
                                
                                <FormField control={form.control} name="nationality" render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="font-bold text-slate-800">국적 </FormLabel>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                            {["native", "foreigner"].map((v) => (
                                                <label key={v} className={`flex-1 py-4 border-2 rounded-xl text-center cursor-pointer font-bold text-sm transition-all ${field.value === v ? "border-blue-600 bg-blue-50/50 text-blue-600" : "border-slate-100 bg-white text-slate-400"}`}>
                                                    <RadioGroupItem value={v} className="sr-only" /> {v === "native" ? "내국인" : "외국인"}
                                                </label>
                                            ))}
                                        </RadioGroup>
                                    </FormItem>
                                )} />

                                <FormInputField<FormValues> formControl={form.control} name="birth" label={nationality === "native" ? "주민등록번호 앞 6자리" : "외국인등록번호 앞 6자리"} placeholder="850101" maxLength={6} />
                                <FormInputField<FormValues> formControl={form.control} name="phone" label="핸드폰 번호" placeholder="01012345678" maxLength={11} />
                                
                                <div className="space-y-4">
                                    <FormInputField<FormValues> formControl={form.control} name="email" label="이메일 주소" placeholder="example@gmail.com" />
                                    <div className="p-5 bg-blue-50/40 rounded-2xl border border-blue-100/50 text-[13.5px] text-blue-800/80 leading-relaxed">
                                        📧 이메일로 <b>소송위임계약서</b>가 발송됩니다. 정확한 정보를 입력해 주세요.
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. 법정대리인 */}
                        <section className="space-y-10">
                            <div className="space-y-3">
                                <h2 className="text-lg font-black text-slate-900">법정대리인 정보 <span className="text-sm font-normal text-slate-400 ml-2">(미성년자 전용)</span></h2>
                                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                            </div>
                            <FormField control={form.control} name="has_guardian" render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="font-bold text-slate-800">신청인이 미성년자인가요?</FormLabel>
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-3">
                                        {["no", "yes"].map((v) => (
                                            <label key={v} className={`flex-1 py-4 border-2 rounded-xl text-center cursor-pointer font-bold text-sm transition-all ${field.value === v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-400"}`}>
                                                <RadioGroupItem value={v} className="sr-only" /> {v === "no" ? "아니오" : "예 (정보 작성)"}
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </FormItem>
                            )} />

                            {hasGuardian === "yes" && (
                                <div className="grid gap-6 p-7 bg-slate-50 rounded-3xl border border-slate-100/80 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <FormInputField<FormValues> formControl={form.control} name="guardian_name" label="법정대리인 성명" placeholder="성함" />
                                    <FormInputField<FormValues> formControl={form.control} name="guardian_phone" label="법정대리인 휴대폰 번호" placeholder="01012345678" />
                                    <FormInputField<FormValues> formControl={form.control} name="guardian_birth" label="법정대리인 주민번호 앞 6자리" placeholder="850101" />
                                    <FormInputField<FormValues> formControl={form.control} name="guardian_relation" label="관계" placeholder="예: 부, 모" />
                                </div>
                            )}
                        </section>

                        {/* 4. 주소 및 동의 */}
                        <section className="space-y-10">
                            <div className="space-y-3">
                                <h2 className="text-lg font-black text-slate-900">송달 주소 및 동의</h2>
                                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                            </div>
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <FormLabel className="font-bold text-slate-800">송달 주소 <Required /></FormLabel>
                                    {!watch("address") ? (
                                        <Button type="button" variant="outline" onClick={handleAddressSearch} className="w-full h-16 border-dashed border-2 rounded-2xl bg-white text-slate-400 font-bold">
                                            주소 검색하기
                                        </Button>
                                    ) : (
                                        <div className="grid gap-3">
                                            <div onClick={handleAddressSearch} className="cursor-pointer">
                                                <FormInputField<FormValues> formControl={form.control} name="address" label="" readOnly className="bg-slate-50 border-none pointer-events-none" />
                                            </div>
                                            <FormInputField<FormValues> formControl={form.control} name="address_detail" label="" placeholder="상세 주소를 입력해주세요" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <PrivacyPolicyBox />
                                    <FormField control={form.control} name="privacy_agree" render={({ field }) => (
                                        <FormItem>
                                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid gap-3">
                                                {["agree", "disagree"].map((v) => (
                                                    <label key={v} className={`p-5 rounded-2xl border-2 cursor-pointer font-bold text-sm transition-all ${field.value === v ? (v === 'agree' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md shadow-blue-100/50' : 'border-red-500 bg-red-50 text-red-600') : 'border-slate-100 bg-white text-slate-400'}`}>
                                                        <RadioGroupItem value={v} className="sr-only" /> 
                                                        {v === 'agree' ? "위 내용을 모두 확인했으며, 동의합니다" : "동의하지 않습니다"}
                                                    </label>
                                                ))}
                                            </RadioGroup>
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                        </section>

                        <Button 
                            type="submit" 
                            disabled={!form.formState.isValid} 
                            className="w-full h-20 text-xl font-black rounded-3xl bg-blue-600 text-white shadow-xl hover:bg-blue-700 disabled:bg-slate-400 transition-all active:scale-[0.98]"
                        >
                            신청서 제출하기
                        </Button>
                    </form>
                </Form>
            </main>

            <AddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSelect={(addr) => { 
                    setValue("address", addr, { shouldValidate: true }); 
                    setFocus("address_detail"); 
                }} 
            />
        </div>
    );
}