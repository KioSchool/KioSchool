import { match } from 'ts-pattern';
import { ADMIN_ROUTES } from '@constants/routes';
import { GA_EVENT } from '@constants/analytics';
import { LANDING_BUTTON_LABEL } from '@constants/data/landingContent';
import useMarketingLoginStatus from '@hooks/useMarketingLoginStatus';
import { LandingButtonSize } from '@styles/landingButtonStyles';
import { trackEvent } from '@utils/analytics';
import LandingLinkButton from './LandingLinkButton';

const ADMIN_HOME_LABEL = '어드민 홈으로';

interface LandingStartButtonProps {
  location: string;
  size?: LandingButtonSize;
}

function LandingStartButton({ location, size = 'medium' }: LandingStartButtonProps) {
  const isLoggedIn = useMarketingLoginStatus();
  const { label, eventLabel } = match(isLoggedIn)
    .with(true, () => ({ label: ADMIN_HOME_LABEL, eventLabel: 'admin_home' }))
    .otherwise(() => ({ label: LANDING_BUTTON_LABEL.START, eventLabel: 'start_free' }));

  const handleClick = () => {
    trackEvent(GA_EVENT.CTA_CLICK, { location, label: eventLabel });
  };

  return <LandingLinkButton to={ADMIN_ROUTES.HOME} label={label} size={size} onClick={handleClick} />;
}

export default LandingStartButton;
