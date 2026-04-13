import { useRef } from 'react';
import styled from '@emotion/styled';
import Typewriter from 'typewriter-effect';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { captionTypography, headingTypography, subheadingTypography } from '@styles/landingTypography';
import { ADMIN_ROUTES, USER_ROUTES } from '@constants/routes';
import useAuthentication from '@hooks/useAuthentication';
import useMouseGlow, { MouseGlow } from './useMouseGlow';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 160px 24px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #ffffff 0%, #faf9f7 100%);
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    padding: 100px 24px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  ${colFlex({ align: 'center' })};
`;

const Title = styled.h2`
  text-align: center;
  ${headingTypography};
`;

const TypewriterLine = styled.div`
  display: inline;

  .Typewriter {
    display: inline;
  }

  .Typewriter__wrapper {
    color: ${Color.KIO_ORANGE};
    font-weight: 800;
    text-shadow: var(--kio-shadow, none);
    transition: text-shadow 0.15s ease;
  }

  .Typewriter__cursor {
    color: ${Color.KIO_ORANGE};
    font-weight: 300;
  }
`;

const Subtitle = styled.p`
  margin-top: 16px;
  text-align: center;
  ${subheadingTypography};
`;

const CtaButton = styled(Link)`
  padding: 20px 52px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 18px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(255, 145, 66, 0.25);
  transition: background 0.2s ease;

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }

  ${mobileMediaQuery} {
    padding: 16px 40px;
    font-size: 16px;
  }
`;

const CtaRow = styled.div`
  margin-top: 40px;
  gap: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 10px;
    ${colFlex({ align: 'center' })};
  }
`;

const SecondaryButton = styled(Link)`
  padding: 20px 52px;
  background: transparent;
  color: #6b7684;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #e5e8eb;
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
    padding: 16px 40px;
    font-size: 16px;
  }
`;

const Reassurance = styled.p`
  margin-top: 16px;
  text-align: center;
  ${captionTypography};
`;

function CtaSection() {
  const { isLoggedIn } = useAuthentication();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const kioRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(titleRef, { once: true, amount: 0.3 });
  const { mousePos, isHovering, intensity, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow(containerRef, kioRef);

  return (
    <Container ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MouseGlow x={mousePos.x} y={mousePos.y} visible={isHovering} />
      <ContentWrapper>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Title>
            이번 축제,
            <br />
            <TypewriterLine ref={kioRef} style={{ '--kio-shadow': `0 0 ${28 * intensity}px rgba(255, 145, 66, ${0.6 * intensity})` } as React.CSSProperties}>
              {isInViewport && (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(300)
                      .typeString('키오스쿨')
                      .pauseFor(400)
                      .callFunction(({ elements }) => {
                        const cursor = elements.cursor;
                        if (cursor) cursor.style.display = 'none';
                      })
                      .start();
                  }}
                  options={{ delay: 100, cursor: '|' }}
                />
              )}
            </TypewriterLine>
            과 함께하세요
          </Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
          <Subtitle>가입부터 주점 운영까지, 3 분이면 준비 끝</Subtitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        >
          <CtaRow>
            <CtaButton to={ADMIN_ROUTES.HOME}>{isLoggedIn() ? '어드민 홈으로' : '무료로 시작하기'}</CtaButton>
            <SecondaryButton to={USER_ROUTES.INFO}>서비스 알아보기</SecondaryButton>
          </CtaRow>
          <Reassurance>별도 비용 없이 시작할 수 있어요</Reassurance>
        </motion.div>
      </ContentWrapper>
    </Container>
  );
}

export default CtaSection;
