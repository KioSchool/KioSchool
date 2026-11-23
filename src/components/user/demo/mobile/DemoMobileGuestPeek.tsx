import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiSmartphoneLine } from '@remixicon/react';
import { useAtomValue } from 'jotai';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const PEEK_VISIBLE_MS = 6000;

const Card = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 12px;
  z-index: 20;
  padding: 14px 16px;
  gap: 12px;
  border: 1px solid ${LandingColor.LINE};
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(25, 31, 40, 0.16);
  ${rowFlex({ align: 'center' })}
`;

const IconBox = styled.div`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${LandingColor.TINT};
  color: ${LandingColor.ACCENT_TEXT};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Texts = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const Title = styled.strong`
  font-size: 15px;
  font-weight: 700;
  color: ${LandingColor.TEXT};
`;

const Description = styled.span`
  font-size: 13px;
  color: ${LandingColor.CAPTION};
`;

const ViewButton = styled.button`
  flex: none;
  padding: 8px 0 8px 8px;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
  cursor: pointer;
`;

interface DemoMobileGuestPeekProps {
  isAdminView: boolean;
  onShowGuest: () => void;
}

function DemoMobileGuestPeek({ isAdminView, onShowGuest }: DemoMobileGuestPeekProps) {
  const { step } = useAtomValue(demoStateAtom);
  const [isClosed, setIsClosed] = useState(false);
  const isPeekStep = step === DEMO_STEP.SERVE;
  const isVisible = isPeekStep && isAdminView && !isClosed;

  useEffect(() => {
    setIsClosed(false);
  }, [step]);

  useEffect(() => {
    if (!isVisible) return undefined;
    const timer = window.setTimeout(() => setIsClosed(true), PEEK_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  const handleShowGuest = () => {
    setIsClosed(true);
    onShowGuest();
  };

  return (
    <Card role="status">
      <IconBox aria-hidden="true">
        <RiSmartphoneLine size={20} />
      </IconBox>
      <Texts>
        <Title>손님 폰도 바뀌었어요</Title>
        <Description>주문 완료 화면으로 바뀌었습니다.</Description>
      </Texts>
      <ViewButton type="button" onClick={handleShowGuest}>
        보기
      </ViewButton>
    </Card>
  );
}

export default DemoMobileGuestPeek;
