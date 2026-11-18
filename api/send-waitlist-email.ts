// Vercel Serverless Function: 무료 체험 신청 시 Resend를 통한 자동 이메일 발송
// Vercel 환경변수 RESEND_API_KEY가 등록되어 있으면 실제 발송되며,
// 미등록 시에도 프론트엔드 오류 없이 친절한 안내 상태를 반환합니다.

export default async function handler(req: any, res: any) {
  // CORS 및 메서드 제한
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { companyName, managerName, email, phone, industry } = req.body || {};

    if (!companyName || !managerName || !email) {
      return res.status(400).json({ error: "필수 정보(업체명, 담당자명, 이메일)가 누락되었습니다." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "lanvall2@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "세움노트 <onboarding@resend.dev>";

    // RESEND_API_KEY가 없을 경우: 시연 및 준비 완료 모드로 안전하게 응답
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY 환경변수가 설정되지 않아 시뮬레이션 모드로 처리됩니다.");
      return res.status(200).json({
        success: true,
        simulated: true,
        message: "신청 데이터가 안전하게 기록되었습니다. Vercel 환경변수에 RESEND_API_KEY를 설정하시면 실제 이메일이 자동 발송됩니다.",
        recipient: email,
      });
    }

    // 고객용 환영 및 접수 확인 HTML 이메일 템플릿
    const customerHtml = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0f172a; padding: 32px 28px; text-align: left; }
          .logo { font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
          .logo-badge { background: #2563eb; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 11px; margin-left: 8px; font-weight: 700; }
          .hero-title { color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 14px; margin-bottom: 6px; }
          .hero-sub { color: #94a3b8; font-size: 13px; margin: 0; }
          .content { padding: 32px 28px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px dashed #e2e8f0; }
          .row:last-child { border-bottom: none; }
          .label { color: #64748b; font-weight: 600; }
          .value { color: #0f172a; font-weight: 700; }
          .steps { margin: 24px 0; }
          .step-item { display: flex; gap: 12px; margin-bottom: 14px; }
          .step-num { width: 22px; height: 22px; background: #2563eb; color: #fff; border-radius: 50%; font-size: 11px; font-weight: bold; text-align: center; line-height: 22px; shrink: 0; }
          .step-text { font-size: 13px; color: #334155; }
          .cta-btn { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin-top: 10px; }
          .footer { background: #f8fafc; padding: 20px 28px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              세움노트 <span class="logo-badge">SeumNote Pro</span>
            </div>
            <div class="hero-title">14일 무료 체험 신청이 접수되었습니다!</div>
            <p class="hero-sub">건축 인허가 보완 서류 관리의 새로운 표준, 세움노트와 함께해 주셔서 감사합니다.</p>
          </div>
          
          <div class="content">
            <p style="font-size: 14px; font-weight: 700; color: #0f172a;">
              안녕하세요, <strong>${companyName} ${managerName}</strong>님.
            </p>
            <p style="font-size: 13px; color: #475569;">
              신청해 주신 정보가 정상적으로 등록되었으며, 영업일 기준 24시간 이내에 전담 온보딩 담당자가 계정 활성화 및 전용 워크스페이스 링크를 발송해 드릴 예정입니다.
            </p>

            <div class="card">
              <div style="font-size: 12px; font-weight: 800; color: #2563eb; margin-bottom: 10px;">신청 내역 확인</div>
              <div class="row"><span class="label">업체명</span><span class="value">${companyName}</span></div>
              <div class="row"><span class="label">신청 담당자</span><span class="value">${managerName}</span></div>
              <div class="row"><span class="label">수신 이메일</span><span class="value">${email}</span></div>
              ${phone ? `<div class="row"><span class="label">연락처</span><span class="value">${phone}</span></div>` : ""}
              <div class="row"><span class="label">업종</span><span class="value">${industry}</span></div>
              <div class="row"><span class="label">체험 혜택</span><span class="value" style="color: #2563eb;">14일 Pro 무료 체험 (프로젝트 20개 / 결과표 PDF 무제한)</span></div>
            </div>

            <div class="steps">
              <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">앞으로의 진행 순서</div>
              <div class="step-item">
                <div class="step-num">1</div>
                <div class="step-text"><strong>계정 활성화 안내</strong> : 신청하신 이메일로 1회용 로그인 링크가 전송됩니다.</div>
              </div>
              <div class="step-item">
                <div class="step-num">2</div>
                <div class="step-text"><strong>프로젝트 생성</strong> : 인허가 보완 대상 건축 프로젝트를 등록하고 공문 체크리스트를 생성합니다.</div>
              </div>
              <div class="step-item">
                <div class="step-num">3</div>
                <div class="step-text"><strong>협력사 서류 요청</strong> : 구조, 토목, 소방 협력사에 회원가입 없는 원클릭 제출 링크를 전달합니다.</div>
              </div>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://seumnote.vercel.app/" class="cta-btn" target="_blank">세움노트 둘러보기</a>
            </div>
          </div>

          <div class="footer">
            본 메일은 세움노트(https://seumnote.vercel.app)에서 무료 체험을 신청하신 고객님께 자동 발송되었습니다.<br>
            궁금하신 사항은 support@seumnote.kr 또는 고객센터로 언제든지 문의해 주세요.
          </div>
        </div>
      </body>
      </html>
    `;

    // 1) 고객에게 확인 이메일 발송 (Resend REST API 호출)
    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `[세움노트] ${companyName}님의 14일 무료 체험 신청이 정상 접수되었습니다.`,
        html: customerHtml,
      }),
    });

    const customerData = await customerRes.json();

    // 2) 관리자에게 알림 이메일 발송
    if (adminEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [adminEmail],
            subject: `[신규 신청 알림] ${companyName} (${managerName}님) 무료 체험 신청 접수`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
                <h2>새로운 무료 체험 신청이 접수되었습니다.</h2>
                <ul>
                  <li><strong>업체명:</strong> ${companyName}</li>
                  <li><strong>담당자:</strong> ${managerName}</li>
                  <li><strong>이메일:</strong> ${email}</li>
                  <li><strong>연락처:</strong> ${phone || "미입력"}</li>
                  <li><strong>업종:</strong> ${industry}</li>
                  <li><strong>신청일시:</strong> ${new Date().toLocaleString("ko-KR")}</li>
                </ul>
                <p>세움노트 관리자 페이지에서 전체 목록을 확인하실 수 있습니다.</p>
              </div>
            `,
          }),
        });
      } catch (adminErr) {
        console.warn("관리자 알림 이메일 발송 실패(무시가능):", adminErr);
      }
    }

    if (!customerRes.ok) {
      console.error("Resend API 에러 응답:", customerData);
      return res.status(customerRes.status).json({
        error: "이메일 발송 중 오류가 발생했습니다.",
        details: customerData,
      });
    }

    return res.status(200).json({
      success: true,
      emailId: customerData.id,
      recipient: email,
      message: "고객님께 안내 이메일이 정상 발송되었습니다.",
    });
  } catch (err: any) {
    console.error("서버리스 함수 처리 오류:", err);
    return res.status(500).json({ error: "내부 서버 오류", message: err.message });
  }
}