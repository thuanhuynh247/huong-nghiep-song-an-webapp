# Claude 101 - Course Guide Viet Hoa

Ban Viet hoa day du cho khoa hoc `Claude 101` tren Anthropic Academy, duoc trinh bay lai thanh mot static site de doc va tra cuu tren GitHub Pages.

## Chay local

Chi can mo file [index.html](./index.html) trong trinh duyet, hoac dung bat ky static server nao.

## Deploy len GitHub Pages

1. Tao repo GitHub va push code len nhanh `main`.
2. Vao `Settings > Pages` neu GitHub yeu cau chon source, hay chon `GitHub Actions`.
3. Workflow `Deploy GitHub Pages` se tu dong build artifact va publish site.

Sau khi workflow chay xong, site se co dang:

- `https://<username>.github.io/<repo>/` doi voi project site
- `https://<username>.github.io/` neu day la user site repo

## Ghi chu noi dung

- Day la ban Viet hoa va trinh bay lai de doc thuan tien tren web, khong thay the nen tang hoc goc.
- Bo HTML nguon dang nhap duoc dung lam input bien soan trong workspace local; repo public chi chua giao dien da Viet hoa.
- Link khoa hoc goc: https://anthropic.skilljar.com/claude-101
