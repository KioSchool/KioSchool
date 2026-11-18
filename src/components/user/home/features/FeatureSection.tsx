import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getDemoPath } from '@constants/routes';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, LandingTone, landingBodyTypography } from '@styles/landingStyles';

export type FeatureLayout = 'row' | 'column';

const LAYOUT_STYLE: Record<FeatureLayout, ReturnType<typeof css>> = {
  row: css`
    gap: 64px;
    ${rowFlex({ align: 'center' })}
  `,
  column: css`
    gap: 56px;
    ${colFlex({ align: 'stretch' })}
  `,
};

const Layout = styled.div<{ layout: FeatureLayout }>`
  ${({ layout }) => LAYOUT_STYLE[layout]}

  ${mobileMediaQuery} {
    gap: 32px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const TEXT_WIDTH: Record<FeatureLayout, number> = {
  row: 420,
  column: 640,
};

const Text = styled.div<{ layout: FeatureLayout }>`
  flex: none;
  width: ${({ layout }) => TEXT_WIDTH[layout]}px;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Description = styled.p`
  ${landingBodyTypography}
  margin-top: 16px;
  white-space: pre-line;
`;

const DemoLink = styled(Link)`
  display: inline-block;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
  text-decoration: none;
`;

const Visual = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

interface FeatureSectionProps {
  eyebrow: string;
  titleLines: string[];
  description: string;
  layout: FeatureLayout;
  tone: LandingTone;
  demoStep: number;
  children: ReactNode;
}

function FeatureSection({ eyebrow, titleLines, description, layout, tone, demoStep, children }: FeatureSectionProps) {
  return (
    <LandingSection tone={tone}>
      <LandingInner>
        <Layout layout={layout}>
          <Text layout={layout}>
            <SectionHeading eyebrow={eyebrow} titleLines={titleLines} />
            <RevealOnScroll delay={0.1}>
              <Description>{description}</Description>
              <DemoLink to={getDemoPath(demoStep)}>이 장면 체험해보기 ›</DemoLink>
            </RevealOnScroll>
          </Text>
          <Visual>
            <RevealOnScroll offsetY={24} delay={0.1}>
              {children}
            </RevealOnScroll>
          </Visual>
        </Layout>
      </LandingInner>
    </LandingSection>
  );
}

export default FeatureSection;
