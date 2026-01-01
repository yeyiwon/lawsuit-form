"use client";

import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (address: string) => void;
}

export function AddressModal({ isOpen, onClose, onSelect }: AddressModalProps) {
    const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
        if (data.bname !== "") extraAddress += data.bname;
        if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onSelect(fullAddress);
    onClose();
    };

return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[calc(100%-2rem)] max-w-lg p-0 overflow-hidden border-none shadow-2xl gap-0">
        <DialogHeader className="p-5 border-b border-slate-100 bg-white">
            <DialogTitle className="text-lg font-bold text-slate-900">
            주소 검색
            </DialogTitle>
        </DialogHeader>
        
        <div className="w-full h-[500px]">
        <DaumPostcodeEmbed 
            onComplete={handleComplete} 
            style={{ height: "100%" }} 
        />
        </div>
        </DialogContent>
    </Dialog>
    );
}