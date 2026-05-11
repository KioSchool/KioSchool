import { InsightCardResponse } from '@@types/index';

const SIZE = 1200;
const KO_FONT_STACK = '-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", system-ui, sans-serif';

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function drawCommon(ctx: CanvasRenderingContext2D, brand = 'powered by KioSchool') {
  ctx.textAlign = 'center';
  ctx.font = `400 32px ${KO_FONT_STACK}`;
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText(brand, SIZE / 2, SIZE - 80);
}

function renderSingleTrophy(ctx: CanvasRenderingContext2D, card: InsightCardResponse) {
  const grad = ctx.createLinearGradient(0, 0, 0, SIZE);
  grad.addColorStop(0, '#fbbf24');
  grad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.textAlign = 'center';
  ctx.font = `700 280px ${KO_FONT_STACK}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🥇', SIZE / 2, SIZE / 2 - 40);

  ctx.font = `500 38px ${KO_FONT_STACK}`;
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('FESTIVAL DAILY', SIZE / 2, SIZE / 2 + 140);

  ctx.font = `800 84px ${KO_FONT_STACK}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(card.headline, SIZE / 2, SIZE / 2 + 240);

  if (card.payload.cohortAverageRatio != null) {
    const sign = card.payload.cohortAverageRatio > 0 ? '+' : '';
    const pct = Math.round(card.payload.cohortAverageRatio * 100);
    ctx.font = `500 38px ${KO_FONT_STACK}`;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(`코호트 평균 대비 ${sign}${pct}%`, SIZE / 2, SIZE / 2 + 320);
  }

  drawCommon(ctx);
}

function renderMilestone(ctx: CanvasRenderingContext2D, card: InsightCardResponse) {
  ctx.fillStyle = '#10b981';
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.textAlign = 'center';
  ctx.font = `700 96px ${KO_FONT_STACK}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(card.headline, SIZE / 2, SIZE / 2);

  drawCommon(ctx);
}

function renderStoryNumbers(ctx: CanvasRenderingContext2D, card: InsightCardResponse) {
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f3f4f6';
  ctx.font = `700 60px ${KO_FONT_STACK}`;
  ctx.fillText('어제 우리가 만든 숫자', 80, 180);

  ctx.fillStyle = '#9ca3af';
  ctx.font = `400 30px ${KO_FONT_STACK}`;
  ctx.fillText(card.referenceDate, 80, 230);

  const p = card.payload;
  const items: [string, string, string][] = [
    ['매출', p.totalRevenue != null ? `₩${formatNumber(p.totalRevenue)}` : '-', '#34d399'],
    ['주문', p.totalOrders != null ? `${formatNumber(p.totalOrders)}` : '-', '#60a5fa'],
    ['객단가', p.averageOrderAmount != null ? `₩${formatNumber(p.averageOrderAmount)}` : '-', '#fbbf24'],
    ['평균 체류', p.averageStayMinutes != null ? `${Math.round(p.averageStayMinutes)}분` : '-', '#a78bfa'],
  ];

  items.forEach(([label, value, color], idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 100 + col * 560;
    const y = 380 + row * 320;

    ctx.fillStyle = '#9ca3af';
    ctx.font = `400 32px ${KO_FONT_STACK}`;
    ctx.fillText(label, x, y);

    ctx.fillStyle = color;
    ctx.font = `800 96px ${KO_FONT_STACK}`;
    ctx.fillText(value, x, y + 110);
  });

  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = `400 28px ${KO_FONT_STACK}`;
  ctx.fillText('powered by KioSchool', 80, SIZE - 80);
}

export function renderInsightCardToCanvas(card: InsightCardResponse): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  if (card.template === 'SINGLE_TROPHY') renderSingleTrophy(ctx, card);
  else if (card.template === 'MILESTONE') renderMilestone(ctx, card);
  else renderStoryNumbers(ctx, card);

  return canvas;
}

export function renderInsightCardToBlob(card: InsightCardResponse): Promise<Blob> {
  const canvas = renderInsightCardToCanvas(card);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('canvas.toBlob returned null'));
    }, 'image/png');
  });
}
