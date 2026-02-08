import styled from '@emotion/styled';
import { Color } from '@resources/colors';

export const EmptyText = styled.div`
  line-height: 24px;
  color: #939393;
  font-size: 12px;
`;

export const DashboardCardDivider = styled.div`
  border-top: 1px solid #e8eef2;
  width: 100%;
`;

export const ActionButton = styled.button`
  font-size: 10px;
  color: #464a4d;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

export const getRankBackgroundColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return '#ff9142';
    case 2:
      return '#ffc9a3';
    case 3:
      return '#fff0e5';
    default:
      return '#fff';
  }
};
