import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '../../../resources/image/kioLogo.png';
import userDefaultProfileImage from '../../../resources/image/userDefaultProfileImage.png';

const NavContainer = styled.div<{ fix?: string }>`
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: ${(props) => (props.fix ? props.fix : '')};
`;

const LinkItem = styled(Link)`
  width: 60px;
  height: 60px;
`;

interface NavBarProps {
  fix?: string;
  logoSize: 'small' | 'medium';
}

const sizeMap: { [key in NavBarProps['logoSize']]: { width: string; height: string } } = {
  small: { width: '123px', height: '60px' },
  medium: { width: '170px', height: '80px' },
};

function NavBar({ fix, logoSize }: NavBarProps) {
  return (
    <>
      <NavContainer fix={fix}>
        <Link to={'/'}>
          <img src={kioLogo} width={sizeMap[logoSize].width} height={sizeMap[logoSize].height} alt="Kio Logo" />
        </Link>

        <LinkItem to={'/register-account'}>
          <img src={userDefaultProfileImage} width="60px" height="60px" />
        </LinkItem>
      </NavContainer>
    </>
  );
}

export default NavBar;
