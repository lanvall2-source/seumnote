import React from "react";
import {
  FileCheck2,
  Send,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FolderSync,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function SeumArchitectureDiagram() {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-700/80 p-4 sm:p-6 shadow-2xl text-slate-100 overflow-hidden">
      {/* 다이어그램 상단 타이틀 & 뱃지 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Architecture Workflow 3.0
            </span>
            <span className="text-xs font-semibold text-slate-400">
              세움터 인허가 보완 전용 프로세스
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mt-1 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-400" />
            <span>건축 인허가 보완 관리 &amp; 세움터 제출 원스톱 워크플로우</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>누락률 0% 보장</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>보완 기간 75% 단축</span>
          </span>
        </div>
      </div>

      {/* SVG 반응형 워크플로우 아키텍처 다이어그램 */}
      <div className="w-full overflow-x-auto py-4">
        <svg
          viewBox="0 0 960 400"
          className="w-full h-auto min-w-[760px] max-w-full block"
          style={{ fontFamily: "inherit" }}
        >
          <defs>
            {/* 배경 그라디언트 정의 */}
            <linearGradient id="phase1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="phase2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="phase3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* 필터 그림자 효과 */}
            <filter id="boxShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* PHASE 1: 세움터 보완 접수 & 항목 분해 */}
          {/* ============================================================== */}
          <g transform="translate(20, 20)">
            <rect
              width="270"
              height="300"
              rx="16"
              fill="url(#phase1Grad)"
              stroke="#334155"
              strokeWidth="1.5"
              filter="url(#boxShadow)"
            />

            {/* 상단 헤더 */}
            <rect width="270" height="42" rx="16" fill="#1E293B" />
            <rect y="26" width="270" height="16" fill="#1E293B" />
            <text x="16" y="27" fill="#60A5FA" fontSize="12" fontWeight="900" letterSpacing="0.5">
              STEP 01
            </text>
            <text x="80" y="27" fill="#F8FAFC" fontSize="13" fontWeight="bold">
              인허가 보완 접수 &amp; 분해
            </text>

            {/* 본문 항목들 */}
            <g transform="translate(16, 60)">
              {/* 입력 소스 */}
              <rect width="238" height="64" rx="10" fill="#0F172A" stroke="#475569" strokeWidth="1" />
              <text x="12" y="22" fill="#94A3B8" fontSize="10" fontWeight="600">
                INPUT SOURCE
              </text>
              <text x="12" y="42" fill="#E2E8F0" fontSize="12" fontWeight="bold">
                지자체/구청 세움터 보완 공문
              </text>
              <text x="12" y="56" fill="#64748B" fontSize="10">
                건축과 1차·2차 보완 통보서 접수
              </text>

              {/* 공종별 자동 분류 */}
              <g transform="translate(0, 78)">
                <rect width="238" height="88" rx="10" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
                <text x="12" y="20" fill="#60A5FA" fontSize="10" fontWeight="bold">
                  공종별 스마트 체크리스트 분할
                </text>
                
                {/* 태그 칩스 */}
                <rect x="12" y="32" width="62" height="20" rx="4" fill="#1E3A8A" />
                <text x="43" y="46" fill="#93C5FD" fontSize="10" textAnchor="middle" fontWeight="bold">
                  구조안전
                </text>

                <rect x="80" y="32" width="62" height="20" rx="4" fill="#065F46" />
                <text x="111" y="46" fill="#6EE7B7" fontSize="10" textAnchor="middle" fontWeight="bold">
                  소방·피난
                </text>

                <rect x="148" y="32" width="62" height="20" rx="4" fill="#7C2D12" />
                <text x="179" y="46" fill="#FDBA74" fontSize="10" textAnchor="middle" fontWeight="bold">
                  토목·대지
                </text>

                <rect x="12" y="58" width="85" height="20" rx="4" fill="#581C87" />
                <text x="54" y="72" fill="#E9D5FF" fontSize="10" textAnchor="middle" fontWeight="bold">
                  에너지·EPI
                </text>

                <rect x="103" y="58" width="85" height="20" rx="4" fill="#374151" />
                <text x="145" y="72" fill="#D1D5DB" fontSize="10" textAnchor="middle" fontWeight="bold">
                  오수·정화조
                </text>
              </g>

              {/* D-Day 마감 알림 */}
              <g transform="translate(0, 180)">
                <rect width="238" height="38" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />
                <circle cx="20" cy="19" r="6" fill="#EF4444" />
                <text x="34" y="23" fill="#FCA5A5" fontSize="11" fontWeight="bold">
                  마감 D-Day 자동 카운트다운
                </text>
              </g>
            </g>
          </g>

          {/* 연결 화살표 1 */}
          <g transform="translate(300, 150)">
            <line x1="0" y1="20" x2="35" y2="20" stroke="url(#arrowGrad)" strokeWidth="3" strokeDasharray="4 2" />
            <polygon points="35,14 47,20 35,26" fill="#3B82F6" />
            <text x="24" y="8" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">
              링크 발송
            </text>
          </g>

          {/* ============================================================== */}
          {/* PHASE 2: 비회원 원클릭 보안 링크 & 서류 취합 */}
          {/* ============================================================== */}
          <g transform="translate(345, 20)">
            <rect
              width="270"
              height="300"
              rx="16"
              fill="url(#phase2Grad)"
              stroke="#2563EB"
              strokeWidth="1.5"
              filter="url(#boxShadow)"
            />

            {/* 상단 헤더 */}
            <rect width="270" height="42" rx="16" fill="#1E3A8A" />
            <rect y="26" width="270" height="16" fill="#1E3A8A" />
            <text x="16" y="27" fill="#93C5FD" fontSize="12" fontWeight="900" letterSpacing="0.5">
              STEP 02
            </text>
            <text x="80" y="27" fill="#FFFFFF" fontSize="13" fontWeight="bold">
              비회원 전용 링크 &amp; 취합
            </text>

            <g transform="translate(16, 60)">
              {/* 원클릭 링크 발송 */}
              <rect width="238" height="54" rx="10" fill="#0F172A" stroke="#3B82F6" strokeWidth="1" />
              <text x="12" y="20" fill="#60A5FA" fontSize="10" fontWeight="bold">
                TOKENIZED SECURE LINK
              </text>
              <text x="12" y="38" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                카톡 / 문자 / 이메일 1클릭 전송
              </text>

              {/* 대상자 무가입 업로드 */}
              <g transform="translate(0, 68)">
                <rect width="238" height="98" rx="10" fill="#0F172A" stroke="#475569" strokeWidth="1" />
                <text x="12" y="20" fill="#94A3B8" fontSize="10" fontWeight="bold">
                  협력사·건축주 즉시 업로드 (무가입)
                </text>
                
                <g transform="translate(12, 30)">
                  <rect width="214" height="26" rx="6" fill="#1E293B" />
                  <text x="8" y="17" fill="#CBD5E1" fontSize="10">
                    [PDF] 구조계산서 및 확인서 (v2)
                  </text>
                  <text x="200" y="17" fill="#10B981" fontSize="10" textAnchor="end" fontWeight="bold">
                    제출완료
                  </text>
                </g>

                <g transform="translate(12, 62)">
                  <rect width="214" height="26" rx="6" fill="#1E293B" />
                  <text x="8" y="17" fill="#CBD5E1" fontSize="10">
                    [DWG] 피난단면상세도 (v1)
                  </text>
                  <text x="200" y="17" fill="#F59E0B" fontSize="10" textAnchor="end" fontWeight="bold">
                    검토중
                  </text>
                </g>
              </g>

              {/* 버전 관리 */}
              <g transform="translate(0, 180)">
                <rect width="238" height="38" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="1" />
                <text x="12" y="23" fill="#93C5FD" fontSize="11" fontWeight="bold">
                  자동 v1, v2 버전 추적 &amp; 덮어쓰기 방지
                </text>
              </g>
            </g>
          </g>

          {/* 연결 화살표 2 */}
          <g transform="translate(625, 150)">
            <line x1="0" y1="20" x2="35" y2="20" stroke="url(#arrowGrad)" strokeWidth="3" strokeDasharray="4 2" />
            <polygon points="35,14 47,20 35,26" fill="#10B981" />
            <text x="24" y="8" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">
              검토 완료
            </text>
          </g>

          {/* ============================================================== */}
          {/* PHASE 3: 실시간 감리/검토 & 세움터 제출용 PDF */}
          {/* ============================================================== */}
          <g transform="translate(670, 20)">
            <rect
              width="270"
              height="300"
              rx="16"
              fill="url(#phase3Grad)"
              stroke="#059669"
              strokeWidth="1.5"
              filter="url(#boxShadow)"
            />

            {/* 상단 헤더 */}
            <rect width="270" height="42" rx="16" fill="#065F46" />
            <rect y="26" width="270" height="16" fill="#065F46" />
            <text x="16" y="27" fill="#A7F3D0" fontSize="12" fontWeight="900" letterSpacing="0.5">
              STEP 03
            </text>
            <text x="80" y="27" fill="#FFFFFF" fontSize="13" fontWeight="bold">
              검토 승인 &amp; 세움터 제출
            </text>

            <g transform="translate(16, 60)">
              {/* 원클릭 검토 & 피드백 */}
              <rect width="238" height="54" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="1" />
              <text x="12" y="20" fill="#34D399" fontSize="10" fontWeight="bold">
                ARCHITECT REVIEW
              </text>
              <text x="12" y="38" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                도면 확인 후 원클릭 승인 / 반려
              </text>

              {/* 세움터 A4 조치결과표 자동 생성 */}
              <g transform="translate(0, 68)">
                <rect width="238" height="98" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
                <rect x="12" y="12" width="70" height="18" rx="4" fill="#047857" />
                <text x="47" y="25" fill="#ECFDF5" fontSize="10" textAnchor="middle" fontWeight="bold">
                  A4 표준 출력
                </text>
                
                <text x="12" y="52" fill="#FFFFFF" fontSize="13" fontWeight="black">
                  인허가 보완 조치결과표
                </text>
                <text x="12" y="70" fill="#A7F3D0" fontSize="10">
                  구청 요구사항 대 조치결과 대비표 PDF
                </text>
                <text x="12" y="86" fill="#6EE7B7" fontSize="10" fontWeight="bold">
                  ✓ 세움터 첨부 규격 100% 호환
                </text>
              </g>

              {/* 최종 인허가 완료 */}
              <g transform="translate(0, 180)">
                <rect width="238" height="38" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
                <text x="12" y="23" fill="#6EE7B7" fontSize="11" fontWeight="bold">
                  세움터 일괄 등록 ➔ 허가 필증 수령
                </text>
              </g>
            </g>
          </g>

          {/* ============================================================== */}
          {/* 하단 통합 요약 풋터 바 */}
          {/* ============================================================== */}
          <g transform="translate(20, 335)">
            <rect width="920" height="46" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <circle cx="28" cy="23" r="6" fill="#3B82F6" />
            <text x="44" y="27" fill="#E2E8F0" fontSize="12" fontWeight="bold">
              세움노트 핵심 가치:
            </text>
            <text x="175" y="27" fill="#94A3B8" fontSize="11">
              카카오톡/이메일 서류 파편화 방지 · 협력사 무가입 제출 · 파일 버전 무결성 · 세움터 제출용 A4 결과표 자동 생성
            </text>
            <text x="900" y="27" fill="#38BDF8" fontSize="11" textAnchor="end" fontWeight="bold">
              실무 시간 75% 절감
            </text>
          </g>
        </svg>
      </div>

      {/* 모바일 화면용 3단계 텍스트 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="font-bold text-blue-400 mb-0.5">STEP 01. 보완 공문 분해</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            세움터 보완 요구사항을 구조·토목·소방 등 공종별 체크리스트로 등록합니다.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="font-bold text-sky-400 mb-0.5">STEP 02. 비회원 링크 취합</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            협력사와 건축주에게 카톡 링크를 전송하여 로그인 없이 파일(v1, v2)을 즉시 받습니다.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="font-bold text-emerald-400 mb-0.5">STEP 03. 세움터 PDF 출력</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            승인된 서류를 바탕으로 지자체 제출용 인허가 보완결과표 PDF를 1초 만에 완성합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
