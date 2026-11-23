import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { DEMO_CHAPTERS } from '@constants/data/demo/demoSteps';
import LandingButton from '@components/user/landing/LandingButton';
import LandingStartButton from '@components/user/landing/LandingStartButton';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import DemoChapterProgress from './DemoChapterProgress';
import DemoPcOnlyNote from './mobile/DemoPcOnlyNote';

const Container = styled.div`
  width: 100%;
`;

const Card = styled.div`
  max-width: 920px;
  margin: 40px auto 0;
  padding: 56px;
  border-radius: 16px;
  background: ${LandingColor.SURFACE};
  text-align: center;

  ${mobileMediaQuery} {
    margin-top: 24px;
    padding: 32px 24px;
    text-align: left;
  }
`;

const Eyebrow = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  margin: 12px 0 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: ${LandingColor.TEXT};

  ${mobileMediaQuery} {
    font-size: 24px;
  }
`;

const Lead = styled.p`
  margin: 14px 0 0;
  font-size: 18px;
  line-height: 1.55;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 15px;
  }
`;

const LeadLine = styled.span`
  display: block;
`;

const DoneList = styled.ul`
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
  gap: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    justify-content: flex-start;
    gap: 8px 16px;
    margin-top: 20px;
    font-size: 14px;
  }
`;

const DoneItem = styled.li``;

const Check = styled.span`
  margin-right: 6px;
  color: ${LandingColor.ACCENT_TEXT};
`;

const Buttons = styled.div`
  margin-top: 36px;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    margin-top: 24px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const MobileNote = styled.div`
  display: none;

  ${mobileMediaQuery} {
    display: block;
    margin-top: 20px;
  }
`;

function DemoEndCard() {
  const dispatch = useSetAtom(demoStateAtom);

  const handleRestart = () => {
    dispatch({ type: 'RESTART', now: Date.now(), step: 1 });
    window.scrollTo({ top: 0 });
  };

  return (
    <Container>
      <DemoChapterProgress currentChapter={DEMO_CHAPTERS.length} />
      <Card>
        <Eyebrow>체험 완료</Eyebrow>
        <Title>7번 테이블 손님 한 팀을 끝까지 받아 봤어요</Title>
        <Lead>
          <LeadLine>실제 주점에서도 같은 순서로 진행됩니다.</LeadLine>
          <LeadLine>가입하고 메뉴와 계좌를 등록하면 축제 날 바로 쓸 수 있습니다.</LeadLine>
        </Lead>
        <DoneList>
          {DEMO_CHAPTERS.map((chapter) => (
            <DoneItem key={chapter}>
              <Check aria-hidden="true">✓</Check>
              {chapter}
            </DoneItem>
          ))}
        </DoneList>
        <MobileNote>
          <DemoPcOnlyNote />
        </MobileNote>
        <Buttons>
          <LandingStartButton location="demo_end" />
          <LandingButton label="처음부터 다시" variant="outline" onClick={handleRestart} />
        </Buttons>
      </Card>
    </Container>
  );
}

export default DemoEndCard;
