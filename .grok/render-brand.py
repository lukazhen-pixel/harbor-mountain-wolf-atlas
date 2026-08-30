#!/usr/bin/env python3
"""Code-drawn brand art for THE COLUMN — used because Imagine/xAI image gen is unavailable."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

WARM_BLACK = np.array([12, 11, 9], dtype=np.float32)
BONE = np.array([232, 224, 212], dtype=np.float32)
IRON_RUST = np.array([196, 92, 62], dtype=np.float32)
DUST = np.array([138, 128, 116], dtype=np.float32)
IRON = np.array([22, 20, 16], dtype=np.float32)

SERIF_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF_REG = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
OUT = Path("/workspace/.grok")


def fbm(h: int, w: int, rng: np.random.Generator, octaves: int = 5) -> np.ndarray:
    acc = np.zeros((h, w), dtype=np.float32)
    amp = 1.0
    total = 0.0
    for i in range(octaves):
        scale = 2 ** (octaves - i)
        sh = max(2, h // scale)
        sw = max(2, w // scale)
        small = rng.random((sh, sw), dtype=np.float32)
        img = Image.fromarray((small * 255).astype(np.uint8), "L").resize((w, h), Image.Resampling.BICUBIC)
        acc += np.asarray(img, dtype=np.float32) / 255.0 * amp
        total += amp
        amp *= 0.55
    return acc / total


def lerp(a, b, t):
    return a + (b - a) * t


def draw_column(rgb: np.ndarray, cx: float, top: float, bottom: float, radius: float, rng: np.random.Generator) -> None:
    """Paint a fluted iron column with rust and a capital/base into rgb (H,W,3) float 0-255."""
    h, w, _ = rgb.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)

    # Shaft occupies most of the height; capital and base eat the ends.
    capital_h = (bottom - top) * 0.09
    base_h = (bottom - top) * 0.10
    shaft_top = top + capital_h
    shaft_bot = bottom - base_h

    nx = (xx - cx) / radius
    in_cyl = np.abs(nx) <= 1.0
    # Cylinder lambert + 16 Doric flutes
    # Avoid arcsin domain issues
    nx_clamped = np.clip(nx, -1.0, 1.0)
    theta = np.arcsin(nx_clamped)
    flute = 0.5 + 0.5 * np.cos(theta * 16.0)
    lambert = np.clip(0.22 + 0.95 * np.sqrt(np.clip(1.0 - nx_clamped**2, 0, 1)), 0, 1.4)
    # Key light from upper-left
    light = lambert * (1.0 - 0.52 * flute)
    # Rim
    rim = np.clip(np.abs(nx_clamped) - 0.72, 0, 1) ** 2 * 0.55
    light = light + rim

    rust_n = fbm(h, w, rng, octaves=6)
    # Vertical streaks
    streaks = fbm(h, max(8, w // 6), rng, octaves=4)
    streaks = np.asarray(
        Image.fromarray((streaks * 255).astype(np.uint8), "L").resize((w, h), Image.Resampling.BICUBIC),
        dtype=np.float32,
    ) / 255.0
    rust_mask = np.clip((rust_n * 0.72 + streaks * 0.62) ** 1.35 * 1.55 - 0.22, 0, 1)
    rust_mask *= (0.45 + 0.55 * (yy / h))  # more rust toward the base

    metal = lerp(IRON, DUST, np.clip(light * 0.62, 0, 1)[..., None])
    metal = lerp(metal, BONE * 0.42, np.clip((light - 0.78) * 1.9, 0, 1)[..., None])
    rusted = lerp(metal, IRON_RUST, rust_mask[..., None] * 0.95)
    rusted = lerp(rusted, IRON_RUST * 0.55, (rust_mask * (1.0 - light) * 0.65)[..., None])

    shaft_band = in_cyl & (yy >= shaft_top) & (yy <= shaft_bot)
    # Soft edge
    edge = np.clip((1.0 - np.abs(nx)) * radius * 0.35, 0, 1)
    alpha = np.where(shaft_band, np.clip(edge * 8.0, 0, 1), 0.0).astype(np.float32)

    rgb[:] = lerp(rgb, rusted, alpha[..., None])

    # Capital (abacus + echinus)
    cap_half = radius * 1.38
    echinus_half = radius * 1.18
    cap_band = (yy >= top) & (yy < shaft_top) & (np.abs(xx - cx) <= cap_half)
    # Taper: abacus full width at top, echinus narrower near shaft
    t = np.clip((yy - top) / max(1.0, capital_h), 0, 1)
    cap_r = lerp(cap_half, echinus_half, t)
    cap_band = (yy >= top) & (yy < shaft_top) & (np.abs(xx - cx) <= cap_r)
    cap_light = 0.35 + 0.5 * (1.0 - np.abs((xx - cx) / np.maximum(cap_r, 1)))
    cap_col = lerp(IRON, IRON_RUST, 0.35 + 0.4 * rust_n[..., None])
    cap_col = lerp(cap_col, DUST, (cap_light * 0.45)[..., None])
    cap_col = lerp(cap_col, BONE * 0.5, np.clip((1.0 - t) * 0.35, 0, 1)[..., None])
    rgb[:] = lerp(rgb, cap_col, cap_band.astype(np.float32)[..., None] * 0.98)

    # Thin bone highlight on the abacus lip
    lip = (yy >= top) & (yy < top + max(2.0, capital_h * 0.12)) & (np.abs(xx - cx) <= cap_half)
    rgb[:] = lerp(rgb, BONE, lip.astype(np.float32)[..., None] * 0.55)

    # Base (plinth)
    base_half = radius * 1.42
    base_band = (yy > shaft_bot) & (yy <= bottom) & (np.abs(xx - cx) <= base_half)
    bt = np.clip((yy - shaft_bot) / max(1.0, base_h), 0, 1)
    base_r = lerp(radius * 1.12, base_half, np.clip(bt * 1.4, 0, 1))
    base_band = (yy > shaft_bot) & (yy <= bottom) & (np.abs(xx - cx) <= base_r)
    base_col = lerp(IRON, IRON_RUST, 0.5 + 0.3 * rust_n[..., None])
    base_col = lerp(base_col, IRON * 0.4, (bt * 0.4)[..., None])
    rgb[:] = lerp(rgb, base_col, base_band.astype(np.float32)[..., None] * 0.98)


def atmosphere(h: int, w: int, rng: np.random.Generator, shaft_x: float) -> np.ndarray:
    rgb = np.zeros((h, w, 3), dtype=np.float32)
    rgb[:] = WARM_BLACK
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)

    # Soft iron-surface glow in the middle
    cx, cy = w * 0.5, h * 0.48
    dist = np.sqrt(((xx - cx) / (w * 0.55)) ** 2 + ((yy - cy) / (h * 0.7)) ** 2)
    glow = np.clip(1.0 - dist, 0, 1) ** 1.8
    rgb[:] = lerp(rgb, IRON, glow[..., None] * 0.85)

    # Shaft of bone light from above
    dx = (xx - shaft_x) / (w * 0.11)
    shaft = np.exp(-dx * dx * 2.8) * np.clip(1.0 - yy / h, 0.15, 1.0) ** 0.65
    shaft *= 0.22
    rgb[:] = lerp(rgb, BONE, shaft[..., None])
    rgb[:] = lerp(rgb, DUST, (shaft * 0.35)[..., None])

    # Dust motes in the shaft
    motes = rng.random((h, w)).astype(np.float32)
    mote_mask = (motes > 0.9965) & (shaft > 0.04)
    rgb[mote_mask] = lerp(rgb[mote_mask], BONE, 0.7)

    # Fine grain
    grain = (rng.random((h, w, 1)).astype(np.float32) - 0.5) * 7.0
    rgb += grain

    # Vignette
    vx = (xx / w - 0.5) * 2.0
    vy = (yy / h - 0.5) * 2.0
    vig = np.clip(1.0 - (vx * vx * 0.38 + vy * vy * 0.55), 0.25, 1.0)
    rgb *= vig[..., None]
    return np.clip(rgb, 0, 255)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def text_size(font_obj: ImageFont.FreeTypeFont, text: str, tracking: float) -> tuple[float, float]:
    widths = [font_obj.getlength(c) for c in text]
    w = sum(widths) + tracking * max(0, len(text) - 1)
    bbox = font_obj.getbbox(text)
    h = bbox[3] - bbox[1]
    return w, h


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    text: str,
    cx: float,
    baseline_y: float,
    font_obj: ImageFont.FreeTypeFont,
    fill,
    tracking: float,
    shadow: tuple | None = None,
) -> tuple[float, float, float, float]:
    """Draw centered tracked text. Returns bounding box (l,t,r,b)."""
    widths = [font_obj.getlength(c) for c in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = cx - total / 2
    bbox = font_obj.getbbox(text)
    top = baseline_y + bbox[1]
    bottom = baseline_y + bbox[3]
    for c, cw in zip(text, widths):
        if shadow:
            draw.text((x + shadow[0], baseline_y + shadow[1]), c, font=font_obj, fill=shadow[2])
        draw.text((x, baseline_y), c, font=font_obj, fill=fill)
        x += cw + tracking
    return (cx - total / 2, top, cx + total / 2, bottom)


def draw_tracked_left(
    draw: ImageDraw.ImageDraw,
    text: str,
    x0: float,
    baseline_y: float,
    font_obj: ImageFont.FreeTypeFont,
    fill,
    tracking: float,
    shadow: tuple | None = None,
) -> tuple[float, float, float, float]:
    widths = [font_obj.getlength(c) for c in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = x0
    bbox = font_obj.getbbox(text)
    top = baseline_y + bbox[1]
    bottom = baseline_y + bbox[3]
    for c, cw in zip(text, widths):
        if shadow:
            draw.text((x + shadow[0], baseline_y + shadow[1]), c, font=font_obj, fill=shadow[2])
        draw.text((x, baseline_y), c, font=font_obj, fill=fill)
        x += cw + tracking
    return (x0, top, x0 + total, bottom)


def render_og() -> Image.Image:
    w, h = 1920, 1080
    rng = np.random.default_rng(42)
    rgb = atmosphere(h, w, rng, shaft_x=w * 0.5)
    draw_column(rgb, cx=w * 0.5, top=h * -0.02, bottom=h * 1.04, radius=w * 0.145, rng=rng)

    # Soft dark scrim behind the lockup so bone lettering reads
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    scrim = np.exp(-((yy - h * 0.50) / (h * 0.22)) ** 2) * np.exp(-((xx - w * 0.5) / (w * 0.28)) ** 2)
    rgb[:] = lerp(rgb, WARM_BLACK, (scrim * 0.55)[..., None])

    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    # Slight blur on the metal, then we'll draw sharp type on top
    img = img.filter(ImageFilter.GaussianBlur(radius=0.6))
    draw = ImageDraw.Draw(img)

    bone = (232, 224, 212, 255)
    rust = (196, 92, 62, 255)
    shadow = (8, 6, 4, 220)

    f_the = font(SERIF_BOLD, 92)
    f_col = font(SERIF_BOLD, 228)

    # Measure COLUMN first so THE can match its width via tracking
    col_w, _ = text_size(f_col, "COLUMN", tracking=18)
    the_base, _ = text_size(f_the, "THE", tracking=0)
    the_track = (col_w - the_base) / 2  # 3 letters → 2 gaps

    # Center the two-line lockup in the frame. Middle-half of height is 270–810.
    # THE baseline ~ 455, COLUMN baseline ~ 640
    cx = w / 2
    draw_tracked(draw, "THE", cx, 470, f_the, bone, the_track, shadow=(3, 4, shadow))
    # Rust hairline between the lines, spanning ~40% of COLUMN width
    rule_w = col_w * 0.42
    rule_y = 518
    draw.rectangle([cx - rule_w / 2, rule_y, cx + rule_w / 2, rule_y + 3], fill=rust)
    draw_tracked(draw, "COLUMN", cx, 655, f_col, bone, 18, shadow=(4, 6, shadow))

    # Fine grain overlay after type so it feels printed
    arr = np.asarray(img).astype(np.float32)
    grain = (rng.random((h, w, 1)).astype(np.float32) - 0.5) * 5.0
    arr = np.clip(arr + grain, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGB")


def render_banner() -> Image.Image:
    w, h = 2400, 528  # exact 50:11
    rng = np.random.default_rng(7)
    rgb = atmosphere(h, w, rng, shaft_x=w * 0.72)
    # Column lives on the right; scenery may enter the overlay strips
    draw_column(rgb, cx=w * 0.78, top=h * -0.35, bottom=h * 1.25, radius=w * 0.095, rng=rng)

    # Gentle darkening on the left for the lockup
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    left = np.clip(1.0 - xx / (w * 0.55), 0, 1) ** 1.2
    rgb[:] = lerp(rgb, WARM_BLACK, (left * 0.42)[..., None])

    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    img = img.filter(ImageFilter.GaussianBlur(radius=0.45))
    draw = ImageDraw.Draw(img)

    bone = (232, 224, 212, 255)
    rust = (196, 92, 62, 255)
    shadow = (8, 6, 4, 220)

    f_the = font(SERIF_BOLD, 52)
    f_col = font(SERIF_BOLD, 108)

    # Entire lockup sits above the midline (264) with a left/top margin
    # and an empty strip along the bottom fifth (from y=422).
    x0 = 88
    draw_tracked_left(draw, "THE", x0, 52, f_the, bone, 20, shadow=(2, 3, shadow))
    draw.rectangle([x0, 112, x0 + 200, 115], fill=rust)
    draw_tracked_left(draw, "COLUMN", x0, 128, f_col, bone, 8, shadow=(3, 4, shadow))

    arr = np.asarray(img).astype(np.float32)
    grain = (rng.random((h, w, 1)).astype(np.float32) - 0.5) * 5.0
    arr = np.clip(arr + grain, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGB")


def main() -> None:
    og = render_og()
    og.save(OUT / "card-raw.jpg", quality=95, subsampling=0)
    banner = render_banner()
    banner.save(OUT / "banner-raw.jpg", quality=95, subsampling=0)
    print("og", og.size, "banner", banner.size)


if __name__ == "__main__":
    main()
