import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { bodyTypography, captionTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import FeatureVisualContent from './FeatureVisualContent';

const Container = styled.div`
  width: 100%;
  padding: 120px 24px;
  background: ${Color.WHITE};
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const SectionLabel = styled.span`
  margin-bottom: 8px;
  ${eyebrowTypography};
`;

const SectionTitle = styled.h2`
  text-align: center;
  ${headingTypography};
`;

const SectionSubtitle = styled.p`
  margin-top: 8px;
  text-align: center;
  ${captionTypography};
`;

const FeatureList = styled.div`
  max-width: 960px;
  width: 100%;
  margin-top: 64px;
  gap: 80px;
  ${colFlex({})};

  ${mobileMediaQuery} {
    margin-top: 40px;
    gap: 48px;
  }
`;

const FeatureRow = styled.div<{ reverse?: boolean }>`
  gap: 48px;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  ${rowFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    gap: 24px;
    ${colFlex({})};
  }
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureNumber = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  margin-bottom: 8px;
  display: block;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #191f28;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 20px;
  }
`;

const FeatureDescription = styled.p`
  margin-top: 12px;
  ${bodyTypography};
`;

const FeatureVisual = styled.div`
  width: 320px;
  height: 200px;
  flex-shrink: 0;
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    width: 100%;
    height: 160px;
  }
`;

const FEATURES = [
  {
    number: '01',
    title: 'QR 주문',
    description:
      '손님이 테이블에서 QR을 스캔하면 메뉴를 보고 바로 주문합니다. \n별도의 키오스크 장비 없이, 주문을 받으러 다닐 필요 없이 모든 주문을 처리할 수 있습니다.',
  },
  {
    number: '02',
    title: '실시간 주문 관리',
    description:
      '주문이 들어오면 운영자 화면에 바로 표시됩니다. \n주문 상태를 실시간으로 관리하고, 놓치는 주문 없이 서빙할 수 있습니다. \n테이블별 주문 현황을 한눈에 파악하세요.',
  },
  {
    number: '03',
    title: '자동 정산',
    description:
      '테이블별, 메뉴별 매출이 자동으로 집계됩니다. \n축제가 끝나면 클릭 한 번으로 정산 결과를 확인할 수 있습니다. \n더 이상 엑셀로 수동 정산할 필요가 없습니다.',
  },
  {
    number: '04',
    title: '테이블 관리',
    description:
      '테이블 수만 입력하면 QR 코드가 자동 생성됩니다. \n출력해서 테이블에 붙이기만 하면 바로 운영을 시작할 수 있습니다. \n테이블 추가나 삭제도 간단합니다.',
  },
];

function InfoFeaturesSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <SectionLabel>FEATURES</SectionLabel>
        <SectionTitle>키오스쿨이 제공하는 기능</SectionTitle>
        <SectionSubtitle>주점 운영에 필요한 것만, 군더더기 없이</SectionSubtitle>
      </motion.div>
      <FeatureList>
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FeatureRow reverse={index % 2 === 1}>
              <FeatureText>
                <FeatureNumber>{feature.number}</FeatureNumber>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureText>
              <FeatureVisual>
                <FeatureVisualContent number={feature.number} title={feature.title} />
              </FeatureVisual>
            </FeatureRow>
          </motion.div>
        ))}
      </FeatureList>
    </Container>
  );
}

export default InfoFeaturesSection;
