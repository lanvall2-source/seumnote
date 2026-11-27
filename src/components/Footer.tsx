import React from "react";
import { FileCheck2, ShieldCheck, Mail, ArrowUp, Share2, HelpCircle } from "lucide-react";

interface FooterProps {
  onOpenWaitlist: () => void;
  onOpenGuideModal?: () => void;
  onOpenShareModal?: () => void;
}

export function Footer({
  onOpenWaitlist,
  onOpenGuideModal,
  onOpenShareModal,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 사전 하단 CTA 배너 */}
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white text-center mb-16 shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full uppercase tracking-wider">
              Get Started
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              인허가 보완의 번거로움, <br className="hidden sm:inline" />
              오늘부터 세움노트로 해결하세요
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              신용카드 등록 없이 14일간 모든 기능을 무료로 체험하실 수 있습니다.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="px-8 py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-black text-sm sm:text-base rounded-xl shadow-card transition-all cursor-pointer"
              >
                14일 무료 체험 지금 시작하기
              </button>
            </div>
          </div>
        </div>

        {/* 푸터 메인 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                <FileCheck2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-black text-xl tracking-tight text-[#0F172A]">
                세움노트
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-medium">
              건축사사무소 및 설계 전문 업체를 위한 인허가 보완 서류 관리 및 세움터 결과표 자동화 B2B SaaS 솔루션입니다.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TLS 1.3 암호화 & 데이터 안전 격리 보관</span>
            </div>
            {onOpenShareModal && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>동료 건축사에게 세움노트 공유</span>
                </button>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              바로가기
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li><a href="#features" className="hover:text-blue-600">핵심 기능</a></li>
              <li><a href="#workflow" className="hover:text-blue-600">사용 방법</a></li>
              <li><a href="#demo" className="hover:text-blue-600">화면 예시</a></li>
              <li><a href="#pricing" className="hover:text-blue-600">요금제</a></li>
              <li><a href="#faq" className="hover:text-blue-600">자주 묻는 질문</a></li>
              {onOpenGuideModal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenGuideModal}
                    className="text-blue-600 hover:underline font-bold text-left cursor-pointer"
                  >
                    가이드 &amp; 서류 규격표 모달
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              고객 지원 & 문의
            </h4>
            <div className="space-y-2 text-xs font-medium text-slate-500">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@seumnote.kr</span>
              </p>
              <p>운영시간: 평일 09:30 ~ 18:30 (주말/공휴일 휴무)</p>
              <p className="text-[11px] text-slate-400">
                건축사협회 및 설계사무소 단체 도입 상담 문의 환영
              </p>
            </div>
          </div>
        </div>

        {/* 저작권 및 카피라이트 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} 세움노트 (SeumNote). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">이용약관</span>
            <span>&bull;</span>
            <span className="hover:text-slate-600 cursor-pointer">개인정보처리방침</span>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-600 cursor-pointer"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
