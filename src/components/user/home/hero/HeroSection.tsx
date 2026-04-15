import { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { displayHeadingTypography, subheadingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import { ADMIN_ROUTES, USER_ROUTES } from '@constants/routes';
import useAuthentication from '@hooks/useAuthentication';
import useMouseGlow, { MouseGlow } from '@components/user/home/useMouseGlow';
import cloud1 from '@resources/image/home/cloud1.png';
import cloud2 from '@resources/image/home/cloud2.png';
import HeroMockup from './HeroMockup';
import ScrollIndicator from './ScrollIndicator';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 120px 24px 80px;
  box-sizing: border-box;
  background: radial-gradient(ellipse at 50% 30%, rgba(255, 145, 66, 0.03) 0%, ${Color.WHITE} 70%);
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  ${colFlex({ justify: 'flex-start', align: 'center' })};

  ${mobileMediaQuery} {
    padding: 100px 20px 60px;
  }
`;

const ContentWrapper = styled(motion.div)`
  z-index: 1;
  ${colFlex({ align: 'center' })};
`;

const MainCopy = styled.h1`
  text-align: center;
  ${displayHeadingTypography};
`;

const OrangeText = styled.span`
  color: ${Color.KIO_ORANGE};
`;

const SubCopy = styled.p`
  margin-top: 20px;
  text-align: center;
  ${subheadingTypography};
`;

const KioHighlight = styled.span`
  transition: color 0.15s ease, text-shadow 0.15s ease;
  color: var(--kio-color, inherit);
  text-shadow: var(--kio-shadow, none);
`;

const MobileOnlyBreak = styled.br`
  display: none;

  ${mobileMediaQuery} {
    display: block;
  }
`;

const CtaRow = styled.div`
  margin-top: 36px;
  gap: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 10px;
    ${colFlex({ justify: 'center', align: 'center' })};
  }
`;

const CtaButton = styled(Link)`
  padding: 18px 48px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border-radius: 999px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }

  ${mobileMediaQuery} {
    padding: 16px 36px;
    font-size: 16px;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 18px 48px;
  background: transparent;
  color: #6b7684;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #e5e8eb;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:active {
    background: #f2f4f6;
    transition: 0ms;
  }

  ${mobileMediaQuery} {
    padding: 16px 36px;
    font-size: 16px;
  }
`;

const CloudImage = styled.img`
  position: absolute;
  pointer-events: none;
  opacity: 0.12;
`;

const SUB_COPY_COLOR: [number, number, number] = [107, 118, 132];
const KIO_ORANGE_RGB: [number, number, number] = [255, 145, 66];

function lerpRgb(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

function HeroSection() {
  const { isLoggedIn } = useAuthentication();
  const containerRef = useRef<HTMLDivElement>(null);
  const kioRef = useRef<HTMLSpanElement>(null);
  const { mousePos, isHovering, intensity, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow(containerRef, kioRef);
  const { scrollY } = useScroll();
  const cloud1Y = useTransform(scrollY, [0, 500], [0, -80]);
  const cloud2Y = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <Container ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MouseGlow x={mousePos.x} y={mousePos.y} visible={isHovering} />
      <motion.div style={{ position: 'absolute', top: '4%', left: '2%', y: cloud1Y }}>
        <CloudImage src={cloud1} alt="" width={240} />
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '10%', right: '2%', y: cloud2Y }}>
        <CloudImage src={cloud2} alt="" width={260} />
      </motion.div>

      <ContentWrapper initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
        <MainCopy>
          축제는 <OrangeText>즐기라고</OrangeText>
          <MobileOnlyBreak /> 있는 거니까
        </MainCopy>
        <SubCopy>
          QR 주문, 실시간 주문 관리, 자동 정산까지
          <br />
          주점 운영의 모든 것을{' '}
          <KioHighlight
            ref={kioRef}
            style={
              {
                '--kio-color': lerpRgb(SUB_COPY_COLOR, KIO_ORANGE_RGB, intensity),
                '--kio-shadow': `0 0 ${24 * intensity}px rgba(255, 145, 66, ${0.5 * intensity})`,
              } as React.CSSProperties
            }
          >
            키오스쿨
          </KioHighlight>
          이 대신할게요
        </SubCopy>
        <CtaRow>
          <CtaButton to={ADMIN_ROUTES.HOME}>{isLoggedIn() ? '어드민 홈으로' : '무료로 시작하기'}</CtaButton>
          <SecondaryButton to={USER_ROUTES.INFO}>서비스 알아보기</SecondaryButton>
        </CtaRow>
      </ContentWrapper>

      <HeroMockup />
      <ScrollIndicator />
    </Container>
  );
}

export default HeroSection;
