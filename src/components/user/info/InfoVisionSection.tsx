import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

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
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE};
  letter-spacing: 0.04em;
  margin-bottom: 8px;
`;

const MainCopy = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #191f28;
  letter-spacing: -0.02em;
  text-align: center;
  line-height: 1.4;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

const Paragraph = styled.p`
  font-size: 15px;
  color: #6b7684;
  line-height: 1.8;
  margin-top: 24px;
  max-width: 480px;
  text-align: center;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: ${Color.KIO_ORANGE};
  margin: 32px 0;
`;

function InfoVisionSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <SectionLabel>OUR VISION</SectionLabel>
        <MainCopy>
          모든 대학 축제가
          <br />
          즐거운 경험이 되도록
        </MainCopy>
        <Paragraph>
          키오스쿨은 대학 축제 주점 운영의 불편함에서 시작했습니다. 수기 주문, 수동 정산, 부족한 인력 — 축제를 준비하는 학생들이 정작 축제를 즐기지 못하는
          문제를 해결하고 싶었습니다.
        </Paragraph>
        <Divider />
        <Paragraph style={{ marginTop: 0 }}>기술로 운영의 부담을 줄이고, 축제 본연의 즐거움에 집중할 수 있는 환경을 만들어갑니다.</Paragraph>
      </motion.div>
    </Container>
  );
}

export default InfoVisionSection;
