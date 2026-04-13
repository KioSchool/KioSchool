import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { eyebrowTypography, headingTypography, subheadingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import FeatureCard from './FeatureCard';

const Container = styled.div`
  width: 100%;
  background: ${Color.LIGHT_GREY};
  background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 145, 66, 0.02) 0%, transparent 60%);
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
`;

const StickyLayout = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  padding: 160px 24px;
  box-sizing: border-box;
  gap: 60px;
  ${rowFlex({ align: 'flex-start' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
    gap: 40px;
    ${colFlex({ align: 'center' })};
  }
`;

const LeftPanel = styled.div`
  position: sticky;
  top: 140px;
  flex-shrink: 0;
  width: 340px;

  ${mobileMediaQuery} {
    position: static;
    width: 100%;
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 8px;
  ${headingTypography};
`;

const SectionSubtitle = styled.p`
  margin-top: 16px;
  ${subheadingTypography};
`;

const SectionLabel = styled.span`
  ${eyebrowTypography};
`;

const Accent = styled.span`
  color: ${Color.KIO_ORANGE};
`;

const RightPanel = styled.div`
  flex: 1;
  gap: 20px;
  ${colFlex({})};

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const FEATURES = [
  {
    iconType: 'qr' as const,
    title: 'QR 주문',
    description: '손님이 테이블에서 QR을 스캔하면 메뉴를 보고 바로 주문해요. 키오스크 장비도, 주문을 받으러 다닐 필요도 없어요.',
  },
  {
    iconType: 'realtime' as const,
    title: '실시간 주문 관리',
    description: '주문이 들어오면 운영자 화면에 바로 표시돼요. 주문 상태를 실시간으로 관리하고, 놓치는 주문 없이 서빙할 수 있어요.',
  },
  {
    iconType: 'settlement' as const,
    title: '자동 정산',
    description: '테이블별, 메뉴별 매출이 자동으로 집계돼요. 축제가 끝나면 클릭 한 번으로 정산 결과를 확인할 수 있어요.',
  },
  {
    iconType: 'table' as const,
    title: '테이블 관리',
    description: '테이블 수만 입력하면 QR 코드가 자동 생성돼요. 출력해서 테이블에 붙이기만 하면 바로 운영을 시작할 수 있어요.',
  },
];

function FeaturesSection() {
  return (
    <Container>
      <StickyLayout>
        <LeftPanel>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <SectionLabel>FEATURES</SectionLabel>
            <SectionTitle>
              우리 학교 축제,
              <br />
              이렇게 <Accent>바뀌어요</Accent>
            </SectionTitle>
            <SectionSubtitle>주점 운영에 필요한 기능을 모두 제공해요. 복잡한 건 키오스쿨이 할게요.</SectionSubtitle>
          </motion.div>
        </LeftPanel>
        <RightPanel>
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} iconType={feature.iconType} title={feature.title} description={feature.description} delay={index * 0.1} />
          ))}
        </RightPanel>
      </StickyLayout>
    </Container>
  );
}

export default FeaturesSection;
