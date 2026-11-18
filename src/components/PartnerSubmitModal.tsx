import React, { useState } from "react";
import { X, UploadCloud, FileCheck, CheckCircle2, ShieldCheck, AlertCircle, Building2, Smartphone } from "lucide-react";
import type { ProjectDemoItem, SupplementCheckItem } from "@/types";

interface PartnerSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDemoItem;
  onSubmissionComplete: (updatedCheckItem: SupplementCheckItem) => void;
}

export function PartnerSubmitModal({
  isOpen,
  onClose,
  project,
  onSubmissionComplete,
}: PartnerSubmitModalProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [partnerName, setPartnerName] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentItem = project.checkItems[selectedItemIndex] || project.checkItems[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !currentItem.fileName) {
      alert("제출할 도면 또는 서류 파일을 선택해 주세요.");
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      onSubmissionComplete({
        ...currentItem,
        status: "reviewing",
        fileName: file ? file.name : `${currentItem.title}_수정본.pdf`,
        version: "v2",
      });
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFile(null);
    setMemo("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* 모바일 화면 상단 헤더 */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm">
              S
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-blue-400">세움노트 보안 서류 제출</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-semibold">
                  회원가입 불필요
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 truncate max-w-[240px]">
                {project.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 바디 영역 */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">서류 제출이 완료되었습니다!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  담당 건축사사무소에 실시간 제출 알림(접수 확인)이 전송되었습니다. 검토 후 이상이 있을 경우 재요청될 수 있습니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-slate-700 max-w-sm mx-auto space-y-1">
                <div><strong>제출 항목:</strong> {currentItem.title}</div>
                <div><strong>첨부 파일:</strong> {file ? file.name : "제출파일.pdf"}</div>
                <div><strong>접수 일시:</strong> {new Date().toLocaleTimeString()} (정상 접수)</div>
              </div>

              <div className="pt-3 flex gap-2 justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  다른 서류 추가 제출
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  확인 완료
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 공문 정보 안내 배너 */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 text-blue-900 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">요청 기관: {project.department}</span>
                  <span className="text-red-600 font-bold">마감: {project.dDay}</span>
                </div>
                <div className="text-[11px] text-blue-700">
                  설계사무소로부터 인허가 보완 제출 요청을 받으셨습니다. 해당되는 서류를 첨부해 주세요.
                </div>
              </div>

              {/* 제출할 항목 선택 */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  1. 제출할 보완 서류 항목 선택 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-1.5">
                  {project.checkItems.map((item, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedItemIndex === idx
                          ? "border-blue-500 bg-blue-50/40 font-bold text-slate-900 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="checkItem"
                          checked={selectedItemIndex === idx}
                          onChange={() => setSelectedItemIndex(idx)}
                          className="accent-blue-600"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                          {item.discipline}
                        </span>
                        <span className="truncate max-w-[220px]">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {item.status === "completed" ? "제출완료" : "제출필요"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 파일 업로드 드롭존 */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  2. 보완 도면/서류 파일 첨부 <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-5 text-center bg-slate-50 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {file ? (
                    <div className="flex items-center justify-center gap-2 text-blue-700 font-bold">
                      <FileCheck className="w-5 h-5 text-emerald-600" />
                      <span className="truncate max-w-xs">{file.name}</span>
                      <span className="text-[10px] text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud className="w-7 h-7 text-blue-500 mx-auto mb-1.5" />
                      <div className="font-bold text-slate-700">
                        파일을 드래그하거나 여기를 클릭하세요
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        PDF, DWG, HWP, ZIP 파일 (최대 200MB 지원)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 제출자 및 전달 메모 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">제출 업체/담당자명</label>
                  <input
                    type="text"
                    placeholder="예: (주)한국구조 김실장"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-blue-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">전달 메모 (선택)</label>
                  <input
                    type="text"
                    placeholder="예: 지내력 계산서 p.18 서명 날인본"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-blue-500 outline-hidden"
                  />
                </div>
              </div>

              {/* 보안 인증 뱃지 */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>TLS 1.3 암호화 보안 전송 및 세움노트 클라우드 안전 보관</span>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>서류 암호화 전송 중...</span>
                  </>
                ) : (
                  <span>건축사사무소로 서류 제출 완료하기</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}