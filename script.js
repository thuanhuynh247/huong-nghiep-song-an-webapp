const dataStore = window.HUONG_NGHIEP_DATA || {
  assessments: [],
  assessmentCount: 0,
  totalQuestionCount: 0,
};

const STORAGE_KEYS = {
  progress: "huong-nghiep-progress",
  history: "huong-nghiep-history",
};

const state = {
  filter: "all",
  search: "",
  selectedId: null,
  run: null,
  result: null,
  progress: loadJson(STORAGE_KEYS.progress, {}),
  history: loadJson(STORAGE_KEYS.history, []),
};

const filterRoot = document.querySelector("#audience-filters");
const gridRoot = document.querySelector("#assessment-grid");
const workspaceRoot = document.querySelector("#workspace-root");
const historyRoot = document.querySelector("#history-grid");
const searchInput = document.querySelector("#assessment-search");
const jumpHistoryButton = document.querySelector("#jump-history");
const installButton = document.querySelector("#install-app");
const exportDataButton = document.querySelector("#export-data");
const clearDataButton = document.querySelector("#clear-data");

const filters = [
  { id: "all", label: "Tất cả" },
  { id: "16-22", label: "16-22 tuổi" },
  { id: "23+", label: "23+ tuổi" },
  { id: "thpt", label: "THPT" },
  { id: "dh-cd", label: "ĐH / CĐ" },
  { id: "all-ages", label: "Mọi độ tuổi" },
];

let deferredPrompt = null;

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAssessments() {
  return dataStore.assessments || [];
}

function getAssessment(id) {
  return getAssessments().find((item) => item.id === id) || null;
}

function getProgress(assessmentId) {
  return state.progress[assessmentId] || null;
}

function getOptionScore(assessment, answerIndex) {
  const option = assessment.scale.options[answerIndex];
  return option ? Number(option.value) : 0;
}

function labelForFilter(assessment) {
  const label = assessment.audience.label.toLowerCase();
  if (label.includes("16-22")) return "16-22";
  if (label.includes("23")) return "23+";
  if (label.includes("thpt")) return "thpt";
  if (label.includes("đh") || label.includes("cđ") || label.includes("dh")) return "dh-cd";
  return "all-ages";
}

function matchesFilter(assessment) {
  if (state.filter === "all") {
    return true;
  }
  return labelForFilter(assessment) === state.filter;
}

function matchesSearch(assessment) {
  const query = state.search.trim().toLowerCase();
  if (!query) {
    return true;
  }
  const text = [
    assessment.title,
    assessment.variant,
    assessment.category,
    assessment.description,
    assessment.audience.label,
    ...(assessment.dimensions || []).map((dimension) => dimension.label),
  ]
    .join(" ")
    .toLowerCase();
  return text.includes(query);
}

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function classifyMipq(score) {
  if (score >= 90) return "Rất cao";
  if (score >= 80) return "Cao";
  if (score >= 70) return "Khá cao";
  if (score >= 60) return "Trên trung bình";
  if (score >= 50) return "Trung bình";
  if (score >= 40) return "Dưới trung bình";
  if (score >= 30) return "Khá thấp";
  if (score >= 20) return "Thấp";
  return "Rất thấp";
}

function classifyCed(score) {
  if (score >= 13) return "Cao";
  if (score >= 11) return "Trung bình - Cao";
  if (score >= 8) return "Thấp - Trung bình";
  return "Thấp";
}

function computeResult(assessment, answers) {
  const answerMap = answers || {};

  if (assessment.family === "holland") {
    const dimensionScores = assessment.dimensions.map((dimension) => {
      const score = assessment.questions
        .filter((question) => question.dimension === dimension.id)
        .reduce((total, question) => total + getOptionScore(assessment, answerMap[question.id]), 0);

      return {
        ...dimension,
        score,
        percent: Math.round((score / dimension.maxScore) * 100),
      };
    });

    const ranking = [...dimensionScores].sort((left, right) => right.score - left.score);
    const combo = ranking.slice(0, 3).map((item) => item.id).join("");
    const summary =
      assessment.id === "holland-23-plus"
        ? `Mỗi câu trả lời "Có" được tính 1 điểm. Mã nổi trội hiện tại là ${combo}.`
        : `Điểm càng cao cho thấy mức độ yêu thích cao hơn với nhóm đó. Mã nổi trội hiện tại là ${combo}.`;

    return {
      headline: `Mã Holland nổi trội: ${combo}`,
      summary,
      cards: ranking,
      metrics: [
        { label: "Mã 3 nhóm đầu", value: combo, note: "Đọc theo thứ tự điểm cao nhất" },
        { label: "Nhóm mạnh nhất", value: ranking[0].label, note: ranking[0].careerWorld },
      ],
      shareText: `${assessment.title} (${assessment.variant}): mã Holland nổi trội ${combo}.`,
    };
  }

  if (assessment.family === "grit") {
    const reverse = new Set(assessment.reverseItems || []);
    const scored = assessment.questions.map((question) => {
      const raw = getOptionScore(assessment, answerMap[question.id]);
      return reverse.has(question.order) ? 6 - raw : raw;
    });
    const total = scored.reduce((sum, value) => sum + value, 0);
    const average = total / assessment.questions.length;

    return {
      headline: `Điểm bền chí: ${average.toFixed(2)} / 5`,
      summary: "Điểm càng gần 5 cho thấy mức độ bền chí càng cao sau khi đã đảo điểm các câu nghịch.",
      cards: [
        {
          id: "grit-total",
          label: "Điểm trung bình",
          description: "Tổng điểm sau đảo chiều / 12 câu.",
          score: Number(average.toFixed(2)),
          maxScore: 5,
          percent: Math.round((average / 5) * 100),
        },
      ],
      metrics: [
        { label: "Tổng điểm quy đổi", value: total.toFixed(0), note: "Đã xử lý các câu đảo chiều" },
        { label: "Thang tham chiếu", value: "1 → 5", note: "Càng gần 5 càng bền chí" },
      ],
      shareText: `${assessment.title}: điểm bền chí ${average.toFixed(2)} / 5.`,
    };
  }

  if (assessment.family === "mipq") {
    const cards = assessment.dimensions.map((dimension) => {
      const raw = dimension.items.reduce((total, itemNumber) => {
        const questionId = `mipq-${String(itemNumber).padStart(2, "0")}`;
        return total + getOptionScore(assessment, answerMap[questionId]);
      }, 0);
      const score = Number((raw * Number(dimension.multiplier)).toFixed(1));
      return {
        ...dimension,
        score,
        percent: Math.min(100, Math.round(score)),
        band: classifyMipq(score),
      };
    });
    const ranking = [...cards].sort((left, right) => right.score - left.score);

    return {
      headline: `3 trí thông minh nổi trội: ${ranking
        .slice(0, 3)
        .map((item) => item.label)
        .join(" • ")}`,
      summary: "Điểm thực được tính theo nhóm câu tương ứng và hệ số của manual MIPQ.",
      cards: ranking,
      metrics: [
        { label: "Điểm cao nhất", value: ranking[0].label, note: ranking[0].band },
        { label: "Top 3", value: ranking.slice(0, 3).map((item) => item.id).join(", "), note: "Ưu tiên khai thác khi định hướng" },
      ],
      shareText: `${assessment.title}: nổi trội ${ranking
        .slice(0, 3)
        .map((item) => item.label)
        .join(", ")}.`,
    };
  }

  if (assessment.family === "ced") {
    const cards = assessment.dimensions.map((dimension) => {
      const score = dimension.items.reduce((total, itemNumber) => {
        const questionId = `ced-${String(itemNumber).padStart(2, "0")}`;
        return total + getOptionScore(assessment, answerMap[questionId]);
      }, 0);
      return {
        ...dimension,
        score,
        percent: Math.round((score / dimension.maxScore) * 100),
        band: classifyCed(score),
      };
    });
    const ranking = [...cards].sort((left, right) => right.score - left.score);
    const total = cards.reduce((sum, card) => sum + card.score, 0);

    return {
      headline: `Điểm CED: ${total} / 135`,
      summary: "Các phần được xếp loại theo đúng ngưỡng trong manual: 3-7, 8-10, 11-12, 13-15.",
      cards: ranking,
      metrics: [
        { label: "Tổng điểm", value: `${total}/135`, note: "Dùng để nhìn bức tranh chung" },
        { label: "Phần mạnh nhất", value: ranking[0].label, note: ranking[0].band },
      ],
      shareText: `${assessment.title} (${assessment.variant}): tổng điểm ${total}/135, nổi bật ở ${ranking[0].label}.`,
    };
  }

  return {
    headline: assessment.title,
    summary: "Chưa có bộ xử lý kết quả cho thang đo này.",
    cards: [],
    metrics: [],
    shareText: assessment.title,
  };
}

function renderFilters() {
  filterRoot.innerHTML = filters
    .map(
      (filter) => `
        <button class="chip ${state.filter === filter.id ? "is-active" : ""}" type="button" data-filter="${filter.id}">
          ${escapeHtml(filter.label)}
        </button>
      `
    )
    .join("");
}

function renderCatalog() {
  const assessments = getAssessments().filter((assessment) => matchesFilter(assessment) && matchesSearch(assessment));

  if (!assessments.length) {
    gridRoot.innerHTML = `<div class="catalog-empty">Không có bài test nào khớp với bộ lọc hiện tại.</div>`;
    return;
  }

  gridRoot.innerHTML = assessments
    .map((assessment) => {
      const progress = getProgress(assessment.id);
      return `
        <article class="assessment-card" tabindex="0" data-open="${assessment.id}">
          <div class="assessment-top">
            <div>
              <div class="pill-row">
                <span class="pill pill-accent">${escapeHtml(assessment.category)}</span>
                <span class="pill">${escapeHtml(assessment.variant)}</span>
              </div>
              <h3>${escapeHtml(assessment.title)}</h3>
            </div>
            <span class="meta-pill">${assessment.questionCount} câu</span>
          </div>

          <p>${escapeHtml(assessment.description)}</p>

          <div class="meta-row">
            <span class="meta-pill">${escapeHtml(assessment.audience.label)}</span>
            <span class="meta-pill">${assessment.estimatedMinutes} phút</span>
            <span class="meta-pill">${escapeHtml(assessment.family.toUpperCase())}</span>
          </div>

          ${
            progress
              ? `<button class="button button-subtle" type="button" data-resume="${assessment.id}">Tiếp tục bài đang làm</button>`
              : `<button class="button button-secondary" type="button" data-start="${assessment.id}">Mở bài test</button>`
          }
        </article>
      `;
    })
    .join("");
}

function renderWorkspace() {
  const assessment = state.selectedId ? getAssessment(state.selectedId) : null;

  if (!assessment) {
    workspaceRoot.innerHTML = `
      <div class="workspace-empty">
        <div class="workspace-card">
          <div class="workspace-top">
            <div>
              <p class="eyebrow">Khu làm bài</p>
              <h2>Chọn một bài test để bắt đầu hoặc tiếp tục phần còn dang dở.</h2>
            </div>
            <span class="pill pill-teal">PWA</span>
          </div>

          <p class="workspace-copy">
            Webapp này chạy theo hướng web-first: dữ liệu bài test được sinh từ manual PDF, kết quả lưu cục bộ và vẫn có thể cài lên màn hình chính như một ứng dụng PWA.
          </p>

          <div class="support-grid">
            <article class="support-card">
              <strong>Lưu tiến độ</strong>
              <p class="support-copy">Người dùng có thể rời app giữa chừng và quay lại đúng câu đang làm.</p>
            </article>
            <article class="support-card">
              <strong>Kết quả có cấu trúc</strong>
              <p class="support-copy">Mỗi thang đo có cách chấm điểm riêng: Holland, Grit, MIPQ và CED đều được xử lý khác nhau.</p>
            </article>
            <article class="support-card">
              <strong>Stitch-ready</strong>
              <p class="support-copy">Repo chỉ lưu file cấu hình mẫu để tránh lộ API key, sẵn cho bước nối MCP sau.</p>
            </article>
            <article class="support-card">
              <strong>Public webapp</strong>
              <p class="support-copy">Đã thêm manifest, service worker, robots và các trang public cần thiết để chia sẻ link chính thức trên web.</p>
            </article>
          </div>
        </div>
      </div>
    `;
    return;
  }

  if (state.result) {
    renderResult(assessment, state.result);
    return;
  }

  if (state.run) {
    renderRunner(assessment, state.run);
    return;
  }

  const progress = getProgress(assessment.id);
  const dimensionChips = (assessment.dimensions || [])
    .slice(0, 6)
    .map((dimension) => `<span class="pill">${escapeHtml(dimension.label)}</span>`)
    .join("");

  const scaleText = assessment.scale.options.map((option) => option.label).join(" • ");

  workspaceRoot.innerHTML = `
    <div class="workspace-card">
      <div class="workspace-top">
        <div>
          <p class="eyebrow">Chuẩn bị làm bài</p>
          <h2>${escapeHtml(assessment.title)} <span class="meta-copy">/ ${escapeHtml(assessment.variant)}</span></h2>
        </div>
        <span class="pill pill-accent">${assessment.questionCount} câu</span>
      </div>

      <p class="workspace-copy">${escapeHtml(assessment.description)}</p>

      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(assessment.audience.label)}</span>
        <span class="meta-pill">${assessment.estimatedMinutes} phút</span>
        <span class="meta-pill">${escapeHtml(assessment.sourceFile)}</span>
      </div>

      <div class="pill-row">${dimensionChips}</div>

      <div class="support-card">
        <strong>Thang trả lời</strong>
        <p class="support-copy">${escapeHtml(scaleText)}</p>
      </div>

      <div class="detail-actions">
        <button class="button button-primary" type="button" data-begin="${assessment.id}">
          ${progress ? "Tiếp tục làm bài" : "Bắt đầu ngay"}
        </button>
        ${
          progress
            ? `<button class="button button-ghost" type="button" data-restart="${assessment.id}">Làm lại từ đầu</button>`
            : ""
        }
        <button class="button button-ghost" type="button" data-close-workspace="1">Đóng</button>
      </div>
    </div>
  `;
}

function renderRunner(assessment, run) {
  const question = assessment.questions[run.currentIndex];
  const currentAnswer = run.answers[question.id];
  const answeredCount = Object.keys(run.answers).length;
  const progress = ((run.currentIndex + 1) / assessment.questions.length) * 100;

  workspaceRoot.innerHTML = `
    <div class="workspace-card">
      <div class="progress-shell">
        <div class="progress-top">
          <div>
            <p class="eyebrow">Đang làm bài</p>
            <h2>${escapeHtml(assessment.title)}</h2>
          </div>
          <span class="meta-pill">${answeredCount}/${assessment.questions.length} đã trả lời</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress.toFixed(1)}%"></div>
        </div>
      </div>

      <div class="question-shell">
        <div>
          <p class="question-index">Câu ${run.currentIndex + 1} / ${assessment.questions.length}</p>
          <h3 class="question-title">${escapeHtml(question.text)}</h3>
        </div>

        <div class="option-grid">
          ${assessment.scale.options
            .map(
              (option, index) => `
                <button class="option-button ${currentAnswer === index ? "is-selected" : ""}" type="button" data-answer-index="${index}">
                  <div class="option-head">
                    <span class="option-tag">${index + 1}</span>
                    <strong>${escapeHtml(option.label)}</strong>
                  </div>
                  <p class="option-copy">Giá trị chấm: ${escapeHtml(String(option.value))}</p>
                </button>
              `
            )
            .join("")}
        </div>

        <div class="runner-actions">
          <button class="button button-ghost" type="button" data-prev-question ${run.currentIndex === 0 ? "disabled" : ""}>
            Câu trước
          </button>
          <button class="button button-primary" type="button" data-next-question ${typeof currentAnswer !== "number" ? "disabled" : ""}>
            ${run.currentIndex === assessment.questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
          <button class="button button-ghost" type="button" data-save-exit="1">
            Lưu và thoát
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderResult(assessment, result) {
  workspaceRoot.innerHTML = `
    <div class="workspace-card">
      <div class="result-hero">
        <p class="eyebrow">Kết quả</p>
        <h2>${escapeHtml(result.headline)}</h2>
        <p class="result-note">${escapeHtml(result.summary)}</p>
      </div>

      <div class="result-actions">
        <button class="button button-primary" type="button" data-share-result="1">Chia sẻ tóm tắt</button>
        <button class="button button-ghost" type="button" data-restart="${assessment.id}">Làm lại bài này</button>
        <button class="button button-ghost" type="button" data-close-workspace="1">Đóng</button>
      </div>

      <div class="result-grid">
        ${result.metrics
          .map(
            (metric) => `
              <article class="result-card">
                <h3>${escapeHtml(metric.label)}</h3>
                <div class="metric-value">${escapeHtml(metric.value)}</div>
                <p class="dimension-copy">${escapeHtml(metric.note)}</p>
              </article>
            `
          )
          .join("")}
      </div>

      <div class="dimension-grid">
        ${result.cards
          .map(
            (card) => `
              <article class="dimension-card">
                <div class="dimension-top">
                  <div>
                    <h3>${escapeHtml(card.label)}</h3>
                    <p class="dimension-copy">${escapeHtml(card.description || card.careerWorld || card.band || "")}</p>
                  </div>
                  <strong>${escapeHtml(String(card.score))}${card.maxScore ? ` / ${card.maxScore}` : ""}</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${Math.max(2, Math.min(100, card.percent || 0))}%"></div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderHistory() {
  if (!state.history.length) {
    historyRoot.innerHTML = `<div class="history-empty">Chưa có kết quả nào được lưu trên thiết bị này.</div>`;
    return;
  }

  historyRoot.innerHTML = [...state.history]
    .reverse()
    .map(
      (entry) => `
        <article class="history-card">
          <div class="history-top">
            <div>
              <div class="pill-row">
                <span class="pill pill-teal">${escapeHtml(entry.variant)}</span>
                <span class="pill">${escapeHtml(formatTimestamp(entry.completedAt))}</span>
              </div>
              <h3>${escapeHtml(entry.title)}</h3>
            </div>
            <span class="meta-pill">${escapeHtml(entry.family.toUpperCase())}</span>
          </div>

          <p>${escapeHtml(entry.headline)}</p>
          <div class="meta-row">
            <span class="meta-pill">${escapeHtml(entry.summary)}</span>
          </div>

          <button class="button button-secondary" type="button" data-retake="${entry.assessmentId}">
            Làm lại bài này
          </button>
        </article>
      `
    )
    .join("");
}

function persistProgress() {
  saveJson(STORAGE_KEYS.progress, state.progress);
}

function persistHistory() {
  saveJson(STORAGE_KEYS.history, state.history);
}

function openAssessment(id) {
  state.selectedId = id;
  state.run = null;
  state.result = null;
  renderWorkspace();
}

function beginAssessment(id, restart = false) {
  const assessment = getAssessment(id);
  if (!assessment) {
    return;
  }

  const saved = getProgress(id);
  if (saved && !restart) {
    state.run = saved;
  } else {
    delete state.progress[id];
    state.run = {
      assessmentId: id,
      currentIndex: 0,
      answers: {},
      startedAt: new Date().toISOString(),
    };
    persistProgress();
  }

  state.selectedId = id;
  state.result = null;
  renderWorkspace();
}

function updateAnswer(answerIndex) {
  const assessment = getAssessment(state.run.assessmentId);
  const question = assessment.questions[state.run.currentIndex];
  state.run.answers[question.id] = answerIndex;
  state.progress[assessment.id] = state.run;
  persistProgress();
  renderWorkspace();
}

function nextQuestion() {
  const assessment = getAssessment(state.run.assessmentId);
  if (state.run.currentIndex >= assessment.questions.length - 1) {
    finishAssessment();
    return;
  }
  state.run.currentIndex += 1;
  state.progress[assessment.id] = state.run;
  persistProgress();
  renderWorkspace();
}

function previousQuestion() {
  if (state.run.currentIndex > 0) {
    const assessment = getAssessment(state.run.assessmentId);
    state.run.currentIndex -= 1;
    state.progress[assessment.id] = state.run;
    persistProgress();
    renderWorkspace();
  }
}

function saveAndExit() {
  state.run = null;
  renderWorkspace();
}

function finishAssessment() {
  const assessment = getAssessment(state.run.assessmentId);
  const result = computeResult(assessment, state.run.answers);
  state.result = result;

  state.history.push({
    id: `${assessment.id}-${Date.now()}`,
    assessmentId: assessment.id,
    family: assessment.family,
    title: assessment.title,
    variant: assessment.variant,
    headline: result.headline,
    summary: result.summary,
    completedAt: new Date().toISOString(),
  });

  delete state.progress[assessment.id];
  persistProgress();
  persistHistory();
  state.run = null;
  renderWorkspace();
  renderHistory();
}

async function shareResult() {
  if (!state.result || !state.selectedId) {
    return;
  }
  const assessment = getAssessment(state.selectedId);
  const text = state.result.shareText;
  try {
    if (navigator.share) {
      await navigator.share({
        title: assessment.title,
        text,
      });
      return;
    }
    await navigator.clipboard.writeText(text);
    installToast("Đã sao chép tóm tắt kết quả.");
  } catch (error) {
    installToast("Không thể chia sẻ lúc này.");
  }
}

function installToast(message) {
  const node = document.createElement("div");
  node.className = "pill pill-accent";
  node.style.position = "fixed";
  node.style.right = "14px";
  node.style.bottom = "14px";
  node.style.zIndex = "50";
  node.textContent = message;
  document.body.append(node);
  window.setTimeout(() => node.remove(), 2200);
}

function exportLocalData() {
  const payload = {
    appName: dataStore.appName || "Huong Nghiep Song An",
    exportedAt: new Date().toISOString(),
    assessmentCount: dataStore.assessmentCount || getAssessments().length,
    progress: state.progress,
    history: state.history,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `huong-nghiep-song-an-data-${stamp}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  installToast("Đã xuất dữ liệu cục bộ.");
}

function clearLocalData() {
  const accepted = window.confirm("Xóa toàn bộ tiến độ và lịch sử đã lưu trên thiết bị này?");
  if (!accepted) {
    return;
  }

  state.progress = {};
  state.history = [];
  state.run = null;
  state.result = null;
  state.selectedId = null;
  persistProgress();
  persistHistory();
  renderCatalog();
  renderWorkspace();
  renderHistory();
  installToast("Đã xóa dữ liệu cục bộ.");
}

function updateStats() {
  document.querySelector("#stat-assessments").textContent = String(dataStore.assessmentCount || getAssessments().length);
  document.querySelector("#stat-questions").textContent = String(dataStore.totalQuestionCount || 0);
}

function attachEvents() {
  filterRoot.addEventListener("click", (event) => {
    const target = event.target.closest("[data-filter]");
    if (!target) return;
    state.filter = target.dataset.filter;
    renderFilters();
    renderCatalog();
  });

  gridRoot.addEventListener("click", (event) => {
    const start = event.target.closest("[data-start]");
    const resume = event.target.closest("[data-resume]");
    const open = event.target.closest("[data-open]");
    if (start) beginAssessment(start.dataset.start);
    else if (resume) beginAssessment(resume.dataset.resume);
    else if (open) openAssessment(open.dataset.open);
  });

  gridRoot.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const open = event.target.closest("[data-open]");
    if (!open) return;
    event.preventDefault();
    openAssessment(open.dataset.open);
  });

  workspaceRoot.addEventListener("click", (event) => {
    const begin = event.target.closest("[data-begin]");
    const restart = event.target.closest("[data-restart]");
    const answer = event.target.closest("[data-answer-index]");
    const next = event.target.closest("[data-next-question]");
    const prev = event.target.closest("[data-prev-question]");
    const close = event.target.closest("[data-close-workspace]");
    const saveExit = event.target.closest("[data-save-exit]");
    const share = event.target.closest("[data-share-result]");

    if (begin) beginAssessment(begin.dataset.begin);
    else if (restart) beginAssessment(restart.dataset.restart, true);
    else if (answer) updateAnswer(Number(answer.dataset.answerIndex));
    else if (next) nextQuestion();
    else if (prev) previousQuestion();
    else if (saveExit) saveAndExit();
    else if (close) {
      state.selectedId = null;
      state.run = null;
      state.result = null;
      renderWorkspace();
    } else if (share) {
      shareResult();
    }
  });

  historyRoot.addEventListener("click", (event) => {
    const retake = event.target.closest("[data-retake]");
    if (!retake) return;
    openAssessment(retake.dataset.retake);
    beginAssessment(retake.dataset.retake, true);
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderCatalog();
  });

  jumpHistoryButton.addEventListener("click", () => {
    document.querySelector("#history").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.classList.remove("hidden");
  });

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      installToast("Trình duyệt chưa sẵn sàng cho thao tác cài đặt.");
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.classList.add("hidden");
  });

  exportDataButton?.addEventListener("click", exportLocalData);
  clearDataButton?.addEventListener("click", clearLocalData);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function init() {
  updateStats();
  renderFilters();
  renderCatalog();
  renderWorkspace();
  renderHistory();
  attachEvents();
  registerServiceWorker();
}

init();
