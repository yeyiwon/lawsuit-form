
import Footer from "@/src/components/layout/footer";
import Header from "@/src/components/layout/header";
import MainContainer from "@/src/components/layout/main-container";
import FAQ from "@/src/components/faq-section";
import Hero from "@/src/components/hero";
import InfoCards from "@/src/components/info-card";
import Timeline from "@/src/components/time-line-card";
import GuideCTA from "@/src/components/guide-cta";
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