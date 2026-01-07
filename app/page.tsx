import { Metadata } from "next";
import Footer from "@/src/components/layout/footer";
import Header from "@/src/components/layout/header";
import MainContainer from "@/src/components/layout/main-container";
import FAQ from "@/src/components/main/faq-section";
import Hero from "@/src/components/main/hero";
import InfoCards from "@/src/components/main/info-card";
import Timeline from "@/src/components/main/time-line-card";
import GuideCTA from "@/src/components/main/guide-cta";
import ScrollToTop from "@/src/ui/scroll-to-top";

export const metadata: Metadata = {
  // metadataBase: new URL("https://domain.com"), 
  title: "쿠팡 개인정보 유출 단체소송 신청센터 | 법률사무소 심주엽",
  description: "착수금 0원. 3,370만 명의 쿠팡 피해자를 위한 위자료 청구 단체소송. 지금 바로 유출 여부를 확인하고 1분 만에 신청하세요.",
  openGraph: {
    title: "쿠팡 개인정보 유출 단체소송 - 법률사무소 심주엽",
    description: "착수금 없이 진행되는 쿠팡 유출 단체소송, 지금 바로 접수하세요.",
    images: ["/images/og-thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <MainContainer>
        <Hero />
        <InfoCards />
        <Timeline />
        <GuideCTA />
        <FAQ />
      </MainContainer>
      <Footer />
      <ScrollToTop />
    </div>
  );
}