import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_LIST } from "@/lib/constants";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-4 leading-snug">
            자주 묻는 질문
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            건축사사무소와 실무진이 가장 궁금해하시는 점들을 모았습니다.
          </p>
        </div>

        {/* FAQ 아코디언 목록 */}
        <div className="mt-12 space-y-3.5">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-subtle hover:border-slate-300 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug flex items-center gap-3">
                    <span className="text-xs font-black text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded shrink-0">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 animate-in fade-in duration-200">
                    <p className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
