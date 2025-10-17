import styled from '@emotion/styled';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import { navBarLabelStyle } from '@styles/navBarStyles';
import { rowFlex } from '@styles/flexStyles';
import { RiMenuFill } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import SideNav from './SideNav';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1005;
  width: 100%;
  flex-wrap: wrap;
  top: 0;
  position: fixed;
  background: ${(props) => (props.useBackground ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  border-bottom: 1px solid #e8eef2;
  ${rowFlex({ justify: 'center' })}
`;

const NavContent = styled.div`
  width: 100%;
  padding: 20px 40px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
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
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const isShowHamburger = location.pathname.startsWith('/admin/workspace/');

  const handleHamburgerClick = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  const handleCloseSideNav = () => {
    setIsSideNavOpen(false);
  };

  return (
    <>
      <NavContainer useBackground={useBackground} className={'nav-container'}>
        <NavContent className={'nav-content'}>
          <LeftSection>
            {isShowHamburger && <HamburgerButton className={'hamburger-button'} onClick={handleHamburgerClick} />}
            <LogoLink to={'/'}>
              <LogoImage src={kioLogo} alt="키오스쿨" />
            </LogoLink>
          </LeftSection>

          <NavLinkContainer className={'nav-link-container'}>
            <NavLinkItem to={'/info'} className={'nav-link-item'}>
              키오스쿨 소개
            </NavLinkItem>
            <NavUrl
              href="https://ji-in.notion.site/FAQ-09eb07eac4a34ab4aa883727994e0b08?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className={'nav-link-item'}
            >
              FAQ
            </NavUrl>
            <AuthenticationButton />
            <NavLinkItem to={'/admin/my-info'} className={'nav-link-item'}>
              마이페이지
            </NavLinkItem>
          </NavLinkContainer>
        </NavContent>
      </NavContainer>

      {isShowHamburger && workspaceId && <SideNav isOpen={isSideNavOpen} onClose={handleCloseSideNav} workspaceId={workspaceId} />}
    </>
  );
}

export default NavBar;
