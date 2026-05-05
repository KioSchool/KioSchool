export function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export function formatCurrency(n: number): string {
  return `${formatNumber(n)}원`;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatKoreanDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;
}

export function formatKoreanDateTime(iso: string): string {
  const d = new Date(iso);
  return `${formatKoreanDate(iso)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
