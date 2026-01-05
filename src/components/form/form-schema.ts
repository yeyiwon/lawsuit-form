import * as z from "zod";

export const formSchema = z.object({
    has_leak_notice: z.string().min(1, "확인 여부를 선택해주세요."),
    is_member_during_period: z.string().min(1, "가입 여부를 선택해주세요."),
    privacy_agree: z.string().min(1, "동의 여부를 선택해주세요."),
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
    address: z.string().min(1, "주소를 입력해주세요."),
    address_detail: z.string().min(1, "상세 주소를 입력해주세요."),
    contract_confirm: z.any().refine((val) => val === "동의합니다", {
        message: "'동의합니다'를 정확히 입력해주세요.",
    }),
});

export type FormValues = z.infer<typeof formSchema>;