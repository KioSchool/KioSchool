import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  padding-top: 40px;
  text-align: center;

  ${mobileMediaQuery} {
    padding-top: 20px;
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

const Title = styled.h1`
  margin: 12px 0 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: ${LandingColor.TEXT};

  ${mobileMediaQuery} {
    margin-top: 8px;
    font-size: 26px;
  }
`;

const MobileBreak = styled.br`
  display: none;

  ${mobileMediaQuery} {
    display: inline;
  }
`;

const Lead = styled.p`
  margin: 12px 0 0;
  font-size: 18px;
  line-height: 1.55;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    margin-top: 8px;
    font-size: 15px;
  }
`;

const LeadLine = styled.span`
  display: block;
`;

function DemoIntro() {
  return (
    <Container>
      <Eyebrow>1분 체험</Eyebrow>
      <Title>
        7번 테이블 손님 한 팀을 <MobileBreak />
        받아 보세요
      </Title>
      <Lead>
        <LeadLine>손님 폰과 운영진 화면을 번갈아 누르며 진행합니다.</LeadLine>
        <LeadLine>실제 주문이나 송금은 발생하지 않습니다.</LeadLine>
      </Lead>
    </Container>
  );
}

export default DemoIntro;
