import styled from '@emotion/styled';
import { DEMO_CHAPTERS, DEMO_STEPS } from '@constants/data/demo/demoSteps';
import { LandingColor } from '@resources/colors';
import { DEMO_STAGE_WIDTH } from '@styles/demoStyles';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

type ChapterState = 'done' | 'current' | 'upcoming';

const BAR_COLOR: Record<ChapterState, string> = {
  done: LandingColor.ACCENT,
  current: LandingColor.ACCENT,
  upcoming: LandingColor.LINE,
};

const NAME_COLOR: Record<ChapterState, string> = {
  done: LandingColor.SUB_TEXT,
  current: LandingColor.TEXT,
  upcoming: LandingColor.CAPTION,
};

const NAME_WEIGHT: Record<ChapterState, number> = {
  done: 600,
  current: 700,
  upcoming: 600,
};

function getChapterState(index: number, currentChapter: number): ChapterState {
  if (index < currentChapter) return 'done';
  if (index === currentChapter) return 'current';
  return 'upcoming';
}

const Container = styled.div`
  width: 100%;
  max-width: ${DEMO_STAGE_WIDTH}px;
  margin: 36px auto 0;

  ${mobileMediaQuery} {
    margin-top: 20px;
  }
`;

const Chapters = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 8px;
  ${rowFlex()}

  ${mobileMediaQuery} {
    gap: 4px;
  }
`;

const Chapter = styled.li`
  flex: 1;
`;

const Bar = styled.div<{ state: ChapterState }>`
  height: 4px;
  border-radius: 2px;
  background: ${({ state }) => BAR_COLOR[state]};

  ${mobileMediaQuery} {
    height: 3px;
  }
`;

const Name = styled.span<{ state: ChapterState }>`
  display: block;
  margin-top: 10px;
  font-size: 15px;
  font-weight: ${({ state }) => NAME_WEIGHT[state]};
  color: ${({ state }) => NAME_COLOR[state]};

  ${mobileMediaQuery} {
    display: none;
  }
`;

const MobileCaption = styled.div`
  display: none;

  ${mobileMediaQuery} {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
    color: ${LandingColor.TEXT};
    ${rowFlex({ justify: 'space-between', align: 'center' })}
  }
`;

const StepCount = styled.span`
  font-weight: 600;
  color: ${LandingColor.CAPTION};
`;

interface DemoChapterProgressProps {
  currentChapter: number;
  stepNumber: number | null;
}

function DemoChapterProgress({ currentChapter, stepNumber }: DemoChapterProgressProps) {
  return (
    <Container>
      <Chapters aria-label="체험 진행 단계">
        {DEMO_CHAPTERS.map((name, index) => {
          const state = getChapterState(index, currentChapter);

          return (
            <Chapter key={name} aria-current={state === 'current' && 'step'}>
              <Bar state={state} />
              <Name state={state}>
                {index + 1} {name}
              </Name>
            </Chapter>
          );
        })}
      </Chapters>
      {stepNumber !== null && (
        <MobileCaption>
          {currentChapter + 1} {DEMO_CHAPTERS[currentChapter]}
          <StepCount>
            {stepNumber} / {DEMO_STEPS.length}
          </StepCount>
        </MobileCaption>
      )}
    </Container>
  );
}

export default DemoChapterProgress;
