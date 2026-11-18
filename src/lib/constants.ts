import type { IndustryType, ProjectDemoItem } from "@/types";

export const INDUSTRY_OPTIONS: IndustryType[] = [
  "건축사사무소",
  "인테리어·실내건축",
  "건축설계·엔지니어링",
  "구조·토목 협력사",
  "종합건설·시공사",
  "기타",
];

export const PROBLEM_CARDS = [
  {
    icon: "MessageSquareOff",
    title: "흩어진 보완 요구사항",
    description: "카카오톡, 문자, 이메일, 통화 메모로 여기저기 파편화되어 구청 보완 공문의 핵심 체크리스트가 누락됩니다.",
    quote: "“지난주 카톡으로 보내주셨다던 구조계산서 수정본이 어디 있더라...?”",
  },
  {
    icon: "FileQuestion",
    title: "찾기 어려운 최신 자료",
    description: "‘최종_진짜최종_수정3.dwg’처럼 버전이 꼬여 구버전 도면을 구청 세움터에 잘못 올려 재보완이 떨어집니다.",
    quote: "“건축주님이 보낸 파일이랑 구조사무실에서 보낸 파일 중 어떤 게 최종이죠?”",
  },
  {
    icon: "CalendarAlert",
    title: "누락되기 쉬운 제출 일정",
    description: "인허가 보완 기한(통상 15~30일)이 다가오는데, 협력사 서류가 아직 안 들어와 기한 연장 공문을 쓰는 일이 잦습니다.",
    quote: "“내일이 구청 보완 마감일인데 정화조 필증 아직 안 올라왔나요?”",
  },
];

export const CORE_FEATURES = [
  {
    id: "supplement-management",
    badge: "핵심 기능 01",
    title: "보완사항 체계적 관리",
    description: "구청/지자체 인허가 보완 공문 내용을 공종별(건축, 구조, 소방, 설비, 토목) 체크리스트로 즉시 분할 등록합니다.",
    highlights: ["보완 공문 항목별 1:1 매핑", "조치 기한 및 담당자 지정", "보완 완료 실시간 체크"],
  },
  {
    id: "submission-link",
    badge: "핵심 기능 02",
    title: "서류 제출 보안 링크",
    description: "건축주, 시공사, 협력업체에 회원가입 없는 전용 업로드 링크를 전송합니다. 스마트폰이나 PC에서 바로 서류를 제출합니다.",
    highlights: ["비회원 원클릭 파일 업로드", "링크 만료 기한 및 암호화", "서류 제출 시 즉시 알림"],
  },
  {
    id: "file-review",
    badge: "핵심 기능 03",
    title: "파일 검토 및 즉시 보완",
    description: "업로드된 서류를 설계 담당자가 확인하고 '승인' 또는 '재보완 사유'를 남기면 제출자에게 즉각 피드백이 전달됩니다.",
    highlights: ["도면/문서 즉시 뷰어", "반려 시 수정 요청 사유 기재", "중복 제출 방지"],
  },
  {
    id: "project-status",
    badge: "핵심 기능 04",
    title: "프로젝트별 진행 현황",
    description: "진행 중인 다수의 인허가 프로젝트의 보완율(0%~100%)과 마감 D-Day를 한눈에 볼 수 있는 통합 대시보드를 제공합니다.",
    highlights: ["D-Day 기한 임박 알림", "프로젝트별 보완 진척률", "건축/감리/사용승인 구분"],
  },
  {
    id: "result-pdf",
    badge: "핵심 기능 05",
    title: "보완 결과표 PDF 원클릭 출력",
    description: "구청 및 지자체 세움터 제출용 '인허가 보완사항 조치 결과표'를 표준 양식으로 자동 생성하여 1초 만에 PDF로 출력합니다.",
    highlights: ["세움터 제출 서식 호환", "요구사항 대 조치내용 대비표", "도면/도서 번호 자동 정리"],
  },
  {
    id: "version-history",
    badge: "핵심 기능 06",
    title: "파일 버전 이력 관리",
    description: "동일 도면의 1차, 2차, 최종본 이력을 영구 보존하여 혼선을 없애고 언제든 이전 버전과 변경점을 추적합니다.",
    highlights: ["자동 v1, v2, v3 넘버링", "업로드 일시 및 작성자 기록", "실수로 덮어쓰기 방지"],
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "프로젝트 등록",
    desc: "신축/증축 인허가 대상 대지위치와 담당 건축사, 관련 허가청을 등록합니다.",
  },
  {
    step: "02",
    title: "보완사항 등록",
    desc: "지자체 보완 공문 요구사항(건축, 소방, 구조 등)을 항목별로 나열합니다.",
  },
  {
    step: "03",
    title: "서류 요청 링크 전송",
    desc: "건축주, 구조사무소, 설비업체에 카톡/문자 전용 서류 제출 링크를 보냅니다.",
  },
  {
    step: "04",
    title: "검토 및 완료 확인",
    desc: "제출 서류를 확인하고 승인하면 보완결과표 PDF가 자동 생성되어 세움터 제출 준비 끝!",
  },
];

export const PRICING_PLAN = {
  name: "Pro",
  price: "19,900",
  period: "월",
  trialDays: 14,
  description: "인허가 보완 업무를 전산화하고 싶은 건축사사무소 및 설계 전문 업체를 위한 표준 플랜",
  features: [
    "동시 진행 프로젝트 최대 20개",
    "월 서류 요청 링크 발송 100건",
    "사무소 팀원 최대 3명 계정",
    "인허가 보완사항 전산 체크리스트",
    "세움터 제출용 보완결과표 PDF 생성",
    "클라우드 안전 파일 저장소 10GB",
    "도면 및 서류 버전 이력 관리",
    "서류 제출 시 실시간 알림",
  ],
  notice: "현재 베타 출시 준비 단계로, 사전 대기 등록자에게는 14일 무료 체험 기간이 자동 부여됩니다.",
};

export const FAQ_LIST = [
  {
    question: "고객도 회원가입해야 하나요?",
    answer:
      "아닙니다. 발송된 전용 보안 링크(Web Link)를 통해 고객이나 구조/토목 협력업체는 별도의 회원가입 없이 스마트폰이나 PC에서 즉시 필요한 서류와 도면을 안전하게 업로드할 수 있습니다.",
  },
  {
    question: "어떤 파일을 제출할 수 있나요?",
    answer:
      "PDF 인허가 도면, DWG 캐드 도면, HWP/DOCX 관련 공문 및 구조계산서, 고화질 현장 사진(JPG, PNG) 등 건축 인허가 및 보완에 필요한 모든 포맷을 파일당 최대 200MB까지 자유롭게 업로드하고 버전별로 관리할 수 있습니다.",
  },
  {
    question: "고객 파일은 안전하게 보관되나요?",
    answer:
      "모든 문서는 TLS 1.3 암호화 전송 및 저장 시 AES-256 규격으로 안전하게 격리 보관되며, 인허가 보완 제출 링크는 프로젝트 담당자가 발급한 전용 만료 토큰으로 철저히 보호됩니다.",
  },
  {
    question: "무료 체험이 끝나면 어떻게 되나요?",
    answer:
      "무료 체험 종료 후 자동으로 결제되지 않으며, 사전에 등록하신 프로젝트와 보완 데이터는 안전하게 보존됩니다. 유료 전환을 원하실 때만 결제 정보를 입력하시어 서비스를 계속 이용하실 수 있습니다.",
  },
  {
    question: "기존 자료를 가져올 수 있나요?",
    answer:
      "네, 가능합니다. 기존 인허가 체크리스트 엑셀 양식을 템플릿 형태로 손쉽게 일괄 불러올 수 있으며, 프로젝트별 기존 도서 파일도 드래그 앤 드롭으로 한 번에 보관소에 정리할 수 있습니다.",
  },
];

export const DEMO_PROJECTS: ProjectDemoItem[] = [
  {
    id: "PRJ-2026-081",
    title: "서초구 방배동 근린생활시설 신축허가",
    department: "서초구청 건축과",
    dueDate: "2026-11-28",
    status: "in_review",
    requestedFiles: ["구조안전확인서", "소방도면 수정본", "배치도 일조사선 보완"],
    submittedFilesCount: 2,
  },
  {
    id: "PRJ-2026-079",
    title: "성남시 판교 단독주택 허가 보완",
    department: "분당구청 건축허가팀",
    dueDate: "2026-11-22",
    status: "pending",
    requestedFiles: ["정화조 설치신고서", "지하층 방수 상세도"],
    submittedFilesCount: 0,
  },
  {
    id: "PRJ-2026-072",
    title: "마포구 연남동 다가구주택 사용승인",
    department: "마포구청 주거환경과",
    dueDate: "2026-11-20",
    status: "approved",
    requestedFiles: ["절수설비 시험성적서", "단열재 시험성적서", "현장 실측도"],
    submittedFilesCount: 3,
  },
];
