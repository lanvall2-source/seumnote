import React from "react";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Megaphone } from "lucide-react";
import { PRICING_PLAN } from "@/lib/constants";

interface PricingSectionProps {
  onOpenWaitlist: () => void;
}

export function PricingSection({ onOpenWaitlist }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-4 leading-snug">
            불필요한 기능 거품을 뺀 <br className="hidden sm:inline" />
            건축사 맞춤 단일 정직 요금제
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            비싼 엔터프라이즈 ERP 대신, 인허가 보완 업무에 꼭 필요한 핵심 기능만 합리적인 월 1만 원대로 제공합니다.
          </p>
        </div>

        {/* 요금제 카드 (단일 Pro 플랜) */}
        <div className="mt-12 sm:mt-16 max-w-lg mx-auto">
          <div className="rounded-3xl border-2 border-[#2563EB] bg-[#F8FAFC] p-8 sm:p-10 shadow-elevated relative overflow-hidden">
            {/* 상단 추천 뱃지 */}
            <div className="absolute top-0 right-0 bg-[#2563EB] text-white text-xs font-extrabold px-5 py-1.5 rounded-bl-2xl shadow-subtle">
              14일 무료 체험 제공
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-black text-[#0F172A]">
                {PRICING_PLAN.name} 플랜
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">
                건축사 추천
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
              {PRICING_PLAN.description}
            </p>

            {/* 가격 표시 */}
            <div className="flex items-baseline gap-1.5 pb-6 border-b border-slate-200">
              <span className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
                ₩{PRICING_PLAN.price}
              </span>
              <span className="text-sm font-bold text-slate-500">
                / {PRICING_PLAN.period} (부가세 별도)
              </span>
            </div>

            {/* 포함 기능 목록 (지침 스펙 100% 반영) */}
            <div className="py-6 space-y-3.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                포함된 핵심 혜택 및 사용량
              </span>
              {PRICING_PLAN.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA 버튼 */}
            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base shadow-card hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>14일 무료 체험 신청하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* 투명한 안내 고지 (요청사항 100% 준수: 결제 미구현 허위구매 방지) */}
            <div className="mt-5 p-3.5 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium leading-relaxed inline-flex items-center justify-center gap-1.5 flex-wrap">
                <Megaphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{PRICING_PLAN.notice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
