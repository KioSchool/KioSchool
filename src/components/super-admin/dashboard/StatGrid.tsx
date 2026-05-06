import styled from '@emotion/styled';
import { mobileMediaQuery } from '@styles/globalStyles';

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;

  ${mobileMediaQuery} {
    gap: 8px;
  }
`;

export default StatGrid;
