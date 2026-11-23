import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { LandingColor } from '@resources/colors';
import {
  LANDING_BUTTON_FORWARD_BLOCKED_PROPS,
  LANDING_BUTTON_SIZE_STYLE,
  LANDING_BUTTON_VARIANT_STYLE,
  LandingButtonSize,
  LandingButtonVariant,
  landingButtonBaseStyle,
  landingButtonMobileStyle,
} from '@styles/landingButtonStyles';
import PlayIcon from './PlayIcon';

const PLAY_ICON_COLORS: Record<LandingButtonVariant, { circle: string; triangle: string }> = {
  primary: { circle: '#ffffff', triangle: LandingColor.ACCENT },
  secondary: { circle: LandingColor.ACCENT, triangle: '#ffffff' },
  outline: { circle: LandingColor.ACCENT, triangle: '#ffffff' },
  outlineOnDark: { circle: LandingColor.ACCENT, triangle: '#ffffff' },
};

const ButtonLink = styled(Link, { shouldForwardProp: (prop) => !LANDING_BUTTON_FORWARD_BLOCKED_PROPS.includes(prop) })<{
  variant: LandingButtonVariant;
  size: LandingButtonSize;
}>`
  ${landingButtonBaseStyle}
  ${({ variant }) => LANDING_BUTTON_VARIANT_STYLE[variant]}
  ${({ size }) => LANDING_BUTTON_SIZE_STYLE[size]}
  ${landingButtonMobileStyle}
`;

interface LandingLinkButtonProps {
  to: string;
  label: string;
  variant?: LandingButtonVariant;
  size?: LandingButtonSize;
  withPlayIcon?: boolean;
  onClick?: () => void;
}

function LandingLinkButton({ to, label, variant = 'primary', size = 'medium', withPlayIcon = false, onClick }: LandingLinkButtonProps) {
  const playIconColors = PLAY_ICON_COLORS[variant];

  return (
    <ButtonLink to={to} variant={variant} size={size} onClick={onClick}>
      {withPlayIcon && <PlayIcon circleColor={playIconColors.circle} triangleColor={playIconColors.triangle} />}
      {label}
    </ButtonLink>
  );
}

export default LandingLinkButton;
