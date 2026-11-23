import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { DEMO_CHAPTERS, DEMO_STEPS } from '@constants/data/demo/demoSteps';
import { USER_ROUTES } from '@constants/routes';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import kioLogo from '@resources/image/kioLogo.png';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const FIRST_STEP = 1;

const Header = styled.header`
  flex: none;
  height: 52px;
  padding: 0 16px;
  gap: 14px;
  ${rowFlex({ align: 'center' })}
`;

const LogoLink = styled(Link)`
  flex: none;
  line-height: 0;
`;

const Logo = styled.img`
  height: 20px;
`;

const Bars = styled.div`
  flex: 1;
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const Bar = styled.span<{ isFilled: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ isFilled }) => (isFilled ? LandingColor.ACCENT : LandingColor.LINE)};
`;

const Count = styled.span`
  flex: none;
  font-size: 13px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
`;

const RestartButton = styled.button`
  flex: none;
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  cursor: pointer;
`;

interface DemoMobileHeaderProps {
  chapter: number;
  stepNumber: number;
}

function DemoMobileHeader({ chapter, stepNumber }: DemoMobileHeaderProps) {
  const dispatch = useSetAtom(demoStateAtom);

  const handleRestart = () => {
    dispatch({ type: 'RESTART', now: Date.now(), step: FIRST_STEP });
  };

  return (
    <Header>
      <LogoLink to={USER_ROUTES.HOME} aria-label="키오스쿨 홈">
        <Logo src={kioLogo} alt="키오스쿨" />
      </LogoLink>
      <Bars role="img" aria-label={`${chapter + 1}번째 장 ${DEMO_CHAPTERS[chapter]}`}>
        {DEMO_CHAPTERS.map((name, index) => (
          <Bar key={name} isFilled={index <= chapter} />
        ))}
      </Bars>
      <Count>
        {stepNumber}/{DEMO_STEPS.length}
      </Count>
      <RestartButton type="button" onClick={handleRestart}>
        처음부터
      </RestartButton>
    </Header>
  );
}

export default DemoMobileHeader;
