import { useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { RiMenuFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { navBarLabelStyle } from '@styles/navBarStyles';
import { expandButtonStyle } from '@styles/buttonStyles';
import { URLS } from '@constants/urls';
import { USER_ROUTES, ADMIN_ROUTES } from '@constants/routes';
import { sideNavIsOpenAtom } from '@jotai/atoms';
import { adminNavData } from '@constants/data/adminNavData';
import { superAdminNavData } from '@constants/data/superAdminNavData';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import MobileNav from './MobileNav';
import SideNav from './SideNav';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1005;
  width: 100%;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  position: fixed;
  padding: 20px 40px;
  box-sizing: border-box;
  background: ${(props) => (props.useBackground ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  border-bottom: 1px solid #e8eef2;
  user-select: none;
  ${rowFlex({ justify: 'center' })};

  ${mobileMediaQuery} {
    padding: 16px 20px;
  }
`;

const LeftSection = styled.div`
  gap: 38px;
  margin-right: auto;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 16px;
  }
`;

const LogoLink = styled(Link)`
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const LogoImage = styled.img`
  width: 43px;
  height: 21px;
`;

const AdminHamburgerButton = styled(RiMenuFill)`
  ${expandButtonStyle}
`;

const NavLinkContainer = styled.div`
  flex-wrap: wrap;
  gap: 40px;
  ${rowFlex()};

  ${mobileMediaQuery} {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #3c3530;

  ${mobileMediaQuery} {
    ${rowFlex({ justify: 'center', align: 'center' })};
  }
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
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isSideNavOpen, setIsSideNavOpen] = useAtom(sideNavIsOpenAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSuperAdmin = location.pathname.startsWith('/super-admin');
  const isAdminWorkspace = location.pathname.startsWith('/admin/workspace/');
  const isShowHamburger = isAdminWorkspace || isSuperAdmin;

  const sideNavConfig = isSuperAdmin
    ? { navData: superAdminNavData, pathPrefix: '/super-admin' }
    : { navData: adminNavData, pathPrefix: `/admin/workspace/${workspaceId}` };

  const handleHamburgerClick = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  return (
    <>
      <NavContainer useBackground={useBackground} className={'nav-container'}>
        <LeftSection>
          {isShowHamburger && <AdminHamburgerButton className={'hamburger-button'} onClick={handleHamburgerClick} />}
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

        {!isShowHamburger && (
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
            <RiMenuFill size={24} />
          </MobileMenuButton>
        )}
      </NavContainer>

      {!isShowHamburger && <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />}
      {isShowHamburger && <SideNav isOpen={isSideNavOpen} {...sideNavConfig} />}
    </>
  );
}

export default NavBar;
