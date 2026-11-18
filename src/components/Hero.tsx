import React from "react";
import {
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  onOpenWaitlist: () => void;
  onScrollToDemo: () => void;
}

export function Hero({ onOpenWaitlist, onScrollToDemo }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* 배경 장식 은은한 그리드 패턴 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 타겟 뱃지 */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold mb-6 shadow-xs animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>건축사사무소 · 설계업체 · 인테리어 전문 솔루션</span>
          </div>

          {/* 메인 헤드라인 (요청 원문 정확 반영) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.18] max-w-4xl">
            건축 인허가 보완사항, <br className="hidden sm:inline" />
            <span className="text-[#2563EB] relative inline-block">
              이제 한곳에서 관리하세요.
            </span>
          </h1>

          {/* 서브 카피 (요청 원문 정확 반영) */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            보완 요청부터 서류 제출, 검토, 완료 확인까지 프로젝트별로 관리합니다.
            흩어진 카카오톡과 이메일 대신 세움터 제출까지 한 번에 정리하세요.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-card hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>무료 체험 시작</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onScrollToDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold text-base border border-[#E2E8F0] shadow-subtle transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-slate-500" />
              <span>사용 화면 보기</span>
            </button>
          </div>

          {/* 서브 안내 및 안심 요소 */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>14일간 모든 기능 무료 체험</span>
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>신용카드 등록 불필요</span>
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>고객·협력사 무가입 제출</span>
            </span>
          </div>
        </div>

        {/* 히어로 대시보드 목업 프리뷰 카드 */}
        <div className="mt-12 sm:mt-16 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-elevated overflow-hidden p-2 sm:p-4">
            {/* 맥 브라우저 형태 상단 바 */}
            <div className="flex items-center justify-between pb-3 px-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold text-slate-400 ml-2">
                  https://app.docflow.kr/projects/PRJ-2026-081
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                실제 대시보드 화면 예시
              </span>
            </div>

            {/* 메인 목업 레이아웃 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left">
              {/* 좌측 사이드바 요약 */}
              <div className="lg:col-span-4 bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      건축 인허가 보완 진행 중
                    </span>
                    <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>D-7일 남음</span>
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    서초구 방배동 근린생활시설 신축
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    허가청: 서초구청 건축과 (2차 보완 통보)
                  </p>
                </div>

                {/* 진행률 바 */}
                <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200/60">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">보완 서류 취합률</span>
                    <span className="text-[#2563EB]">67% (2/3 완료)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2563EB] h-full w-2/3 rounded-full" />
                  </div>
                </div>

                {/* 원클릭 서류 제출 링크 발송 카드 */}
                <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
                  <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                    <Send className="w-3 h-3 text-blue-600" />
                    <span>외부 협력사용 제출 링크</span>
                  </span>
                  <div className="mt-1.5 flex items-center gap-1 bg-white p-1.5 rounded border border-blue-200 text-[11px] text-slate-500 font-mono">
                    <span className="truncate flex-1">docflow.kr/s/x9k2p-seoul</span>
                    <span className="text-[10px] bg-blue-600 text-white font-sans px-1.5 py-0.5 rounded shrink-0">복사</span>
                  </div>
                </div>
              </div>

              {/* 우측 보완 체크리스트 테이블 */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                    <span>구청 보완 요구사항 체크리스트 (3건)</span>
                    <span className="text-slate-400">최근 업데이트: 오늘 14:20</span>
                  </div>

                  {/* 항목 1: 완료됨 */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            1. 지하 1층 구조계산서 지내력 보완
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            검토 완료
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          제출파일: (주)한국구조_방배동_지내력보완_v2.pdf (14.2MB)
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium shrink-0">11.16 제출</span>
                  </div>

                  {/* 항목 2: 제출됨 / 검토 대기 */}
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            2. 옥상 피난계단 유효너비 상세도 수정
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                            새 서류 도착
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          제출파일: A-301_계단단면상세_20261118.dwg
                        </p>
                      </div>
                    </div>
                    <button className="text-xs font-bold bg-[#2563EB] text-white px-2.5 py-1 rounded-lg shrink-0 hover:bg-blue-700">
                      검토하기
                    </button>
                  </div>

                  {/* 항목 3: 미제출 */}
                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded-full border-2 border-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            3. 대지 종횡단면도 인접대지 레벨 표기
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                            서류 요청 중
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          토목설계사무소 링크 열람 완료 (제출 대기)
                        </p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 hover:bg-slate-50">
                      재요청
                    </button>
                  </div>
                </div>

                {/* 하단 보완결과표 PDF 생성 버튼 */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    모든 서류가 준비되면 관공서용 결과표가 1초 만에 자동 생성됩니다.
                  </span>
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                    <FileText className="w-4 h-4" />
                    <span>보완결과표 PDF 미리보기</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
