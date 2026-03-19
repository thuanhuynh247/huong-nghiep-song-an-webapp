from pathlib import Path

from PIL import Image, ImageColor, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_BASE_URL = "https://thuanhuynh247.github.io/huong-nghiep-song-an-webapp/"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = []
    if bold:
      candidates.extend(
        [
          "C:/Windows/Fonts/georgiab.ttf",
          "C:/Windows/Fonts/arialbd.ttf",
          "C:/Windows/Fonts/segoeuib.ttf",
        ]
      )
    else:
      candidates.extend(
        [
          "C:/Windows/Fonts/georgia.ttf",
          "C:/Windows/Fonts/arial.ttf",
          "C:/Windows/Fonts/segoeui.ttf",
        ]
      )

    for path in candidates:
      try:
        return ImageFont.truetype(path, size=size)
      except OSError:
        continue

    return ImageFont.load_default()


def vertical_gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    width, height = size
    image = Image.new("RGBA", size)
    draw = ImageDraw.Draw(image)
    top_rgb = ImageColor.getrgb(top)
    bottom_rgb = ImageColor.getrgb(bottom)

    for y in range(height):
      ratio = y / max(1, height - 1)
      color = tuple(int(top_rgb[i] * (1 - ratio) + bottom_rgb[i] * ratio) for i in range(3))
      draw.line((0, y, width, y), fill=color)

    return image


def rounded_panel(size: tuple[int, int], radius: int, fill: tuple[int, int, int, int]) -> Image.Image:
    panel = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(panel)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=fill)
    return panel


def draw_icon(size: int, output_name: str) -> None:
    image = vertical_gradient((size, size), "#17313B", "#27535E")
    draw = ImageDraw.Draw(image, "RGBA")

    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow, "RGBA")
    glow_draw.ellipse((int(size * 0.08), int(size * 0.08), int(size * 0.42), int(size * 0.42)), fill=(243, 190, 99, 44))
    glow_draw.ellipse((int(size * 0.64), int(size * 0.58), int(size * 0.94), int(size * 0.88)), fill=(15, 118, 110, 40))
    image.alpha_composite(glow)

    card_margin = int(size * 0.1)
    card = rounded_panel((size - card_margin * 2, size - card_margin * 2), int(size * 0.18), (26, 58, 66, 236))
    image.alpha_composite(card, (card_margin, card_margin))

    accent_box = (int(size * 0.18), int(size * 0.18), int(size * 0.82), int(size * 0.82))
    draw.rounded_rectangle(accent_box, radius=int(size * 0.12), outline=(246, 161, 93, 230), width=max(4, size // 48))

    n_font = load_font(int(size * 0.32), bold=True)
    small_font = load_font(int(size * 0.12), bold=True)
    draw.text((size * 0.24, size * 0.29), "H", font=n_font, fill="#F4EFE7")
    draw.text((size * 0.52, size * 0.29), "N", font=n_font, fill="#F4EFE7")
    draw.text((size * 0.66, size * 0.66), "+", font=small_font, fill="#F6A15D")

    image.save(ROOT / output_name)


def draw_social_preview() -> None:
    width, height = 1200, 630
    image = vertical_gradient((width, height), "#17313B", "#27535E")
    draw = ImageDraw.Draw(image, "RGBA")

    draw.ellipse((-30, -20, 220, 230), fill=(243, 190, 99, 46))
    draw.ellipse((950, 20, 1180, 250), fill=(15, 118, 110, 42))
    draw.ellipse((860, 420, 1160, 720), fill=(181, 82, 103, 38))

    panel = rounded_panel((1048, 486), 36, (26, 58, 66, 235))
    image.alpha_composite(panel, (76, 72))

    accent = vertical_gradient((96, 96), "#F1744D", "#F3BE63")
    mask = Image.new("L", (96, 96), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 96, 96), radius=28, fill=255)
    image.paste(accent, (118, 116), mask)

    title_font = load_font(62, bold=True)
    subtitle_font = load_font(27, bold=False)
    headline_font = load_font(72, bold=True)
    chip_font = load_font(24, bold=True)

    draw.text((286, 154), "Huong Nghiep Song An", font=title_font, fill="#F4EFE7")
    draw.text((286, 222), "Webapp trac nghiem huong nghiep dung truc tiep tren web", font=subtitle_font, fill="#F3E6D8")
    draw.text((118, 308), "6 bo trac nghiem", font=headline_font, fill="#FFF8EF")
    draw.text((118, 374), "Holland, Grit, MIPQ va CED cho nhieu nhom nguoi dung", font=subtitle_font, fill="#E6D9CB")

    chips = [
      ((118, 432, 372, 510), "269 cau hoi da nhap"),
      ((390, 432, 638, 510), "Luu tien do cuc bo"),
      ((656, 432, 956, 510), "Cai nhu PWA tren dien thoai"),
    ]
    for box, label in chips:
      draw.rounded_rectangle(box, radius=22, fill=(255, 248, 239, 30))
      draw.text((box[0] + 26, box[1] + 25), label, font=chip_font, fill="#FFF7F1")

    image.save(ROOT / "social-preview.png")


def main() -> None:
    draw_icon(512, "icon-512.png")
    draw_icon(192, "icon-192.png")
    draw_icon(180, "apple-touch-icon.png")
    draw_social_preview()
    print(f"Generated launch assets for {PUBLIC_BASE_URL}")


if __name__ == "__main__":
    main()
