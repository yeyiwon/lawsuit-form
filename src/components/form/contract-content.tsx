"use client";

import React from "react";

export function ContractContent() {
    return (
        <div className="relative w-full max-w-2xl mx-auto">
        <style jsx>{`
            .contract-scroll::-webkit-scrollbar {
            width: 3px;
            }
            .contract-scroll::-webkit-scrollbar-track {
            background: transparent;
            }
            .contract-scroll::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 10px;
            }
            .contract-scroll:hover::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            }
        `}</style>

        <div className="contract-scroll relative h-[400px] overflow-y-auto px-6 sm:px-12 py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
            
            <div className="mb-16 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-10 tracking-widest">민사사건 위임계약서</h3>
            
            <div className="flex justify-between items-end border-b-2 border-slate-900 pb-2 text-[13px]">
                <div className="text-left">
                <span className="text-[10px] text-slate-400 block mb-1 font-medium">위임인 (갑)</span>
                <p className="font-bold text-slate-800">본 설문 작성자</p>
                </div>
                <div className="text-right">
                <span className="text-[10px] text-slate-400 block mb-1 font-medium">수임인 (을)</span>
                <p className="font-bold text-slate-800">법률사무소 심주엽</p>
                </div>
            </div>
            </div>

            {/* 본문 시작 */}
            <div className="space-y-10 text-[13px] leading-[1.8] text-slate-700">
            
            <div className="space-y-1">
                <p className="font-bold text-slate-900">[사건의 표시]</p>
                <p className="text-slate-600">쿠팡 주식회사(대표자 박대준, 사업자등록번호 120-88-00767)에 대한 손해배상</p>
            </div>

            <p className="text-center text-slate-400 my-8">위 당사자들은 위 표시 사건의 처리에 관한 위임계약을 다음과 같이 체결합니다.</p>

            {/* 제1조 ~ 제16조 전문 */}
            <section className="space-y-8">
                <div>
                <h4 className="font-bold text-slate-900 mb-1">제1조【목 적】</h4>
                <p>갑은 을에게 위 표시 사건의 처리(이하 &quot;위임사무&quot;라 한다)를 위임하고, 을은 이를 수임한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제2조【위임한계】</h4>
                <p>갑이 을에게 위임하는 위임사무의 한계는 전 심급에 해당하고, 파기 환송된 사건이나 상소의 제기, 강제집행, 강제집행정지 등 부수적 절차에 관한 사항은 따로 정한다. 보전처분 사건의 경우, 이의사건 또는 취소사건은 별개의 위임사무로 한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제3조【수권범위】</h4>
                <p>갑은 을에게 따로 작성하여 교부하는 위임장 또는 선임서에 적은 자격과 권한을 수여한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제4조【수임인의 의무】</h4>
                <p>을은 변호사로서 법령에 정한 권리와 의무에 입각하여, 위임의 내용에 따라 선량한 관리자의 주의를 다하여 위임사무를 처리한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제5조【자료제공 등】</h4>
                <p>을이 위임사무를 처리하는데 필요하다고 인정하여 요구한 자료 또는 조회한 사항에 대하여 갑은 지체 없이 이에 응하여야 한다.</p>
                </div>

                <div className="py-6 border-y border-slate-100 space-y-6">
                <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-blue-600">제6조【착수보수】</h4>
                    <p>갑은 수임인(을)에게 별도의 착수보수금을 지급하지 아니한다 (0원).</p>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 mb-1">제7조【성과보수】</h4>
                    <p>가. 성과보수 : 위임사무가 판결, 재판상 내지 재판외 화해(화해권고결정 포함), 조정(조정에 갈음한 결정 포함) 등으로 성공한 때에는 다음 구분에 의하여 성과보수를 지급하기로 한다.</p>
                    <div className="pl-4 space-y-2 text-slate-500">
                    <p>① 전부 승소한 경우 : 판결 선고 금액(판결확정 시까지 발생한 지연손해금을 포함한다. 판결 외의 방법으로 사건이 종결된 경우 얻게 된 경제적 이익액을 승소금으로 본다)의 10%(부가세 포함. 이하 동일). 단 항소심에서 승소한 경우 20%, 상고심에서 승소한 경우 25%로 한다.</p>
                    <p>② 일부 승소한 경우 : 위 금액을 승소비율로 계산한 금액(부가가치세 별도)</p>
                    </div>
                    <p>나. 승소로 보는 경우 : 다음의 경우에는 승소로 보고, 위 가항에 정한 성과보수액을 지급하여야 한다.</p>
                    <ul className="pl-4 space-y-1 text-slate-500">
                    <li>① 을이 위임사무의 처리를 위하여 상당한 노력을 투입한 후 갑이 임의로 청구의 포기 또는 인낙, 소의 취하, 상소를 취하한 경우</li>
                    <li>② 을의 소송수행 결과로 인하여 상대방이 청구의 포기 또는 인낙, 소의 취하, 상소를 취하한 경우</li>
                    <li>③ 을의 소송수행 결과로 인하여 소송대상인 행정처분이 직권취소 되거나 경정처분 된 경우</li>
                    <li>④ 을이 위임사무 처리를 위하여 상당한 노력을 투입한 후 갑이 정당한 사유 없이 위임계약을 해지하거나, 제9조에 따라 을이 위임계약을 해지한 경우</li>
                    </ul>
                    <p>다. 전항 제1호 사유 중 갑이 아무런 경제적인 이득 또는 기타 이득이 없이 청구의 포기, 소의 취하, 인낙, 상소를 취하한 때에는 을의 노력 및 업무 수행 경과를 감안, 갑과 을이 상호 협의하여 성과보수를 조정할 수 있다.</p>
                </div>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제8조【비용부담】</h4>
                <p>① 을이 위임사무를 처리하는데 필요한 인지대, 송달료, 감정료, 예납금, 보증금, 등사료, 여비, 기타 필요한 실비는 그 전부를 을이 부담한다.</p>
                <p>② 갑은 소송에서 패소할 경우 상대방에게 소송비용을 부담할 수 있음을 확인한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제9조【계약해지】</h4>
                <p>갑이 이 위임계약에 정한 의무를 이행하지 아니하거나 위임사무의 내용에 관하여 진술한 사실이 허위인 때에는, 고의가 아닌 경우라도 을은 이 계약을 해지하고 사임할 수 있다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제10조【통지의무】</h4>
                <p>을은 위임사무의 중요한 처리상황 및 그 결과를 갑에게 통지하고, 위임이 종료한 때에는 그 결과를 갑에게 지체 없이 통지하여야 한다. 이때 통지는 이메일, 문자메세지, 카카오톡 메시지 등으로 할 수 있다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제11조【자료의 보관책임】</h4>
                <p>을이 위임사무를 처리하기 위하여 갑으로부터 제공받은 자료는 위임 종료 시 갑에게 수령할 것을 통지한 후 3개월 내에 별다른 의사표시가 없을 경우 을은 이를 임의로 폐기할 수 있다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제12조【지급보장】</h4>
                <p>① 을은 이 위임계약에 정한 비용 또는 보수의 지급을 확실하게 보장하기 위하여 갑에게 필요한 조치를 요구할 수 있다.</p>
                <p>② 을은 갑이 제1항의 비용 또는 보수의 지급의무를 이행하지 아니하는 때에는, 위임사무의 처리에 관련하여 보관하게 된 금전, 문서 또는 자료 등을 유치하거나 상계처리 할 수 있다.</p>
                <p>③ 전항의 경우 을은 신속하게 갑에게 그 취지를 통지하여야 한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제13조【인장조각】</h4>
                <p>이 위임계약의 수행 상 필요한 경우, 을은 갑 또는 당사자의 인장을 조각하여 사용할 수 있다. 단, 을은 사후에 인장조각 및 사용사실을 통지하여야 한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제14조【비밀유지】</h4>
                <p>을은 업무상 취득한 갑의 모든 비밀정보를 비밀로 유지하고, 업무 수행상 필요하거나 법적으로 공개가 요구되는 경우 이외에는 갑의 동의 없이 제3자에게 공개하지 아니한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제15조【민법과의 관계】</h4>
                <p>기타 위임사항에 관하여 이 위임계약서에 특별히 규정되어 있는 사항을 제외하고는 민법상 위임에 관한 규정이 정한 바에 의한다.</p>
                </div>

                <div>
                <h4 className="font-bold text-slate-900 mb-1">제16조【합의관할】</h4>
                <p>이 위임계약으로 인하여 발생하는 일체의 소송에 대하여는 서울중앙지방법원을 전속관할로 한다.</p>
                </div>
            </section>
            </div>
            <div className="mt-20 pt-10 border-t border-slate-900 text-center">
            <p className="text-sm font-bold text-slate-900">법률사무소 심주엽</p>
            <p className="text-[11px] text-slate-400 mt-2">본 계약은 전자서명법에 따라 체결됩니다.</p>
            </div>
        </div>
        </div>
    );
}