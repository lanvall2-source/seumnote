export type IndustryType =
  | "건축사사무소"
  | "인테리어·실내건축"
  | "건축설계·엔지니어링"
  | "구조·토목 협력사"
  | "종합건설·시공사"
  | "기타";

export interface WaitlistSubmission {
  id: string;
  companyName: string;
  managerName: string;
  email: string;
  phone?: string;
  industry: IndustryType;
  teamSize?: string;
  privacyAgreed: boolean;
  createdAt: string;
}

export type PermitStage = "all" | "permit" | "construction" | "completion";

export interface SupplementCheckItem {
  discipline: "건축" | "구조" | "토목" | "소방" | "에너지" | "설비";
  title: string;
  targetRole: string;
  format: string;
  status: "completed" | "reviewing" | "pending";
  fileName?: string;
  version?: string;
}

export interface ProjectDemoItem {
  id: string;
  title: string;
  client?: string; // 건축주
  department: string; // 예: 건축과, 소방서, 구조검토
  stage: "permit" | "construction" | "completion";
  stageLabel: string;
  dueDate: string;
  dDay: string;
  status: "pending" | "submitted" | "in_review" | "approved";
  requestedFiles: string[];
  checkItems: SupplementCheckItem[];
  submittedFilesCount: number;
}
