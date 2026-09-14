import { API_ERROR_CODES } from '@constants/errorCodes';
import { isApiErrorCode } from '@utils/apiError';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export const CAPTCHA_FAILURE_REASON = {
  LOAD_FAILED: 'load_failed',
  WIDGET_ERROR: 'widget_error',
  SERVER_REJECTED: 'server_rejected',
} as const;

export type CaptchaFailureReason = typeof CAPTCHA_FAILURE_REASON[keyof typeof CAPTCHA_FAILURE_REASON];

const CONTENT_KEPT_GUIDE = '작성한 내용은 그대로 남아 있어요.';

export const CAPTCHA_FAILURE_MESSAGE: Record<CaptchaFailureReason, string> = {
  [CAPTCHA_FAILURE_REASON.LOAD_FAILED]: `보안 확인을 불러오지 못했어요. 광고 차단 기능을 끈 뒤 문의 접수하기를 다시 눌러 주세요. ${CONTENT_KEPT_GUIDE}`,
  [CAPTCHA_FAILURE_REASON.WIDGET_ERROR]: `보안 확인에 실패했어요. 문의 접수하기를 다시 눌러 주세요. ${CONTENT_KEPT_GUIDE}`,
  [CAPTCHA_FAILURE_REASON.SERVER_REJECTED]: `보안 확인에 실패했어요. 문의 접수하기를 다시 눌러 주세요. ${CONTENT_KEPT_GUIDE}`,
};

export class CaptchaError extends Error {
  readonly reason: CaptchaFailureReason;

  constructor(reason: CaptchaFailureReason) {
    super(`Captcha failed: ${reason}`);
    this.reason = reason;
  }
}

export function getCaptchaFailureReason(error: unknown): CaptchaFailureReason | null {
  if (error instanceof CaptchaError) return error.reason;
  if (isApiErrorCode(error, API_ERROR_CODES.CAPTCHA_VERIFICATION_FAILED)) return CAPTCHA_FAILURE_REASON.SERVER_REJECTED;
  return null;
}

let scriptPromise: Promise<void> | null = null;

export function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}
