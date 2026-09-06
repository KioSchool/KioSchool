export type DonationCardEventName = 'donation_card_view' | 'donation_card_click' | 'donation_card_dismiss';

type DonationCardEventParams = Record<string, string | number>;

// repo의 커스텀 ImportMetaEnv에는 Vite 기본 DEV 플래그가 없어 VITE_ENVIRONMENT로 판별한다.
const PRODUCTION_ENVIRONMENT = 'production';
const IS_DEV_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT !== PRODUCTION_ENVIRONMENT;

/**
 * GA4 계측(worktree-ga4-instrumentation)이 master에 머지되면 이 함수 본문을
 * `trackEvent(GA_EVENT.DONATION_CARD_*, params)` 호출로 교체한다. 호출부는 그대로 둔다.
 */
export function reportDonationCardEvent(name: DonationCardEventName, params: DonationCardEventParams): void {
  if (IS_DEV_ENVIRONMENT) {
    // eslint-disable-next-line no-console
    console.debug('[donation-card]', name, params);
  }
}
