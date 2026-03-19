# Claude 101 - Landing Page Viet Hoa

Landing page tieng Viet cho khoa hoc `Claude 101` tren Anthropic Academy, duoc thiet ke dang static site de dua len GitHub Pages nhanh gon.

## Chay local

Chi can mo file [index.html](./index.html) trong trinh duyet, hoac dung bat ky static server nao.

## Deploy len GitHub Pages

1. Tao repo GitHub va push code len nhanh `master`.
2. Vao `Settings > Pages` neu GitHub yeu cau chon source, hay chon `GitHub Actions`.
3. Workflow `Deploy GitHub Pages` se tu dong build artifact va publish site.

Sau khi workflow chay xong, site se co dang:

- `https://<username>.github.io/<repo>/` doi voi project site
- `https://<username>.github.io/` neu day la user site repo

## Ghi chu noi dung

- Day la landing page gioi thieu bang tieng Viet, khong phai mirror cua nen tang hoc.
- Link khoa hoc goc: https://anthropic.skilljar.com/claude-101
