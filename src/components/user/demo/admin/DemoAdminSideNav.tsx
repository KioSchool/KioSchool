import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { DemoAdminPage } from '@constants/data/demo/demoSteps';
import { adminNavData } from '@constants/data/adminNavData';
import { NAVBAR_HEIGHT, SIDE_NAV_WIDTH } from '@constants/layout';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const PAGE_BY_PATH: Record<string, DemoAdminPage> = {
  '/order/realtime': 'orders',
  '/table/realtime': 'table',
  '/order/statistics': 'stats',
};

const SideNavContainer = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: ${NAVBAR_HEIGHT}px;
  left: 0;
  height: calc(100% - ${NAVBAR_HEIGHT}px);
  width: ${SIDE_NAV_WIDTH}px;
  background: white;
  box-sizing: border-box;
  padding: 20px 10px 0 40px;
  gap: 20px;
  z-index: 1011;
  transform: translateX(${({ isOpen }) => Number(!isOpen) * -100}%);
  transition: transform 0.3s ease;
  border-right: 1px solid ${Color.BORDER_GREY};
  ${colFlex()}
`;

const NavCategory = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const CategoryTitle = styled.div`
  color: ${Color.TEXT_DEFAULT};
  font-size: 18px;
  font-weight: 700;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
`;

const activeItemStyle = css`
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -64px;
    width: ${SIDE_NAV_WIDTH}px;
    height: 100%;
    background-color: #fff0e5;
    z-index: -1;
  }
`;

const NavItem = styled.li<{ isActive: boolean }>`
  position: relative;
  list-style: none;
  margin-left: 24px;
  color: ${Color.TEXT_DEFAULT};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: currentColor;
  }

  &:hover {
    color: ${Color.KIO_ORANGE};
  }

  ${({ isActive }) => isActive && activeItemStyle}
`;

const NavButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

function DemoAdminSideNav() {
  const { isSideNavOpen, adminPage } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);

  const handleClick = (path: string) => {
    const page = PAGE_BY_PATH[path];
    if (!page) {
      dispatch({ type: 'SIDE_NAV_BLOCKED' });
      return;
    }
    dispatch({ type: 'ADMIN_PAGE', page });
  };

  return (
    <SideNavContainer isOpen={isSideNavOpen} aria-hidden={!isSideNavOpen}>
      {adminNavData.map((categoryData) => (
        <NavCategory key={categoryData.category}>
          <CategoryTitle>{categoryData.category}</CategoryTitle>
          <NavList>
            {categoryData.items.map((item) => (
              <NavItem key={item.path} isActive={PAGE_BY_PATH[item.path] === adminPage}>
                <NavButton type="button" tabIndex={Number(isSideNavOpen) - 1} onClick={() => handleClick(item.path)}>
                  {item.name}
                </NavButton>
              </NavItem>
            ))}
          </NavList>
        </NavCategory>
      ))}
    </SideNavContainer>
  );
}

export default DemoAdminSideNav;
