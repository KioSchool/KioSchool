import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { DemoAdminPage } from '@constants/data/demo/demoSteps';
import { DEFAULT_LAYOUT_WIDTH, SIDE_NAV_WIDTH } from '@constants/layout';
import useDemoLinkBlock from '@hooks/user/useDemoLinkBlock';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DemoAdminNavBar from './DemoAdminNavBar';
import DemoAdminSideNav from './DemoAdminSideNav';
import DemoAdminTitle from './DemoAdminTitle';
import DemoAdminOrdersPage from './orders/DemoAdminOrdersPage';
import DemoOrderDetailModal from './orders/DemoOrderDetailModal';
import DemoAdminStatsPage from './stats/DemoAdminStatsPage';
import DemoAdminTablePage from './table/DemoAdminTablePage';

const PAGE_TITLE: Record<DemoAdminPage, string> = {
  table: '실시간 테이블 관리',
  orders: '실시간 주문 조회',
  stats: '주문 통계',
};

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${Color.WHITE};
  color: ${Color.TEXT_DEFAULT};
`;

const sideNavOpenStyle = css`
  margin-left: ${SIDE_NAV_WIDTH}px;
  width: calc(100% - ${SIDE_NAV_WIDTH}px);
`;

const Main = styled.div<{ isSideNavOpen: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  transition: width 0.3s ease, margin-left 0.3s ease;
  ${colFlex({ align: 'center' })}
  ${({ isSideNavOpen }) => isSideNavOpen && sideNavOpenStyle}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubContainer = styled.div`
  max-width: ${DEFAULT_LAYOUT_WIDTH}px;
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  padding: 90px 0 50px;
  ${colFlex({ justify: 'flex-start', align: 'center' })}
`;

function DemoAdminScreen() {
  const { adminPage, isSideNavOpen } = useAtomValue(demoStateAtom);
  const handleLinkClick = useDemoLinkBlock();

  return (
    <Screen data-admin-page={adminPage} onClickCapture={handleLinkClick}>
      <DemoAdminNavBar />
      <DemoAdminSideNav />
      <Main isSideNavOpen={isSideNavOpen}>
        <SubContainer>
          <DemoAdminTitle label={PAGE_TITLE[adminPage]} />
          {match(adminPage)
            .with('table', () => <DemoAdminTablePage />)
            .with('orders', () => <DemoAdminOrdersPage />)
            .with('stats', () => <DemoAdminStatsPage />)
            .exhaustive()}
        </SubContainer>
      </Main>
      <DemoOrderDetailModal />
    </Screen>
  );
}

export default DemoAdminScreen;
