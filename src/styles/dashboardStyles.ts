import styled from '@emotion/styled';

export const EmptyText = styled.div`
  line-height: 24px;
  color: #939393;
  font-size: 12px;
`;

export const DashboardCardDivider = styled.div`
  border-top: 1px solid #e8eef2;
  width: 100%;
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
