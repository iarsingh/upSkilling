#!/usr/bin/env python3
"""Render a LinkedIn cover at 1584x396.

Left ~380px stays dark: LinkedIn's profile photo overlaps that zone.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

W, H = 1584, 396
SCALE = 2
SW, SH = W * SCALE, H * SCALE
ASSETS = Path(__file__).resolve().parent
ATMOSPHERE = ASSETS / "linkedin-cover-atmosphere.jpg"
OUT_PNG = ASSETS / "linkedin-cover-1584x396.png"
OUT_UPLOAD = ASSETS / "linkedin-cover-1584x396-upload.png"
OUT_JPG = ASSETS / "linkedin-cover-1584x396.jpg"

BG = (6, 10, 16)
TEXT = (244, 248, 252)
MUTED = (168, 184, 198)
ACCENT = (45, 212, 191)
CHIP_BG = (8, 28, 30)
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"
NEUE = "/System/Library/Fonts/HelveticaNeue.ttc"
MONO = "/System/Library/Fonts/SFNSMono.ttf"


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size * SCALE, index=index)


def glow(size: tuple[int, int], color: tuple[int, int, int], box: tuple[int, int, int, int], blur: int, alpha: float) -> Image.Image:
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(box, fill=(*color, 255))
    layer = layer.filter(ImageFilter.GaussianBlur(blur * SCALE))
    layer.putalpha(layer.split()[-1].point(lambda a: int(a * alpha)))
    return layer


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask


def atmosphere_band() -> Image.Image:
    src = Image.open(ATMOSPHERE).convert("RGB")
    src_w, src_h = src.size
    target_h = int(src_w * H / W)
    # Keep the luminous mesh: crop a 4:1 band from the lower half.
    top = max(0, src_h - target_h - int(src_h * 0.08))
    if top + target_h > src_h:
        top = src_h - target_h
    crop = src.crop((0, top, src_w, top + target_h))
    band = crop.resize((SW, SH), Image.Resampling.LANCZOS)
    band = ImageEnhance.Contrast(band).enhance(1.18)
    band = ImageEnhance.Color(band).enhance(1.12)
    band = ImageEnhance.Brightness(band).enhance(0.92)
    return band.convert("RGBA")


def left_scrim() -> Image.Image:
    layer = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    pixels = layer.load()
    fade_end = 980 * SCALE
    for x in range(fade_end):
        if x < 380 * SCALE:
            a = 210
        else:
            t = (x - 380 * SCALE) / (fade_end - 380 * SCALE)
            a = int(210 * (1 - t) ** 1.35)
        for y in range(SH):
            pixels[x, y] = (*BG, a)
    return layer


def grain() -> Image.Image:
    noise = Image.effect_noise((SW, SH), 22).convert("L")
    rgba = Image.merge(
        "RGBA",
        (
            noise,
            noise,
            noise,
            noise.point(lambda v: 16 if v > 128 else 8),
        ),
    )
    return rgba


def text_glow(canvas: Image.Image, xy: tuple[int, int], text: str, fnt: ImageFont.FreeTypeFont, fill: tuple[int, int, int], blur: int = 12) -> None:
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).text(xy, text, font=fnt, fill=(*fill, 255))
    layer = layer.filter(ImageFilter.GaussianBlur(blur * SCALE))
    layer.putalpha(layer.split()[-1].point(lambda a: int(a * 0.45)))
    canvas.alpha_composite(layer)


def chip(draw: ImageDraw.ImageDraw, x: int, y: int, label: str, fnt: ImageFont.FreeTypeFont) -> int:
    bbox = fnt.getbbox(label)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, chip_h, radius = 18 * SCALE, 34 * SCALE, 17 * SCALE
    w = tw + pad_x * 2
    draw.rounded_rectangle(
        (x, y, x + w, y + chip_h),
        radius=radius,
        fill=(*CHIP_BG, 230),
        outline=ACCENT,
        width=2 * SCALE,
    )
    tx = x + (w - tw) // 2
    ty = y + (chip_h - th) // 2 - bbox[1]
    draw.text((tx, ty), label, font=fnt, fill=ACCENT)
    return w


def main() -> None:
    canvas = atmosphere_band()
    canvas.alpha_composite(glow((SW, SH), ACCENT, (-80 * SCALE, -220 * SCALE, 520 * SCALE, 360 * SCALE), 110, 0.16))
    canvas.alpha_composite(glow((SW, SH), (56, 189, 248), (980 * SCALE, -80 * SCALE, 1760 * SCALE, 280 * SCALE), 90, 0.18))
    canvas.alpha_composite(left_scrim())
    canvas.alpha_composite(grain())

    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rectangle((0, 0, SW, 3 * SCALE), fill=(*ACCENT, 220))

    kicker_font = font(MONO, 13)
    title_font = font(AVENIR, 46, 8)  # Heavy
    subtitle_font = font(AVENIR, 20, 5)  # Medium
    chip_font = font(AVENIR, 15, 2)  # Demi Bold
    mark_font = font(AVENIR, 16, 8)
    mx0, my0, mx1, my1 = 36 * SCALE, 26 * SCALE, 86 * SCALE, 76 * SCALE
    draw.rounded_rectangle((mx0, my0, mx1, my1), radius=14 * SCALE, fill=(8, 18, 22, 200), outline=(*ACCENT, 220), width=2 * SCALE)
    draw.text((mx0 + 11 * SCALE, my0 + 12 * SCALE), "AR", font=mark_font, fill=ACCENT)

    x0 = 418 * SCALE
    kicker = "PLATFORM   ·   DEVSECOPS   ·   FDE"
    draw.text((x0, 58 * SCALE), kicker, font=kicker_font, fill=ACCENT)

    title = "Platform & DevSecOps Engineer"
    text_glow(canvas, (x0, 86 * SCALE), title, title_font, ACCENT, blur=10)
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.text((x0, 86 * SCALE), title, font=title_font, fill=TEXT)
    draw.text(
        (x0, 152 * SCALE),
        "Kubernetes   ·   Terraform   ·   GitOps   ·   MLOps",
        font=subtitle_font,
        fill=MUTED,
    )
    draw.rectangle((x0, 196 * SCALE, x0 + 56 * SCALE, 200 * SCALE), fill=(*ACCENT, 230))

    chips = ["GCP", "Kubernetes", "Terraform", "GitOps", "Python"]
    cx, cy = x0, 222 * SCALE
    for label in chips:
        cx += chip(draw, cx, cy, label, chip_font) + 10 * SCALE

    caption = "GitOps   ·   GKE   ·   Terraform   ·   Observe"
    cap_bbox = kicker_font.getbbox(caption)
    cap_w = cap_bbox[2] - cap_bbox[0]
    draw.text((SW - 48 * SCALE - cap_w, SH - 42 * SCALE), caption, font=kicker_font, fill=(*MUTED, 210))

    rgb = canvas.convert("RGB").resize((W, H), Image.Resampling.LANCZOS)
    rgb.save(OUT_PNG, "PNG", optimize=True)
    rgb.save(OUT_UPLOAD, "PNG", optimize=True)
    rgb.save(OUT_JPG, "JPEG", quality=93, optimize=True)
    print(f"wrote {OUT_PNG} {rgb.size}")
    print(f"wrote {OUT_UPLOAD}")
    print(f"wrote {OUT_JPG}")


if __name__ == "__main__":
    main()
