export interface Application {
    id: string;
    created_at: string;
    has_leak_notice: string;
    is_member_during_period: string;
    name: string;
    phone: string;
    nationality: string;
    birth: string;
    email: string;
    has_guardian: string;
    guardian_name?: string;
    guardian_phone?: string;
    guardian_birth?: string;
    guardian_relation?: string;
    address: string;
    address_detail: string;
    privacy_agree: string;
    contract_confirm: string;
}