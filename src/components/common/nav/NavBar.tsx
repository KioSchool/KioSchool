import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '../../../resources/image/kioLogo.png';
import userDefaultProfileImage from '../../../resources/image/userDefaultProfileImage.png';

const NavContainer = styled.div<{ fix?: string }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: ${(props) => props.fix};
`;

const LinkItem = styled(Link)`
  width: 60px;
  height: 60px;
`;

const NavContent = styled.div`
  margin: 17px 24px 40px 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface NavBarProps {
  fix?: string;
  logoSize: 'small' | 'medium';
}

const sizeMap: { [key in NavBarProps['logoSize']]: { width: string; height: string } } = {
  small: { width: '125px', height: '60px' },
  medium: { width: '170px', height: '80px' },
};

function NavBar({ fix, logoSize }: NavBarProps) {
  return (
    <NavContainer fix={fix}>
      <NavContent>
        <Link to={'/'}>
          <img src={kioLogo} {...sizeMap[logoSize]} alt="Kio Logo" />
        </Link>

        <LinkItem to={'/register-account'}>
          <img src={userDefaultProfileImage} width="60px" height="60px" />
        </LinkItem>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
