import React from "react";
import { FolderPlus, ListTodo, Share2, Award, ArrowRight } from "lucide-react";
import { WORKFLOW_STEPS } from "@/lib/constants";

interface HowItWorksProps {
  onOpenWaitlist: () => void;
}

export function HowItWorks({ onOpenWaitlist }: HowItWorksProps) {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <FolderPlus className="w-6 h-6 text-[#2563EB]" />;
      case 1:
        return <ListTodo className="w-6 h-6 text-[#2563EB]" />;
      case 2:
        return <Share2 className="w-6 h-6 text-[#2563EB]" />;
      case 3:
        return <Award className="w-6 h-6 text-emerald-600" />;
      default:
        return <FolderPlus className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-4 leading-snug">
            단 4단계로 간결해지는 <br className="hidden sm:inline" />
            인허가 보완 업무 프로세스
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            건축주에게 전화로 길게 설명하고 메일함을 뒤질 필요가 없습니다. <br className="hidden sm:inline" />
            링크 하나로 서류를 모으고 지자체 제출용 결과표를 완성하세요.
          </p>
        </div>

        {/* 4단계 프로세스 카드 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-card transition-all relative group"
            >
              {/* 단계 번호 */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
                  {getStepIcon(idx)}
                </div>
                <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                  {step.step}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#2563EB]">
                <span>Step {idx + 1} 완료 시 다음 단계 자동 전환</span>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 프로세스 완료 CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenWaitlist}
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 px-6 py-3 rounded-xl shadow-subtle transition-all cursor-pointer"
          >
            <span>지금 무료 체험으로 직접 테스트해보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
