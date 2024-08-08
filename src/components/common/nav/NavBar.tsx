import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '@resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';

const NavContainer = styled.div<{ useBackground: boolean }>`
  z-index: 1001;
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  position: fixed;
  background: ${(props) => (props.useBackground ? 'white' : 'transparent')};
`;

const NavContent = styled.div`
  margin: 15px 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

export const NavLinkItem = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: #5c5c5c;
  cursor: pointer;
  width: 100px;
  height: 43px;
  line-height: 43px;
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
          <NavLinkItem to={'/admin/my-info'}>마이 페이지</NavLinkItem>
        </NavLinkContainer>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
