import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { DEFAULT_LAYOUT_WIDTH, NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from '@constants/layout';

const PAGE_TOP_GAP = 32;
const PAGE_TOP_GAP_MOBILE = 20;

const Container = styled.div`
  width: 100%;
  max-width: ${DEFAULT_LAYOUT_WIDTH}px;
  gap: 24px;
  padding-top: ${NAVBAR_HEIGHT + PAGE_TOP_GAP}px;
  padding-bottom: ${PAGE_TOP_GAP}px;
  min-width: 0;
  ${colFlex()};

  ${mobileMediaQuery} {
    gap: 16px;
    padding-top: ${NAVBAR_HEIGHT_MOBILE + PAGE_TOP_GAP_MOBILE}px;
    padding-bottom: ${PAGE_TOP_GAP_MOBILE}px;
  }
`;

interface SuperAdminPageContainerProps {
  children: ReactNode;
}

function SuperAdminPageContainer({ children }: SuperAdminPageContainerProps) {
  return <Container>{children}</Container>;
}

export default SuperAdminPageContainer;
