import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '../../../resources/image/kioLogo.png';
import AuthenticationButton from '@components/user/AuthenticationButton';
import UserProfileSvg from '@resources/svg/UserProfileSvg';

const NavContainer = styled.div`
  z-index: 1001;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
`;

const AccountLink = styled(Link)`
  display: flex;
  width: 100px;
  height: 60px;
  align-items: center;
  justify-content: center;
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
`;

const NavLinkItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinkItem = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: inherit;
  cursor: pointer;
  width: 100px;
  height: 43px;
  line-height: 43px;
`;

interface NavBarProps {
  logoSize: 'small' | 'medium';
}

const sizeMap: { [key in NavBarProps['logoSize']]: { width: string; height: string } } = {
  small: { width: '125px', height: '60px' },
  medium: { width: '170px', height: '80px' },
};

function NavBar({ logoSize }: NavBarProps) {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/'}>
          <img src={kioLogo} {...sizeMap[logoSize]} alt="Kio Logo" />
        </Link>

        <NavLinkContainer>
          <NavLinkItemContainer>
            <NavLinkItem to={'/info'}>Info</NavLinkItem>
            <AuthenticationButton />
          </NavLinkItemContainer>

          <AccountLink to={'/admin/my-info'}>
            <UserProfileSvg width={50} height={50} />
          </AccountLink>
        </NavLinkContainer>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
