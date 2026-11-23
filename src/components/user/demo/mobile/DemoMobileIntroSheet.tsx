import { useId, useState } from 'react';
import styled from '@emotion/styled';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { DEMO_CHAPTERS, DEMO_STEP, DEMO_STEP_SHORT_NAMES, getDemoStep } from '@constants/data/demo/demoSteps';
import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';
import { demoMobileIntroSeenAtom, demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { LANDING_BUTTON_VARIANT_STYLE, landingButtonBaseStyle } from '@styles/landingButtonStyles';
import DemoPcOnlyNote from './DemoPcOnlyNote';

const SKIP_LINE = "막히면 아래 '건너뛰기'로 넘어갈 수 있습니다.";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 30;
  background: rgba(25, 31, 40, 0.45);
  ${colFlex({ justify: 'flex-end' })}
`;

const Sheet = styled.div`
  padding: 12px 20px calc(24px + env(safe-area-inset-bottom));
  border-radius: 20px 20px 0 0;
  background: #ffffff;
  gap: 12px;
  ${colFlex()}
`;

const Handle = styled.span`
  width: 36px;
  height: 4px;
  margin: 0 auto 8px;
  border-radius: 2px;
  background: #d1d6db;
`;

const Eyebrow = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: ${LandingColor.TEXT};
`;

const TitleLine = styled.span`
  display: block;
`;

const Lines = styled.ul`
  margin: 4px 0 12px;
  padding: 0;
  list-style: none;
  gap: 8px;
  ${colFlex()}
`;

const Line = styled.li`
  gap: 8px;
  font-size: 15px;
  line-height: 1.5;
  color: ${LandingColor.SUB_TEXT};
  ${rowFlex({ align: 'flex-start' })}
`;

const CheckMark = styled.span`
  flex: none;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

const NoteArea = styled.div`
  margin: -4px 0 8px;
`;

const StartButton = styled.button`
  width: 100%;
  height: 52px;
  font-size: 16px;
  ${landingButtonBaseStyle}
  ${LANDING_BUTTON_VARIANT_STYLE.primary}
`;

const RestartButton = styled.button`
  padding: 6px 0 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  cursor: pointer;
`;

interface IntroContent {
  eyebrow: string;
  titleLines: string[];
  lines: string[];
  startLabel: string;
}

function getIntroContent(entryStep: number): IntroContent {
  if (entryStep === DEMO_STEP.START) {
    return {
      eyebrow: '1분 체험',
      titleLines: [`${DEMO_TABLE_NUMBER}번 테이블 손님 한 팀을`, '받아 보세요'],
      lines: ['손님 폰과 운영진 화면을 번갈아 눌러 진행합니다.', '실제 주문이나 송금은 발생하지 않습니다.', SKIP_LINE],
      startLabel: '시작하기',
    };
  }
  const doneNames = DEMO_STEP_SHORT_NAMES.slice(0, entryStep - 1).join('·');
  return {
    eyebrow: `1분 체험 · ${entryStep}단계부터`,
    titleLines: [`${DEMO_CHAPTERS[getDemoStep(entryStep).chapter]}부터 시작해요`],
    lines: [`앞 단계(${doneNames})는 체험이 대신 해 두었습니다.`, SKIP_LINE],
    startLabel: '여기서 시작',
  };
}

function DemoMobileIntroSheet() {
  const { step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const [isSeen, setIsSeen] = useAtom(demoMobileIntroSeenAtom);
  const [entryStep] = useState(step);
  const titleId = useId();
  const content = getIntroContent(entryStep);
  const isMidwayEntry = entryStep !== DEMO_STEP.START;

  if (isSeen) return null;

  const handleRestart = () => {
    dispatch({ type: 'RESTART', now: Date.now(), step: DEMO_STEP.START });
    setIsSeen(true);
  };

  return (
    <Overlay>
      <Sheet role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <Handle aria-hidden="true" />
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Title id={titleId}>
          {content.titleLines.map((line) => (
            <TitleLine key={line}>{line}</TitleLine>
          ))}
        </Title>
        <Lines>
          {content.lines.map((line) => (
            <Line key={line}>
              <CheckMark aria-hidden="true">✓</CheckMark>
              {line}
            </Line>
          ))}
        </Lines>
        <NoteArea>
          <DemoPcOnlyNote />
        </NoteArea>
        <StartButton type="button" onClick={() => setIsSeen(true)}>
          {content.startLabel}
        </StartButton>
        {isMidwayEntry && (
          <RestartButton type="button" onClick={handleRestart}>
            처음부터 하기
          </RestartButton>
        )}
      </Sheet>
    </Overlay>
  );
}

export default DemoMobileIntroSheet;
