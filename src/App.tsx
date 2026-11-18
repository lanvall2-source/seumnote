import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RoiMetricsSection } from "@/components/RoiMetricsSection";
import { ProblemSection } from "@/components/ProblemSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductDemo } from "@/components/ProductDemo";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { AdminWaitlistDrawer } from "@/components/AdminWaitlistDrawer";

export function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleOpenWaitlist = () => setWaitlistOpen(true);
  const handleCloseWaitlist = () => setWaitlistOpen(false);

  const handleOpenAdmin = () => setAdminOpen(true);
  const handleCloseAdmin = () => setAdminOpen(false);

  const handleScrollToDemo = () => {
    const demoElement = document.getElementById("demo");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 네비게이션 헤더 */}
      <Navbar
        onOpenWaitlist={handleOpenWaitlist}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 메인 랜딩 콘텐츠 */}
      <main className="flex-1">
        <Hero
          onOpenWaitlist={handleOpenWaitlist}
          onScrollToDemo={handleScrollToDemo}
        />
        <RoiMetricsSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks onOpenWaitlist={handleOpenWaitlist} />
        <ProductDemo />
        <PricingSection onOpenWaitlist={handleOpenWaitlist} />
        <FaqSection />
      </main>

      {/* 푸터 */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* 14일 무료 체험 신청 모달 */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={handleCloseWaitlist}
      />

      {/* 관리자 신청자 목록 확인 드로어 */}
      <AdminWaitlistDrawer
        isOpen={adminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  );
}

export default App;
