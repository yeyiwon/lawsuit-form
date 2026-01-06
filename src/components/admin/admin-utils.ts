
    import * as XLSX from "xlsx";
    import { Application } from "./admin-types";

    interface ExportRow {
    "성함": string;
    "연락처": string;
    "생년월일": string;
    "이메일": string;
    "유출통지여부": string;
    "기간내 가입여부": string;
    "미성년여부": string;
    "법정대리인 성함": string;
    "법정대리인 생년월일": string;
    "법정대리인 연락처": string;
    "법정대리인 관계": string;
    "주소": string;
    "상세주소": string;
    "개인정보동의": string;
    "계약체결동의": string;
    "신청일시": string;
    }

    const mapDataToKorean = (data: Application[]): ExportRow[] => {
    return data.map((item) => ({
        "성함": item.name,
        "연락처": item.phone,
        "생년월일": item.birth,
        "이메일": item.email,
        "유출통지여부": item.has_leak_notice === "yes" ? "예" : "아니오",
        "기간내 가입여부": item.is_member_during_period === "yes" ? "예" : "아니오",
        "미성년여부": item.has_guardian === "yes" ? "미성년" : "성인",
        "법정대리인 성함": item.guardian_name || "-",
        "법정대리인 생년월일": item.guardian_birth || "-",
        "법정대리인 연락처": item.guardian_phone || "-",
        "법정대리인 관계": item.guardian_relation || "-",
        "주소": item.address,
        "상세주소": item.address_detail,
        "개인정보동의": item.privacy_agree === "agree" ? "동의" : "미동의",
        "계약체결동의": item.contract_confirm || "미동의",
        "신청일시": item.created_at ? new Date(item.created_at).toLocaleString('ko-KR') : "-",
    }));
    };

    export const downloadFileData = (data: Application[], format: 'xlsx' | 'csv') => {
    if (data.length === 0) return false;

    const koreanData = mapDataToKorean(data);
    const worksheet = XLSX.utils.json_to_sheet(koreanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "신청자명단");

    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `신청자명단_${dateStr}.${format}`;

    if (format === 'xlsx') {
        XLSX.writeFile(workbook, fileName);
    } else {
        XLSX.writeFile(workbook, fileName, { bookType: 'csv' });
    }
    return true;
    };