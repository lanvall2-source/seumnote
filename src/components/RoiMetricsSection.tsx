import React, { useState } from "react";
import { Clock, ShieldCheck, FileCheck, Calculator, ArrowRight, Sparkles } from "lucide-react";

interface RoiMetricsSectionProps {
  onOpenWaitlist?: () => void;
}

export function RoiMetricsSection({ onOpenWaitlist }: RoiMetricsSectionProps) {
  const [projectCount, setProjectCount] = useState<number>(4);
  const [partnerCount, setPartnerCount] = useState<number>(4);

  // 프로젝트당 협력사 조율 시간 절감 계산 (프로젝트당 약 4.5시간 소요 중 75%인 3.4시간 절감)
  const savedHoursPerMonth = Math.round(projectCount * partnerCount * 0.9);
  const savedCostPerYearManWon = Math.round((savedHoursPerMonth * 30000 * 12) / 10000);

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

        {/* 3대 정량 지표 카드 */}
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

        {/* 인터랙티브 ROI 계산기 위젯 */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Calculator className="w-3.5 h-3.5" />
                <span>우리 사무소 맞춤 절감 효과 계산기</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  한 달에 인허가 프로젝트를 얼마나 진행하고 계신가요?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                  슬라이더를 조절하여 세움노트 도입 시 예상되는 시간과 비용 절감액을 확인해보세요.
                </p>
              </div>

              {/* 슬라이더 컨트롤 */}
              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-slate-300">월간 진행 프로젝트 수</span>
                    <span className="text-blue-400 font-bold text-base">{projectCount}개 프로젝트</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={projectCount}
                    onChange={(e) => setProjectCount(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>1개</span>
                    <span>8개</span>
                    <span>15개+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-slate-300">프로젝트당 협력업체 수 (구조, 토목, 설비, 소방 등)</span>
                    <span className="text-blue-400 font-bold text-base">{partnerCount}개 업체</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={partnerCount}
                    onChange={(e) => setPartnerCount(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>2개</span>
                    <span>5개</span>
                    <span>8개</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 계산 결과 카드 */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/15 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Sparkles className="w-4 h-4" />
                <span>예상 절감 시뮬레이션 결과</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
                  <div className="text-[11px] text-slate-300">월간 절약 업무시간</div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    약 {savedHoursPerMonth}시간
                  </div>
                  <div className="text-[10px] text-blue-300 mt-1">서류 취합·버전검토 시간</div>
                </div>

                <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
                  <div className="text-[11px] text-slate-300">연간 기회비용 절감</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                    약 {savedCostPerYearManWon.toLocaleString()}만원
                  </div>
                  <div className="text-[10px] text-emerald-300 mt-1">인건비 및 공기지연 방지</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                💡 <span className="font-semibold text-white">세움노트 Pro 요금제(월 19,900원)</span> 기준,
                투자 대비 <strong className="text-emerald-400">약 {Math.max(10, Math.round((savedCostPerYearManWon * 10000) / (19900 * 12)))}배 이상의 가치</strong>를 창출합니다.
              </div>

              {onOpenWaitlist && (
                <button
                  onClick={onOpenWaitlist}
                  className="w-full py-3 px-4 rounded-xl font-bold bg-[#2563EB] hover:bg-blue-600 text-white text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/25"
                >
                  <span>14일 무료 체험으로 지금 절감하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
