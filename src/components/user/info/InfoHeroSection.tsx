import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { captionTypography, displayHeadingTypography, subheadingTypography } from '@styles/landingTypography';
import { URLS } from '@constants/urls';
import { ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import useMarketingLoginStatus from '@hooks/useMarketingLoginStatus';

const Container = styled.div`
  width: 100%;
  padding: 140px 24px 120px;
  box-sizing: border-box;
  background: radial-gradient(circle at top, rgba(255, 145, 66, 0.08) 0%, rgba(255, 145, 66, 0.02) 28%, ${Color.WHITE} 70%);
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 120px 20px 80px;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 960px;
  width: 100%;
  ${colFlex({ align: 'center' })};
`;

const Eyebrow = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin-top: 16px;
  text-align: center;
  ${displayHeadingTypography};
`;

const Accent = styled.span`
  color: ${Color.KIO_ORANGE};
`;

const Description = styled.p`
  max-width: 760px;
  margin-top: 24px;
  text-align: center;
  white-space: pre-line;
  ${subheadingTypography};
`;

const FeatureList = styled.div`
  margin-top: 36px;
  gap: 12px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 10px;
  }
`;

const FeatureBadge = styled.span`
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255, 145, 66, 0.1);
  color: #3c3530;
  font-size: 14px;
  font-weight: 600;
`;

const CtaRow = styled.div`
  margin-top: 40px;
  gap: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 8px;
    flex-wrap: wrap;
    ${rowFlex({ justify: 'center', align: 'center' })};
  }
`;

const PrimaryButton = styled(Link)`
  padding: 18px 48px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border-radius: 999px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }

  ${mobileMediaQuery} {
    padding: 14px 20px;
    font-size: 14px;
  }
`;

const SecondaryButton = styled.a`
  padding: 18px 48px;
  background: transparent;
  color: #6b7684;
  border: 1px solid #e5e8eb;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:active {
    background: #f2f4f6;
    transition: 0ms;
  }

  ${mobileMediaQuery} {
    padding: 14px 20px;
    font-size: 14px;
  }
`;

const Reassurance = styled.p`
  margin-top: 16px;
  text-align: center;
  ${captionTypography};
`;

const CORE_FEATURES = ['QR 주문', '실시간 주문 관리', '자동 정산', '테이블 관리'];

function InfoHeroSection() {
  const isLoggedIn = useMarketingLoginStatus();

  return (
    <Container>
      <ContentWrapper initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
        <Eyebrow>ABOUT KIOSCHOOL</Eyebrow>
        <Title>
          대학 축제 주점 운영을 위한
          <br />
          <Accent>QR 주문 서비스</Accent>
        </Title>
        <Description>
          키오스쿨은 대학 축제 주점 운영에 맞춰 설계된 QR 주문 서비스입니다.
          {'\n'}
          손님은 테이블에서 바로 주문하고, 운영팀은 실시간으로 주문을 확인하며, 축제 종료 후에는 정산까지 빠르게 마무리할 수 있습니다.
        </Description>
        <FeatureList>
          {CORE_FEATURES.map((feature) => (
            <FeatureBadge key={feature}>{feature}</FeatureBadge>
          ))}
        </FeatureList>
        <CtaRow>
          <PrimaryButton to={ADMIN_ROUTES.HOME}>{isLoggedIn ? '어드민 홈으로' : '무료로 시작하기'}</PrimaryButton>
          <SecondaryButton href={URLS.EXTERNAL.INSTAGRAM} target="_blank" rel="noopener noreferrer">
            문의하기
          </SecondaryButton>
        </CtaRow>
        <Reassurance>별도 장비 없이 바로 도입할 수 있어요</Reassurance>
      </ContentWrapper>
    </Container>
  );
}

export default InfoHeroSection;
