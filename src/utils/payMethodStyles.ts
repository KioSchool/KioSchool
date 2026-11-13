import { match } from 'ts-pattern';
import { Color } from '@resources/colors';

export const getPayCardBorderColor = (selected: boolean, color: string) =>
  match(selected)
    .with(true, () => color)
    .otherwise(() => Color.BORDER_GREY);

// 테두리 굵기를 바꾸면 카드 크기가 변해 아래가 밀리므로, 고른 카드의 1px은 안쪽 그림자로 더한다
export const getPayCardShadow = (selected: boolean, color: string) =>
  match(selected)
    .with(true, () => `inset 0 0 0 1px ${color}`)
    .otherwise(() => 'none');

export const getPayCardBackground = (selected: boolean, background: string) =>
  match(selected)
    .with(true, () => background)
    .otherwise(() => Color.WHITE);

// 흰 바탕 로고(토스)는 테두리가 없으면 카드 바탕과 구분되지 않는다
export const getLogoBorder = (bordered: boolean) =>
  match(bordered)
    .with(true, () => `1px solid ${Color.BORDER_GREY}`)
    .otherwise(() => 'none');
