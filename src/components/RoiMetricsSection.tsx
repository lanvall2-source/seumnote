import React from "react";
import { Clock, ShieldCheck, FileCheck, TrendingDown, Users, Bell } from "lucide-react";

export function RoiMetricsSection() {
  const metrics = [
    {
      icon: Clock,
      value: "월 18시간",
      label: "서류 수합 업무 절감",
      description: "카카오톡, 문자, 이메일로 흩어진 협력사 서류 취합 및 확인 소요 시간 75% 단축",
      subtext: "소장님·실무자가 설계 본업에 집중할 수 있는 환경",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "보완 회신기한 준수율",
      description: "인허가 보완 마감 D-Day 실시간 표시 및 협력사 카카오톡 알림톡 자동 독촉",
      subtext: "기한 초과로 인한 허가 반려 및 연장 공문 작성 방지",
    },
    {
      icon: FileCheck,
      value: "0건",
      label: "구버전 도면 제출 사고",
      description: "동일 도면의 버전(v1, v2) 자동 이력 관리로 세움터에 구버전을 올리는 실수 원천 차단",
      subtext: "구청 재보완 발생률 최소화",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Proven Business Impact
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight mt-3">
            세움노트 도입으로 달라지는 <br className="hidden sm:inline" />
            건축사사무소 실무 성과
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            인허가 보완 서류를 찾아 헤매던 시간과 스트레스를 획기적으로 줄여드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-card transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-5">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-base font-bold text-[#2563EB] mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
