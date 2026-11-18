import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { LANDING_BUTTON_LABEL, LANDING_DEMO_PATH } from '@constants/data/landingContent';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, landingLeadTypography, landingTitleTypography } from '@styles/landingStyles';
import LandingLinkButton from './LandingLinkButton';
import LandingStartButton from './LandingStartButton';
import useMouseGlow, { MouseGlow } from './useMouseGlow';

const BRAND_NAME = '키오스쿨';
const KIO_GLOW_BLUR = 28;
const KIO_GLOW_ALPHA = 0.6;
const TYPEWRITER_START_DELAY_MS = 300;
const TYPEWRITER_END_DELAY_MS = 400;
const TYPEWRITER_KEY_DELAY_MS = 100;

const Section = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 160px 0;
  background: ${LandingColor.DARK};
  color: #ffffff;
  text-align: center;

  ${mobileMediaQuery} {
    padding: 112px 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  ${landingTitleTypography}
`;

const Accent = styled(motion.span)`
  display: inline-block;
  min-width: 2em;
  color: ${LandingColor.ACCENT_TEXT};
`;

const Lead = styled.p`
  ${landingLeadTypography}
  color: ${LandingColor.DARK_SUB_TEXT};
`;

const Buttons = styled.div`
  margin-top: 40px;
  gap: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    ${colFlex({ align: 'stretch' })}
  }
`;

const Note = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: ${LandingColor.DARK_CAPTION};
`;

interface LandingCtaSectionProps {
  location: string;
}

function LandingCtaSection({ location }: LandingCtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const kioRef = useRef<HTMLSpanElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const { mousePos, isHovering, intensity, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow(containerRef, kioRef);
  const isTypewriterVisible = hasMounted && isTitleInView;
  const kioShadow = `0 0 ${KIO_GLOW_BLUR * intensity}px rgba(255, 145, 66, ${KIO_GLOW_ALPHA * intensity})`;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Section ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MouseGlow x={mousePos.x} y={mousePos.y} visible={isHovering} />
      <Content>
        <LandingInner>
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Title>
              이번 축제,{' '}
              <Accent ref={kioRef} animate={{ textShadow: kioShadow }} transition={{ duration: 0.15 }}>
                {isTypewriterVisible && (
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .pauseFor(TYPEWRITER_START_DELAY_MS)
                        .typeString(BRAND_NAME)
                        .pauseFor(TYPEWRITER_END_DELAY_MS)
                        .callFunction(({ elements }) => {
                          const { cursor } = elements;
                          if (cursor) cursor.style.display = 'none';
                        })
                        .start();
                    }}
                    options={{ delay: TYPEWRITER_KEY_DELAY_MS, cursor: '|' }}
                  />
                )}
                {!isTypewriterVisible && BRAND_NAME}
              </Accent>
              과 함께하세요
            </Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <Lead>가입부터 주점 운영까지, 3분이면 준비 끝</Lead>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          >
            <Buttons>
              <LandingStartButton location={location} size="large" />
              <LandingLinkButton to={LANDING_DEMO_PATH} label={LANDING_BUTTON_LABEL.DEMO} variant="outlineOnDark" size="large" withPlayIcon />
            </Buttons>
            <Note>별도 비용 없이 시작할 수 있어요</Note>
          </motion.div>
        </LandingInner>
      </Content>
    </Section>
  );
}

export default LandingCtaSection;
