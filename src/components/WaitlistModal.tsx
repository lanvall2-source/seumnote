import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, Briefcase, ShieldCheck } from "lucide-react";
import { INDUSTRY_OPTIONS } from "@/lib/constants";
import { saveWaitlistSubmission } from "@/lib/storage";
import type { IndustryType } from "@/types";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState<IndustryType>("건축사사무소");
  const [teamSize, setTeamSize] = useState("1~3인");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = saveWaitlistSubmission({
      companyName,
      managerName,
      email,
      phone,
      industry,
      teamSize,
      privacyAgreed,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || "신청에 실패했습니다. 다시 확인해 주세요.");
      return;
    }

    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setCompanyName("");
    setManagerName("");
    setEmail("");
    setPhone("");
    setPrivacyAgreed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* 닫기 버튼 */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* 신청 성공 완료 화면 */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-subtle animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">
              14일 무료 체험 신청이 완료되었습니다!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              <strong className="text-slate-900">{companyName}</strong> ({managerName} 님), 반갑습니다. <br />
              입력해주신 이메일(<span className="text-[#2563EB] font-bold">{email}</span>)로 서비스 계정 활성화 안내 및 데모 접속 링크가 발송될 예정입니다.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>무료 체험 사전 등록 혜택 안내</span>
              </div>
              <p>&bull; 14일간 Pro 플랜 모든 기능 무제한 이용 (결제 카드 등록 없음)</p>
              <p>&bull; 인허가 보완 엑셀 서식 1:1 세팅 및 도입 지원</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-subtle transition-all cursor-pointer mt-4"
            >
              확인 및 홈으로 돌아가기
            </button>
          </div>
        ) : (
          /* 신청 폼 */
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">
                14 Days Free Trial
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mt-2">
                세움노트 무료 체험 신청
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                인허가 보완 업무를 전산화하고 싶은 사무소 정보를 입력해 주세요.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* 업체명 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  업체명 (사무소명) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="예: (주)한결건축사사무소"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              {/* 담당자명 & 업종 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    담당자명 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 소장"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    업종 구분 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value as IndustryType)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-white"
                    >
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  회사 이메일 (체험 계정 발송) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="example@arch-firm.kr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  휴대폰 번호 <span className="text-slate-400 font-normal">(선택, 안내 문자 발송)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              {/* 개인정보 수집 및 이용 동의 (필수 체크) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-400"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-900">[필수]</strong> 개인정보 수집 및 이용에 동의합니다. (수집항목: 업체명, 담당자명, 이메일, 연락처 / 목적: 무료 체험 계정 안내 및 고객 상담 / 보유기간: 서비스 종료 시까지)
                  </span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-black text-base rounded-xl shadow-subtle transition-all cursor-pointer"
                >
                  {isSubmitting ? "신청 처리 중..." : "14일 무료 체험 시작하기"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
