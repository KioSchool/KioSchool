import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, landingBodyTypography } from '@styles/landingStyles';
import PreparationIcon, { PreparationKind } from './PreparationIcon';

const PREPARATIONS: { kind: PreparationKind; title: string; description: string }[] = [
  { kind: 'device', title: '노트북·PC·태블릿', description: '운영진 화면에 접속할 기기입니다. 여러 대를 함께 사용할 수 있습니다.' },
  { kind: 'account', title: '주점 계좌 하나', description: '손님이 송금할 계좌입니다. 가입할 때 등록합니다.' },
  { kind: 'qr', title: '테이블 QR', description: '테이블 수만큼 출력해 테이블에 부착합니다.' },
  { kind: 'phone', title: '손님 폰', description: '손님은 각자 휴대폰으로 QR을 찍습니다. 앱 설치가 필요 없습니다.' },
];

const Cards = styled.div`
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  ${mobileMediaQuery} {
    margin-top: 40px;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
`;

const CARD_STAGGER_SECONDS = 0.1;
const HOVER_LIFT = -8;

const Card = styled(motion.div)`
  padding: 32px 28px;
  border-radius: 16px;
  background: ${LandingColor.SURFACE};

  ${mobileMediaQuery} {
    padding: 24px 20px;
  }
`;

const Title = styled.h3`
  margin: 24px 0 0;
  font-size: 20px;
  font-weight: 700;

  ${mobileMediaQuery} {
    font-size: 17px;
  }
`;

const Description = styled.p`
  ${landingBodyTypography}
`;

function InfoPreparationSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.PREPARATION} tone="white">
      <LandingInner>
        <SectionHeading eyebrow="준비물" titleLines={['준비물은 이것뿐이에요']} lead="가입부터 첫 주문까지 별도로 구매할 장비가 없습니다." />
        <Cards>
          {PREPARATIONS.map((preparation, index) => (
            <Card
              key={preparation.kind}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: HOVER_LIFT }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * CARD_STAGGER_SECONDS }}
            >
              <PreparationIcon kind={preparation.kind} />
              <Title>{preparation.title}</Title>
              <Description>{preparation.description}</Description>
            </Card>
          ))}
        </Cards>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoPreparationSection;
