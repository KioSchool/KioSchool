import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from './globalStyles';

export const LANDING_CONTENT_WIDTH = 1180;
const LANDING_GUTTER = 24;
const MOBILE_GUTTER = 20;

export type LandingTone = 'white' | 'grey' | 'dark';

const TONE_BACKGROUND: Record<LandingTone, string> = {
  white: '#ffffff',
  grey: LandingColor.SURFACE,
  dark: LandingColor.DARK,
};

const TONE_TEXT: Record<LandingTone, string> = {
  white: LandingColor.TEXT,
  grey: LandingColor.TEXT,
  dark: '#ffffff',
};

const compactTopStyle = css`
  padding-top: 0;
`;

export const LandingSection = styled.section<{ tone?: LandingTone; compactTop?: boolean }>`
  width: 100%;
  padding: 200px 0;
  background: ${({ tone = 'white' }) => TONE_BACKGROUND[tone]};
  color: ${({ tone = 'white' }) => TONE_TEXT[tone]};
  ${({ compactTop }) => compactTop && compactTopStyle}

  ${mobileMediaQuery} {
    padding: 120px 0;
    ${({ compactTop }) => compactTop && compactTopStyle}
  }
`;

export const LandingInner = styled.div`
  width: 100%;
  max-width: ${LANDING_CONTENT_WIDTH + LANDING_GUTTER * 2}px;
  margin: 0 auto;
  padding: 0 ${LANDING_GUTTER}px;

  ${mobileMediaQuery} {
    padding: 0 ${MOBILE_GUTTER}px;
  }
`;

export const landingTitleTypography = css`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

export const landingLeadTypography = css`
  margin: 16px 0 0;
  font-size: 18px;
  line-height: 1.55;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    margin-top: 12px;
    font-size: 16px;
  }
`;

export const landingBodyTypography = css`
  margin: 8px 0 0;
  font-size: 16px;
  line-height: 1.5;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 15px;
  }
`;

export const landingEyebrowTypography = css`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

export const landingFrameStyle = css`
  overflow: hidden;
  border: 1px solid ${LandingColor.LINE};
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 32px ${LandingColor.SHADOW};

  ${mobileMediaQuery} {
    border-radius: 12px;
  }
`;
