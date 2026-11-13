import { match } from 'ts-pattern';
import { Color } from '@resources/colors';

export const getPayCardBorder = (selected: boolean, color: string) =>
  match(selected)
    .with(true, () => `2px solid ${color}`)
    .otherwise(() => `1px solid ${Color.BORDER_GREY}`);

export const getPayCardBackground = (selected: boolean, background: string) =>
  match(selected)
    .with(true, () => background)
    .otherwise(() => Color.WHITE);

// 흰 바탕 로고(토스)는 테두리가 없으면 카드 바탕과 구분되지 않는다
export const getLogoBorder = (bordered: boolean) =>
  match(bordered)
    .with(true, () => `1px solid ${Color.BORDER_GREY}`)
    .otherwise(() => 'none');
