import styled from '@emotion/styled';
import {
  LANDING_BUTTON_FORWARD_BLOCKED_PROPS,
  LANDING_BUTTON_SIZE_STYLE,
  LANDING_BUTTON_VARIANT_STYLE,
  LandingButtonSize,
  LandingButtonVariant,
  landingButtonBaseStyle,
  landingButtonMobileStyle,
} from '@styles/landingButtonStyles';

const Button = styled('button', { shouldForwardProp: (prop) => !LANDING_BUTTON_FORWARD_BLOCKED_PROPS.includes(prop) })<{
  variant: LandingButtonVariant;
  size: LandingButtonSize;
}>`
  ${landingButtonBaseStyle}
  ${({ variant }) => LANDING_BUTTON_VARIANT_STYLE[variant]}
  ${({ size }) => LANDING_BUTTON_SIZE_STYLE[size]}
  ${landingButtonMobileStyle}
`;

interface LandingButtonProps {
  label: string;
  onClick: () => void;
  variant?: LandingButtonVariant;
  size?: LandingButtonSize;
}

function LandingButton({ label, onClick, variant = 'primary', size = 'medium' }: LandingButtonProps) {
  return (
    <Button type="button" variant={variant} size={size} onClick={onClick}>
      {label}
    </Button>
  );
}

export default LandingButton;
