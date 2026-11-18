import { css } from '@emotion/react';
import { LandingColor } from '@resources/colors';
import { rowFlex } from './flexStyles';
import { mobileMediaQuery } from './globalStyles';

export type LandingButtonVariant = 'primary' | 'secondary' | 'outline' | 'outlineOnDark';
export type LandingButtonSize = 'small' | 'medium' | 'large';

export const LANDING_BUTTON_FORWARD_BLOCKED_PROPS = ['variant', 'size'];

export const LANDING_BUTTON_VARIANT_STYLE: Record<LandingButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    border: 1px solid ${LandingColor.ACCENT};
    background: ${LandingColor.ACCENT};
    color: #ffffff;

    &:hover {
      border-color: #ffa562;
      background: #ffa562;
    }

    &:active {
      border-color: #e87d30;
      background: #e87d30;
      transition: 0ms;
    }
  `,
  secondary: css`
    border: 1px solid #f2f4f6;
    background: #f2f4f6;
    color: ${LandingColor.TEXT};

    &:hover {
      border-color: #e9ecef;
      background: #e9ecef;
    }

    &:active {
      border-color: #dee2e6;
      background: #dee2e6;
      transition: 0ms;
    }
  `,
  outline: css`
    border: 1px solid ${LandingColor.OUTLINE};
    background: #ffffff;
    color: ${LandingColor.TEXT};

    &:hover {
      background: #f8f9fa;
    }

    &:active {
      background: #f2f4f6;
      transition: 0ms;
    }
  `,
  outlineOnDark: css`
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &:active {
      background: rgba(255, 255, 255, 0.14);
      transition: 0ms;
    }
  `,
};

export const LANDING_BUTTON_SIZE_STYLE: Record<LandingButtonSize, ReturnType<typeof css>> = {
  small: css`
    height: 40px;
    padding: 0 16px;
    font-size: 15px;
  `,
  medium: css`
    height: 48px;
    padding: 0 22px;
    font-size: 16px;
  `,
  large: css`
    height: 56px;
    padding: 0 28px;
    font-size: 18px;
  `,
};

export const landingButtonBaseStyle = css`
  gap: 8px;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

export const landingButtonMobileStyle = css`
  ${mobileMediaQuery} {
    height: 44px;
    font-size: 16px;
  }
`;
