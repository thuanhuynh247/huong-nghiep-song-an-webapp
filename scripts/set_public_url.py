from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent
PLACEHOLDER = "https://your-public-domain.example/"
SUPPORTED_OLD_VALUES = [
    PLACEHOLDER,
    "https://thuanhuynh247.github.io/claude-101-viet-hoa/",
    "https://thuanhuynh247.github.io/huong-nghiep-song-an-webapp/",
]

TARGETS = [
    ROOT / "index.html",
    ROOT / "robots.txt",
    ROOT / "sitemap.xml",
    ROOT / "docs" / "webapp-publication.md",
    ROOT / "docs" / "official-launch-checklist.md",
]


def normalize(url: str) -> str:
    clean = url.strip()
    if not clean.startswith("http://") and not clean.startswith("https://"):
        raise ValueError("Public URL must start with http:// or https://")
    if not clean.endswith("/"):
        clean += "/"
    return clean


def replace_all(text: str, new_url: str) -> str:
    updated = text
    for old_url in SUPPORTED_OLD_VALUES:
        updated = updated.replace(old_url, new_url)
    return updated


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python scripts/set_public_url.py https://your-domain.example/")
        return 1

    public_url = normalize(sys.argv[1])

    for path in TARGETS:
        content = path.read_text(encoding="utf-8")
        updated = replace_all(content, public_url)
        path.write_text(updated, encoding="utf-8")
        print(f"Updated {path}")

    print(f"Public URL set to {public_url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
