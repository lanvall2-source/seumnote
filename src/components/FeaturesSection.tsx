import React from "react";
import {
  CheckSquare,
  Link2,
  FileCheck,
  BarChart3,
  FileDown,
  History,
  CheckCircle2,
} from "lucide-react";
import { CORE_FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case "supplement-management":
        return <CheckSquare className="w-6 h-6 text-[#2563EB]" />;
      case "submission-link":
        return <Link2 className="w-6 h-6 text-[#2563EB]" />;
      case "file-review":
        return <FileCheck className="w-6 h-6 text-[#2563EB]" />;
      case "project-status":
        return <BarChart3 className="w-6 h-6 text-[#2563EB]" />;
      case "result-pdf":
        return <FileDown className="w-6 h-6 text-[#2563EB]" />;
      case "version-history":
        return <History className="w-6 h-6 text-[#2563EB]" />;
      default:
        return <CheckSquare className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Core Features
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-4 leading-snug">
            인허가 보완의 모든 단계, <br className="hidden sm:inline" />
            DocFlow 하나로 끝냅니다
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            건축사사무소 실무자의 실제 워크플로우를 그대로 담아 설계했습니다. <br className="hidden sm:inline" />
            복잡한 설정 없이 프로젝트 등록 즉시 오늘부터 업무에 적용할 수 있습니다.
          </p>
        </div>

        {/* 6대 핵심 기능 3열 그리드 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-subtle hover:shadow-card hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    {getFeatureIcon(feature.id)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* 하이라이트 체크 목록 */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                {feature.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
