import styled from '@emotion/styled';
import { RiArrowRightSLine } from '@remixicon/react';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import qrStand from '@resources/image/landing/qr-stand.svg';
import stepOrder from '@resources/image/landing/step-order.webp';
import stepProducts from '@resources/image/landing/step-products.webp';
import stepRegister from '@resources/image/landing/step-register.webp';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, landingFrameStyle } from '@styles/landingStyles';
import StepRow from './StepRow';

const STEP_STAGGER_SECONDS = 0.12;

const Steps = styled.div`
  margin-top: 64px;
  gap: 16px;
  ${colFlex({ align: 'stretch' })}

  ${mobileMediaQuery} {
    margin-top: 40px;
    gap: 12px;
  }
`;

const RegisterImage = styled.img`
  width: 540px;
  max-width: 100%;
  display: block;
`;

const ProductsImage = styled.img`
  width: 600px;
  max-width: 100%;
  display: block;
`;

const OrderScene = styled.div`
  gap: 30px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    gap: 4px;
  }
`;

const QrStandImage = styled.img`
  width: 170px;
  display: block;

  ${mobileMediaQuery} {
    width: 116px;
  }
`;

const SceneArrow = styled(RiArrowRightSLine)`
  width: 24px;
  height: 24px;
  flex: none;
  color: ${LandingColor.OUTLINE};

  ${mobileMediaQuery} {
    width: 16px;
    height: 16px;
  }
`;

const OrderImage = styled.img`
  ${landingFrameStyle}
  width: 200px;
  display: block;
  box-shadow: none;

  ${mobileMediaQuery} {
    width: 136px;
  }
`;

function HowItWorksSection() {
  return (
    <LandingSection tone="white" compactTop>
      <LandingInner>
        <SectionHeading titleLines={['3단계면 충분해요']} lead="복잡한 준비 과정은 필요 없어요" />
        <Steps>
          <RevealOnScroll>
            <StepRow step={1} title="회원가입" description={'이메일 하나면 충분합니다.\n1분이면 가입이 완료됩니다.'}>
              <RegisterImage src={stepRegister} alt="회원가입 이메일 입력 화면" loading="lazy" />
            </StepRow>
          </RevealOnScroll>
          <RevealOnScroll delay={STEP_STAGGER_SECONDS}>
            <StepRow step={2} title="주점 설정" description="메뉴와 가격을 등록하고, 테이블 수를 입력하면 QR 코드가 자동으로 만들어집니다.">
              <ProductsImage src={stepProducts} alt="메뉴 등록 화면" loading="lazy" />
            </StepRow>
          </RevealOnScroll>
          <RevealOnScroll delay={STEP_STAGGER_SECONDS * 2}>
            <StepRow step={3} title="축제 시작" description={'QR 코드를 테이블에 부착하면 준비가 끝납니다.\n손님이 스캔하면 주문이 바로 접수됩니다.'}>
              <OrderScene>
                <QrStandImage src={qrStand} alt="테이블에 놓인 QR 스탠드" loading="lazy" />
                <SceneArrow aria-hidden />
                <OrderImage src={stepOrder} alt="손님이 메뉴를 담은 주문 화면" loading="lazy" />
              </OrderScene>
            </StepRow>
          </RevealOnScroll>
        </Steps>
      </LandingInner>
    </LandingSection>
  );
}

export default HowItWorksSection;
