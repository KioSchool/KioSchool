import styled from '@emotion/styled';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import SectionHeading from '@components/user/landing/SectionHeading';
import phoneBasket from '@resources/image/landing/phone-basket.webp';
import phoneMenu from '@resources/image/landing/phone-menu.webp';
import phonePay from '@resources/image/landing/phone-pay.webp';
import phoneWait from '@resources/image/landing/phone-wait.webp';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';
import PhoneStep from './PhoneStep';

const ORDER_STEPS = [
  { image: phoneMenu, title: '메뉴 보기', description: '주점 사진과 공지, 품절 메뉴까지 손님 화면에 그대로 표시됩니다.' },
  { image: phoneBasket, title: '담기', description: '메뉴를 담으면 장바구니 금액이 자동으로 계산됩니다.' },
  {
    image: phonePay,
    title: '송금하기',
    description: '토스, 카카오페이, 계좌이체 중 원하는 방법을 선택합니다. 토스와 카카오페이는 금액이 자동으로 입력됩니다.',
  },
  { image: phoneWait, title: '주문 완료', description: '운영진이 입금을 확인하면 손님 화면도 주문 완료 화면으로 전환됩니다.' },
];

const Steps = styled.div`
  margin-top: 72px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}

  ${mobileMediaQuery} {
    margin-top: 48px;
    flex-wrap: wrap;
    gap: 40px 14px;
  }
`;

function InfoOrderFlowSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.ORDER} tone="white">
      <LandingInner>
        <SectionHeading
          eyebrow="손님 주문"
          titleLines={['손님은 앱 없이', 'QR만 찍으면 돼요']}
          lead="테이블에 붙은 QR을 찍으면 주점 메뉴가 바로 표시됩니다. 손님은 회원가입 없이 바로 이용할 수 있습니다."
        />
        <Steps>
          {ORDER_STEPS.map((orderStep, index) => (
            <PhoneStep key={orderStep.title} step={index + 1} image={orderStep.image} title={orderStep.title} description={orderStep.description} />
          ))}
        </Steps>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoOrderFlowSection;
