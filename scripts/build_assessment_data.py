from __future__ import annotations

import glob
import json
import re
from collections import defaultdict
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_FILE = ROOT / "assessment-data.js"
SUMMARY_FILE = ROOT / "docs" / "manual-ingestion-summary.md"
MANUAL_GLOB = r"D:\Event\*\Cong cu trac nghiem Song An\*.pdf"


def compact(text: str) -> str:
    text = text.replace("\u200b", " ").replace("⬜", " ")
    return " ".join(text.split())


def looks_english(line: str) -> bool:
    letters = [char for char in line if char.isalpha()]
    if not letters:
        return False
    ascii_letters = [char for char in letters if char.isascii()]
    return len(ascii_letters) / len(letters) > 0.82


def question_id(prefix: str, number: int) -> str:
    return f"{prefix}-{number:02d}"


def find_manual(needle: str) -> str:
    for path in glob.glob(MANUAL_GLOB):
        if needle in path:
            return path
    raise FileNotFoundError(f"Could not find PDF containing: {needle}")


def clean_holland_lines(raw: str) -> list[str]:
    return [line.strip() for line in raw.splitlines() if line.strip() and line.strip() != "⬜"]


def block_has_number(raw: str) -> bool:
    lines = clean_holland_lines(raw)
    for line in lines:
        if re.fullmatch(r"\d{1,2}", line):
            return True
        if re.match(r"^\d{1,2}\s+", line):
            return True
    return False


def parse_holland_block(raw: str) -> tuple[int | None, str, str]:
    lines = clean_holland_lines(raw)
    if not lines:
        return None, "", ""

    number = None
    split_index = None
    right_seed = ""

    for index, line in enumerate(lines):
        if re.fullmatch(r"\d{1,2}", line):
            number = int(line)
            split_index = index
            break
        match = re.match(r"^(\d{1,2})\s+(.+)$", line)
        if match:
            number = int(match.group(1))
            split_index = index
            right_seed = match.group(2)
            break

    if number is None or split_index is None:
        return None, "", ""

    left = compact(" ".join(lines[:split_index]))
    right_parts = []
    if right_seed:
        right_parts.append(right_seed)
    right_parts.extend(lines[split_index + 1 :])
    right = compact(" ".join(right_parts))

    for marker in ("Còn tiếp", "Kết thúc", "Tác giả", "HƯỚNG NGHIỆP"):
        if marker in right:
            right = compact(right.split(marker)[0])

    return number, left, right


def parse_holland(path: str, audience_label: str, age_range: dict[str, int | None]) -> dict:
    doc = fitz.open(path)
    dimension_pairs = {
        1: [("R", "Kỹ thuật"), ("I", "Nghiên cứu")],
        2: [("A", "Nghệ thuật"), ("S", "Xã hội")],
        3: [("E", "Quản lý"), ("C", "Nghiệp vụ")],
    }
    descriptions = {
        "R": "Ưa thực hành, công cụ, máy móc, vận động và môi trường cụ thể.",
        "I": "Thích quan sát, nghiên cứu, đặt câu hỏi và phân tích vấn đề.",
        "A": "Thích sáng tạo, biểu đạt ý tưởng, nghệ thuật và nội dung.",
        "S": "Thích hỗ trợ, kết nối, dạy học và chăm sóc con người.",
        "E": "Thích dẫn dắt, thuyết phục, tổ chức và tạo ảnh hưởng.",
        "C": "Thích kế hoạch, trật tự, chi tiết và quy trình rõ ràng.",
    }
    career_world = {
        "R": "Khối ngành kỹ thuật",
        "I": "Khối ngành khoa học và công nghệ",
        "A": "Khối ngành nghệ thuật",
        "S": "Khối ngành dịch vụ xã hội",
        "E": "Khối ngành quản trị và bán hàng",
        "C": "Khối ngành vận hành kinh doanh",
    }

    grouped_questions: dict[str, list[dict]] = defaultdict(list)

    for page_index, dims in dimension_pairs.items():
        blocks = list(doc[page_index].get_text("blocks"))
        cursor = 0
        pending_lead = ""
        while cursor < len(blocks):
            raw = blocks[cursor][4]
            if (
                "⬜" not in raw
                and raw.strip()
                and not any(
                    marker in raw
                    for marker in (
                        "PHẦN B",
                        "Câu mô tả",
                        "Lựa chọn",
                        "Nhóm ",
                        "Tác giả",
                        "HƯỚNG NGHIỆP",
                        "Còn tiếp",
                        "Kết thúc",
                        "Cập nhật:",
                        "Website:",
                        "Có \nKhông",
                        "Rất \nkhông",
                        "đồng ý",
                    )
                )
            ):
                pending_lead = compact(raw)
                cursor += 1
                continue
            if "⬜" not in raw:
                cursor += 1
                continue
            if any(marker in raw for marker in ("PHẦN B", "Câu mô tả", "Lựa chọn", "Nhóm ", "Tác giả", "HƯỚNG NGHIỆP", "Còn tiếp", "Kết thúc")):
                cursor += 1
                continue

            candidate = raw
            if pending_lead:
                candidate = pending_lead + "\n" + candidate
                pending_lead = ""
            while cursor + 1 < len(blocks):
                next_raw = blocks[cursor + 1][4]
                if any(marker in next_raw for marker in ("Tác giả", "HƯỚNG NGHIỆP", "Còn tiếp", "Kết thúc", "Nhóm ", "PHẦN B", "Cập nhật:", "Website:")):
                    break
                if block_has_number(next_raw):
                    break
                candidate += next_raw
                cursor += 1

            number, left, right = parse_holland_block(candidate)
            if number and 1 <= number <= 14 and left and right:
                grouped_questions[dims[0][0]].append(
                    {
                        "id": question_id(dims[0][0].lower(), number),
                        "order": number,
                        "text": left,
                        "dimension": dims[0][0],
                    }
                )
                grouped_questions[dims[1][0]].append(
                    {
                        "id": question_id(dims[1][0].lower(), number),
                        "order": number,
                        "text": right,
                        "dimension": dims[1][0],
                    }
                )

            cursor += 1

    repairs = {
        "holland-16-22": {
            ("A", 1): "Tạo ra một tác phẩm nghệ thuật, tranh, câu chuyện",
            ("A", 3): "Chứng tỏ năng lực nghệ thuật của bản thân với người khác (nói lên suy nghĩ/quan điểm qua tác phẩm nghệ thuật)",
            ("S", 2): "Kết nối hai người bạn với nhau",
            ("S", 3): "Dạy cho bạn mình cách giảm cân qua ăn uống đúng cách",
        },
        "holland-23-plus": {
            ("A", 1): "Thiết kế bìa sách cho một cuốn sách mình thích",
            ("A", 12): "Chứng tỏ năng lực nghệ thuật của bản thân với người khác (nói lên suy nghĩ/quan điểm qua tác phẩm nghệ thuật)",
            ("S", 11): "Tham gia một cộng đồng mạng có cùng giá trị (bảo vệ môi trường, giúp nạn nhân lũ lụt, chia sẻ thông tin về sức khỏe, v.v.)",
            ("S", 12): "Giúp giải quyết mâu thuẫn giữa những người bạn",
        },
    }

    assessment_id = "holland-16-22" if "16-22" in path else "holland-23-plus"

    questions = []
    for code in ("R", "I", "A", "S", "E", "C"):
        questions.extend(grouped_questions[code])

    question_map = {question["id"]: question for question in questions}
    for (code, number), text in repairs[assessment_id].items():
        question_key = question_id(code.lower(), number)
        question_map[question_key] = {
            "id": question_key,
            "order": number,
            "text": text,
            "dimension": code,
        }

    questions = []
    for code in ("R", "I", "A", "S", "E", "C"):
        code_questions = [
            question_map[key]
            for key in sorted(
                [item_id for item_id in question_map if item_id.startswith(f"{code.lower()}-")],
                key=lambda item_id: int(item_id.split("-")[-1]),
            )
        ]
        questions.extend(code_questions)

    scale = {
        "min": 1,
        "max": 5,
        "options": [
            {"value": 1, "label": "Rất không thích"},
            {"value": 2, "label": "Không thích"},
            {"value": 3, "label": "Bình thường"},
            {"value": 4, "label": "Thích"},
            {"value": 5, "label": "Rất thích"},
        ],
    }
    if assessment_id == "holland-23-plus":
        scale = {
            "min": 0,
            "max": 1,
            "options": [
                {"value": 1, "label": "Có"},
                {"value": 0, "label": "Không"},
                {"value": 0, "label": "Không rõ"},
            ],
        }

    return {
        "id": assessment_id,
        "family": "holland",
        "title": "Khám phá sở thích theo Holland",
        "variant": audience_label,
        "audience": age_range,
        "category": "Sở thích nghề nghiệp",
        "estimatedMinutes": 18,
        "description": "Trắc nghiệm sở thích nghề nghiệp dựa trên 6 nhóm Holland để giúp người dùng nhận diện khuynh hướng nổi trội.",
        "sourceFile": Path(path).name,
        "questionCount": len(questions),
        "scale": scale,
        "dimensions": [
            {
                "id": code,
                "label": label,
                "description": descriptions[code],
                "careerWorld": career_world[code],
                "maxScore": 14 if assessment_id == "holland-23-plus" else 70,
            }
            for code, label in (
                ("R", "Kỹ thuật"),
                ("I", "Nghiên cứu"),
                ("A", "Nghệ thuật"),
                ("S", "Xã hội"),
                ("E", "Quản lý"),
                ("C", "Nghiệp vụ"),
            )
        ],
        "questions": questions,
        "scoring": {"type": "sum-by-dimension"},
    }


def parse_numbered_items(path: str, page_indexes: list[int], stop_markers: tuple[str, ...] = ()) -> list[dict]:
    doc = fitz.open(path)
    items: list[dict] = []

    for page_index in page_indexes:
        blocks = list(doc[page_index].get_text("blocks"))
        cursor = 0
        while cursor < len(blocks):
            raw = blocks[cursor][4]
            if not re.match(r"^\s*\d{1,2}(?:\s+\D|\n)", raw):
                cursor += 1
                continue

            candidate = raw
            while cursor + 1 < len(blocks) and not re.search(r"1\s+2\s+3\s+4\s+5", candidate):
                cursor += 1
                candidate += blocks[cursor][4]
                if any(marker in candidate for marker in stop_markers):
                    break

            lines = [compact(line) for line in candidate.splitlines() if compact(line)]
            if not lines:
                cursor += 1
                continue

            first = lines[0]
            number = None
            content_lines: list[str] = []
            first_match = re.match(r"^(\d{1,2})\s+(.+)$", first)
            if first.isdigit():
                number = int(first)
                content_lines = lines[1:]
            elif first_match:
                number = int(first_match.group(1))
                content_lines = [first_match.group(2), *lines[1:]]

            if number is None:
                cursor += 1
                continue

            kept: list[str] = []
            for line in content_lines:
                if any(marker in line for marker in stop_markers):
                    break
                if re.fullmatch(r"1\s+2\s+3\s+4\s+5", line):
                    break
                if looks_english(line):
                    break
                kept.append(line)

            question_text = compact(" ".join(kept))
            if question_text:
                items.append({"number": number, "text": question_text})

            cursor += 1

    return items


def parse_ced_items(path: str, page_indexes: list[int]) -> list[dict]:
    doc = fitz.open(path)
    items: list[dict] = []

    for page_index in page_indexes:
        text = doc[page_index].get_text("text").replace("\u200b", " ")
        for match in re.finditer(r"(?ms)(\d{1,2})\.\s*(.*?)\s*1\s+2\s+3\s+4\s+5", text):
            number = int(match.group(1))
            question_text = compact(match.group(2))
            if question_text:
                items.append({"number": number, "text": question_text})

    return items


def parse_grit(path: str) -> dict:
    questions = [
        {"number": 1, "text": "Tôi đã vượt qua những khó khăn để chinh phục thử thách quan trọng."},
        {"number": 2, "text": "Đôi khi các ý tưởng và dự án mới khiến tôi xao lãng và không còn chú ý đến những ý tưởng trước đó."},
        {"number": 3, "text": "Những điều tôi quan tâm thay đổi qua từng năm."},
        {"number": 4, "text": "Tôi không nản lòng trước những khó khăn."},
        {"number": 5, "text": "Tôi bị cuốn hút bởi một ý tưởng hoặc dự án nào đó trong một thời gian ngắn, rồi tôi lại dần mất đi hứng thú."},
        {"number": 6, "text": "Tôi là người chăm chỉ."},
        {"number": 7, "text": "Tôi thường lập mục tiêu này nhưng rồi lại chọn theo đuổi mục tiêu khác."},
        {"number": 8, "text": "Tôi khó tập trung vào các dự án mà thường phải mất hơn vài tháng để hoàn thành."},
        {"number": 9, "text": "Tôi hoàn thành những việc mình đề ra."},
        {"number": 10, "text": "Tôi từng hoàn thành một mục tiêu đòi hỏi nỗ lực trong nhiều năm."},
        {"number": 11, "text": "Cứ mỗi vài tháng, tôi lại quan tâm theo đuổi các mục tiêu mới."},
        {"number": 12, "text": "Tôi cần mẫn."},
    ]
    return {
        "id": "grit-scale",
        "family": "grit",
        "title": "Thang đo Bền chí",
        "variant": "Grit Scale",
        "audience": {"label": "Mọi độ tuổi", "minAge": None, "maxAge": None},
        "category": "Động lực và bền bỉ",
        "estimatedMinutes": 6,
        "description": "Thang đo bền chí giúp người dùng nhìn lại mức độ kiên trì với mục tiêu dài hạn.",
        "sourceFile": Path(path).name,
        "questionCount": len(questions),
        "scale": {
            "min": 1,
            "max": 5,
            "options": [
                {"value": 1, "label": "Không giống tôi chút nào cả"},
                {"value": 2, "label": "Không giống tôi lắm"},
                {"value": 3, "label": "Hơi giống tôi"},
                {"value": 4, "label": "Rất giống tôi"},
                {"value": 5, "label": "Hoàn toàn giống với tôi"},
            ],
        },
        "reverseItems": [2, 3, 5, 7, 8, 11],
        "questions": [
            {"id": question_id("grit", item["number"]), "order": item["number"], "text": item["text"]}
            for item in questions
        ],
        "scoring": {"type": "grit-average"},
    }


def parse_mipq(path: str) -> dict:
    questions = parse_numbered_items(path, [2, 3, 4], stop_markers=("BÁO CÁO KẾT QUẢ",))
    dimensions = [
        {"id": "TTM1", "label": "Ngôn ngữ", "description": "Khả năng dùng ngôn ngữ khi viết, nói và tiếp nhận nội dung.", "items": [1, 2, 3, 4], "multiplier": 5},
        {"id": "TTM2", "label": "Logic - toán học", "description": "Khả năng suy luận, giải quyết vấn đề và tư duy logic.", "items": [5, 6, 7, 8], "multiplier": 5},
        {"id": "TTM3", "label": "Không gian", "description": "Khả năng hình dung, thao tác với hình ảnh và vật thể đa chiều.", "items": [9, 10, 11, 12], "multiplier": 5},
        {"id": "TTM4", "label": "Vận động cơ thể", "description": "Khả năng điều phối chuyển động cơ thể và thao tác bằng tay.", "items": [13, 14, 15, 16], "multiplier": 5},
        {"id": "TTM5", "label": "Âm nhạc", "description": "Độ nhạy với giai điệu, nhịp điệu và âm thanh.", "items": [17, 18, 19, 20], "multiplier": 5},
        {"id": "TTM6", "label": "Tương tác", "description": "Khả năng kết nối, hợp tác và hiểu người khác.", "items": [21, 22, 23, 24], "multiplier": 5},
        {"id": "TTM7", "label": "Nội tâm", "description": "Khả năng tự nhận thức, suy ngẫm và hiểu động cơ bản thân.", "items": [25, 26, 27, 28], "multiplier": 5},
        {"id": "TTM8", "label": "Tâm linh", "description": "Xu hướng suy tư về ý nghĩa cuộc sống và chiều sâu tinh thần.", "items": [29, 30, 31, 32], "multiplier": 5},
        {"id": "TTM9", "label": "Môi trường tự nhiên", "description": "Sự gắn bó với thiên nhiên và ý thức bảo vệ môi trường.", "items": [33, 34, 35], "multiplier": 6.5},
    ]

    return {
        "id": "mipq",
        "family": "mipq",
        "title": "Bảng hỏi Nhận dạng Trí thông minh đa diện",
        "variant": "MIPQ",
        "audience": {"label": "Mọi độ tuổi", "minAge": None, "maxAge": None},
        "category": "Điểm mạnh cá nhân",
        "estimatedMinutes": 10,
        "description": "Bảng hỏi tự đánh giá dựa trên lý thuyết trí thông minh đa diện của Howard Gardner.",
        "sourceFile": Path(path).name,
        "questionCount": len(questions),
        "scale": {
            "min": 1,
            "max": 5,
            "options": [
                {"value": 1, "label": "Hoàn toàn không đồng ý"},
                {"value": 2, "label": "Không đồng ý"},
                {"value": 3, "label": "Không rõ"},
                {"value": 4, "label": "Đồng ý"},
                {"value": 5, "label": "Hoàn toàn đồng ý"},
            ],
        },
        "dimensions": dimensions,
        "questions": [
            {"id": question_id("mipq", item["number"]), "order": item["number"], "text": item["text"]}
            for item in questions
        ],
        "scoring": {"type": "mipq-profile"},
    }


def ced_metadata(variant: str, audience: dict[str, int | None]) -> dict:
    dimension_defs = [
        {"id": "self-understanding", "label": "Về bản thân", "items": [1, 2, 3], "maxScore": 15},
        {"id": "influences", "label": "Sự ảnh hưởng", "items": [4, 5, 6], "maxScore": 15},
        {"id": "opportunities", "label": "Về các cơ hội", "items": [7, 8, 9], "maxScore": 15},
        {"id": "goal-setting", "label": "Đặt mục tiêu", "items": [10, 11, 12], "maxScore": 15},
        {"id": "decision-making", "label": "Về việc ra quyết định", "items": [13, 14, 15], "maxScore": 15},
        {"id": "career-actions", "label": "Về hành động", "items": [16, 17, 18], "maxScore": 15},
        {"id": "reflection", "label": "Suy ngẫm / Đánh giá", "items": [19, 20, 21], "maxScore": 15},
        {"id": "future-confidence", "label": "Tự tin vào tương lai", "items": [22, 23, 24], "maxScore": 15},
        {"id": "self-efficacy", "label": "Tự tin vào năng lực bản thân", "items": [25, 26, 27], "maxScore": 15},
    ]

    return {
        "id": "ced-thpt" if "THPT" in variant else "ced-dh-cd",
        "family": "ced",
        "title": "Thang đo Phát triển & Giáo dục Hướng nghiệp",
        "variant": variant,
        "audience": audience,
        "category": "Mức độ sẵn sàng hướng nghiệp",
        "estimatedMinutes": 9,
        "description": "Thang đo giúp người dùng nhìn lại mức độ hiểu biết, hành động và thái độ trong hành trình hướng nghiệp.",
        "dimensions": dimension_defs,
    }


def parse_ced(path: str, variant: str, audience: dict[str, int | None]) -> dict:
    questions = parse_ced_items(path, [1, 2])
    base = ced_metadata(variant, audience)
    base.update(
        {
            "sourceFile": Path(path).name,
            "questionCount": len(questions),
            "scale": {
                "min": 1,
                "max": 5,
                "options": [
                    {"value": 1, "label": "Rất không đồng ý"},
                    {"value": 2, "label": "Không đồng ý"},
                    {"value": 3, "label": "Phân vân"},
                    {"value": 4, "label": "Đồng ý"},
                    {"value": 5, "label": "Rất đồng ý"},
                ],
            },
            "questions": [
                {"id": question_id("ced", item["number"]), "order": item["number"], "text": item["text"]}
                for item in questions
            ],
            "scoring": {"type": "ced-profile"},
        }
    )
    return base


def build_dataset() -> dict:
    holland_student = parse_holland(find_manual("Holland (16-22)"), "16-22 tuổi", {"label": "16-22 tuổi", "minAge": 16, "maxAge": 22})
    holland_adult = parse_holland(find_manual("Holland (23)"), "23+ tuổi", {"label": "23+ tuổi", "minAge": 23, "maxAge": None})
    grit = parse_grit(find_manual("Grit Scale"))
    mipq = parse_mipq(find_manual("MIPQ"))
    ced_thpt = parse_ced(find_manual("(THPT)"), "THPT", {"label": "THPT", "minAge": 15, "maxAge": 18})
    ced_dh_cd = parse_ced(find_manual("(ĐH_CĐ)"), "ĐH / CĐ", {"label": "ĐH / CĐ", "minAge": 18, "maxAge": None})

    assessments = [holland_student, holland_adult, grit, mipq, ced_thpt, ced_dh_cd]

    total_questions = sum(item["questionCount"] for item in assessments)

    return {
        "appName": "Huong Nghiep Song An",
        "generatedBy": "scripts/build_assessment_data.py",
        "assessmentCount": len(assessments),
        "totalQuestionCount": total_questions,
        "assessments": assessments,
    }


def write_summary(dataset: dict) -> None:
    lines = [
        "# Manual Ingestion Summary",
        "",
        f"- Assessments: {dataset['assessmentCount']}",
        f"- Total questions: {dataset['totalQuestionCount']}",
        "",
        "| Assessment | Family | Variant | Questions | Source |",
        "|---|---|---|---:|---|",
    ]

    for assessment in dataset["assessments"]:
        lines.append(
            f"| {assessment['title']} | {assessment['family']} | {assessment['variant']} | {assessment['questionCount']} | {assessment['sourceFile']} |"
        )

    SUMMARY_FILE.parent.mkdir(parents=True, exist_ok=True)
    SUMMARY_FILE.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    dataset = build_dataset()
    OUTPUT_FILE.write_text(
        "window.HUONG_NGHIEP_DATA = " + json.dumps(dataset, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    write_summary(dataset)
    print(f"Wrote {OUTPUT_FILE}")
    print(f"Wrote {SUMMARY_FILE}")
    for assessment in dataset["assessments"]:
        print(f"{assessment['id']}: {assessment['questionCount']} questions")


if __name__ == "__main__":
    main()
