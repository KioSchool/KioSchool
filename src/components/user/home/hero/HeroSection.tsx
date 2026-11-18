import { useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import { LANDING_BUTTON_LABEL, LANDING_DEMO_PATH } from '@constants/data/landingContent';
import LandingLinkButton from '@components/user/landing/LandingLinkButton';
import LandingStartButton from '@components/user/landing/LandingStartButton';
import useMouseGlow, { MouseGlow } from '@components/user/landing/useMouseGlow';
import cloud1 from '@resources/image/home/cloud1.png';
import cloud2 from '@resources/image/home/cloud2.png';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, landingEyebrowTypography, landingLeadTypography } from '@styles/landingStyles';
import HeroVisual from './HeroVisual';
import ScrollIndicator from './ScrollIndicator';

const CLOUD_SCROLL_RANGE = [0, 500];
const CLOUD_LEFT_SHIFT = [0, -80];
const CLOUD_RIGHT_SHIFT = [0, -40];
const LEAD_RGB: [number, number, number] = [78, 89, 104];
const ACCENT_RGB: [number, number, number] = [255, 145, 66];
const KIO_GLOW_BLUR = 24;
const KIO_GLOW_ALPHA = 0.5;

function lerpRgb(from: [number, number, number], to: [number, number, number], ratio: number) {
  const channels = from.map((value, index) => Math.round(value + (to[index] - value) * ratio));
  return `rgb(${channels.join(', ')})`;
}

const Section = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  color: ${LandingColor.TEXT};
`;

const CloudLeft = styled(motion.div)`
  position: absolute;
  top: 4%;
  left: 2%;
  pointer-events: none;
`;

const CloudRight = styled(motion.div)`
  position: absolute;
  top: 10%;
  right: 2%;
  pointer-events: none;
`;

const CloudImage = styled.img`
  display: block;
  opacity: 0.12;
`;

const Layout = styled.div`
  position: relative;
  padding: 120px 0 120px;
  gap: 48px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    padding: 96px 0 72px;
    gap: 40px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Text = styled(motion.div)`
  width: 500px;
  flex: none;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Eyebrow = styled.div`
  ${landingEyebrowTypography}
`;

const Title = styled.h1`
  margin: 0;
  font-size: 64px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 36px;
  }
`;

const Accent = styled.span`
  color: ${LandingColor.ACCENT_TEXT};
`;

const Lead = styled.p`
  ${landingLeadTypography}
`;

const KioHighlight = styled(motion.span)``;

const Buttons = styled.div`
  margin-top: 36px;
  gap: 10px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    margin-top: 28px;

    & > * {
      flex: 1;
    }
  }
`;

const InfoLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  text-decoration: none;
`;

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kioRef = useRef<HTMLSpanElement>(null);
  const { mousePos, isHovering, intensity, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow(containerRef, kioRef);
  const { scrollY } = useScroll();
  const cloudLeftY = useTransform(scrollY, CLOUD_SCROLL_RANGE, CLOUD_LEFT_SHIFT);
  const cloudRightY = useTransform(scrollY, CLOUD_SCROLL_RANGE, CLOUD_RIGHT_SHIFT);
  const kioColor = lerpRgb(LEAD_RGB, ACCENT_RGB, intensity);
  const kioShadow = `0 0 ${KIO_GLOW_BLUR * intensity}px rgba(255, 145, 66, ${KIO_GLOW_ALPHA * intensity})`;

  return (
    <Section ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MouseGlow x={mousePos.x} y={mousePos.y} visible={isHovering} />
      <CloudLeft style={{ y: cloudLeftY }}>
        <CloudImage src={cloud1} alt="" width={240} />
      </CloudLeft>
      <CloudRight style={{ y: cloudRightY }}>
        <CloudImage src={cloud2} alt="" width={260} />
      </CloudRight>
      <LandingInner>
        <Layout>
          <Text initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <Eyebrow>대학 축제 주점 주문 서비스</Eyebrow>
            <Title>
              축제는 <Accent>즐기라고</Accent>
              <br />
              있는 거니까
            </Title>
            <Lead>
              QR 주문, 실시간 주문 관리, 자동 정산까지
              <br />
              주점 운영의 모든 것을{' '}
              <KioHighlight ref={kioRef} animate={{ color: kioColor, textShadow: kioShadow }} transition={{ duration: 0.15 }}>
                키오스쿨
              </KioHighlight>
              이 대신할게요
            </Lead>
            <Buttons>
              <LandingStartButton location="hero" />
              <LandingLinkButton to={LANDING_DEMO_PATH} label={LANDING_BUTTON_LABEL.DEMO} variant="outline" withPlayIcon />
            </Buttons>
            <InfoLink to={USER_ROUTES.INFO}>{LANDING_BUTTON_LABEL.INFO} ›</InfoLink>
          </Text>
          <HeroVisual />
        </Layout>
      </LandingInner>
      <ScrollIndicator />
    </Section>
  );
}

export default HeroSection;
