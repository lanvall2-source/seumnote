import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { saveWaitlistSubmission, loadWaitlist } from "../lib/storage";
import { PRICING_PLAN, FAQ_LIST, CORE_FEATURES, PROBLEM_CARDS } from "../lib/constants";

// Node 환경용 LocalStorage Mock
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

describe("DocFlow 공식 홈페이지 및 고객 확보 기능 단위 테스트", () => {
  beforeAll(() => {
    global.localStorage = new LocalStorageMock() as any;
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("1. 무료 체험 신청 유효성 검사: 업체명이 없으면 실패해야 한다", () => {
    const result = saveWaitlistSubmission({
      companyName: "",
      managerName: "김건축",
      email: "arch@example.com",
      industry: "건축사사무소",
      privacyAgreed: true,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("업체명");
  });

  it("2. 무료 체험 신청 유효성 검사: 이메일 형식이 올바르지 않으면 실패해야 한다", () => {
    const result = saveWaitlistSubmission({
      companyName: "(주)테스트건축",
      managerName: "김건축",
      email: "invalid-email-string",
      industry: "건축사사무소",
      privacyAgreed: true,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("이메일");
  });

  it("3. 무료 체험 신청 유효성 검사: 개인정보 수집에 미동의하면 실패해야 한다", () => {
    const result = saveWaitlistSubmission({
      companyName: "(주)테스트건축",
      managerName: "김건축",
      email: "arch@example.com",
      industry: "건축사사무소",
      privacyAgreed: false,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("동의");
  });

  it("4. 정상적인 무료 체험 신청: 성공적으로 저장되고 고유 ID와 일시가 부여되어야 한다", () => {
    const result = saveWaitlistSubmission({
      companyName: "(주)아키텍트종합건축",
      managerName: "이소장",
      email: "architect@example.kr",
      industry: "건축사사무소",
      privacyAgreed: true,
    });

    expect(result.success).toBe(true);
    expect(result.submission).toBeDefined();
    expect(result.submission?.id).toMatch(/^WF-/);

    const list = loadWaitlist();
    expect(list).toHaveLength(1);
    expect(list[0].companyName).toBe("(주)아키텍트종합건축");
  });

  it("5. 중복 이메일 신청 방지: 동일한 이메일로 다시 신청하면 에러를 반환해야 한다", () => {
    saveWaitlistSubmission({
      companyName: "(주)건축사사무소A",
      managerName: "박건축",
      email: "repeat@arch.com",
      industry: "건축사사무소",
      privacyAgreed: true,
    });

    const secondTry = saveWaitlistSubmission({
      companyName: "(주)건축사사무소B",
      managerName: "최건축",
      email: "repeat@arch.com",
      industry: "건축설계·엔지니어링",
      privacyAgreed: true,
    });

    expect(secondTry.success).toBe(false);
    expect(secondTry.error).toContain("이미 무료 체험을 신청");
  });

  it("6. 요금제 사양 검증: Pro 월 19,900원 및 14일 무료 체험 조건이 정확히 설정되어야 한다", () => {
    expect(PRICING_PLAN.price).toBe("19,900");
    expect(PRICING_PLAN.trialDays).toBe(14);
    expect(PRICING_PLAN.period).toBe("월");
    expect(PRICING_PLAN.features.some((f) => f.includes("20개"))).toBe(true);
    expect(PRICING_PLAN.features.some((f) => f.includes("100건"))).toBe(true);
    expect(PRICING_PLAN.features.some((f) => f.includes("3명"))).toBe(true);
    expect(PRICING_PLAN.features.some((f) => f.includes("10GB"))).toBe(true);
  });

  it("7. FAQ 항목 검증: 필수 5대 질문이 모두 등록되어 있어야 한다", () => {
    expect(FAQ_LIST).toHaveLength(5);
    const questionsText = FAQ_LIST.map((f) => f.question).join(" ");
    expect(questionsText).toContain("회원가입");
    expect(questionsText).toContain("어떤 파일");
    expect(questionsText).toContain("안전하게 보관");
    expect(questionsText).toContain("무료 체험이 끝나면");
    expect(questionsText).toContain("기존 자료");
  });

  it("8. 문제 공감 및 핵심 기능 검증: 3대 문제 카드와 6대 기능이 모두 충족되어야 한다", () => {
    expect(PROBLEM_CARDS).toHaveLength(3);
    expect(CORE_FEATURES).toHaveLength(6);
  });
});
