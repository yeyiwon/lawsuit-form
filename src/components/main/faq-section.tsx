"use client";

import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
return (
    <section id="faq" className="bg-slate-50 py-24 w-full">
    <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tight">자주 묻는 질문</h2>
        <p className="text-slate-500 font-medium">소송 참여 전 궁금하신 점을 확인해 보세요.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
        {[
            { q: "1. 제가 제출할 서류는 무엇이 있을까요?", a: "추후, 위임계약서, 선정당사자 선정서 등은 온라인으로 전자서명 요청할 예정이니 오프라인으로 준비하실 것은 전혀 없습니다. 입증서류로는 쿠팡으로부터 받은 개인정보 유출 확인 문자 또는 이메일의 스크린 캡처 파일 등을 보내주시면 됩니다. 더 필요한 자료가 있으면 추후 안내드리도록 하겠습니다." },
            { q: "2. 소송 기간은 얼마나 걸릴까요?", a: "1심에서 종료될 경우 통상적으로 1-2년 가량이 소요됩니다. 다만, 이번 사건의 경우 3심까지 진행될 가능성까지 염두에 두어야 하므로, 상당한 시간이 필요하게 될 수 있습니다." },
            { q: "3. 배상금은 얼마나 받을 수 있을까요?", a: "상대방의 대응 등 실제 사건이 어떻게 진행되는지에 따라 다르나, 당소에서는 위자료로서 최소 10만원에서 최대 30만원 정도로 예상하고 있습니다. 소송 제기시에는 10만원~20만원으로 시작해서 진행 과정에서 구체적 사실관계의 확정 및 증거 현출에 따라 청구금액을 확장하는 방식으로 진행하고자 합니다." },
            { q: "4. 미성년자도 소송에 참여할 수 있나요?", a: "법정대리인(부모님 등)의 동의가 있다면 소송에 참여하실 수 있습니다." },
            { q: "5. 쿠팡은 결제 정보는 유출되지 않았다고 하던데 그래도 소송 할 필요가 있나요?", a: "접근 가능한 상태가 된 것만으로도 개인정보보호법 위반 책임이 발생합니다." },
            { q: "6. 쿠팡은 2025. 12. 26. 자체 조사 결과라고 하면서 유출자가 약 3,300명 고객 정보에 접근했으나 약 3,000개 계정 정보만 저장했다고 주장하고 있는데, 이런 경우도 손해배상을 받을 수 있나요?", a: "네, 개인정보는 제3자가 접근하여 내용을 알 수 있는 상태만 되어도 개인정보보호법 위반에 따른 법적 책임(안전조치 의무 위반 및 유출 신고 의무)이 즉시 발생하며, 개인정보 주체에게 실제 손해가 발생하지 않았다고 하더라더라도 '정신적 고통'에 대해 손해(위자료)배상을 청구할 수 있습니다." }
        ].map((item, index) => (
            <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="cursor-pointer bg-white px-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <AccordionTrigger className="cursor-pointer flex flex-1 items-center justify-between py-6 font-bold text-slate-900 hover:no-underline transition-all [&>svg]:block [&>svg]:text-slate-400 [&>svg]:transition-transform [&>svg]:duration-300">
                <span className="text-left leading-relaxed">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pt-2">
                    {item.a}
                </div>
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
        </div>
    </section>
    );
}