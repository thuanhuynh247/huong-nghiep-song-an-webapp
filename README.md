# Claude 101 - Hướng Dẫn Khóa Học Việt Hóa

Bản Việt hóa đầy đủ cho khóa học `Claude 101` trên Anthropic Academy, được trình bày lại thành một static site để đọc và tra cứu trên GitHub Pages.

## Chạy local

Chỉ cần mở file [index.html](./index.html) trong trình duyệt, hoặc dùng bất kỳ static server nào.

## Deploy lên GitHub Pages

1. Tạo repo GitHub và push code lên nhánh `main`.
2. Vào `Settings > Pages`, nếu GitHub yêu cầu chọn source thì chọn `GitHub Actions`.
3. Workflow `Deploy GitHub Pages` sẽ tự động build artifact và publish site.

Sau khi workflow chạy xong, site sẽ có dạng:

- `https://<username>.github.io/<repo>/` đối với project site
- `https://<username>.github.io/` nếu đây là user site repo

## Ghi chú nội dung

- Đây là bản Việt hóa và trình bày lại để đọc thuận tiện trên web, không thay thế nền tảng học gốc.
- Bộ HTML nguồn đăng nhập được dùng làm input biên soạn trong workspace local; repo public chỉ chứa giao diện đã Việt hóa.
- Link khóa học gốc: https://anthropic.skilljar.com/claude-101
