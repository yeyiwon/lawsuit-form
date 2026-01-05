
import Footer from "@/src/components/layout/footer";
import Header from "@/src/components/layout/header";
import MainContainer from "@/src/components/layout/main-container";
import FAQ from "@/src/components/main/faq-section";
import Hero from "@/src/components/main/hero";
import InfoCards from "@/src/components/main/info-card";
import Timeline from "@/src/components/main/time-line-card";
import GuideCTA from "@/src/components/main/guide-cta";
import ScrollToTop from "@/src/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <MainContainer>
      <Hero />
      <InfoCards />
      <Timeline />
      <GuideCTA />
      <FAQ/>

      </MainContainer>
      <Footer/>
      <ScrollToTop />
      </div>
  );
}