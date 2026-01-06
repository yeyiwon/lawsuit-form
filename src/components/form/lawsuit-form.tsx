"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Header from "../layout/header";
import { AddressModal } from "./address-modal";

import { formSchema, FormValues } from "./form-schema";
import { 
    QualificationSection, 
    PrivacyAgreeSection, 
    ApplicantInfoSection, 
    GuardianSection, 
    AddressSection, 
    ContractSection 
} from "./form-sections";

const STORAGE_KEY = "lawsuit_form_draft";
const EXPIRE_TIME = 24 * 60 * 60 * 1000;

export default function LawsuitForm() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 추가

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: { 
            has_leak_notice: "", is_member_during_period: "",
            name: "", phone: "", birth: "", email: "", 
            nationality: "native", has_guardian: "no",
            guardian_name: "", guardian_phone: "", guardian_birth: "", guardian_relation: "",
            address: "", address_detail: "", privacy_agree: "", contract_confirm: "",
        },
    });

    const { watch, setValue, setFocus, reset, control, formState: { isValid } } = form;

    const formData = watch();
    const nationality = formData.nationality || "native";
    const hasGuardian = formData.has_guardian || "no";
    const currentAddress = formData.address || "";

    useEffect(() => {
        const savedItem = localStorage.getItem(STORAGE_KEY);
        if (savedItem) {
            try {
                const { data, timestamp } = JSON.parse(savedItem);
                if (new Date().getTime() - timestamp < EXPIRE_TIME) {
                    reset(data as FormValues);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch (e) {
                console.error("데이터 복구 실패", e);
            }
        }
        setIsLoaded(true);
    }, [reset]);

    useEffect(() => {
        if (!isLoaded || isSubmitting) return; 
        
        const draft = { data: formData, timestamp: new Date().getTime() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }, [formData, isLoaded, isSubmitting]);

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        const toastId = toast.loading("신청서를 제출 중입니다...");
        setIsSubmitting(true); 
        
        try {
            const { error } = await supabase.from('applications').insert([values]);
            if (error) throw error;

            localStorage.removeItem(STORAGE_KEY);
            toast.success("접수되었습니다!", { id: toastId });
            
            reset();
            router.push("/complete");
        } catch (error: unknown) {
            setIsSubmitting(false); 
            const message = error instanceof Error ? error.message : "전송 오류";
            toast.error("실패: " + message, { id: toastId });
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900">
            <Header title="단체소송 신청서" />
            <main className="max-w-xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-20">
                    <h1 className="text-3xl font-black tracking-tight leading-tight">
                        쿠팡 개인정보 유출 피해<br />
                        <span className="text-blue-600">단체소송 신청서</span>
                    </h1>
                </header>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24">
                        <QualificationSection control={control} />
                        <PrivacyAgreeSection control={control} />
                        <ApplicantInfoSection control={control} nationality={nationality} />
                        
                        <GuardianSection 
                            control={control} 
                            hasGuardian={hasGuardian} 
                            setValue={setValue} 
                        />
                        
                        <AddressSection 
                            control={control} 
                            currentAddress={currentAddress} 
                            onSearch={() => setIsModalOpen(true)} 
                        />
                        <ContractSection control={control} />

                        <Button 
                            type="submit" 
                            disabled={!isValid || isSubmitting} 
                            className={`cursor-pointer w-full h-20 text-xl font-black rounded-2xl transition-all shadow-xl ${
                                isValid && !isSubmitting ? "bg-blue-600 text-white hover:scale-[1.01]" : "bg-slate-100 text-slate-400"
                            }`}
                        >
                            {isSubmitting ? "제출 중..." : "신청서 제출하기"}
                        </Button>
                    </form>
                </Form>
            </main>

            <AddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSelect={(addr: string) => { 
                    setValue("address", addr, { shouldValidate: true }); 
                    setTimeout(() => setFocus("address_detail"), 100);
                }} 
            />
        </div>
    );
}