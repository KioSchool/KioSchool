import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import { navBarLabelStyle } from '@styles/navBarStyles';
import { rowFlex } from '@styles/flexStyles';
import { RiMenuFill } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import SideNav from './SideNav';
import { useAtom } from 'jotai';
import { adminSideNavIsOpenAtom } from 'src/jotai/admin/atoms';
import { URLS } from '@constants/urls';
import { USER_ROUTES, ADMIN_ROUTES } from '@constants/routes';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1005;
  width: 100%;
  flex-wrap: wrap;
  top: 0;
  position: fixed;
  padding: 20px 40px;
  box-sizing: border-box;
  background: ${(props) => (props.useBackground ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  border-bottom: 1px solid #e8eef2;
  user-select: none;
  ${rowFlex({ justify: 'center' })}
`;

const LeftSection = styled.div`
  gap: 38px;
  margin-right: auto;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LogoLink = styled(Link)`
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LogoImage = styled.img`
  width: 43px;
  height: 21px;
`;

const HamburgerButton = styled(RiMenuFill)`
  ${expandButtonStyle}
`;

const NavLinkContainer = styled.div`
  flex-wrap: wrap;
  gap: 40px;
  ${rowFlex()}
`;

export const NavLinkItem = styled(Link)`
  ${navBarLabelStyle}
`;

const NavUrl = styled.a`
  ${navBarLabelStyle}
`;

interface NavBarProps {
  useBackground?: boolean;
}

function NavBar({ useBackground = false }: NavBarProps) {
  const location = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useAtom(adminSideNavIsOpenAtom);

  const isShowHamburger = location.pathname.startsWith('/admin/workspace/');

  const handleHamburgerClick = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  return (
    <>
      <NavContainer useBackground={useBackground} className={'nav-container'}>
        <LeftSection>
          {isShowHamburger && <HamburgerButton className={'hamburger-button'} onClick={handleHamburgerClick} />}
          <LogoLink to={USER_ROUTES.HOME}>
            <LogoImage src={kioLogo} alt="키오스쿨" />
          </LogoLink>
        </LeftSection>

        <NavLinkContainer className={'nav-link-container'}>
          <NavLinkItem to={USER_ROUTES.INFO} className={'nav-link-item'}>
            키오스쿨 소개
          </NavLinkItem>
          <NavUrl href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer" className={'nav-link-item'}>
            FAQ
          </NavUrl>
          <AuthenticationButton />
          <NavLinkItem to={ADMIN_ROUTES.MY_INFO} className={'nav-link-item'}>
            마이페이지
          </NavLinkItem>
        </NavLinkContainer>
      </NavContainer>
      {isShowHamburger && <SideNav isOpen={isSideNavOpen} />}
    </>
  );
}

export default NavBar;
