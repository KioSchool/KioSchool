import styled from '@emotion/styled';
import { RiMenuFill } from '@remixicon/react';
import { useSetAtom } from 'jotai';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import kioLogo from '@resources/image/kioLogo.png';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { rowFlex } from '@styles/flexStyles';
import { navBarLabelStyle } from '@styles/navBarStyles';

const NAV_LINKS = ['키오스쿨 소개', '문의하기', '로그아웃', '마이페이지'];

const NavContainer = styled.div`
  z-index: 1005;
  width: 100%;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  position: fixed;
  padding: 20px 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${Color.BORDER_GREY};
  user-select: none;
  ${rowFlex({ justify: 'center' })};
`;

const LeftSection = styled.div`
  gap: 38px;
  margin-right: auto;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const HamburgerButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  ${expandButtonStyle({})}
`;

const LogoImage = styled.img`
  width: 43px;
  height: 21px;
`;

const NavLinkContainer = styled.div`
  flex-wrap: wrap;
  gap: 40px;
  ${rowFlex()};
`;

const NavLinkItem = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  ${navBarLabelStyle}
`;

function DemoAdminNavBar() {
  const dispatch = useSetAtom(demoStateAtom);

  return (
    <NavContainer>
      <LeftSection>
        <HamburgerButton type="button" aria-label="메뉴 열기" onClick={() => dispatch({ type: 'SIDE_NAV_TOGGLE' })}>
          <RiMenuFill />
        </HamburgerButton>
        <LogoImage src={kioLogo} alt="키오스쿨" />
      </LeftSection>
      <NavLinkContainer>
        {NAV_LINKS.map((label) => (
          <NavLinkItem key={label} type="button" onClick={() => dispatch({ type: 'UNSUPPORTED' })}>
            {label}
          </NavLinkItem>
        ))}
      </NavLinkContainer>
    </NavContainer>
  );
}

export default DemoAdminNavBar;
