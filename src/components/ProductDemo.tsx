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
} from "lucide-react";
import { DEMO_PROJECTS } from "@/lib/constants";

export function ProductDemo() {
  const [activeTab, setActiveTab] = useState<"projects" | "checklist" | "submit-link" | "pdf-result">("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("PRJ-2026-081");
  const [copied, setCopied] = useState(false);

  const selectedProject = DEMO_PROJECTS.find((p) => p.id === selectedProjectId) || DEMO_PROJECTS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://seumnote.kr/submit/${selectedProject.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            아래 탭을 직접 클릭하여 프로젝트 관리, 실시간 보완 체크리스트, 협력사 제출 링크, 결과표 출력을 미리 체험해 보세요.
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
          <div className="p-4 sm:p-8 min-h-[420px]">
            {/* 탭 1: 프로젝트 현황 */}
            {activeTab === "projects" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">진행 중인 인허가 프로젝트 목록</h3>
                    <p className="text-xs text-slate-500">프로젝트를 클릭하면 해당 보완 세부사항으로 이동합니다.</p>
                  </div>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                    총 3건 관리 중
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {DEMO_PROJECTS.map((p) => {
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
                          {p.status === "approved" ? (
                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                              완료 확인
                            </span>
                          ) : p.status === "in_review" ? (
                            <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-bold">
                              검토 중
                            </span>
                          ) : (
                            <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
                              서류 요청 중
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{p.department}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">마감: {p.dueDate}</span>
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
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      [{selectedProject.title}] 보완 체크리스트
                    </h3>
                    <p className="text-xs text-slate-500">
                      공문 요구사항별 담당자 지정 및 서류 수신 현황
                    </p>
                  </div>
                  <span className="text-xs text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                    마감 기한: {selectedProject.dueDate}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedProject.requestedFiles.map((fileName, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{fileName}</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            제출 대상: 구조설계팀 / 토목협력사 &middot; 포맷: PDF/DWG
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          v2 최신본 보관됨
                        </span>
                        <button className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700">
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
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-blue-900">
                      외부 협력사/건축주 전송용 보안 링크
                    </span>
                    <p className="text-xs text-blue-700 mt-0.5">
                      회원가입 없이 스마트폰이나 PC에서 바로 서류를 제출합니다.
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

                {/* 실제 고객이 보게 되는 모바일 업로드 화면 목업 */}
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
                      최대 200MB까지 안전하게 업로드됩니다.
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
                      취합된 보완 항목과 첨부도서 목록이 공문 서식으로 자동 정렬됩니다.
                    </p>
                  </div>
                  <button className="text-xs font-bold bg-[#2563EB] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-blue-700">
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF 다운로드</span>
                  </button>
                </div>

                {/* A4 공문 양식 목업 */}
                <div className="bg-white border-2 border-slate-300 p-6 rounded-xl shadow-card text-xs space-y-3 font-sans">
                  <div className="text-center pb-2 border-b-2 border-slate-900">
                    <h4 className="text-base font-black text-slate-900 tracking-wider">
                      건축허가 보완사항 조치 결과표
                    </h4>
                  </div>

                  <table className="w-full border-collapse border border-slate-300 text-left">
                    <tbody>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-300 p-2 w-24 font-bold text-slate-700">공사명</th>
                        <td className="border border-slate-300 p-2 text-slate-800">{selectedProject.title}</td>
                      </tr>
                      <tr>
                        <th className="border border-slate-300 p-2 font-bold text-slate-700">허가관청</th>
                        <td className="border border-slate-300 p-2 text-slate-800">{selectedProject.department}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-300 text-left mt-3">
                    <thead className="bg-slate-100 font-bold text-slate-700">
                      <tr>
                        <th className="border border-slate-300 p-2 w-10 text-center">No</th>
                        <th className="border border-slate-300 p-2">지자체 보완 지시사항</th>
                        <th className="border border-slate-300 p-2">조치 내용 및 첨부 도서</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2 text-center">1</td>
                        <td className="border border-slate-300 p-2">지하층 기초 지내력 검토서 제출 건</td>
                        <td className="border border-slate-300 p-2 text-slate-700">지내력 계산서(v2) 반영 완료 (도서 p.14~28 첨부)</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 text-center">2</td>
                        <td className="border border-slate-300 p-2">피난계단 유효너비 1.2m 확보 여부</td>
                        <td className="border border-slate-300 p-2 text-slate-700">A-301 계단상세도 1,200mm 표기 수정 완료</td>
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
