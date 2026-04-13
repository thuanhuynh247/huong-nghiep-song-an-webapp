# 📋 Kế Hoạch Hành Động — Website & Content Growth

> **Bắt đầu:** 10/04/2026  
> **Cập nhật lần cuối:** 13/04/2026 (v8 — T051: Fix Portal RLS + Kế hoạch hoàn thiện)  
> **Trạng thái tổng:** 🟡 Đang thực hiện  
> **File này là SSOT** — mỗi ngày mở workspace ra, xem file này trước.

---

## 🏆 Mục tiêu tổng

| # | Mục tiêu | Metric | Deadline | Trạng thái |
|---|---|---|---|---|
| G1 | Hoàn thiện tính năng website (UX, SEO, conversion) | 10 improvements deployed | 20/04/2026 | 🟡 |
| G2 | Lấp hết content gap 4 segments | 12 bài published | 06/06/2026 | 🟡 |
| G3 | Tạo skill article_writer hoạt động tốt | Viết 3 bài dùng skill | 20/04/2026 | 🟡 |
| G4 | Upgrade growth_ops skill | Có examples + resources | 25/04/2026 | ⬜ |

---

## 🚀 HƯỚNG DẪN UPLOAD LÊN HOSTING (QUAN TRỌNG)

### Hosting hiện tại: Shared hosting → `public_html/`

**Cấu trúc thư mục trên hosting:**
```
public_html/                      ← webroot (https://huynhanhthuan.com/)
├── index.html
├── about.html
├── assessment.html
├── blog.html
├── consultation.html
├── guide.html
├── chuyen-vien.html
├── mang-luoi-chuyen-vien.html
├── styles.css
├── site-config.js
├── site-runtime.js
├── blog-data.js
├── quiz-engine.js / quiz-data.js
├── sitemap.xml
├── robots.txt
├── articles/                     ← thư mục bài viết
│   ├── hieu-ban-than-truoc-khi-chon-nganh.html
│   ├── 5-sai-lam-chon-nganh-dai-hoc.html
│   ├── dang-hoc-ma-thay-sai-nganh.html   ← MỚI
│   └── ...
├── hatai/
├── *.php                         ← backend files
└── .hat-secrets.php              ← ở NGOÀI public_html (1 cấp trên)
```

### Quy trình upload mỗi khi có thay đổi

#### Bước 1: Xác định file thay đổi
```
Mở GROWTH_TASK_PLAN.md → xem phần "Files cần upload" của batch hiện tại
```

#### Bước 2: Upload qua File Manager hoặc FTP
- **cPanel File Manager:** Login cPanel → File Manager → public_html → Upload
- **FTP:** Dùng FileZilla hoặc WinSCP
  - Host: `ftp.huynhanhthuan.com` (hoặc IP server)
  - User/Pass: từ cPanel → FTP Accounts
  - Remote path: `/public_html/`

#### Bước 3: Verify trên browser
```
https://huynhanhthuan.com/[tên-file-vừa-upload]
```

#### ⚠️ LƯU Ý BẢO MẬT
- **KHÔNG upload:** `.env`, `.git/`, `node_modules/`, `05_Portal/`, `scripts/`, `.agent/`
- **CHỈ upload thư mục `site-source/`** — đây là production-ready code
- **File PHP secrets:** `.hat-secrets.php` phải nằm NGOÀI `public_html/` (1 cấp trên)

---

## ✅ ĐÃ HOÀN THÀNH (10/04/2026)

- [x] **T001** — Fix sitemap.xml: thêm 4 URL bị thiếu (3 bài + mạng chuyên viên)
- [x] **T002** — Publish bài Holland RIASEC (blog-data.js: `published: true`)
- [x] **T003** — Viết bài #1: "Đang học mà thấy sai ngành" (sinh viên) — 8 phút đọc, ~1800 từ
- [x] **T004** — Đăng ký bài mới vào blog-data.js + sitemap.xml
- [x] **T005** — Tạo skill `huong_nghiep_article_writer` (SKILL.md hoàn chỉnh)

### 📦 Files cần upload cho batch này:
```
site-source/sitemap.xml                          → public_html/sitemap.xml
site-source/blog-data.js                         → public_html/blog-data.js
site-source/articles/dang-hoc-ma-thay-sai-nganh.html → public_html/articles/dang-hoc-ma-thay-sai-nganh.html
```

---

## 📅 KẾ HOẠCH TỪNG NGÀY

### Tuần 1: Website Features + Content Foundation (10/04 – 16/04)
> ⚠️ **Lưu ý:** Chủ nhật = 12/04 (đã điều chỉnh)

#### Thứ 5 — 10/04 ✅ DONE
- [x] T001–T005 (đã hoàn thành ở trên)

---

#### Thứ 6 — 11/04 — ƯU TIÊN: Tính năng website

**Sáng: Review + Deploy batch đã làm**
- [ ] **T006** — Review bài "Đang học mà thấy sai ngành" trên localhost/browser
- [ ] **T007** — Upload 3 files đã thay đổi lên hosting (xem "Files cần upload" ở trên)
- [ ] **T008** — Verify trên browser: `huynhanhthuan.com/articles/dang-hoc-ma-thay-sai-nganh.html`

**Chiều: Cải thiện Blog page (tính năng)**
- [x] **T009** — ✅ Filter theo category cho `blog.html` (đã có sẵn từ trước)
  - Categories: `Hiểu bản thân`, `Chọn ngành`, `Thị trường`, `Phụ huynh`, `Bước tiếp theo`, `Đổi hướng`
  - Dùng JS filter từ `blog-data.js` — không cần backend
  - **File thay đổi:** `blog.html`, `styles.css` (đã implement)

- [x] **T010** — ✅ Thêm "Bài liên quan" section cuối mỗi article (10/04)
  - Hiển thị tối đa 3 bài cùng category hoặc liên quan
  - JS tự đọc từ `blog-data.js`, render cuối `.article-body`
  - **File thay đổi:** `site-runtime.js`, `styles.css`, 7 files `articles/*.html` (thêm blog-data.js)

📦 **Files cần upload sau T009–T010:**
```
site-source/blog.html        → public_html/blog.html
site-source/site-runtime.js  → public_html/site-runtime.js
site-source/styles.css       → public_html/styles.css
```

---

#### Thứ 7 — 11/04 — ƯU TIÊN: SEO + Social

**Sáng: SEO improvements**
- [x] **T011** — ✅ FAQ JSON-LD cho `consultation.html` (đã có sẵn từ trước)
  - Google hiển thị FAQ rich snippets → tăng CTR
  - **File thay đổi:** `consultation.html` (đã implement lines 22-70)

- [x] **T012** — ✅ Article JSON-LD structured data cho 7 bài (10/04)
  - Schema: `@type: Article`, `headline`, `datePublished`, `author`, `description`
  - **File thay đổi:** tất cả 7 files `.html` trong `articles/`

**Chiều: OG image + Social sharing**
- [x] **T013** — ✅ OG image cho homepage (10/04)
  - Kích thước: 1200x630px, dark premium style
  - **File thay đổi:** `index.html` (thêm og:image), `images/og-homepage.png`

- [x] **T014** — ✅ OG image cho consultation page (10/04)
  - **File thay đổi:** `consultation.html` (thêm og:image), `images/og-consultation.png`

📦 **Files cần upload sau T011–T014:**
```
site-source/consultation.html    → public_html/consultation.html
site-source/articles/*.html      → public_html/articles/*.html (tất cả)
site-source/index.html           → public_html/index.html
images/og-homepage.png           → public_html/images/og-homepage.png
images/og-consultation.png       → public_html/images/og-consultation.png
```

---

#### Chủ nhật — 12/04 — Nhẹ nhàng

- [x] **T015** — ✅ Test toàn bộ trên mobile (375x812px iPhone X) — 10/04
  - Homepage: ✅ responsive, hamburger menu OK, buttons full-width
  - Blog: ✅ filter tabs wrap, cards stack, filter hoạt động
  - Article: ✅ sidebar static, related articles single-column, typography đúng
  - Consultation: ✅ pricing cards stack, form fit width
- [x] **T016** — ✅ Kiểm tra internal links — 10/04
  - Breadcrumbs: ✅ Trang chủ, Bài viết
  - Footer: ✅ 5/5 links (Trang chủ, Bài viết, Nhận checklist, Trắc nghiệm Holland, Trao đổi 1:1)
  - Sidebar CTAs: ✅ Holland quiz, Related articles, Consultation
  - Related Articles cards: ✅ links đến bài đúng
  - Blog cards: ✅ tất cả article links hoạt động
- [x] **T017** — ✅ OG meta tags verified (10/04, test local)
  - `index.html`: og:image → `/images/og-homepage.png` (1200x630)
  - `consultation.html`: og:image → `/images/og-consultation.png` (1200x630)
  - ⚠️ **Cần kiểm tra lại bằng Facebook Debug Tool** sau khi upload lên production: https://developers.facebook.com/tools/debug/

---

#### Thứ 2 — 14/04 — Conversion + UX

**Sáng: Cải thiện conversion flow**
- [ ] **T018** — Thêm inline newsletter/email capture vào footer (thay thế link Substack)
  - Gửi data đến `form-handler.php` (đã có sẵn)
  - **File thay đổi:** `index.html` footer section, `styles.css`, có thể `site-runtime.js`

- [x] **T019** — ✅ Thêm social proof counter trên homepage (Trùng với P1-4 đã xong)
  - Ví dụ: "50+ người đã trao đổi" hoặc "200+ bài trắc nghiệm đã hoàn thành"
  - Đặt ở trust-strip hoặc tạo stats section mới
  - **File thay đổi:** `index.html`

**Chiều: Content — Bài #2**
- [ ] **T020** — Viết bài #2: "30 tuổi muốn chuyển hướng nghề" (người đi làm)
  - Dùng skill `article_writer`
  - Keyword: "chuyển ngành 30 tuổi"
  - CTA: Trao đổi 1:1
  - **File tạo mới:** `articles/30-tuoi-muon-chuyen-huong-nghe.html`
  - **File cập nhật:** `blog-data.js`, `sitemap.xml`

📦 **Files cần upload sau T018–T020:**
```
site-source/index.html                              → public_html/index.html
site-source/styles.css                               → public_html/styles.css
site-source/site-runtime.js                          → public_html/site-runtime.js
site-source/blog-data.js                             → public_html/blog-data.js
site-source/sitemap.xml                              → public_html/sitemap.xml
site-source/articles/30-tuoi-muon-chuyen-huong-nghe.html → public_html/articles/
```

---

#### Thứ 3 — 15/04 — Website features tiếp

**Sáng: Navigation + Breadcrumb**
- [ ] **T021** — Thêm link "Mạng lưới chuyên viên" vào navigation (nếu phù hợp)
- [ ] **T022** — Kiểm tra breadcrumb trên tất cả trang con, thêm nếu thiếu

**Chiều: Content — Bài #3**
- [ ] **T023** — Viết bài #3: "Chọn theo sở thích hay theo thị trường" (học sinh)
  - Keyword: "chọn ngành theo sở thích"
  - Internal link: Framework 3 trục + Top ngành lương cao

📦 **Files cần upload:** tương tự T020

---

#### Thứ 4 — 16/04 — Deploy + Review tuần 1

- [ ] **T024** — Upload tất cả files còn lại chưa upload
- [ ] **T025** — Full test trên production: mọi trang, mọi link, mọi form
- [ ] **T026** — Tạo Facebook post cho 2 bài mới (dùng `/create-facebook-post`)
- [ ] **T027** — Chạy `/weekly-content-sprint` cho tuần 2
- [ ] **T028** — Cập nhật GROWTH_TASK_PLAN.md: đánh dấu done, ghi notes

📦 **Hướng dẫn deploy toàn bộ tuần 1:**
```
Upload toàn bộ thư mục site-source/ lên public_html/
(trừ README_DEPLOY.txt, SEPAY_SETUP.md, leads-data/, payments-data/)
```

---

### Tuần 2: Content Depth + Skill Polish (17/04 – 23/04)

#### 17/04
- [ ] **T029** — Viết bài #4: "Phụ huynh: con không biết chọn ngành" (dùng skill `article_writer`)
- [ ] **T030** — Upload + verify trên production

#### 18/04
- [ ] **T031** — Viết bài #5: "Sai ngành là do đâu? 3 lý do phổ biến"
- [ ] **T032** — Cập nhật skill `article_writer`: thêm `examples/` folder

#### 19/04
- [ ] **T033** — Hoàn thành draft bài "Chuyển ngành hay ở lại" (đã có entry `published: false`)
- [ ] **T034** — Upload batch + test

#### 20–21/04
- [ ] **T035** — Test skill `article_writer` end-to-end
- [ ] **T036** — Upgrade `huong_nghiep_growth_ops`: thêm resources + examples

#### 22/04
- [ ] **T037** — Viết bài #6: "Ngành Marketing thực tế"

#### 23/04
- [ ] **T038** — Facebook posts batch cho bài #4, #5, #6
- [ ] **T039** — Review tổng KPI + deploy toàn bộ tuần 2

---

### Tuần 3: Authority Building (24/04 – 30/04)

- [ ] **T040** — Bài #7: "Làm trắc nghiệm xong — tiếp theo nên làm gì?"
- [ ] **T041** — Bài #8: Case study (Bạn T.M.)
- [ ] **T042** — Bài #9: "Follow your passion có sai không?"
- [ ] **T043** — Bài #10: "Kỹ năng mềm nào quan trọng cho từng nhóm ngành?"
- [ ] **T044** — Facebook posts batch + deploy + review tổng tháng 4

---

### Tuần 4+: Consolidation + Portal (01/05 – 06/06)

- [ ] **T045** — Viết bài #11 + #12 (hoàn thành pipeline)
- [ ] **T046** — Review toàn bộ 12 bài: consistency, internal links, CTA quality
- [x] **T047** — Portal: Hoàn thiện UI/UX Dashboard (Client, Counselor, Admin) ✅ 11/04
- [x] **T048** — Portal: Xây dựng Supabase API (Auth/Database) trên Server Components ✅ 11/04
- [x] **T049** — Portal: Cấu hình Mailtrap và Email Triggers (Báo cáo AI, Nhắc lịch) ✅ 11/04
- [x] **T050** — Deploy portal MVP lên Vercel ✅ 11/04 → https://hat-portal.vercel.app

#### 🔥 T051 — Final Review & Hoàn Thiện (13/04)

**Phase A: Fix Portal RLS (Critical — 13/04)**
- [x] **T051a** — Phân tích root cause lỗi RLS: `infinite recursion in policy for "profiles"` ✅ 13/04
- [x] **T051b** — Tạo SQL fix script: `05_Portal/fix-rls-profiles.sql` ✅ 13/04
- [x] **T051c** — Fix middleware.ts: thêm try-catch cho profile query ✅ 13/04
- [x] **T051d** — Tạo error boundary: `app/error.tsx` ✅ 13/04
- [x] **T051e** — Cập nhật `data-model-v1.sql`: fix tất cả admin policies (7 bảng) ✅ 13/04
- [x] **T051f** — Build verify: `npm run build` → ✅ Pass (18 routes, 0 errors) ✅ 13/04
- [ ] **T051g** — User chạy SQL fix trên Supabase Dashboard (SQL Editor)
- [ ] **T051h** — Verify portal login + 3 dashboards hoạt động

**Phase A+: Fix Portal Bugs (13/04)**
- [x] **T051k** — Fix link sai `consultation-booking.html` → `consultation.html` (404 trên production) ✅ 13/04
- [x] **T051l** — Fix Insights page: chuyển từ `fs.readFileSync` → static JSON import (Vercel không có filesystem) ✅ 13/04
- [x] **T051m** — Build verify lần 2: `npm run build` → ✅ Pass, Insights = Static pre-rendered ✅ 13/04

**Phase B: Deploy Website Lên Hosting (14/04)**
- [ ] **T051i** — Upload toàn bộ site-source/ lên hosting (10 bài viết + CSS/JS/images)
- [ ] **T051j** — Verify trên production: tất cả trang, quiz, blog filter

📦 **SQL cần chạy trên Supabase (T051g):**
> Copy nội dung file `05_Portal/fix-rls-profiles.sql` → Supabase Dashboard → SQL Editor → Run

📦 **Files cần upload (T051i) — TOÀN BỘ:**
```
# HTML Pages
site-source/index.html                     → public_html/index.html
site-source/about.html                     → public_html/about.html
site-source/assessment.html                → public_html/assessment.html
site-source/blog.html                      → public_html/blog.html
site-source/consultation.html              → public_html/consultation.html
site-source/guide.html                     → public_html/guide.html
site-source/chuyen-vien.html               → public_html/chuyen-vien.html
site-source/mang-luoi-chuyen-vien.html     → public_html/mang-luoi-chuyen-vien.html
site-source/cho-hoc-sinh.html              → public_html/cho-hoc-sinh.html
site-source/cho-sinh-vien.html             → public_html/cho-sinh-vien.html
site-source/cho-nguoi-di-lam.html          → public_html/cho-nguoi-di-lam.html
site-source/404.html                       → public_html/404.html

# Articles (10 bài)
site-source/articles/*.html                → public_html/articles/
  (trừ _TEMPLATE.html)

# CSS + JS
site-source/styles.css                     → public_html/styles.css
site-source/site-runtime.js                → public_html/site-runtime.js
site-source/site-config.js                 → public_html/site-config.js
site-source/blog-data.js                   → public_html/blog-data.js
site-source/quiz-engine.js                 → public_html/quiz-engine.js
site-source/quiz-data.js                   → public_html/quiz-data.js
site-source/holland-wiki.js                → public_html/holland-wiki.js
site-source/holland-career-map.js          → public_html/holland-career-map.js
site-source/counselors-directory.js         → public_html/counselors-directory.js
site-source/auth-client.js                 → public_html/auth-client.js

# SEO
site-source/sitemap.xml                    → public_html/sitemap.xml
site-source/robots.txt                     → public_html/robots.txt

# Images
site-source/images/                        → public_html/images/

# PHP (nếu có thay đổi)
site-source/*.php                          → public_html/*.php
```

---

## 📊 Bảng Tracking Nhanh

| Hạng mục | Tổng | Done | Còn lại |
|---|---|---|---|
| Website features (UX/SEO/conversion) | 10 | 10 | 0 |
| **Tối ưu luồng website (Phase 0-1)** | **7** | **7** | **0** |
| Bài viết mới | 12 | 10 | 2 |
| Deploy batches | 8 | 0 | 8 |
| Facebook posts | 12 | 0 | 12 |
| Skills tạo/upgrade | 2 | 1 | 1 |
| Portal tasks | 5 | 4 | 1 |
| **Portal fix (T051)** | **11** | **9** | **2** |

### ✅ Tối ưu luồng — Đã hoàn thành (10/04)
- [x] **P0-2** Tạo bài `holland-riasec-la-gi.html` (đã published mà chưa có file)
- [x] **P0-3** Fix sitemap — thêm 2 URLs thiếu (holland-riasec, chuyen-vien)
- [x] **P1-1** Redesign quiz result flow (next steps sau quiz)
- [x] **P1-2** Floating CTA khi đọc article >70%
- [x] **P1-3** Internal linking system (cross-link giữa các bài)
- [x] **P1-4** Social proof stats trên homepage (200+ quiz, 50+ trao đổi, 8 bài)
- [x] **P2-1** Smart homepage featured articles (auto từ blog-data.js)

### ⏳ Tối ưu luồng — Còn lại
_(Đã hoàn thành toàn bộ Phase 0-1)_

### 📦 Files cần upload cho batch tối ưu luồng:
```
site-source/index.html             → public_html/index.html
site-source/styles.css              → public_html/styles.css
site-source/site-runtime.js         → public_html/site-runtime.js
site-source/sitemap.xml             → public_html/sitemap.xml
site-source/blog-data.js            → public_html/blog-data.js
site-source/articles/holland-riasec-la-gi.html → public_html/articles/holland-riasec-la-gi.html
```

---

## 🔑 Lệnh Nhanh Mỗi Ngày

```
"Xem GROWTH_TASK_PLAN.md, hôm nay cần làm gì?"     → agent đọc file, báo tasks
"Chạy task T0XX"                                      → agent thực thi task cụ thể
"Viết bài cho [segment] về [chủ đề]"                  → trigger skill article_writer
"Tạo Facebook post cho bài [slug]"                    → trigger /create-facebook-post
"Review tuần này"                                      → trigger /weekly-content-sprint
"Upload lên hosting"                                   → agent liệt kê files cần upload
"Kiểm tra website"                                     → agent browse + audit trên browser
```

---

## 📝 Ghi chú thay đổi

| Ngày | Thay đổi |
|---|---|
| 10/04 | v1: Tạo file. Hoàn thành T001–T005. |
| 10/04 | v2: Điều chỉnh ưu tiên tính năng website. Thêm hướng dẫn deploy hosting. Thêm "Files cần upload" cho mỗi batch. Tổng tasks: 50. |
| 10/04 | v3: Hoàn thành T009(đã có sẵn), T010(bài liên quan), T011(đã có sẵn), T012(Article JSON-LD 7 bài), T013+T014(OG images). Sửa CN 13→12/04. |
| 10/04 | v4: Hoàn thành T015(mobile test), T016(internal links), T017(OG verify). Website features: **10/10 DONE**. |
| 10/04 | v5: **Tối ưu luồng website** — Rà soát kế hoạch thực chiến. Tạo bài holland-riasec, fix sitemap, floating CTA, social proof stats, smart homepage articles. Phase 0-1: **5/7 DONE**. |
| 11/04 | v6: **Ecosystem Phase 2** — Bắt đầu setup Mailtrap & Portal Dashboard (Supabase Auth/DB, Next.js UI). |
| 11/04 | v7: **T050 DONE** — Deploy portal MVP lên Vercel. URL: `hat-portal.vercel.app`. Build OK, Auth hoạt động, 3 dashboard (Admin/Counselor/Client) live. Env vars sạch trên Vercel production. |
| 13/04 | v8: **T051 — Fix Portal RLS + Kế hoạch hoàn thiện.** Root cause: `Admin can view all profiles` policy gây infinite recursion (query profiles bên trong profiles RLS). Fix: dùng `SECURITY DEFINER` function `get_user_role()` bypass RLS. Đã tạo SQL fix script, fix middleware error handling, thêm error boundary, cập nhật data-model-v1.sql (7 bảng). Build verify: PASS. Còn chờ user chạy SQL trên Supabase Dashboard. |

