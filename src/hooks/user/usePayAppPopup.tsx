import { match } from 'ts-pattern';
interface PayAppPopupOptions {
  accountUrl?: string | null;
  amount: number;
  closeDelay?: number;
}

interface PayAppPopupWithPromiseOptions extends PayAppPopupOptions {
  promise: Promise<any>;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const OPEN_FAILED_MESSAGE = '송금 앱을 열 수 없어요.';
// https 링크(카카오페이)는 웹 페이지를 거쳐 앱으로 넘어가 느린 망에서 5초 안에 닫으면 앱이 안 열린다
const WEB_LINK_CLOSE_DELAY = 20000;

const getCloseDelay = (accountUrl: string, closeDelay: number) => {
  if (/^https?:\/\//.test(accountUrl)) return Math.max(closeDelay, WEB_LINK_CLOSE_DELAY);
  return closeDelay;
};

function usePayAppPopup() {
  const createPayAppUrl = (accountUrl: string, amount: number) => {
    return `${accountUrl}&amount=${amount}`;
  };

  const isSafariBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('safari') && !userAgent.includes('chrome');
  };

  const createPopup = (url?: string) => window.open(url, '_blank');

  const closePopupWithDelay = (popup: Window | null, delay: number) => {
    if (popup && !popup.closed) {
      setTimeout(() => {
        popup.close();
      }, delay);
    }
  };

  const openPayAppSync = ({ accountUrl, amount, closeDelay = 5000 }: PayAppPopupOptions) => {
    if (!accountUrl) {
      alert(OPEN_FAILED_MESSAGE);
      return null;
    }

    const payAppUrl = createPayAppUrl(accountUrl, amount);
    const isSafari = isSafariBrowser();

    let popup: Window | null = null;

    if (isSafari) {
      popup = createPopup();
      if (popup) {
        popup.location.replace(payAppUrl);
      }
    } else {
      popup = createPopup(payAppUrl);
    }

    closePopupWithDelay(popup, getCloseDelay(accountUrl, closeDelay));
    return popup;
  };

  const openPayAppWithPromise = ({ accountUrl, amount, closeDelay = 5000, promise, onSuccess, onError }: PayAppPopupWithPromiseOptions) => {
    if (!accountUrl) {
      alert(OPEN_FAILED_MESSAGE);
      return;
    }

    const isSafari = isSafariBrowser();
    const popup = match(isSafari)
      .with(true, () => createPopup())
      .otherwise(() => null);

    return promise
      .then((response) => {
        onSuccess?.(response);

        const payAppUrl = createPayAppUrl(accountUrl, amount);
        if (!isSafari) {
          createPopup(payAppUrl);
        } else if (popup) {
          popup.location.replace(payAppUrl);
        }
      })
      .catch((error) => {
        onError?.(error);
      })
      .finally(() => {
        closePopupWithDelay(popup, getCloseDelay(accountUrl, closeDelay));
      });
  };

  return {
    openPayAppSync,
    openPayAppWithPromise,
  };
}

export default usePayAppPopup;
