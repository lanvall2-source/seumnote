import React, { useState } from "react";
import { FileCheck2, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenWaitlist: () => void;
  onOpenAdmin: () => void;
}

export function Navbar({ onOpenWaitlist, onOpenAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "문제 공감", href: "#problem" },
    { label: "핵심 기능", href: "#features" },
    { label: "사용 방법", href: "#workflow" },
    { label: "화면 예시", href: "#demo" },
    { label: "요금제", href: "#pricing" },
    { label: "자주 묻는 질문", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 브랜드 로고 */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-subtle group-hover:bg-blue-700 transition-colors">
            <FileCheck2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-[#0F172A] flex items-center gap-1.5">
              DocFlow
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-[#2563EB]">
                B2B SaaS
              </span>
            </span>
          </div>
        </a>

        {/* 데스크톱 메뉴 링크 */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* 우측 액션 버튼 */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="신청자 관리자 열람"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>신청자 조회</span>
          </button>

          <button
            onClick={onOpenWaitlist}
            className="text-sm font-bold bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-xl shadow-subtle transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>무료 체험 시작</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E2E8F0] bg-white px-4 pt-2 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] p-2 rounded-lg hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full text-center py-2.5 bg-[#2563EB] text-white font-bold rounded-xl shadow-subtle"
            >
              14일 무료 체험 신청하기
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-2 text-xs font-semibold text-slate-500 rounded-lg border border-slate-200"
            >
              관리자 신청 목록 확인
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
