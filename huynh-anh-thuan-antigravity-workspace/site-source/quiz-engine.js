/**
 * Quiz Engine — Holland RIASEC (2 phiên bản)
 * Phiên bản 1: 16–22 tuổi — Likert 5 mức, 84 câu
 * Phiên bản 2: 23+ tuổi — Có/Không/Không rõ, 84 câu
 */

(function () {
  "use strict";

  /* ── State ─────────────────────────────────────────────────── */
  let currentVersion = null; // "v1" | "v2"
  let questions = [];
  let answerOptions = [];
  let answers = {};
  let currentQ = 0;

  const STORAGE_KEY = "hat_pending_quiz_result";
  const INTENT_KEY = "hat_purchase_intent";

  /* ── DOM refs ───────────────────────────────────────────────── */
  const screen = (id) => document.getElementById(id);

  /* ── Init ───────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    // Version selector buttons
    document.getElementById("btn-v1")?.addEventListener("click", () => startQuiz("v1"));
    document.getElementById("btn-v2")?.addEventListener("click", () => startQuiz("v2"));
    // Restart
    document.getElementById("btn-restart")?.addEventListener("click", showVersionSelect);

    // [NEW] Restore state if exists
    _restoreState();
  });

  function _restoreState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    // Don't restore if explicitly restarting (URL hash or param)
    if (window.location.hash === '#restart' || window.location.search.includes('restart=true')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(INTENT_KEY);
      return;
    }

    try {
      const data = JSON.parse(saved);
      // Check for expiration (24h = 86400000ms)
      if (Date.now() - data.timestamp > 86400000) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      console.log("[HAT_QUIZ] Restoring pending result from session...");
      currentVersion = data.version;
      window._hatQuizResult = data.result;
      
      // We don't need all previous 'answers' state if we just want to show the final result screen
      // But we set currentVersion to help showResult work correctly
      showResult(true); // true = skip recalculation, just use saved result

      // Check if user had intent to buy
      if (localStorage.getItem(INTENT_KEY) === "true") {
        localStorage.removeItem(INTENT_KEY);
        // Delay slightly to ensure Auth is ready
        setTimeout(() => {
          if (typeof HAT_AUTH !== 'undefined' && HAT_AUTH.isLoggedIn()) {
            console.log("[HAT_QUIZ] Resuming purchase after login...");
            hatBuyAiReport();
          }
        }, 1000);
      }
    } catch (e) {
      console.error("[HAT_QUIZ] Failed to restore state:", e);
    }
  }

  function showVersionSelect() {
    hide("screen-quiz");
    hide("screen-result");
    show("screen-version");
    answers = {};
    currentQ = 0;
    // Clear storage on manual restart
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(INTENT_KEY);
  }

  function startQuiz(version) {
    currentVersion = version;
    if (version === "v1") {
      questions = HOLLAND_QUESTIONS_16_22;
      answerOptions = ANSWER_OPTIONS_16_22;
    } else {
      questions = HOLLAND_QUESTIONS_23;
      answerOptions = ANSWER_OPTIONS_23;
    }
    answers = {};
    currentQ = 0;

    hide("screen-version");
    show("screen-quiz");
    renderQuestion();
  }

  /* ── Render question ─────────────────────────────────────────── */
  function renderQuestion() {
    const q = questions[currentQ];
    const total = questions.length;
    const progress = Math.round(((currentQ) / total) * 100);

    // Progress
    const bar = document.getElementById("quiz-progress-bar");
    if (bar) bar.style.width = progress + "%";
    const counter = document.getElementById("quiz-counter");
    if (counter) counter.textContent = `Câu ${currentQ + 1} / ${total}`;

    // Group label
    const groupLabel = document.getElementById("quiz-group-label");
    if (groupLabel) {
      const t = HOLLAND_TYPES[q.type];
      groupLabel.textContent = t.fullName;
      groupLabel.style.color = t.color;
    }

    // Question
    const qText = document.getElementById("quiz-question-text");
    if (qText) qText.textContent = `Nếu có đầy đủ cơ hội và nguồn lực, tôi có thích… ${q.text}`;

    // Answer options
    const optContainer = document.getElementById("quiz-options");
    if (!optContainer) return;
    optContainer.innerHTML = "";

    if (currentVersion === "v1") {
      renderLikert(optContainer, q);
    } else {
      renderBinary(optContainer, q);
    }

    // Nav buttons
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    if (btnPrev) btnPrev.disabled = currentQ === 0;
    if (btnNext) {
      btnNext.textContent = currentQ === total - 1 ? "Xem kết quả" : "Tiếp theo →";
      btnNext.onclick = () => {
        if (answers[q.id] === undefined) {
          showAnswerRequired();
          return;
        }
        if (currentQ < total - 1) {
          currentQ++;
          renderQuestion();
        } else {
          showResult();
        }
      };
    }
    if (btnPrev) {
      btnPrev.onclick = () => {
        if (currentQ > 0) { currentQ--; renderQuestion(); }
      };
    }
  }

  /* ── Likert (v1) ─────────────────────────────────────────────── */
  function renderLikert(container, q) {
    const row = document.createElement("div");
    row.className = "likert-row";

    ANSWER_OPTIONS_16_22.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "likert-btn" + (answers[q.id] === opt.value ? " selected" : "");
      btn.textContent = opt.label;
      btn.setAttribute("data-value", opt.value);
      btn.addEventListener("click", () => {
        answers[q.id] = opt.value;
        container.querySelectorAll(".likert-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        // Auto-advance after short delay
        setTimeout(() => {
          if (currentQ < questions.length - 1) { currentQ++; renderQuestion(); }
          else showResult();
        }, 300);
      });
      row.appendChild(btn);
    });

    container.appendChild(row);
  }

  /* ── Binary (v2) ─────────────────────────────────────────────── */
  function renderBinary(container, q) {
    const row = document.createElement("div");
    row.className = "binary-row";

    const opts = [
      { label: "Có", value: 1 },
      { label: "Không", value: 0 },
      { label: "Không rõ", value: -1 }, // -1 = no score
    ];

    opts.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "binary-btn" + (answers[q.id] === opt.value ? " selected" : "");
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        answers[q.id] = opt.value;
        container.querySelectorAll(".binary-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        setTimeout(() => {
          if (currentQ < questions.length - 1) { currentQ++; renderQuestion(); }
          else showResult();
        }, 300);
      });
      row.appendChild(btn);
    });

    container.appendChild(row);
  }

  /* ── Score calculation ──────────────────────────────────────── */
  function calcScores() {
    const types = ["R", "I", "A", "S", "E", "C"];
    const scores = {};
    const maxScores = {};

    types.forEach(t => { scores[t] = 0; maxScores[t] = 0; });

    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans === undefined) return;

      if (currentVersion === "v1") {
        scores[q.type] += ans;             // 1–5
        maxScores[q.type] += 5;
      } else {
        scores[q.type] += (ans === 1 ? 1 : 0); // Có=1, else=0
        maxScores[q.type] += 1;
      }
    });

    return types.map(t => ({
      type: t,
      score: scores[t],
      max: currentVersion === "v1" ? 70 : 14,
      pct: maxScores[t] > 0 ? Math.round((scores[t] / maxScores[t]) * 100) : 0,
      info: HOLLAND_TYPES[t]
    })).sort((a, b) => b.score - a.score);
  }

  /* ── Show result ─────────────────────────────────────────────── */
  function showResult(skipCalc = false) {
    hide("screen-quiz");
    show("screen-result");

    let sorted, code, top3;

    if (skipCalc && window._hatQuizResult) {
      sorted = window._hatQuizResult.sorted;
      code = window._hatQuizResult.code;
      top3 = window._hatQuizResult.top3;
    } else {
      sorted = calcScores();
      top3 = sorted.slice(0, 3);
      code = top3.map(x => x.type).join("");
    }

    // Holland code
    const codeEl = document.getElementById("result-code");
    if (codeEl) codeEl.innerHTML = `Mật mã Holland của bạn: <span style="color:#0DF259; border-bottom: 2px dashed #0DF259;">${code}</span>`;

    // Radar Chart
    renderRadarChart(sorted);

    // Top group Summary
    const topResult = top3[0];
    const topType = topResult.info;
    const wikiData = HOLLAND_WIKI.types[topResult.type];

    const topEl = document.getElementById("result-top-type");
    if (topEl) {
      topEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <span style="font-size:2.5rem">${topType.icon}</span>
          <div>
            <h3 style="color:${topType.color}; margin:0; font-size:1.4rem;">${topType.fullName}</h3>
            <p style="font-size:0.85rem; color:#90CBA4; margin:0;">${wikiData.tagline}</p>
          </div>
        </div>
        <p style="font-size:0.95rem; line-height:1.7; opacity:0.9;">${wikiData.description}</p>
        <div style="margin-top:1.5rem;">
          <h4 style="font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; color:#90CBA4; margin-bottom:8px;">Môi trường làm việc lý tưởng</h4>
          <p style="font-size:0.9rem; font-style:italic;">"${wikiData.idealEnvironment}"</p>
        </div>
      `;
    }

    // Deep Insights: Strengths, Challenges, Tips
    const strEl = document.getElementById("result-strengths");
    if (strEl) {
      strEl.innerHTML = `
        <h3 style="color:#0DF259; font-size:1.1rem; margin-bottom:1rem;"><i class="icon">✨</i> Thế mạnh nổi bật</h3>
        <ul style="font-size:0.9rem; padding-left:1.2rem; line-height:1.8;">
          ${wikiData.strengths.map(s => `<li>${s}</li>`).join("")}
        </ul>
      `;
    }

    const chaEl = document.getElementById("result-challenges");
    if (chaEl) {
      chaEl.innerHTML = `
        <h3 style="color:#FF6B6B; font-size:1.1rem; margin-bottom:1rem;"><i class="icon">⚠️</i> Thách thức cần lưu ý</h3>
        <ul style="font-size:0.9rem; padding-left:1.2rem; line-height:1.8;">
          ${wikiData.challenges.map(c => `<li>${c}</li>`).join("")}
        </ul>
      `;
    }

    const tipsEl = document.getElementById("result-tips");
    if (tipsEl) {
      tipsEl.innerHTML = `
        <div style="display:flex; gap:20px; align-items:center;">
          <div style="font-size:2rem;">💡</div>
          <div>
            <h3 style="color:#0DF259; font-size:1.2rem; margin-bottom:0.5rem;">Lộ trình phát triển 30 ngày cho bạn</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px 30px;">
              ${wikiData.developmentTips.map(t => `<div style="font-size:0.9rem; color:#E8F5EC;">• ${t}</div>`).join("")}
            </div>
          </div>
        </div>
      `;
    }

    // Top 3 cards
    const cardsEl = document.getElementById("result-top3");
    if (cardsEl) {
      cardsEl.innerHTML = top3.map((s, i) => {
        const careerData = (typeof HOLLAND_CAREER_MAP !== 'undefined') ? HOLLAND_CAREER_MAP[s.type] : null;
        return `
          <div class="result-type-card" style="border-color:${s.info.color}; background: rgba(255,255,255,0.02);">
            <div class="result-type-rank" style="background:${s.info.color}; color:#000; display:inline-block; padding:2px 8px; border-radius:4px; font-weight:800; font-size:10px; margin-bottom:8px;">#${i + 1} HẠNG</div>
            <div style="font-size:2rem; margin-bottom:10px;">${s.info.icon}</div>
            <div style="color:${s.info.color}; font-weight:800; font-size:1.1rem; margin-bottom:4px;">${s.info.name}</div>
            <div style="font-size:0.8rem; color:#90CBA4; margin-bottom:12px;">Điểm: ${s.score}/${s.max}</div>
            
            <p style="font-size:0.85rem; line-height:1.6; margin-bottom:16px; opacity:0.8;">${s.info.description_short}</p>
            
            <h4 style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:#90CBA4; margin-bottom:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:12px;">Gợi ý nghề nghiệp (Người thật việc thật)</h4>
            <div class="result-careers" style="display:flex; flex-direction:column; gap:6px; align-items: flex-start;">
              ${careerData ? careerData.careers.map(c => `
                <a href="${c.url}" target="_blank" class="career-tag" style="background:rgba(13, 242, 89, 0.05); color:#a3e635; text-decoration:none; padding:4px 10px; border-radius:6px; font-size:0.75rem; display:flex; align-items:center; gap:4px; border:1px solid rgba(163,230,53,0.14);">
                  <span>🔗</span> ${c.title}
                </a>
              `).join("") : s.info.careers.map(c => `<span class="career-tag">${c}</span>`).join("")}
            </div>
          </div>
        `;
      }).join("");
    }

    // Helper: Render Radar Chart
    function renderRadarChart(sortedData) {
      const ctx = document.getElementById('holland-radar-chart');
      if (!ctx) return;

      // Map sorted to alphabetical R, I, A, S, E, C for consistent chart shape
      const chartOrder = ["R", "I", "A", "S", "E", "C"];
      const chartData = chartOrder.map(code => {
        const item = sortedData.find(s => s.type === code);
        return item ? item.score : 0;
      });
      const chartLabels = chartOrder.map(code => HOLLAND_TYPES[code].name);

      // Destroy existing chart if any
      if (window._hollandChart) window._hollandChart.destroy();

      window._hollandChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Điểm số sở thích',
            data: chartData,
            backgroundColor: 'rgba(13, 242, 89, 0.2)',
            borderColor: '#0DF259',
            borderWidth: 3,
            pointBackgroundColor: '#0DF259',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0DF259'
          }]
        },
        options: {
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              pointLabels: { color: '#90CBA4', font: { size: 11, weight: 'bold' } },
              ticks: { display: false, stepSize: 10 },
              suggestedMin: 0
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Copyright notice
    const cpEl = document.getElementById("result-copyright");
    if (cpEl) {
      const notice = currentVersion === "v1" ? TOOL_COPYRIGHT.notice_16_22 : TOOL_COPYRIGHT.notice_23;
      cpEl.innerHTML = `
        <p>${notice}</p>
        <p><em>${TOOL_COPYRIGHT.disclaimer}</em></p>
        <p>Tác giả: ${TOOL_COPYRIGHT.authors} — Bản quyền năm ${TOOL_COPYRIGHT.year} của ${TOOL_COPYRIGHT.org}.</p>
        <p>Nguồn gốc: <a href="${TOOL_COPYRIGHT.url}" target="_blank" rel="noopener">${TOOL_COPYRIGHT.url}</a></p>
      `;
    }

    // CTA - AI Report upsell + free email report
    const versionLabel = currentVersion === "v1" ? "16–22 tuổi" : "23+ tuổi";
    const ctaEl = document.getElementById("result-cta");
    if (ctaEl) {
      // Store quiz data globally for AI report purchase
      window._hatQuizResult = {
        code: code,
        version: currentVersion,
        scores: {},
        top3: top3,
        sorted: sorted
      };
      sorted.forEach(s => { window._hatQuizResult.scores[s.type] = s.score; });

      // [NEW] Persist for redirect recovery
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: currentVersion,
        result: window._hatQuizResult,
        timestamp: Date.now()
      }));

      ctaEl.innerHTML = `
        <!-- ═══ AI REPORT CTA ═══ -->
        <div id="ai-report-cta" style="background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(163,230,53,0.08)); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(56,189,248,0.25); margin-bottom: 1.5rem; position: relative; overflow: hidden;">
          <div style="position:absolute;top:0;right:0;background:linear-gradient(135deg,#38bdf8,#a3e635);color:#0f172a;font-size:11px;font-weight:800;padding:4px 16px;border-radius:0 0 0 12px;letter-spacing:0.05em;">AI CHUYÊN SÂU</div>
          <h3 style="margin-bottom: 0.5rem; color: #38bdf8; font-size: 1.1rem;">🧠 Báo cáo AI Phân tích Chuyên sâu</h3>
          <p style="font-size: 0.9rem; margin-bottom: 0.75rem; opacity: 0.85; line-height: 1.6;">
            AI sẽ phân tích sâu hồ sơ Holland của bạn: giải mã tổ hợp mã, điểm mạnh cạnh tranh, 10 nghề phù hợp nhất, và lộ trình hành động 30 ngày — được cá nhân hóa riêng cho bạn.
          </p>
          <ul style="font-size: 0.85rem; opacity: 0.8; padding-left: 1.2rem; margin-bottom: 1rem; line-height: 1.8;">
            <li>Phân tích chuyên sâu mật mã <strong style="color:#a3e635">${code}</strong></li>
            <li>Top 10 ngành nghề phù hợp từ Sông An</li>
            <li>Lộ trình hành động 30 ngày cụ thể</li>
            <li>Gửi về email trong vòng 5 phút</li>
          </ul>
          <button id="btn-buy-ai-report" onclick="hatBuyAiReport()" class="btn btn-primary" style="background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #0f172a; border: none; font-weight: 700; width: 100%; padding: 14px; font-size: 1rem; border-radius: 10px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
            Mua Báo cáo AI — 99.000₫
          </button>
          <p style="font-size: 0.75rem; opacity: 0.5; text-align: center; margin-top: 8px;">Thanh toán chuyển khoản · Nhận báo cáo tự động qua email</p>
        </div>

        <!-- ═══ AI PAYMENT MODAL (hidden) ═══ -->
        <div id="ai-payment-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; z-index:9999;">
          <div style="position:absolute; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px);" onclick="hatCloseAiPayment()"></div>
          <div style="position:relative; max-width:440px; margin:5vh auto; background:#1e293b; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:28px; color:#e2e8f0; max-height:90vh; overflow-y:auto;">
            <button onclick="hatCloseAiPayment()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer;">&times;</button>
            <h3 style="color:#38bdf8; margin-bottom:4px;">Thanh toán Báo cáo AI</h3>
            <p style="font-size:13px;color:#64748b;margin-bottom:16px;">Quét mã QR hoặc chuyển khoản theo thông tin bên dưới</p>
            <div id="ai-payment-qr" style="text-align:center;margin-bottom:16px;"></div>
            <div id="ai-payment-info" style="background:rgba(0,0,0,0.3);border-radius:12px;padding:16px;font-size:14px;line-height:2;margin-bottom:16px;"></div>
            <div id="ai-payment-status" style="text-align:center;font-size:14px;color:#a3e635;"></div>
          </div>
        </div>

        <!-- ═══ FREE EMAIL REPORT (giữ nguyên) ═══ -->
        <div style="background: rgba(163, 230, 53, 0.08); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(163, 230, 53, 0.2); margin-top: 1rem;">
          <h3 style="margin-bottom: 0.5rem; color: #a3e635;">📧 Lưu kết quả & Nhận phân tích cơ bản</h3>
          <p style="font-size: 0.95rem; margin-bottom: 1rem; opacity: 0.9;">Nhập email để nhận ngay báo cáo Holland cơ bản, kèm thư viện 300+ nghề nghiệp Người thật việc thật từ Sông An — hoàn toàn miễn phí.</p>
          
          <form id="save-quiz-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <input type="text" id="sq-name" name="name" placeholder="Tên của bạn" required style="padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;">
            <input type="email" id="sq-email" name="email" placeholder="Email nhận báo cáo" required style="padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;">
            <label style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: rgba(255,255,255,0.7); cursor: pointer;">
              <input type="checkbox" id="sq-marketing-consent" style="margin-top: 0.2rem; accent-color: #a3e635; flex-shrink: 0;">
              <span>Tôi đồng ý nhận thêm tài liệu hướng nghiệp và thông tin hữu ích qua email.</span>
            </label>
            <button type="submit" class="btn btn-primary" id="sq-submit">Nhận Phân Tích Cơ Bản (Miễn phí)</button>
            <div id="sq-msg" style="font-size: 0.85rem; margin-top: 5px;"></div>
          </form>

          <div id="after-save-cta" style="display:none; margin-top: 1.5rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 1.5rem;">
            <p>✅ Đã gửi báo cáo! Mật mã Holland chỉ là bước đầu. Hãy chọn chuyên viên phù hợp để giải nghĩa chi tiết kết quả của riêng bạn.</p>
            <a href="mang-luoi-chuyen-vien.html" class="btn btn-primary" style="background:#38bdf8; color:#0f172a; border:none; display: block; text-align: center;">Tìm Chuyên Viên Hướng Nghiệp</a>
          </div>
        </div>
      `;

      const form = document.getElementById("save-quiz-form");
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const sqBtn = document.getElementById("sq-submit");
        const sqMsg = document.getElementById("sq-msg");
        const nameVal = document.getElementById("sq-name").value.trim();
        const emailVal = document.getElementById("sq-email").value.trim();

        if (!emailVal || !nameVal) return;

        sqBtn.disabled = true;
        sqBtn.textContent = "Đang xử lý...";
        sqMsg.textContent = "";

        // Build top traits format with mapped careers
        const topTraitsData = top3.map(s => {
          const typeCode = s.type;
          const mappedData = (typeof HOLLAND_CAREER_MAP !== 'undefined') ? HOLLAND_CAREER_MAP[typeCode] : null;
          return {
            code: typeCode,
            name: s.info.fullName || s.info.name,
            desc: s.info.description || s.info.description_short,
            careers: mappedData ? mappedData.careers : []
          };
        });

        // Build score mapping
        const scoreValues = {};
        sorted.forEach(s => { scoreValues[s.type] = s.score; });

        const marketingConsent = document.getElementById("sq-marketing-consent")?.checked || false;

        const payload = {
          email: emailVal,
          name: nameVal,
          version: currentVersion,
          holland_code: code,
          scores: scoreValues,
          traits: topTraitsData,
          marketingConsent: marketingConsent
        };

        fetch("save-quiz-result.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        .then(r => r.json())
        .then(res => {
          if (res.success) {
            form.style.display = "none";
            document.getElementById("after-save-cta").style.display = "block";
          } else {
            sqBtn.disabled = false;
            sqBtn.textContent = "Nhận Phân Tích Chi Tiết";
            sqMsg.style.color = "#f87171";
            sqMsg.textContent = res.error || "Có lỗi xảy ra, vui lòng thử lại!";
          }
        })
        .catch(err => {
          sqBtn.disabled = false;
          sqBtn.textContent = "Nhận Phân Tích Chi Tiết";
          sqMsg.style.color = "#f87171";
          sqMsg.textContent = "Lỗi kết nối máy chủ!";
        });
      });
    }
  }

  /* ── Helpers ─────────────────────────────────────────────────── */
  function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden-screen");
  }
  function hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden-screen");
  }
  function showAnswerRequired() {
    const el = document.getElementById("quiz-answer-required");
    if (el) {
      el.style.display = "block";
      setTimeout(() => el.style.display = "none", 2000);
    }
  }
})();

/* ═══════════════════════════════════════════════════════════════
   AI REPORT PURCHASE FLOW
   ═══════════════════════════════════════════════════════════════ */

let _aiPaymentPollTimer = null;

function hatBuyAiReport() {
  const quizResult = window._hatQuizResult;
  if (!quizResult) {
    alert('Vui lòng hoàn thành trắc nghiệm trước.');
    return;
  }

  // Check if user is logged in
  if (typeof HAT_AUTH !== 'undefined' && !HAT_AUTH.isLoggedIn()) {
    // [NEW] Set purchase intent before login redirect
    localStorage.setItem('hat_purchase_intent', 'true');

    // Show login modal first
    HAT_AUTH.showLoginModal({
      title: 'Đăng nhập để mua Báo cáo AI',
      onSuccess: (user) => {
        // Clear intent and proceed
        localStorage.removeItem('hat_purchase_intent');
        _proceedAiPurchase(user);
      }
    });

    // Also listen for auth changes (in case of OAuth redirect)
    HAT_AUTH.onAuthChange((event, user) => {
      if (event === 'SIGNED_IN' && user) {
        HAT_AUTH.hideLoginModal();
        localStorage.removeItem('hat_purchase_intent');
        _proceedAiPurchase(user);
      }
    });
    return;
  }

  // Already logged in or no auth module
  const user = (typeof HAT_AUTH !== 'undefined') ? HAT_AUTH.getUser() : null;
  _proceedAiPurchase(user);
}

function _proceedAiPurchase(user) {
  const quizResult = window._hatQuizResult;
  const btn = document.getElementById('btn-buy-ai-report');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Đang tạo đơn...';
  }

  // Collect name/email from the free form if available, or from auth user
  let name = '';
  let email = '';
  let role = '';

  if (user) {
    email = user.email || '';
    name = user.user_metadata?.full_name || user.user_metadata?.name || '';
  }

  // Fallback: check if user already filled in the free form
  const sqName = document.getElementById('sq-name');
  const sqEmail = document.getElementById('sq-email');
  if (!name && sqName) name = sqName.value.trim();
  if (!email && sqEmail) email = sqEmail.value.trim();

  // If still no name/email, prompt
  if (!name) name = prompt('Tên của bạn:') || '';
  if (!email) email = prompt('Email nhận báo cáo:') || '';

  if (!name || !email) {
    if (btn) { btn.disabled = false; btn.textContent = 'Mua Báo cáo AI — 99.000₫'; }
    return;
  }

  const payload = {
    name: name,
    email: email,
    role: role,
    holland_code: quizResult.code,
    version: quizResult.version,
    scores: quizResult.scores,
    user_id: user?.id || '',
  };

  fetch('create-ai-report-payment.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(res => {
    if (btn) { btn.disabled = false; btn.textContent = 'Mua Báo cáo AI — 99.000₫'; }

    if (res.success && res.paymentRequired) {
      _showAiPaymentModal(res);
    } else {
      alert(res.error || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  })
  .catch(err => {
    if (btn) { btn.disabled = false; btn.textContent = 'Mua Báo cáo AI — 99.000₫'; }
    alert('Lỗi kết nối máy chủ. Vui lòng thử lại.');
    console.error(err);
  });
}

function _showAiPaymentModal(paymentData) {
  const modal = document.getElementById('ai-payment-modal');
  const qrEl = document.getElementById('ai-payment-qr');
  const infoEl = document.getElementById('ai-payment-info');
  const statusEl = document.getElementById('ai-payment-status');

  if (!modal) return;

  // QR code
  if (qrEl && paymentData.qrUrl) {
    qrEl.innerHTML = `<img src="${paymentData.qrUrl}" alt="QR Thanh toán" style="max-width:220px;border-radius:12px;background:#fff;padding:8px;">`;
  }

  // Payment info
  if (infoEl) {
    infoEl.innerHTML = `
      <div style="display:flex;justify-content:space-between"><span style="color:#94a3b8">Số tiền:</span><strong style="color:#a3e635">${paymentData.amountFormatted}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#94a3b8">Ngân hàng:</span><strong>${paymentData.bankName}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#94a3b8">Số TK:</span><strong>${paymentData.accountNumber}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#94a3b8">Chủ TK:</span><strong>${paymentData.accountName}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#94a3b8">Nội dung CK:</span><strong style="color:#38bdf8">${paymentData.transferContent}</strong></div>
    `;
  }

  if (statusEl) {
    statusEl.innerHTML = '⏳ Đang chờ thanh toán...';
  }

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  // Start polling for payment status
  _startPaymentPolling(paymentData.statusUrl, paymentData.paymentCode);
}

function _startPaymentPolling(statusUrl, paymentCode) {
  if (_aiPaymentPollTimer) clearInterval(_aiPaymentPollTimer);

  _aiPaymentPollTimer = setInterval(() => {
    fetch(statusUrl)
      .then(r => r.json())
      .then(res => {
        if (res.status === 'paid' || res.status === 'report_generated') {
          clearInterval(_aiPaymentPollTimer);
          _aiPaymentPollTimer = null;

          const statusEl = document.getElementById('ai-payment-status');
          if (statusEl) {
            statusEl.innerHTML = `
              <div style="color:#a3e635;font-size:16px;font-weight:700;margin-bottom:8px;">✅ Thanh toán thành công!</div>
              <p style="color:#94a3b8;font-size:13px;">Báo cáo AI đang được tạo và sẽ gửi về email của bạn trong vòng 5 phút.</p>
              <a href="ai-report-view.html?code=${paymentCode}" style="display:inline-block;margin-top:12px;padding:10px 24px;background:#38bdf8;color:#0f172a;font-weight:700;border-radius:8px;text-decoration:none;">Xem Báo cáo</a>
            `;
          }

          // Update CTA button
          const btn = document.getElementById('btn-buy-ai-report');
          if (btn) {
            btn.textContent = '✅ Đã mua — Xem báo cáo';
            btn.onclick = () => window.open(`ai-report-view.html?code=${paymentCode}`, '_blank');
            btn.style.background = '#a3e635';
          }
        }
      })
      .catch(() => {}); // Silently retry
  }, 5000); // Poll every 5 seconds
}

function hatCloseAiPayment() {
  const modal = document.getElementById('ai-payment-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  // Don't stop polling — payment might still come through
}
