import React, { useState } from "react";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Link2,
  Copy,
  Download,
  Eye,
  Check,
  Building2,
  Layers,
  MessageCircle,
  BellRing,
  FileCheck2,
} from "lucide-react";
import { DEMO_PROJECTS } from "@/lib/constants";
import type { PermitStage } from "@/types";

export function ProductDemo() {
  const [activeTab, setActiveTab] = useState<"projects" | "checklist" | "submit-link" | "pdf-result">("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("PRJ-2026-081");
  const [stageFilter, setStageFilter] = useState<PermitStage>("all");
  const [copied, setCopied] = useState(false);

  const filteredProjects = DEMO_PROJECTS.filter((p) => {
    if (stageFilter === "all") return true;
    return p.stage === stageFilter;
  });

  const selectedProject = DEMO_PROJECTS.find((p) => p.id === selectedProjectId) || DEMO_PROJECTS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://seumnote.kr/submit/${selectedProject.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    const printWindow = window.open("", "_blank", "width=850,height=1100");
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>세움터 제출용 건축 인허가 보완요구사항 대비 조치내역서 - ${selectedProject.title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
        <style>
          body { font-family: Pretendard, sans-serif; padding: 40px; color: #111; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 24px; }
          .sub { font-size: 11px; color: #666; margin-bottom: 6px; }
          h1 { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 1px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          th, td { border: 1px solid #bbb; padding: 10px 12px; }
          th { background: #f4f4f4; font-weight: 700; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; }
          .badge-blue { background: #ebf5ff; color: #1e40af; }
          .badge-rose { background: #ffe4e6; color: #9f1239; }
          .badge-emerald { background: #d1fae5; color: #065f46; }
          .footer { margin-top: 40px; text-align: right; font-size: 12px; }
          .stamp { display: inline-block; border: 2px solid #dc2626; color: #dc2626; padding: 6px 14px; border-radius: 6px; font-weight: bold; margin-top: 10px; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="sub">[건축법 시행규칙 별지 서식 호환 / 세움터 건축행정시스템 제출용]</div>
          <h1>건축 인허가 보완요구사항 대비 조치내역서</h1>
        </div>

        <table>
          <tr>
            <th style="width: 130px;">공사명 (대지위치)</th>
            <td style="font-weight: bold;">${selectedProject.title}</td>
          </tr>
          <tr>
            <th>허가관청 / 공문번호</th>
            <td>${selectedProject.department} / 서초-건축-2026-8812호</td>
          </tr>
          <tr>
            <th>건축주 / 설계자</th>
            <td>${selectedProject.client} / (주)세움종합건축사사무소 (대표건축사)</td>
          </tr>
          <tr>
            <th>보완 제출일</th>
            <td>${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
          </tr>
        </table>

        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">No</th>
              <th style="width: 80px; text-align: center;">공종 구분</th>
              <th>지자체 보완 요구 지시사항</th>
              <th>조치 내용 및 첨부 도서명</th>
              <th style="width: 80px; text-align: center;">조치 결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; font-weight: bold;">1</td>
              <td style="text-align: center;"><span class="badge badge-blue">구조</span></td>
              <td>지하층 기초 지내력 검토서 및 구조안전확인서 제출 건</td>
              <td>지내력 계산서(v2) 반영 완료 (도서 p.14~28 첨부 / 직인날인본)</td>
              <td style="text-align: center; font-weight: bold; color: #16a34a;">조치완료</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold;">2</td>
              <td style="text-align: center;"><span class="badge badge-rose">소방</span></td>
              <td>옥상 피난계단 유효너비 1.2m 확보 여부 상세도</td>
              <td>A-301 계단상세도 1,200mm 표기 수정 완료</td>
              <td style="text-align: center; font-weight: bold; color: #16a34a;">조치완료</td>
            </tr>
            <tr>
              <td style="text-align: center; font-weight: bold;">3</td>
              <td style="text-align: center;"><span class="badge badge-emerald">에너지</span></td>
              <td>건축물 에너지절약설계기준 부문별 배점표</td>
              <td>EPI 82점 적합 계산서 및 단열재 성적서 반영</td>
              <td style="text-align: center; font-weight: bold; color: #16a34a;">조치완료</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>상기와 같이 인허가 보완요구사항에 대하여 조치내역서 및 관련 도서를 제출합니다.</div>
          <div style="margin-top: 15px; font-weight: bold;">작성 시스템 : 세움노트 클라우드 공문 시스템 (발급 검증 완료)</div>
          <div class="stamp">세움노트 검토승인필</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getDisciplineBadgeClass = (discipline: string) => {
    switch (discipline) {
      case "구조":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "토목":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "소방":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "에너지":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "설비":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <section id="demo" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold mb-4">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>실제 제품 화면 예시 (인터랙티브 데모)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-snug">
            건축사를 위해 군더더기 없이 <br className="hidden sm:inline" />
            정돈된 직관적인 대시보드
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            아래 탭을 직접 클릭하여 인허가 단계별 프로젝트 관리, 실시간 보완 체크리스트, 협력사 카톡 제출 링크, 세움터 결과표 출력을 미리 체험해 보세요.
          </p>
        </div>

        {/* 대시보드 뷰어 프레임 */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-[#E2E8F0] bg-white shadow-elevated overflow-hidden">
          {/* 상단 탭 네비게이션 */}
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 pt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-white text-[#2563EB] border-slate-200 -mb-[1px] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>1. 프로젝트 진행 현황</span>
            </button>

            <button
              onClick={() => setActiveTab("checklist")}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${
                activeTab === "checklist"
                  ? "bg-white text-[#2563EB] border-slate-200 -mb-[1px] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>2. 보완사항 체크리스트</span>
            </button>

            <button
              onClick={() => setActiveTab("submit-link")}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${
                activeTab === "submit-link"
                  ? "bg-white text-[#2563EB] border-slate-200 -mb-[1px] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>3. 협력사용 서류 제출 링크</span>
            </button>

            <button
              onClick={() => setActiveTab("pdf-result")}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${
                activeTab === "pdf-result"
                  ? "bg-white text-[#2563EB] border-slate-200 -mb-[1px] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>4. 보완결과표 PDF 출력</span>
            </button>
          </div>

          {/* 탭 내용 영역 */}
          <div className="p-4 sm:p-8 min-h-[460px]">
            {/* 탭 1: 프로젝트 현황 */}
            {activeTab === "projects" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">진행 중인 인허가 프로젝트 목록</h3>
                    <p className="text-xs text-slate-500">프로젝트를 클릭하면 해당 공문 보완 세부사항으로 이동합니다.</p>
                  </div>

                  {/* 인허가 단계 필터 칩 */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                      { key: "all", label: "전체" },
                      { key: "permit", label: "건축허가·심의" },
                      { key: "construction", label: "착공신고" },
                      { key: "completion", label: "사용승인" },
                    ].map((st) => (
                      <button
                        key={st.key}
                        onClick={() => setStageFilter(st.key as PermitStage)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                          stageFilter === st.key
                            ? "bg-[#2563EB] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredProjects.map((p) => {
                    const isSelected = p.id === selectedProjectId;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#2563EB] bg-blue-50/30 shadow-card"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-mono text-slate-400 font-bold">{p.id}</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {p.stageLabel}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{p.department}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-red-600 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{p.dDay}</span>
                          </span>
                          <span className="font-bold text-blue-600">
                            서류 {p.submittedFilesCount}/{p.requestedFiles.length}건
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 탭 2: 보완 체크리스트 */}
            {activeTab === "checklist" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {selectedProject.stageLabel}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">
                        [{selectedProject.title}] 보완 요구사항
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedProject.department} &middot; 공문 접수일 기준 보완 회신 기한 관리
                    </p>
                  </div>
                  <span className="text-xs text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 self-start sm:self-auto">
                    마감 기한: {selectedProject.dueDate} ({selectedProject.dDay})
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedProject.checkItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border shrink-0 mt-0.5 ${getDisciplineBadgeClass(
                            item.discipline
                          )}`}
                        >
                          {item.discipline}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                            <span>담당 협력사: <strong className="text-slate-700">{item.targetRole}</strong></span>
                            <span>&bull;</span>
                            <span>요청 포맷: {item.format}</span>
                            {item.fileName && (
                              <>
                                <span>&bull;</span>
                                <span className="text-blue-600 font-medium">제출본: {item.fileName}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        {item.status === "completed" ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>{item.version} 검토 승인</span>
                          </span>
                        ) : item.status === "reviewing" ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>새 도서 도착 (검토 대기)</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                            서류 제출 대기
                          </span>
                        )}
                        <button className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">
                          상세보기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 탭 3: 고객/협력사 서류 제출 링크 (비회원 뷰) */}
            {activeTab === "submit-link" && (
              <div className="max-w-xl mx-auto space-y-4 animate-in fade-in duration-200">
                {/* 카카오톡 알림톡 자동 전송 안내 카드 */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE500] flex items-center justify-center text-slate-900 shrink-0 shadow-xs">
                    <MessageCircle className="w-4 h-4 fill-slate-900" />
                  </div>
                  <div className="text-xs text-amber-900">
                    <strong className="block font-bold">카카오톡 알림톡 자동 발송 지원</strong>
                    협력사 소장님·담당자 휴대폰으로 전용 링크가 알림톡으로 전송되며, 마감 D-3일과 D-1일에 자동 리마인드 알림이 전달됩니다.
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-blue-900">
                      협력사/건축주 전송용 모바일 원클릭 링크
                    </span>
                    <p className="text-xs text-blue-700 mt-0.5">
                      별도 앱 설치나 회원가입 없이 스마트폰에서 바로 제출합니다.
                    </p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "복사됨!" : "링크 복사"}</span>
                  </button>
                </div>

                {/* 실제 협력사가 보게 되는 모바일 업로드 화면 목업 */}
                <div className="border-2 border-slate-200 rounded-2xl p-5 bg-white shadow-card space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      (주)미래건축사사무소 서류 제출 요청
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {selectedProject.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      아래 필요한 인허가 보완 서류를 선택하여 올려주세요.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <Download className="w-8 h-8 text-blue-500 mx-auto mb-2 rotate-180" />
                    <span className="text-xs font-bold text-slate-700 block">
                      도면 또는 서류 파일(PDF, DWG, HWP)을 끌어다 놓으세요
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      최대 200MB까지 안전하게 업로드됩니다. (TLS 1.3 암호화)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 탭 4: 보완 결과표 PDF 출력 */}
            {activeTab === "pdf-result" && (
              <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      지자체(세움터) 제출용 인허가 보완 결과표
                    </h3>
                    <p className="text-xs text-slate-500">
                      세움터 건축행정시스템의 '보완요구사항 대비 조치내역서' 공문 규격으로 1초 만에 자동 생성됩니다.
                    </p>
                  </div>
                  <button
                    onClick={handlePrintPdf}
                    className="text-xs font-bold bg-[#2563EB] text-white px-3.5 py-2 rounded-lg flex items-center gap-1.5 hover:bg-blue-700 cursor-pointer shadow-xs transition-all active:scale-95"
                    title="클릭 시 세움터 양식 A4 공문 인쇄 및 PDF 저장이 실행됩니다"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>세움터 제출용 PDF 출력 / 인쇄</span>
                  </button>
                </div>

                {/* A4 공문 양식 목업 */}
                <div className="bg-white border-2 border-slate-300 p-6 sm:p-8 rounded-xl shadow-card text-xs space-y-4 font-sans">
                  <div className="text-center pb-3 border-b-2 border-slate-900">
                    <span className="text-[10px] text-slate-400 block mb-1">[건축법 시행규칙 별지 서식 호환]</span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-wider">
                      건축 인허가 보완요구사항 대비 조치내역서
                    </h4>
                  </div>

                  <table className="w-full border-collapse border border-slate-300 text-left">
                    <tbody>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-300 p-2 w-28 font-bold text-slate-700">공사명 (대지위치)</th>
                        <td className="border border-slate-300 p-2 text-slate-800 font-semibold">{selectedProject.title}</td>
                      </tr>
                      <tr>
                        <th className="border border-slate-300 p-2 font-bold text-slate-700">허가관청 / 공문번호</th>
                        <td className="border border-slate-300 p-2 text-slate-800">{selectedProject.department} / 서초-건축-2026-8812호</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-300 text-left mt-3">
                    <thead className="bg-slate-100 font-bold text-slate-700">
                      <tr>
                        <th className="border border-slate-300 p-2 w-10 text-center">No</th>
                        <th className="border border-slate-300 p-2 w-24">공종 구분</th>
                        <th className="border border-slate-300 p-2">지자체 보완 요구 지시사항</th>
                        <th className="border border-slate-300 p-2">조치 내용 및 첨부 도서명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2 text-center font-bold">1</td>
                        <td className="border border-slate-300 p-2 font-semibold text-blue-800">구조</td>
                        <td className="border border-slate-300 p-2">지하층 기초 지내력 검토서 및 구조안전확인서 제출 건</td>
                        <td className="border border-slate-300 p-2 text-slate-700">지내력 계산서(v2) 반영 완료 (도서 p.14~28 첨부 / 직인날인본)</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 text-center font-bold">2</td>
                        <td className="border border-slate-300 p-2 font-semibold text-rose-800">소방</td>
                        <td className="border border-slate-300 p-2">옥상 피난계단 유효너비 1.2m 확보 여부 상세도</td>
                        <td className="border border-slate-300 p-2 text-slate-700">A-301 계단상세도 1,200mm 표기 수정 완료</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 text-center font-bold">3</td>
                        <td className="border border-slate-300 p-2 font-semibold text-emerald-800">에너지</td>
                        <td className="border border-slate-300 p-2">건축물 에너지절약설계기준 부문별 배점표</td>
                        <td className="border border-slate-300 p-2 text-slate-700">EPI 82점 적합 계산서 및 단열재 성적서 반영</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
