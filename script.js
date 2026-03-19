const courseData = window.COURSE_DATA;
const moduleStrip = document.querySelector("#module-strip");
const lessonsRoot = document.querySelector("#lessons");
const navRoot = document.querySelector("#lesson-nav");
const searchInput = document.querySelector("#lesson-search");
const emptyState = document.querySelector("#lesson-empty");

const lessonSearchText = (lesson) => {
  const bucket = [
    lesson.module,
    lesson.title,
    lesson.time,
    ...(lesson.objectives || []),
    ...(lesson.highlights || []),
    ...(lesson.reflection || []),
    lesson.next || "",
  ];

  (lesson.blocks || []).forEach((block) => {
    bucket.push(block.title || "");
    bucket.push(...(block.paragraphs || []));
    bucket.push(...(block.bullets || []));
    bucket.push(block.quote || "");
    (block.pairs || []).forEach((pair) => {
      bucket.push(pair.label, pair.text);
    });
  });

  return bucket.join(" ").toLowerCase();
};

const lessonIndex = courseData.lessons.map((lesson) => ({
  ...lesson,
  searchText: lessonSearchText(lesson),
}));

function createEl(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (typeof text === "string") {
    element.textContent = text;
  }
  return element;
}

function renderModules() {
  const counts = lessonIndex.reduce((accumulator, lesson) => {
    accumulator[lesson.moduleId] = (accumulator[lesson.moduleId] || 0) + 1;
    return accumulator;
  }, {});

  courseData.modules.forEach((module) => {
    const card = createEl("article", "module-card");
    const meta = createEl("p", "module-meta", `${counts[module.id] || 0} bài`);
    const heading = createEl("h3", "", module.title);
    const copy = createEl("p", "", module.description);
    card.append(meta, heading, copy);
    card.setAttribute("data-reveal", "");
    moduleStrip.append(card);
  });
}

function renderNav(lessons) {
  navRoot.replaceChildren();

  lessons.forEach((lesson) => {
    const link = createEl("a", "nav-link");
    link.href = `#${lesson.id}`;
    link.dataset.target = lesson.id;

    const small = createEl("small", "", lesson.number);
    const strong = createEl("strong", "", lesson.title);

    link.append(small, strong);
    navRoot.append(link);
  });
}

function renderBulletList(items, className = "") {
  const list = createEl("ul", className);
  items.forEach((item) => {
    const li = createEl("li", "", item);
    list.append(li);
  });
  return list;
}

function renderPairs(pairs) {
  const grid = createEl("div", "pair-grid");
  pairs.forEach((pair) => {
    const card = createEl("article", "pair-card");
    const label = createEl("strong", "", pair.label);
    const copy = createEl("p", "", pair.text);
    card.append(label, copy);
    grid.append(card);
  });
  return grid;
}

function renderBlock(block) {
  const section = createEl("section", "lesson-block");
  const heading = createEl("h4", "", block.title);
  section.append(heading);

  (block.paragraphs || []).forEach((paragraph) => {
    section.append(createEl("p", "", paragraph));
  });

  if (block.bullets?.length) {
    section.append(renderBulletList(block.bullets));
  }

  if (block.pairs?.length) {
    section.append(renderPairs(block.pairs));
  }

  if (block.quote) {
    const quote = createEl("blockquote", "", block.quote);
    section.append(quote);
  }

  return section;
}

function renderLessons(lessons) {
  lessonsRoot.replaceChildren();

  lessons.forEach((lesson, index) => {
    const details = createEl("details", "lesson-card");
    details.id = lesson.id;
    details.open = index < 2;
    details.setAttribute("data-reveal", "");

    const summary = document.createElement("summary");
    const badge = createEl("span", "lesson-number", lesson.number);
    const summaryWrap = createEl("div", "lesson-summary");
    const title = createEl("h3", "", lesson.title);
    const meta = createEl("div", "lesson-meta");
    meta.append(
      createEl("span", "meta-pill", lesson.module),
      createEl("span", "meta-pill", lesson.time)
    );
    summaryWrap.append(title, meta);
    const toggle = createEl("span", "toggle-indicator", "+");
    summary.append(badge, summaryWrap, toggle);

    const content = createEl("div", "lesson-content");
    const inner = createEl("div", "lesson-content-inner");
    const grid = createEl("div", "lesson-grid");
    const copyCol = createEl("div", "lesson-copy");
    const sideCol = createEl("aside", "lesson-side");

    const objectivesCard = createEl("section", "side-card");
    objectivesCard.append(createEl("h4", "", "Mục tiêu học tập"));
    objectivesCard.append(renderBulletList(lesson.objectives));

    const highlightCard = createEl("section", "side-card");
    highlightCard.append(createEl("h4", "", "Key takeaways"));
    highlightCard.append(renderBulletList(lesson.highlights));

    sideCol.append(objectivesCard, highlightCard);

    (lesson.blocks || []).forEach((block) => {
      copyCol.append(renderBlock(block));
    });

    const reflectionCard = createEl("section", "side-card");
    reflectionCard.append(createEl("h4", "", "Gợi ý suy ngẫm"));
    reflectionCard.append(renderBulletList(lesson.reflection, "reflection-list"));
    sideCol.append(reflectionCard);

    const next = createEl("div", "lesson-next", lesson.next);
    copyCol.append(next);

    grid.append(copyCol, sideCol);
    inner.append(grid);
    content.append(inner);
    details.append(summary, content);
    lessonsRoot.append(details);
  });
}

function refreshRevealObserver() {
  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 25, 220)}ms`;
    revealObserver.observe(node);
  });
}

function refreshActiveNav() {
  const cards = [...document.querySelectorAll(".lesson-card")];
  const links = [...document.querySelectorAll(".nav-link")];
  if (!cards.length || !links.length || !("IntersectionObserver" in window)) {
    return;
  }

  const byId = new Map(links.map((link) => [link.dataset.target, link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach((link) => link.classList.remove("is-active"));
        const active = byId.get(entry.target.id);
        if (active) {
          active.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.24,
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  cards.forEach((card) => observer.observe(card));
}

function applySearch(keyword) {
  const query = keyword.trim().toLowerCase();
  const filtered = !query
    ? lessonIndex
    : lessonIndex.filter((lesson) => lesson.searchText.includes(query));

  renderNav(filtered);
  renderLessons(filtered);
  emptyState.classList.toggle("hidden", filtered.length > 0);
  refreshRevealObserver();
  refreshActiveNav();

  if (query && filtered.length) {
    document.querySelectorAll(".lesson-card").forEach((card) => {
      card.open = true;
    });
  }
}

renderModules();
renderNav(lessonIndex);
renderLessons(lessonIndex);
refreshRevealObserver();
refreshActiveNav();

searchInput.addEventListener("input", (event) => {
  applySearch(event.target.value);
});
