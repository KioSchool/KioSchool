const MANWON_PER_CHEONMAN = 1000;
const MANWON_PER_EOK = 10000;

export function formatKoreanRevenue(manwon: number): string {
  const total = Math.max(0, Math.round(manwon / MANWON_PER_CHEONMAN) * MANWON_PER_CHEONMAN);
  if (total === 0) return '0';
  const eok = Math.floor(total / MANWON_PER_EOK);
  const cheonman = Math.floor((total % MANWON_PER_EOK) / MANWON_PER_CHEONMAN);
  if (eok === 0) return `${cheonman}천만`;
  if (cheonman === 0) return `${eok}억`;
  return `${eok}억 ${cheonman}천만`;
}
