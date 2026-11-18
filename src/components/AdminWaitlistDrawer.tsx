import React, { useState, useEffect } from "react";
import { X, Lock, Download, Trash2, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { loadWaitlist, exportWaitlistToCSV } from "@/lib/storage";
import type { WaitlistSubmission } from "@/types";

interface AdminWaitlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminWaitlistDrawer({ isOpen, onClose }: AdminWaitlistDrawerProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [submissions, setSubmissions] = useState<WaitlistSubmission[]>([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setSubmissions(loadWaitlist());
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 관리자 마스터 비밀번호 확인 (데모용: seumnote2026, docflow2026 또는 admin1234)
    if (password === "seumnote2026" || password === "docflow2026" || password === "admin1234") {
      setIsAuthenticated(true);
      setAuthError(false);
      setSubmissions(loadWaitlist());
    } else {
      setAuthError(true);
    }
  };

  const handleClearAll = () => {
    if (confirm("정말로 모든 신청자 데이터를 삭제하시겠습니까?")) {
      localStorage.removeItem("seumnote_waitlist_submissions_v1");
      localStorage.removeItem("docflow_waitlist_submissions_v1");
      setSubmissions([]);
    }
  };

  const handleRefresh = () => {
    setSubmissions(loadWaitlist());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* 관리자 인증 모드 */
          <div className="py-8 max-w-sm mx-auto text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-black text-[#0F172A]">
              관리자 보안 인증
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              신청된 고객 정보는 개인정보 보호를 위해 인증된 관리자만 열람할 수 있습니다.
            </p>

            {authError && (
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                비밀번호가 올바르지 않습니다.
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                autoFocus
                placeholder="관리자 비밀번호 입력 (admin1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl cursor-pointer shadow-subtle"
              >
                조회 권한 확인
              </button>
            </form>
          </div>
        ) : (
          /* 관리자 신청자 목록 테이블 */
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  관리자 모드 활성화
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  무료 체험 사전 신청자 목록 ({submissions.length}건)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                  title="새로고침"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => exportWaitlistToCSV(submissions)}
                  disabled={submissions.length === 0}
                  className="px-3 py-1.5 text-xs font-bold bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV 다운로드</span>
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={submissions.length === 0}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 border border-red-200 cursor-pointer"
                  title="전체 초기화"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 목록 테이블 */}
            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
              {submissions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs font-medium">
                  아직 등록된 무료 체험 신청자가 없습니다.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200">업체명</th>
                      <th className="p-2.5 border-b border-slate-200">담당자</th>
                      <th className="p-2.5 border-b border-slate-200">이메일</th>
                      <th className="p-2.5 border-b border-slate-200">업종</th>
                      <th className="p-2.5 border-b border-slate-200">신청일시</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {submissions.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{s.companyName}</td>
                        <td className="p-2.5">{s.managerName}</td>
                        <td className="p-2.5 text-[#2563EB]">{s.email}</td>
                        <td className="p-2.5">{s.industry}</td>
                        <td className="p-2.5 text-slate-400">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
