import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiInstagramLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { captionTypography, headingTypography, subheadingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import { ADMIN_ROUTES } from '@constants/routes';
import useAuthentication from '@hooks/useAuthentication';

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
  text-align: center;
  ${headingTypography};
`;

const Subtitle = styled.p`
  margin-top: 16px;
  text-align: center;
  ${subheadingTypography};
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
  margin-top: 16px;
  text-align: center;
  ${captionTypography};
`;

const ContactLink = styled.a`
  margin-top: 56px;
  padding: 10px 20px;
  background: #f2f4f6;
  color: #3c3530;
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  gap: 8px;
  transition: background 0.2s ease, color 0.2s ease;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background: ${Color.KIO_ORANGE};
    color: ${Color.WHITE};
  }
`;

function InfoCtaSection() {
  const { isLoggedIn } = useAuthentication();

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
        <CtaButton to={ADMIN_ROUTES.HOME}>{isLoggedIn() ? '어드민 홈으로' : '무료로 시작하기'}</CtaButton>
        <Reassurance>별도 비용 없이 시작할 수 있어요</Reassurance>
        <ContactLink href="https://www.instagram.com/kioschool/" target="_blank" rel="noopener noreferrer">
          <RiInstagramLine size={16} />
          키오스쿨 문의하기
        </ContactLink>
      </ContentWrapper>
    </Container>
  );
}

export default InfoCtaSection;
