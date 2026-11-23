import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import LandingStartButton from '@components/user/landing/LandingStartButton';
import kioLogo from '@resources/image/kioLogo.png';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner } from '@styles/landingStyles';

const Header = styled(LandingInner)`
  height: 68px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  ${mobileMediaQuery} {
    height: 56px;
  }
`;

const LogoLink = styled(Link)`
  display: block;
  line-height: 0;
`;

const Logo = styled.img`
  height: 24px;

  ${mobileMediaQuery} {
    height: 20px;
  }
`;

const Actions = styled.div`
  gap: 24px;
  ${rowFlex({ align: 'center' })}
`;

const RestartButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  cursor: pointer;
`;

const StartButtonArea = styled.div`
  ${mobileMediaQuery} {
    display: none;
  }
`;

interface DemoHeaderProps {
  onRestart: () => void;
}

function DemoHeader({ onRestart }: DemoHeaderProps) {
  return (
    <Header as="header">
      <LogoLink to={USER_ROUTES.HOME} aria-label="키오스쿨 홈">
        <Logo src={kioLogo} alt="키오스쿨" />
      </LogoLink>
      <Actions>
        <RestartButton type="button" onClick={onRestart}>
          처음부터
        </RestartButton>
        <StartButtonArea>
          <LandingStartButton location="demo_header" size="small" />
        </StartButtonArea>
      </Actions>
    </Header>
  );
}

export default DemoHeader;
