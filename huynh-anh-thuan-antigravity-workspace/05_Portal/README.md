# 05_Portal — Private Service Portal

## Mục đích

Thư mục chứa tài liệu kiến trúc, SQL schema, migration plan, và hướng dẫn setup cho portal riêng tại `portal.huynhanhthuan.com`.

## Cấu trúc

```
05_Portal/
├── README.md                  ← file này
├── data-model-v1.sql          ← SQL schema cho Supabase Postgres
├── migration-plan.md          ← kế hoạch migrate JSON → Postgres
├── auth-setup-guide.md        ← hướng dẫn setup Google/Facebook OAuth
└── portal-app/                ← (Phase 2) Next.js project
```

## Stack

| Layer | Công nghệ | Ghi chú |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR + CSR |
| Auth | Supabase Auth | Google, Facebook, Magic Link |
| Database | Supabase Postgres | RLS, region Singapore |
| Storage | Supabase Storage | Avatar, tài liệu |
| Hosting | Vercel (free tier) | Auto deploy từ GitHub |
| Domain | portal.huynhanhthuan.com | CNAME → Vercel |

## Portals

| Portal | URL path | Role |
|---|---|---|
| Client | `/client/` | Xem assessment, booking, counselor |
| Counselor | `/counselor/` | Xem thân chủ, note, ledger, profile |
| Admin | `/admin/` | Duyệt CV, assign, report, pipeline |

## SSOT

- Architecture: `00_Governance/ecosystem_architecture.md`
- Data model: `05_Portal/data-model-v1.sql`
- Implementation plan: xem brain folder
