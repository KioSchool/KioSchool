import { InsightCardResponse, MetricSummary } from '@@types/index';
import { InsightDesignTokens, RankKey } from './insightDesignTokens';
import kioLogoSrc from '@resources/image/kioLogo.png';

const SIZE = InsightDesignTokens.png.size;
const KO_FONT_STACK = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", system-ui, sans-serif';

let cachedLogo: HTMLImageElement | null = null;
let cachedLogoFailed = false;

function loadLogo(): Promise<HTMLImageElement | null> {
  if (cachedLogo) return Promise.resolve(cachedLogo);
  if (cachedLogoFailed) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      cachedLogo = img;
      resolve(img);
    };
    img.onerror = () => {
      cachedLogoFailed = true;
      resolve(null);
    };
    img.src = kioLogoSrc;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = w;
      curY += lineHeight;
    } else {
      line = next;
    }
  }
  ctx.fillText(line, x, curY);
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  grad.addColorStop(0, '#FFE7D3');
  grad.addColorStop(1, '#FFF3E7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SIZE, SIZE);
}

function pickMedalEmoji(template: InsightCardResponse['template']): string {
  if (template === 'SINGLE_TROPHY') return '🥇';
  if (template === 'MILESTONE') return '🎉';
  return '📊';
}

function drawMedal(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, emoji: string) {
  const grad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
  grad.addColorStop(0, '#ffd86b');
  grad.addColorStop(1, InsightDesignTokens.brand.dark);

  ctx.save();
  ctx.shadowColor = 'rgba(247, 132, 46, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  ctx.font = `${radius * 1.2}px ${KO_FONT_STACK}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, centerX, centerY + radius * 0.05);
  ctx.textBaseline = 'alphabetic';
}

function drawHeader(ctx: CanvasRenderingContext2D, card: InsightCardResponse, workspaceName: string) {
  ctx.textAlign = 'left';

  // 1. 주점 이름 (상단 좌측, 가장 위)
  ctx.fillStyle = InsightDesignTokens.brand.dark;
  ctx.font = `700 36px ${KO_FONT_STACK}`;
  ctx.fillText(workspaceName, 80, 100);

  // 2. FESTIVAL DAILY · 날짜 (주점 이름 아래, 차분)
  ctx.fillStyle = InsightDesignTokens.brand.dark;
  ctx.globalAlpha = 0.7;
  ctx.font = `500 26px ${KO_FONT_STACK}`;
  ctx.fillText(`FESTIVAL DAILY · ${card.referenceDate}`, 80, 144);
  ctx.globalAlpha = 1;

  // 3. 금메달 (헤드라인 왼쪽, 크게)
  const medalRadius = 70;
  const medalX = 80 + medalRadius;
  const medalY = 270;
  drawMedal(ctx, medalX, medalY, medalRadius, pickMedalEmoji(card.template));

  // 4. 헤드라인 (메달 오른쪽)
  ctx.fillStyle = InsightDesignTokens.brand.dark;
  ctx.font = `900 72px ${KO_FONT_STACK}`;
  ctx.textAlign = 'left';
  const headlineX = medalX + medalRadius + 30;
  wrapText(ctx, card.headline, headlineX, medalY + 12, SIZE - headlineX - 80, 84);
}

function drawGrid(ctx: CanvasRenderingContext2D, top: MetricSummary[]) {
  const startY = 360;
  const cellW = (SIZE - 80 * 2 - 24) / 2;
  const cellH = 290;
  const gap = 24;

  top.slice(0, 4).forEach((m, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 80 + col * (cellW + gap);
    const y = startY + row * (cellH + gap);

    const rankKey = ((idx + 1) as RankKey);
    const alpha = InsightDesignTokens.png.cellAlpha[rankKey];

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    roundRect(ctx, x, y, cellW, cellH, 16);
    ctx.fill();

    const tone = InsightDesignTokens.rank[rankKey];
    ctx.fillStyle = tone.labelText;
    ctx.font = `600 28px ${KO_FONT_STACK}`;
    ctx.textAlign = 'left';
    ctx.fillText(`#${rankKey}  ${m.label}`, x + 24, y + 60);

    ctx.fillStyle = tone.text;
    ctx.font = `800 72px ${KO_FONT_STACK}`;
    ctx.fillText(m.value, x + 24, y + 160);

    if (m.percentile != null) {
      ctx.fillStyle = tone.labelText;
      ctx.font = `500 24px ${KO_FONT_STACK}`;
      ctx.fillText(`상위 ${Math.round(100 - m.percentile)}%`, x + 24, y + 220);
    } else if (m.milestoneStep != null) {
      ctx.fillStyle = tone.labelText;
      ctx.font = `500 24px ${KO_FONT_STACK}`;
      ctx.fillText('마일스톤 돌파', x + 24, y + 220);
    }
  });
}

async function drawFooter(ctx: CanvasRenderingContext2D) {
  const logo = await loadLogo();
  const footerY = SIZE - 90;

  if (logo) {
    const logoW = 130;
    const logoH = (logo.height / logo.width) * logoW;
    const x = (SIZE - logoW) / 2;
    ctx.drawImage(logo, x, footerY - logoH / 2, logoW, logoH);
  } else {
    ctx.fillStyle = InsightDesignTokens.brand.dark;
    ctx.font = `800 40px ${KO_FONT_STACK}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KIO', SIZE / 2, footerY);
    ctx.textBaseline = 'alphabetic';
  }
}

export async function renderInsightCardToCanvas(
  card: InsightCardResponse,
  workspaceName: string,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  drawBackground(ctx);
  drawHeader(ctx, card, workspaceName);
  drawGrid(ctx, card.topMetrics);
  await drawFooter(ctx);

  return canvas;
}

export async function renderInsightCardToBlob(
  card: InsightCardResponse,
  workspaceName: string,
): Promise<Blob> {
  const canvas = await renderInsightCardToCanvas(card, workspaceName);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('canvas.toBlob returned null'));
    }, 'image/png');
  });
}

export async function renderInsightCardToDataUrl(
  card: InsightCardResponse,
  workspaceName: string,
): Promise<string> {
  const canvas = await renderInsightCardToCanvas(card, workspaceName);
  return canvas.toDataURL('image/png');
}
