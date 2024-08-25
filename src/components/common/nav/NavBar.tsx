import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import { navBarLabelStyle } from '@styles/navBarStyles';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1001;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  top: 0;
  position: fixed;
  background: ${(props) => (props.useBackground ? 'white' : 'transparent')};
  backdrop-filter: blur(10px);
  opacity: 0.8;
`;

const NavContent = styled.div`
  margin: 15px 24px;
  width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export const NavLinkItem = styled(Link)`
  ${navBarLabelStyle}
`;

interface NavBarProps {
  useBackground?: boolean;
}

function NavBar({ useBackground = false }: NavBarProps) {
  return (
    <NavContainer useBackground={useBackground}>
      <NavContent>
        <Link to={'/'}>
          <img src={kioLogo} width={'60px'} height={'27px'} alt="Kio Logo" />
        </Link>

        <NavLinkContainer>
          <NavLinkItem to={'/info'}>키오스쿨 소개</NavLinkItem>
          <AuthenticationButton />
          <NavLinkItem to={'/admin/my-info'}>마이페이지</NavLinkItem>
        </NavLinkContainer>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
