"use client";
import { supabase } from "../lib/supabase";
import * as z from "zod";
import toast from "react-hot-toast"; 
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import useFormPersist from "react-hook-form-persist";
import { useRouter } from "next/navigation";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import Header from "./layout/header";
import { FormInputField, Required, PrivacyPolicyBox } from "./form-fields";
import { AddressModal } from "./address-modal";

const formSchema = z.object({
    name: z.string().min(2, "성함은 최소 2글자 이상 입력해주세요."),
    phone: z.string().regex(/^010\d{8}$/, "010으로 시작하는 11자리 숫자만 입력해주세요."),
    birth: z.string().length(6, "생년월일 6자리 숫자 (예: 850101)"),
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
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
            name: "", phone: "", birth: "", email: "", address: "", address_detail: "", privacy_agree: "" 
        },
    });

    const { watch, setValue, setFocus, reset } = form;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useFormPersist("lawsuit-form", {
        watch, 
        setValue,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });

    const handleAddressSearch = () => {
        setIsModalOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        const toastId = toast.loading("신청서를 제출 중입니다...");

        try {
            const { error } = await supabase
                .from('applications')
                .insert([
                    {
                        name: values.name,
                        phone: values.phone,
                        birth: values.birth,
                        email: values.email,
                        address: values.address,
                        address_detail: values.address_detail,
                        privacy_agree: values.privacy_agree,
                    }
                ]);

            if (error) throw error;

            toast.success("신청서가 정상적으로 접수되었습니다!", { 
                id: toastId,
                duration: 4000,
            });

            localStorage.removeItem("lawsuit-form");
            reset();
            setTimeout(() => {
                router.push("/");
            }, 500); 

        } catch (error: unknown) {
            console.error("DB 전송 에러:", error);
            
            let errorMessage = "다시 시도해주세요.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = String((error as { message: unknown }).message);
            }

            toast.error(`전송에 실패했습니다: ${errorMessage}`, { 
                id: toastId 
            });
        }
    };
    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-white">
            <Header title="쿠팡 개인정보 유출 단체소송" />

            <main className="max-w-2xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-12 space-y-4">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                        쿠팡 개인정보 유출 피해<br />단체소송 신청서
                    </h1>
                    <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
                </header>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
                        
                        {/* 1. 신청인 정보 */}
                        <section className="space-y-8">
                            <h2 className="text-lg font-black text-slate-900">신청인 정보 <Required /></h2>
                            <div className="grid gap-6">
                                <FormInputField<FormValues> formControl={form.control} name="name" label="성명" placeholder="실명을 입력해 주세요" />
                                <FormInputField<FormValues> formControl={form.control} name="phone" label="핸드폰 번호" placeholder="01012345678" maxLength={11} />
                                <FormInputField<FormValues> formControl={form.control} name="birth" label="주민등록번호 앞 6자리" placeholder="850101" maxLength={6} />
                                <div className="space-y-3">
                                    <FormInputField<FormValues> 
                                        formControl={form.control} 
                                        name="email" 
                                        label="이메일 주소" 
                                        placeholder="example@gmail.com"/>
                                    <div className="mt-3 bg-blue-50/50 p-5 rounded-2xl space-y-2 border border-blue-100/50">
                                        <p className="text-[14px] font-bold text-blue-900 flex items-center gap-1.5">
                                            📧 이메일 주소를 정확히 입력해주세요
                                        </p>
                                        <p className="text-[13px] text-blue-800/90 leading-relaxed">
                                            이메일 주소를 입력하셔야 응답하신 신청서(소송위임계약서 포함)를 메일로 보내드립니다.
                                            <br />
                                            <span className="font-bold text-blue-600">
                                                입력하신 정보대로 소송에 참여되니 정보를 정확하게 입력해주세요.
                                            </span>
                                        </p>
                                    </div>
                                    </div>
                                <div>
                                </div>
                            </div>
                        </section>

                        {/* 2. 개인정보 동의 */}
                        <section className="space-y-6">
                            <h2 className="text-[15px] font-black text-slate-900">개인정보 수집·이용 동의 <Required /></h2>
                            <PrivacyPolicyBox />
                            <FormField control={form.control} name="privacy_agree" render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-3">
                                            {["agree", "disagree"].map((val) => {
                                                const isSelected = field.value === val;
                                                const isDisagree = val === "disagree";
                                                return (
                                                    <label key={val} className={`flex items-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? (isDisagree ? "border-red-500 bg-red-50" : "border-blue-600 bg-blue-50") : "border-slate-100 bg-white"}`}>
                                                        <RadioGroupItem value={val} id={val} />
                                                        <span className={`text-[15px] font-bold ${isSelected ? (isDisagree ? "text-red-600" : "text-blue-600") : "text-slate-500"}`}>
                                                            {val === "agree" ? "위 내용을 확인했으며, 동의합니다" : "동의하지 않습니다"}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </section>

                        {/* 3. 송달 주소 */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-black text-slate-900">송달 주소 <Required /></h2>
                                {watch("address") && (
                                    <button 
                                        type="button" 
                                        onClick={handleAddressSearch}
                                        className="cursor-pointer text-xs font-bold text-blue-600 underline underline-offset-4"
                                    >
                                        주소 수정하기
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {!watch("address") ? (
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={handleAddressSearch}
                                        className="cursor-pointer w-full h-20 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-blue-50 transition-all flex flex-col gap-1"
                                    >
                                        <Search className="w-5 h-5 text-blue-500" />
                                        <span className="font-bold text-slate-600">주소 검색하기</span>
                                    </Button>
                                ) : (
                                    <div className="grid gap-4 animate-in fade-in slide-in-from-top-2">
                                        <div 
                                            onClick={handleAddressSearch} 
                                            className="cursor-pointer group relative rounded-xl transition-all"
                                        >
                                            <FormInputField<FormValues> 
                                                formControl={form.control} 
                                                name="address" 
                                                label="도로명 주소" 
                                                placeholder=""
                                                readOnly 
                                                className="cursor-pointer bg-slate-50/80 group-hover:border-blue-400 group-hover:bg-blue-50/30 transition-all"
                                            />
                                            <div className="absolute inset-0 z-10" />
                                        </div>
                                        
                                        <FormInputField<FormValues> 
                                            formControl={form.control} 
                                            name="address_detail" 
                                            label="상세 주소 (동·호수)" 
                                            placeholder="나머지 주소를 입력해 주세요" 
                                        />
                                    </div>
                                )}
                            </div>
                        </section>

                        <Button 
                            type="submit" 
                            disabled={!form.formState.isValid} 
                            className="cursor-pointer w-full h-16 text-xl font-black rounded-2xl hover:bg-blue-800 text-white shadow-xl shadow-blue-100 disabled:bg-slate-400 active:scale-95 transition-all"
                        >
                            신청하기
                        </Button>
                    </form>
                </Form>
            </main>

            <AddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSelect={(addr) => {
                    setValue("address", addr, { shouldValidate: true });
                    setValue("address_detail", "");
                    setFocus("address_detail");
                }}
            />
        </div>
    );
}