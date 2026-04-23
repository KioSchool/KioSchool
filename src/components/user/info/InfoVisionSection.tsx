import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { bodyTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';
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
  margin-bottom: 8px;
  ${eyebrowTypography};
`;

const MainCopy = styled.h2`
  text-align: center;
  ${headingTypography};
`;

const Paragraph = styled.p`
  margin-top: 24px;
  max-width: 480px;
  text-align: center;
  ${bodyTypography};
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
          키오스쿨은 대학 축제 주점 운영의 불편함에서 시작했습니다.
          <br />
          수기 주문, 수동 정산, 부족한 인력.
          <br />
          축제를 준비하는 학생들이
          <br />
          정작 축제를 즐기지 못하는 문제를 해결하고 싶었습니다.
        </Paragraph>
        <Divider />
        <Paragraph style={{ marginTop: 0 }}>
          기술로 운영의 부담을 줄이고, <br /> 축제 본연의 즐거움에 집중할 수 있는 환경을 만들어갑니다.
        </Paragraph>
      </motion.div>
    </Container>
  );
}

export default InfoVisionSection;
