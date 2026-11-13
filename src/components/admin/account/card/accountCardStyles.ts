import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const DIMMED_OPACITY = 0.5;
const FULL_OPACITY = 1;

const getCardOpacity = (dimmed: boolean) =>
  match(dimmed)
    .with(true, () => DIMMED_OPACITY)
    .otherwise(() => FULL_OPACITY);

const getBadgeColors = (active: boolean) =>
  match(active)
    .with(true, () => ({ background: Color.GREEN_FAINT, text: Color.GREEN, dot: Color.GREEN }))
    .otherwise(() => ({ background: '#f0f5f8', text: '#697278', dot: '#b8c0c5' }));

export const Card = styled.section<{ dimmed?: boolean }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 153px;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  opacity: ${({ dimmed }) => getCardOpacity(Boolean(dimmed))};
  ${colFlex({ justify: 'space-between' })}
`;

export const Header = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

export const Title = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

export const Name = styled.h2`
  margin: 0;
  white-space: nowrap;
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

export const Badge = styled.span<{ active: boolean }>`
  padding: 3px 10px 3px 9px;
  gap: 5px;
  border-radius: 12px;
  background: ${({ active }) => getBadgeColors(active).background};
  color: ${({ active }) => getBadgeColors(active).text};
  font-size: 11px;
  font-weight: 700;

  &::before {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ active }) => getBadgeColors(active).dot};
    content: '';
  }
  ${rowFlex({ align: 'center' })}
`;

export const Info = styled.div`
  gap: 2px;
  ${colFlex({ align: 'start' })}
`;

export const InfoLabel = styled.span`
  color: #697278;
  font-size: 13px;
`;

export const InfoValue = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;
