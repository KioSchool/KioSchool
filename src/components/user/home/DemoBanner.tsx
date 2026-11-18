import styled from '@emotion/styled';
import { LANDING_BUTTON_LABEL, LANDING_DEMO_PATH } from '@constants/data/landingContent';
import LandingLinkButton from '@components/user/landing/LandingLinkButton';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, landingEyebrowTypography } from '@styles/landingStyles';

const Section = styled.section`
  width: 100%;
  padding-bottom: 160px;
  background: #ffffff;
  color: ${LandingColor.TEXT};

  ${mobileMediaQuery} {
    padding-bottom: 120px;
  }
`;

const Banner = styled.div`
  padding: 48px 56px;
  gap: 48px;
  border-radius: 16px;
  background: ${LandingColor.TINT};
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  ${mobileMediaQuery} {
    padding: 32px 24px;
    gap: 24px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Text = styled.div`
  max-width: 600px;
`;

const Eyebrow = styled.div`
  ${landingEyebrowTypography}
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 26px;
  }
`;

const Description = styled.p`
  margin: 10px 0 0;
  font-size: 17px;
  line-height: 1.55;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 16px;
  }
`;

const Action = styled.div`
  flex: none;
  gap: 12px;
  ${colFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    ${colFlex({ align: 'stretch' })}
  }
`;

const Caption = styled.small`
  font-size: 14px;
  color: ${LandingColor.SUB_TEXT};
  text-align: center;
`;

function DemoBanner() {
  return (
    <Section>
      <LandingInner>
        <RevealOnScroll>
          <Banner>
            <Text>
              <Eyebrow>1분 체험</Eyebrow>
              <Title>체험해 보세요</Title>
              <Description>
                7번 테이블 손님의 주문을 직접 처리해 보는 1분 체험입니다. 손님 화면과 운영진 화면을 번갈아 눌러 보세요. 실제 주문이나 송금은 발생하지 않습니다.
              </Description>
            </Text>
            <Action>
              <LandingLinkButton to={LANDING_DEMO_PATH} label={LANDING_BUTTON_LABEL.DEMO} size="large" withPlayIcon />
              <Caption>회원가입 없이 바로 시작돼요</Caption>
            </Action>
          </Banner>
        </RevealOnScroll>
      </LandingInner>
    </Section>
  );
}

export default DemoBanner;
