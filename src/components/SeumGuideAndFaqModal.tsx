import React, { useState, useMemo } from "react";
import {
  X,
  FileCheck2,
  HelpCircle,
  Search,
  BookOpen,
  Share2,
  ShieldCheck,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  Building,
} from "lucide-react";
import { SeumArchitectureDiagram } from "./SeumArchitectureDiagram";

interface SeumGuideAndFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist?: () => void;
  onOpenShareModal?: () => void;
  initialTab?: "guide" | "faq" | "checklist";
}

type TabType = "guide" | "faq" | "checklist";
type FaqCategory = "all" | "submission" | "file" | "seumter" | "security";

interface ComprehensiveFaq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  tip?: string;
}

const COMPREHENSIVE_FAQS: ComprehensiveFaq[] = [
  {
    id: "faq-1",
    category: "submission",
    question: "건축주나 협력업체(구조, 토목, 설비)도 세움노트에 회원가입해야 하나요?",
    answer:
      "아닙니다. 발송된 전용 보안 링크(Web Link)를 통해 고객이나 구조/토목 협력업체는 별도의 회원가입이나 앱 설치 없이 스마트폰이나 PC에서 즉시 필요한 서류와 도면을 안전하게 업로드할 수 있습니다.",
    tip: "카카오톡이나 문자로 링크를 전송하면, 협력업체 소장님이 현장에서도 스마트폰 카메라로 서류를 즉시 촬영하여 첨부할 수 있습니다.",
  },
  {
    id: "faq-2",
    category: "file",
    question: "어떤 형식과 크기의 파일까지 제출 및 검토가 가능한가요?",
    answer:
      "PDF 인허가 도면, DWG 캐드 도면, HWP/DOCX 관련 공문 및 구조계산서, 고화질 현장 사진(JPG, PNG) 등 건축 인허가 및 보완에 필요한 모든 포맷을 파일당 최대 200MB까지 자유롭게 업로드하고 버전별로 관리할 수 있습니다.",
    tip: "구조계산서처럼 수백 페이지에 달하는 대용량 PDF 문서도 브라우저 뷰어에서 지연 없이 빠르게 렌더링되어 검토할 수 있습니다.",
  },
  {
    id: "faq-3",
    category: "seumter",
    question: "세움터 시스템에 직접 연동되어 자동으로 올라가나요?",
    answer:
      "세움노트는 지자체 세움터 제출 표준 규격에 맞춘 [건축 인허가 보완 조치결과표 PDF] 및 첨부 서류 묶음을 원클릭으로 정리 생성해 줍니다. 최종 검토 후 다운로드받은 서류를 세움터 업로드 창에 일괄 등록하시면 됩니다.",
    tip: "보완 공문의 각 지적사항 번호와 조치 내용, 도면 번호가 1:1 대비표로 정돈되어 있어 구청 인허가 담당 주무관의 검토 승인이 매우 빨라집니다.",
  },
  {
    id: "faq-4",
    category: "file",
    question: "도면 버전(v1, v2)이 꼬여 구버전이 잘못 제출되는 문제를 어떻게 막나요?",
    answer:
      "동일 항목에 새 파일이 업로드되면 자동으로 v1, v2, v3 넘버링이 부여되며, 최종 승인본만 제출 대기 상태로 지정됩니다. 언제든 이전 버전 파일과 변경 사유를 타임라인으로 확인할 수 있어 덮어쓰기 사고를 100% 방지합니다.",
    tip: "반려 시 '계단 유효너비 1.2m 미확보'와 같은 구체적 사유를 남기면 협력사 담당자에게 실시간 알림이 발송되어 재작업 시간을 줄여줍니다.",
  },
  {
    id: "faq-5",
    category: "seumter",
    question: "인허가 보완 기한(D-Day) 관리는 어떻게 이루어지나요?",
    answer:
      "구청 보완 공문에 명시된 처리 기한(통상 15~30일)을 등록하면 메인 대시보드에서 D-Day 카운트다운과 진척률(%)을 시각적으로 확인할 수 있으며, 기한 임박 시 담당자 및 협력사에 제출 독려 알림을 제공합니다.",
    tip: "보완 기한 연장이 필요한 경우에도 누적 제출 현황 보고서를 즉시 출력하여 지자체 기한 연장 신청서 첨부자료로 활용할 수 있습니다.",
  },
  {
    id: "faq-6",
    category: "security",
    question: "건축사사무소 프로젝트와 협력사 도면 데이터는 안전하게 보관되나요?",
    answer:
      "모든 파일은 TLS 1.3 암호화 통신으로 전송되며, 저장 시 금융권 수준의 AES-256 규격으로 안전하게 격리 보관됩니다. 서류 제출 링크는 만료 토큰 기반으로 프로젝트 담당자만 접근 제어가 가능합니다.",
    tip: "사무소 내부 인원별로 프로젝트 열람 권한을 지정할 수 있어 외부 협력사에 불필요한 내부 설계 자료가 노출되지 않습니다.",
  },
  {
    id: "faq-7",
    category: "submission",
    question: "건축주에게 세움노트 링크를 보내면 거부감 없이 사용하나요?",
    answer:
      "회원가입, 비밀번호 설정, 앱 설치 과정이 전혀 없고 카카오톡 알림톡 링크를 누르면 직관적인 서류 제출 화면이 열리므로, IT 기기에 익숙하지 않은 중장년 건축주도 간편하게 신분증이나 인감증명서를 제출합니다.",
    tip: "모바일에서 바로 서류 촬영 업로드가 가능하므로 스캐너가 없는 건축주도 1분 안에 제출을 완료할 수 있습니다.",
  },
  {
    id: "faq-8",
    category: "security",
    question: "14일 무료 체험 기간 동안 기능 제한이 있나요?",
    answer:
      "아닙니다. 14일 무료 체험 기간 동안 프로젝트 생성, 비회원 링크 발송, 세움터 A4 결과표 생성 등 Pro 플랜의 모든 기능을 무제한으로 사용해 보실 수 있습니다. 신용카드 등록도 요구하지 않습니다.",
    tip: "체험 기간 중 등록하신 프로젝트와 보완 데이터는 체험 종료 후에도 삭제되지 않고 안전하게 보존됩니다.",
  },
  {
    id: "faq-9",
    category: "file",
    question: "기존에 엑셀로 관리하던 보완 체크리스트를 가져올 수 있나요?",
    answer:
      "네, 세움노트의 엑셀 일괄 등록 기능을 통해 기존에 사무소에서 작성해 둔 보완 항목 목록을 복사·붙여넣기하여 단 10초 만에 프로젝트 체크리스트로 변환할 수 있습니다.",
    tip: "공종별(건축/구조/소방/전기/토목) 기본 템플릿이 내장되어 있어 신규 프로젝트 보완 접수 시에도 클릭 몇 번으로 기본 항목을 불러올 수 있습니다.",
  },
  {
    id: "faq-10",
    category: "seumter",
    question: "감리 업무나 사용승인(준공) 보완 단계에서도 사용할 수 있나요?",
    answer:
      "네, 건축허가 단계뿐만 아니라 착공신고 보완, 공사 중 감리 중간보고서 취합, 그리고 사용승인(준공 검사) 필증 수령을 위한 시험성적서 및 하자보수 이행각서 수합까지 인허가 전 과정에서 동일하게 활용됩니다.",
    tip: "준공 단계에서는 소방완비증명, 정화조준공필증, 승강기안전검사서 등 수십 가지 서류가 쏟아지므로 세움노트의 가치가 더욱 극대화됩니다.",
  },
];

const CHECKLIST_STANDARDS = [
  {
    dept: "구조안전",
    title: "구조안전 및 내진설계 확인서",
    format: "PDF (구조기술사 날인본)",
    size: "최대 100MB",
    items: "구조계산서(지진하중 산정), 지내력시험성적서, 지하안전평가 협의결과, 구조도면",
  },
  {
    dept: "소방·피난",
    title: "소방시설 착공동의 & 피난상세도",
    format: "PDF / DWG",
    size: "최대 80MB",
    items: "피난계단 유효너비 산정표, 방화구획 상세도, 옥외소화전 및 스프링클러 평면도",
  },
  {
    dept: "토목·대지",
    title: "개발행위허가 & 배수계획도",
    format: "PDF / DWG / HWPX",
    size: "최대 100MB",
    items: "토지사용승락서, 옹벽 전개도 및 단면구조계산, 대지 종·횡단면도, 우수유출량 계산서",
  },
  {
    dept: "에너지·친환경",
    title: "에너지절약계획서 (EPI)",
    format: "PDF / XLS",
    size: "최대 50MB",
    items: "EPI 평점합계표, 단열재 시험성적서(KS), 고효율 조명 및 설비 기기 인증서",
  },
  {
    dept: "오수·정화조",
    title: "배수설비신고 & 정화조설치",
    format: "PDF / HWPX",
    size: "최대 30MB",
    items: "개인하수처리시설(정화조) 설치신고서, 제조업체 등록증, 용량산정서, 배수계통도",
  },
  {
    dept: "건축공통",
    title: "건축허가 도서 수정본",
    format: "DWG / PDF",
    size: "최대 150MB",
    items: "지적사항 반영 전·후 대비도면, 주차구획 산정표, 도로후퇴선 표기 배치도",
  },
];

export function SeumGuideAndFaqModal({
  isOpen,
  onClose,
  onOpenWaitlist,
  onOpenShareModal,
  initialTab = "guide",
}: SeumGuideAndFaqModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("all");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-1");

  // 검색어 및 카테고리 필터링
  const filteredFaqs = useMemo(() => {
    return COMPREHENSIVE_FAQS.filter((item) => {
      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.tip && item.tip.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full sm:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* 모달 헤더 */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black shrink-0">
              <FileCheck2 className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                세움노트 완벽 활용 가이드 &amp; 인허가 FAQ
              </h2>
              <p className="text-[11px] text-slate-400">
                3단계 보완 공식 · 실무 FAQ 10선 · 주무부서별 필수 서류 규격표
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenShareModal && (
              <button
                type="button"
                onClick={onOpenShareModal}
                className="text-xs font-semibold text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="동료에게 가이드 공유"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 버튼 바 */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-800 bg-slate-900/90 grid grid-cols-3 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "guide"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>3단계 보완 공식</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "faq"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>실무 FAQ (10)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("checklist")}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "checklist"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>서류 규격표</span>
          </button>
        </div>

        {/* 모달 본문 (스크롤) */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs max-h-[75vh]">
          {/* 탭 1: 3단계 보완 공식 & 아키텍처 다이어그램 */}
          {activeTab === "guide" && (
            <div className="space-y-4">
              <SeumArchitectureDiagram />

              {/* 4대 핵심 완결 원칙 */}
              <div className="space-y-2.5 pt-2">
                <span className="font-black text-xs text-white block">
                  건축사사무소를 위한 인허가 보완 완결 4대 원칙
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <span className="font-extrabold text-blue-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      1. 공문 접수 당일 항목 분해 &amp; D-Day 관리
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      구청 보완 공문을 받자마자 구조/토목/소방 등 관련 협력사에 바로 할당하고 마감 기한을 고지합니다.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <span className="font-extrabold text-sky-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      2. 협력사 비회원 전용 링크 활용
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      카카오톡이나 문자로 원클릭 링크를 전달하여 협력사 엔지니어가 번거로운 로그인 없이 즉시 업로드하게 합니다.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <span className="font-extrabold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      3. 자동 버전 관리로 구버전 제출 원천 차단
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      ‘최종_진짜최종’ 도면 꼬임을 방지하기 위해 세움노트의 자동 v1, v2 이력과 변경 사유를 검토합니다.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <span className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      4. 세움터 표준 A4 조치결과표 1클릭 출력
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      지자체 주무관이 한눈에 검토할 수 있도록 요구사항 대 조치결과 대비표 PDF를 세움터에 일괄 첨부합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 탭 2: 자주 묻는 질문 FAQ 10선 */}
          {activeTab === "faq" && (
            <div className="space-y-3.5">
              {/* 검색창 */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="보완 질문 검색 (예: 협력사, DWG, 세움터, PDF, 보안, 비용)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* 카테고리 필터 칩 */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "전체 (10)" },
                  { id: "submission", label: "협력사 제출" },
                  { id: "file", label: "파일·도면 규격" },
                  { id: "seumter", label: "세움터 연동" },
                  { id: "security", label: "보안·요금" },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setSelectedCategory(chip.id as FaqCategory)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedCategory === chip.id
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* FAQ 아코디언 목록 */}
              <div className="space-y-2 mt-2">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 bg-slate-850 rounded-xl border border-slate-800">
                    검색 결과가 없습니다. 다른 단어로 검색해 보세요.
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-slate-800 bg-slate-850 overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedFaqId(isExpanded ? null : faq.id)
                          }
                          className="w-full px-4 py-3 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-800/50"
                        >
                          <span className="font-bold text-slate-100 text-xs sm:text-sm flex items-start gap-2">
                            <span className="text-blue-400 font-black shrink-0">
                              Q.
                            </span>
                            <span>{faq.question}</span>
                          </span>
                          <span className="text-slate-500 shrink-0 mt-0.5">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/60 space-y-2">
                            <p className="text-slate-300 text-xs leading-relaxed">
                              {faq.answer}
                            </p>
                            {faq.tip && (
                              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-[11px] text-blue-200 flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-blue-300 font-bold">
                                    실무 TIP:
                                  </strong>{" "}
                                  {faq.tip}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* 탭 3: 주무부서별 필수 제출서류 체크리스트 */}
          {activeTab === "checklist" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">
                  건축 인허가 주무 부서별 필수 제출 서류 및 규격
                </span>
                <span className="text-[11px] text-slate-400">
                  파일당 최대 200MB 지원
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-850">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/80 text-[11px]">
                      <th className="py-2.5 px-3 font-semibold">공종 / 부서</th>
                      <th className="py-2.5 px-3 font-semibold">필수 서류명</th>
                      <th className="py-2.5 px-3 font-semibold">권장 포맷</th>
                      <th className="py-2.5 px-3 font-semibold">주요 검토 항목</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                    {CHECKLIST_STANDARDS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-blue-400 whitespace-nowrap">
                          {row.dept}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                          {row.title}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400 whitespace-nowrap">
                          {row.format}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400 leading-tight">
                          {row.items}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>※ 지자체 건축과 조례 및 지구단위계획에 따라 추가 제출 서류가 요구될 수 있습니다.</span>
                <span className="text-emerald-400 font-bold">세움터 규격 호환</span>
              </div>
            </div>
          )}
        </div>

        {/* 모달 푸터 */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-850 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>건축사사무소 업무 효율화 솔루션</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenShareModal && (
              <button
                type="button"
                onClick={onOpenShareModal}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>공유</span>
              </button>
            )}

            {onOpenWaitlist && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWaitlist();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-bold transition-all shadow-subtle flex items-center gap-1 cursor-pointer"
              >
                <span>14일 무료 체험</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
