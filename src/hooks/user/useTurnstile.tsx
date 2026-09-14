import { useCallback, useRef, useState } from 'react';
import { CAPTCHA_FAILURE_REASON, CaptchaError, loadTurnstileScript } from '@utils/turnstile';

const TOKEN_WAIT_TIMEOUT_MS = 120_000;

interface PendingToken {
  resolve: (token: string) => void;
  reject: (error: CaptchaError) => void;
  timeoutId: number;
}

/**
 * Turnstile 토큰을 제출 직전에 발급받는다.
 * 토큰은 5분 뒤 만료되고 한 번만 검증되므로 페이지 진입 시 미리 받아두지 않는다.
 * 대부분은 위젯이 보이지 않고, Cloudflare가 의심할 때만 체크박스가 slot에 나타난다.
 */
function useTurnstile(siteKey: string | undefined) {
  const slotElementRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const widgetPromiseRef = useRef<Promise<string> | null>(null);
  const pendingRef = useRef<PendingToken | null>(null);
  const [isInteractionRequired, setIsInteractionRequired] = useState(false);

  const settle = (result: string | CaptchaError) => {
    const pending = pendingRef.current;
    if (!pending) return;

    pendingRef.current = null;
    window.clearTimeout(pending.timeoutId);
    setIsInteractionRequired(false);

    if (result instanceof CaptchaError) {
      pending.reject(result);
      return;
    }
    pending.resolve(result);
  };

  const renderWidget = async (key: string): Promise<string> => {
    try {
      await loadTurnstileScript();
    } catch {
      throw new CaptchaError(CAPTCHA_FAILURE_REASON.LOAD_FAILED);
    }

    if (widgetIdRef.current) return widgetIdRef.current;
    if (!slotElementRef.current || !window.turnstile) throw new CaptchaError(CAPTCHA_FAILURE_REASON.LOAD_FAILED);

    widgetIdRef.current = window.turnstile.render(slotElementRef.current, {
      sitekey: key,
      execution: 'execute',
      appearance: 'interaction-only',
      retry: 'never',
      callback: (token) => settle(token),
      'error-callback': () => settle(new CaptchaError(CAPTCHA_FAILURE_REASON.WIDGET_ERROR)),
      'timeout-callback': () => settle(new CaptchaError(CAPTCHA_FAILURE_REASON.WIDGET_ERROR)),
      'unsupported-callback': () => settle(new CaptchaError(CAPTCHA_FAILURE_REASON.WIDGET_ERROR)),
      'before-interactive-callback': () => setIsInteractionRequired(true),
      'after-interactive-callback': () => setIsInteractionRequired(false),
    });

    return widgetIdRef.current;
  };

  const ensureWidget = (key: string): Promise<string> => {
    if (widgetPromiseRef.current) return widgetPromiseRef.current;

    const widgetPromise: Promise<string> = renderWidget(key).catch((error) => {
      if (widgetPromiseRef.current === widgetPromise) widgetPromiseRef.current = null;
      throw error;
    });
    widgetPromiseRef.current = widgetPromise;

    return widgetPromise;
  };

  const removeWidget = () => {
    settle(new CaptchaError(CAPTCHA_FAILURE_REASON.WIDGET_ERROR));
    if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
    widgetIdRef.current = null;
    widgetPromiseRef.current = null;
  };

  // 접수 완료 화면 등으로 slot이 사라졌다 다시 생기면 위젯도 새 slot에 다시 붙인다
  const slotRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (slotElementRef.current === element) return;

      removeWidget();
      slotElementRef.current = element;

      if (element && siteKey) ensureWidget(siteKey).catch(() => {});
    },
    [siteKey],
  );

  const getToken = async (): Promise<string | undefined> => {
    if (!siteKey) return undefined;

    const widgetId = await ensureWidget(siteKey);

    return new Promise((resolve, reject) => {
      const timeoutId = window.setTimeout(() => settle(new CaptchaError(CAPTCHA_FAILURE_REASON.WIDGET_ERROR)), TOKEN_WAIT_TIMEOUT_MS);
      pendingRef.current = { resolve, reject, timeoutId };

      window.turnstile?.reset(widgetId);
      window.turnstile?.execute(widgetId);
    });
  };

  return { slotRef, getToken, isInteractionRequired };
}

export default useTurnstile;
