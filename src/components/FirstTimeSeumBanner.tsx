import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Eye,
  EyeOff,
  Share2,
  ArrowRight,
  ShieldCheck,
  Send,
  Layers,
  Sparkles,
} from "lucide-react";
import { SeumArchitectureDiagram } from "./SeumArchitectureDiagram";

interface FirstTimeSeumBannerProps {
  onOpenGuideModal: () => void;
  onOpenShareModal: () => void;
  onOpenWaitlist: () => void;
}

const STORAGE_KEY = "seum_onboarding_collapsed_v1";

export function FirstTimeSeumBanner({
  onOpenGuideModal,
  onOpenShareModal,
  onOpenWaitlist,
}: FirstTimeSeumBannerProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [showDiagram, setShowDiagram] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {}
  }, [isCollapsed]);

  return (
    <aside
      aria-label="세움노트 첫 방문자 3분 퀵 스타트 가이드"
      className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-[#1E293B] to-slate-900 border border-blue-500/30 shadow-xl overflow-hidden text-slate-100 transition-all duration-200 mb-8"
    >
      {/* 배너 상단 헤더 바 */}
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-black shrink-0 shadow-xs">
            <FileCheck2 className="w-4 h-4 stroke-[2.4]" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm text-white">
              처음 오셨나요? 3분 인허가 보완 퀵가이드
            </span>
            <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/40">
              세움터 보완기간 75% 단축
            </span>
          </div>
        </div>

        {/* 우측 퀵 컨트롤 버튼들 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isCollapsed && (
            <button
              type="button"
              onClick={() => setShowDiagram((prev) => !prev)}
              className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
            >
              {showDiagram ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">구조도 닫기</span>
                  <span className="sm:hidden">구조도</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">워크플로우 구조도 보기</span>
                  <span className="sm:hidden">구조도</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onOpenGuideModal}
            className="text-xs font-bold text-blue-300 hover:text-white bg-blue-600/20 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg border border-blue-500/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">상세 가이드 &amp; FAQ</span>
            <span className="sm:hidden">가이드</span>
          </button>

          <button
            type="button"
            onClick={onOpenShareModal}
            className="text-xs font-semibold text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="동료에게 세움노트 공유"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isCollapsed ? "퀵가이드 펼치기" : "퀵가이드 접기"}
            title={isCollapsed ? "펼치기" : "접기"}
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 접힌 상태 요약 뷰 */}
      {isCollapsed ? (
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs font-medium truncate">
            <span className="text-blue-400 font-bold shrink-0">1. 보완사항 등록</span>
            <span className="text-slate-600">➔</span>
            <span className="text-sky-400 font-bold shrink-0">2. 협력사 제출링크 발송</span>
            <span className="text-slate-600">➔</span>
            <span className="text-emerald-400 font-bold shrink-0">3. 세움터 A4 결과표 출력</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="text-xs font-bold text-blue-400 hover:underline shrink-0 ml-3 cursor-pointer"
          >
            펼치기
          </button>
        </div>
      ) : (
        /* 펼쳐진 상태 본문 뷰 */
        <div className="p-4 sm:p-6 space-y-4">
          {/* 3단계 퀵 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1단계 */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                    세움터 접수
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  보완사항 항목별 등록
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  구청 보완 공문 내용을 구조·소방·토목 등 공종별 체크리스트로 등록하고 마감 D-Day를 지정합니다.
                </p>
              </div>
            </div>

            {/* 2단계 */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/30">
                    무가입 제출
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  협력사 원클릭 링크 발송
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  구조사무소·건축주에게 카톡 링크를 보내면 회원가입 없이 도면과 계산서를 모바일·웹에서 즉시 업로드합니다.
                </p>
              </div>
            </div>

            {/* 3단계 */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    A4 표준 서식
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  세움터 PDF 결과표 생성
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  승인된 최신 도서로 지자체 세움터 제출용 [인허가 보완 조치결과표]를 1초 만에 자동 생성하여 다운로드합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 인라인 아키텍처 다이어그램 (토글 시 렌더링) */}
          {showDiagram && (
            <div className="pt-2 animate-in fade-in zoom-in-98 duration-200">
              <SeumArchitectureDiagram />
            </div>
          )}

          {/* 하단 퀵 액션 링크 바 */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TLS 1.3 암호화 보안 전송 · 14일 무료 체험 제공</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenGuideModal}
                className="text-blue-400 hover:text-blue-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>인허가 필수 서류 규격표 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
