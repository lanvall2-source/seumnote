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
import { FirstTimeSeumBanner } from "@/components/FirstTimeSeumBanner";
import { SeumGuideAndFaqModal } from "@/components/SeumGuideAndFaqModal";
import { SnsShareModal } from "@/components/SnsShareModal";

export function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleOpenWaitlist = () => setWaitlistOpen(true);
  const handleCloseWaitlist = () => setWaitlistOpen(false);

  const handleOpenAdmin = () => setAdminOpen(true);
  const handleCloseAdmin = () => setAdminOpen(false);

  const handleOpenGuide = () => setGuideOpen(true);
  const handleCloseGuide = () => setGuideOpen(false);

  const handleOpenShare = () => setShareOpen(true);
  const handleCloseShare = () => setShareOpen(false);

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
        onOpenGuideModal={handleOpenGuide}
        onOpenShareModal={handleOpenShare}
      />

      {/* 메인 랜딩 콘텐츠 */}
      <main className="flex-1">
        {/* 상단 첫 방문자 3단계 퀵 스타트 배너 & 워크플로우 아키텍처 다이어그램 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <FirstTimeSeumBanner
            onOpenGuideModal={handleOpenGuide}
            onOpenShareModal={handleOpenShare}
            onOpenWaitlist={handleOpenWaitlist}
          />
        </div>

        <Hero
          onOpenWaitlist={handleOpenWaitlist}
          onScrollToDemo={handleScrollToDemo}
          onOpenGuideModal={handleOpenGuide}
          onOpenShareModal={handleOpenShare}
        />
        <RoiMetricsSection onOpenWaitlist={handleOpenWaitlist} />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks onOpenWaitlist={handleOpenWaitlist} />
        <ProductDemo />
        <PricingSection onOpenWaitlist={handleOpenWaitlist} />
        <FaqSection />
      </main>

      {/* 푸터 */}
      <Footer
        onOpenWaitlist={handleOpenWaitlist}
        onOpenGuideModal={handleOpenGuide}
        onOpenShareModal={handleOpenShare}
      />

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

      {/* 첫 방문자 가이드 & 인허가 실무 FAQ & 서류 규격 모달 */}
      <SeumGuideAndFaqModal
        isOpen={guideOpen}
        onClose={handleCloseGuide}
        onOpenWaitlist={handleOpenWaitlist}
        onOpenShareModal={handleOpenShare}
      />

      {/* SNS 및 페이지 링크 공유 모달 */}
      <SnsShareModal
        isOpen={shareOpen}
        onClose={handleCloseShare}
      />
    </div>
  );
}

export default App;
