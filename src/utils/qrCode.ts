import { Color } from '@resources/colors';

export const QR_IMAGE_SIZE = 150;
export const GRID_SPACING = 20;
export const COLUMNS_COUNT = 4;
export const LABEL_SIZE = 35;
export const CANVAS_PADDING = 20;

export interface GridMetrics {
  rowsCount: number;
  cellStep: number;
  canvasWidth: number;
  canvasHeight: number;
}

export function getQRCodeCanvases(container: HTMLDivElement): HTMLCanvasElement[] {
  return Array.from(container.querySelectorAll<HTMLCanvasElement>('canvas'));
}

export function calculateGridMetrics(itemCount: number): GridMetrics {
  const rows = Math.ceil(itemCount / COLUMNS_COUNT);
  const step = QR_IMAGE_SIZE + GRID_SPACING;
  return {
    rowsCount: rows,
    cellStep: step,
    canvasWidth: COLUMNS_COUNT * QR_IMAGE_SIZE + (COLUMNS_COUNT - 1) * GRID_SPACING + CANVAS_PADDING * 2,
    canvasHeight: rows * QR_IMAGE_SIZE + (rows - 1) * GRID_SPACING + CANVAS_PADDING * 2,
  };
}

export function createOutputCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function initCanvasContext(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = Color.WHITE;
  ctx.fillRect(0, 0, width, height);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 20px sans-serif';
}

export function drawQR(ctx: CanvasRenderingContext2D, qrCanvas: HTMLCanvasElement, tableNo: number, x: number, y: number) {
  ctx.drawImage(qrCanvas, x, y, QR_IMAGE_SIZE, QR_IMAGE_SIZE);

  const labelX = x + QR_IMAGE_SIZE - LABEL_SIZE;
  const labelY = y + QR_IMAGE_SIZE - LABEL_SIZE;
  ctx.fillStyle = Color.KIO_ORANGE;
  ctx.fillRect(labelX, labelY, LABEL_SIZE, LABEL_SIZE);

  ctx.fillStyle = Color.WHITE;
  ctx.fillText(`${tableNo}`, labelX + LABEL_SIZE / 2, labelY + LABEL_SIZE / 2);
}

export function drawQRTiles(ctx: CanvasRenderingContext2D, qrCanvases: HTMLCanvasElement[], metrics: GridMetrics) {
  qrCanvases.forEach((qrCanvas, idx) => {
    const col = idx % COLUMNS_COUNT;
    const row = Math.floor(idx / COLUMNS_COUNT);
    const x = col * metrics.cellStep + CANVAS_PADDING;
    const y = row * metrics.cellStep + CANVAS_PADDING;
    drawQR(ctx, qrCanvas, idx + 1, x, y);
  });
}

export function triggerDownload(canvas: HTMLCanvasElement, fileName: string) {
  canvas.toBlob((blob) => {
    if (!blob) return alert('이미지 생성 실패');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}
