import { DemoEntry, GA_EVENT } from '@constants/analytics';
import { LANDING_BUTTON_LABEL } from '@constants/data/landingContent';
import { getDemoEntryPath } from '@constants/routes';
import { LandingButtonSize, LandingButtonVariant } from '@styles/landingButtonStyles';
import { trackEvent } from '@utils/analytics';
import LandingLinkButton from './LandingLinkButton';

const DEMO_CTA_LABEL = 'demo';

interface LandingDemoButtonProps {
  entry: DemoEntry;
  variant?: LandingButtonVariant;
  size?: LandingButtonSize;
}

function LandingDemoButton({ entry, variant = 'primary', size = 'medium' }: LandingDemoButtonProps) {
  const handleClick = () => {
    trackEvent(GA_EVENT.CTA_CLICK, { location: entry, label: DEMO_CTA_LABEL });
  };

  return <LandingLinkButton to={getDemoEntryPath(entry)} label={LANDING_BUTTON_LABEL.DEMO} variant={variant} size={size} withPlayIcon onClick={handleClick} />;
}

export default LandingDemoButton;
