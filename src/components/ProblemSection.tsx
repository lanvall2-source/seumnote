import React from "react";
import { MessageSquareOff, FileQuestion, CalendarClock, AlertCircle } from "lucide-react";
import { PROBLEM_CARDS } from "@/lib/constants";

export function ProblemSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case "MessageSquareOff":
        return <MessageSquareOff className="w-6 h-6 text-red-500" />;
      case "FileQuestion":
        return <FileQuestion className="w-6 h-6 text-amber-500" />;
      case "CalendarAlert":
      case "CalendarClock":
        return <CalendarClock className="w-6 h-6 text-rose-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <section id="problem" className="py-20 sm:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Pain Point
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-4 leading-snug">
            보완사항 하나 확인하려고 <br className="hidden sm:inline" />
            대화방을 다시 찾고 계신가요?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            인허가 담당 공무원, 건축주, 구조·토목·소방 협력업체까지... <br className="hidden sm:inline" />
            수많은 대화방과 메일함 속에서 정작 최신 수정본을 찾지 못해 밤샘 야근이 반복됩니다.
          </p>
        </div>

        {/* 3대 문제 카드 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROBLEM_CARDS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-card transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-subtle mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* 실제 건축사 현장 인용구 */}
              <div className="mt-6 pt-5 border-t border-slate-200/80">
                <p className="text-xs font-medium text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
