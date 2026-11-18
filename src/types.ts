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

export interface ProjectDemoItem {
  id: string;
  title: string;
  department: string; // 예: 건축과, 소방서, 구조검토
  dueDate: string;
  status: "pending" | "submitted" | "in_review" | "approved";
  requestedFiles: string[];
  submittedFilesCount: number;
}
