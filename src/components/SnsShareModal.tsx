import React, { useState } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  Globe,
  Sparkles,
  MessageCircle,
  BookOpen,
  Users,
} from "lucide-react";

interface SnsShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  url?: string;
}

export function SnsShareModal({
  isOpen,
  onClose,
  title = "세움노트 | 건축 인허가 보완 관리 및 서류 제출 SaaS",
  description = "보완 요청부터 서류 제출 링크, 파일 검토, 세움터 제출용 PDF 생성까지 한곳에서 관리하는 건축사 전용 B2B 솔루션",
  url = typeof window !== "undefined" ? window.location.origin : "https://seumnote.vercel.app/",
}: SnsShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        onClose();
      } catch (err) {
        // 사용자 취소 시 처리
      }
    } else {
      handleCopyLink();
    }
  };

  // SNS 공유 대상 목록 (원시 이모지 전면 배제 및 벡터 SVG 아이콘 적용)
  const shareTargets = [
    {
      name: "카카오톡",
      renderIcon: () => <MessageCircle className="w-5 h-5 fill-current" />,
      color: "bg-[#FEE500] text-[#381E1F] hover:bg-[#FADA0A]",
      onClick: () => {
        const kakaoShareUrl = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedTitle}`;
        window.open(kakaoShareUrl, "_blank", "width=600,height=500");
      },
    },
    {
      name: "네이버 블로그",
      renderIcon: () => <BookOpen className="w-5 h-5 text-white" />,
      color: "bg-[#03C75A] text-white hover:bg-[#02B150]",
      onClick: () => {
        const naverUrl = `https://share.naver.com/web/shareView.nhn?url=${encodedUrl}&title=${encodedTitle}`;
        window.open(naverUrl, "_blank", "width=600,height=500");
      },
    },
    {
      name: "네이버 밴드",
      renderIcon: () => <Users className="w-5 h-5 text-white" />,
      color: "bg-[#00D344] text-white hover:bg-[#00BA3C]",
      onClick: () => {
        const bandUrl = `https://band.us/plugin/share?body=${encodedTitle}%0A${encodedUrl}&route=${encodedUrl}`;
        window.open(bandUrl, "_blank", "width=600,height=500");
      },
    },
    {
      name: "X (트위터)",
      renderIcon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-black text-white hover:bg-neutral-800",
      onClick: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        window.open(twitterUrl, "_blank", "width=600,height=500");
      },
    },
    {
      name: "페이스북",
      renderIcon: () => (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "bg-[#1877F2] text-white hover:bg-[#166FE5]",
      onClick: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(fbUrl, "_blank", "width=600,height=500");
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* 모달 상단 헤더 */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                세움노트 동료 공유하기
              </h3>
              <p className="text-xs text-slate-500">
                건축사사무소 실무진 및 소장님과 편리하게 나누세요
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 본문 콘텐츠 */}
        <div className="p-6 space-y-5">
          {/* 공유 대상 미리보기 카드 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-blue-600 block mb-0.5">
                건축 인허가 보완 관리 SaaS
              </span>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                세움노트 (SeumNote)
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {description}
              </p>
            </div>
          </div>

          {/* 주요 SNS 퀵 공유 버튼 그리드 */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2.5">
              SNS 및 커뮤니티로 보내기
            </label>
            <div className="grid grid-cols-5 gap-2">
              {shareTargets.map((item) => {
                const IconComponent = item.renderIcon;
                return (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer group"
                    title={`${item.name} 공유`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shadow-subtle transition-transform group-hover:scale-105 ${item.color}`}
                    >
                      <IconComponent />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight line-clamp-2 w-full break-keep">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 모바일 Web Share API 지원 시 원클릭 네이티브 버튼 */}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-subtle cursor-pointer active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>스마트폰 기본 공유창 열기</span>
            </button>
          )}

          {/* 링크 직접 복사 영역 */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              페이지 링크 직접 복사
            </label>
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent px-2.5 py-1 text-xs text-slate-600 font-mono outline-hidden select-all"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-[#2563EB] hover:bg-blue-700 text-white shadow-subtle active:scale-95"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>클립보드에 주소가 복사되었습니다. 카카오톡이나 메일에 바로 붙여넣으세요!</span>
              </p>
            )}
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>건축사 협업 가치 전파 캠페인</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
