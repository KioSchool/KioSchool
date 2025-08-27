import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import { navBarLabelStyle } from '@styles/navBarStyles';
import { rowFlex } from '@styles/flexStyles';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1001;
  min-width: 100vw;
  flex-wrap: wrap;
  top: 0;
  position: fixed;
  background: ${(props) => (props.useBackground ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  ${rowFlex({ justify: 'center' })}
`;

const NavContent = styled.div`
  margin: 15px 24px;
  width: 1000px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const NavLinkContainer = styled.div`
  flex-wrap: wrap;
  gap: 40px;
  ${rowFlex()}
`;

export const NavLinkItem = styled(Link)`
  ${navBarLabelStyle}
`;

interface NavBarProps {
  useBackground?: boolean;
}

function NavBar({ useBackground = false }: NavBarProps) {
  return (
    <NavContainer useBackground={useBackground} className={'nav-container'}>
      <NavContent className={'nav-content'}>
        <Link to={'/'}>
          <img src={kioLogo} width={'60px'} height={'27px'} alt="Kio Logo" />
        </Link>

        <NavLinkContainer className={'nav-link-container'}>
          <NavLinkItem to={'/info'} className={'nav-link-item'}>
            키오스쿨 소개
          </NavLinkItem>
          <AuthenticationButton />
          <NavLinkItem to={'/admin/my-info'} className={'nav-link-item'}>
            마이페이지
          </NavLinkItem>
        </NavLinkContainer>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
