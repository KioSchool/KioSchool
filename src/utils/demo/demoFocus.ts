import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';

// 손님 테이블(7번)에만 누를 곳 이름을 단다. part를 주면 'table-7-action'처럼 그 안의 부분 이름
export function getDemoTableFocus(tableNumber: number, part?: string) {
  if (tableNumber !== DEMO_TABLE_NUMBER) return undefined;
  if (part === undefined) return `table-${DEMO_TABLE_NUMBER}`;
  return `table-${DEMO_TABLE_NUMBER}-${part}`;
}
