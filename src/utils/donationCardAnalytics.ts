import { GA_EVENT, GaEventName } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';

export type DonationCardEventName = 'donation_card_view' | 'donation_card_click' | 'donation_card_dismiss';

const EVENT_NAME_MAP: Record<DonationCardEventName, GaEventName> = {
  donation_card_view: GA_EVENT.DONATION_CARD_VIEW,
  donation_card_click: GA_EVENT.DONATION_CARD_CLICK,
  donation_card_dismiss: GA_EVENT.DONATION_CARD_DISMISS,
};

export function reportDonationCardEvent(name: DonationCardEventName, params: Record<string, unknown>): void {
  trackEvent(EVENT_NAME_MAP[name], params);
}
