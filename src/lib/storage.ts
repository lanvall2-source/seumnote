import type { WaitlistSubmission } from "@/types";

const STORAGE_KEY = "docflow_waitlist_submissions_v1";

export function loadWaitlist(): WaitlistSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load waitlist submissions:", error);
    return [];
  }
}

export function saveWaitlistSubmission(
  data: Omit<WaitlistSubmission, "id" | "createdAt">
): { success: boolean; error?: string; submission?: WaitlistSubmission } {
  // 기본 유효성 검사
  if (!data.companyName.trim()) {
    return { success: false, error: "업체명을 입력해 주세요." };
  }
  if (!data.managerName.trim()) {
    return { success: false, error: "담당자명을 입력해 주세요." };
  }
  if (!data.email.trim() || !data.email.includes("@")) {
    return { success: false, error: "올바른 이메일 주소를 입력해 주세요." };
  }
  if (!data.privacyAgreed) {
    return { success: false, error: "개인정보 수집 및 이용에 동의해 주세요." };
  }

  try {
    const currentList = loadWaitlist();

    // 중복 이메일 신청 방지
    const isDuplicate = currentList.some(
      (item) => item.email.toLowerCase() === data.email.toLowerCase()
    );
    if (isDuplicate) {
      return { success: false, error: "이미 무료 체험을 신청하신 이메일입니다." };
    }

    const newSubmission: WaitlistSubmission = {
      ...data,
      id: `WF-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newSubmission, ...currentList];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, submission: newSubmission };
  } catch (error) {
    console.error("Failed to save waitlist submission:", error);
    return { success: false, error: "신청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}

export function exportWaitlistToCSV(submissions: WaitlistSubmission[]): void {
  if (submissions.length === 0) return;

  const headers = ["신청ID", "업체명", "담당자명", "이메일", "연락처", "업종", "신청일시"];
  const rows = submissions.map((s) => [
    s.id,
    `"${s.companyName.replace(/"/g, '""')}"`,
    `"${s.managerName.replace(/"/g, '""')}"`,
    s.email,
    s.phone || "-",
    s.industry,
    s.createdAt,
  ]);

  const csvContent =
    "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `docflow_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
