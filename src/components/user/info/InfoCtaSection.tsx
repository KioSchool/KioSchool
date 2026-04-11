import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiMailLine } from '@remixicon/react';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { ADMIN_ROUTES } from '@constants/routes';

const Container = styled.div`
  width: 100%;
  padding: 120px 24px;
  background: ${Color.WHITE};
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const ContentWrapper = styled(motion.div)`
  ${colFlex({ align: 'center' })};
`;

const CtaDivider = styled.div`
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: ${Color.KIO_ORANGE};
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #191f28;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.4;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: #8b95a1;
  margin-top: 16px;
  text-align: center;
`;

const CtaButton = styled(Link)`
  padding: 20px 52px;
  margin-top: 40px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 18px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }
`;

const Reassurance = styled.p`
  font-size: 14px;
  color: #adb1ba;
  margin-top: 16px;
  text-align: center;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 48px;
  font-size: 13px;
  color: #8b95a1;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #6b7684;
  }
`;

function InfoCtaSection() {
  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <CtaDivider />
        <Title>다음 축제, 키오스쿨과 함께하세요</Title>
        <Subtitle>가입부터 주점 운영까지, 3분이면 준비 끝</Subtitle>
        <CtaButton to={ADMIN_ROUTES.HOME}>무료로 시작하기</CtaButton>
        <Reassurance>별도 비용 없이 시작할 수 있어요</Reassurance>
        <ContactLink href="mailto:contact@kioschool.com">
          <RiMailLine size={14} />
          궁금한 점이 있다면 문의하기
        </ContactLink>
      </ContentWrapper>
    </Container>
  );
}

export default InfoCtaSection;
