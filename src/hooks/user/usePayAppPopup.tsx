// 토스·카카오페이 송금 링크를 새 창으로 연다. 링크는 금액 없이 저장돼 있어 뒤에 &amount=를 붙인다.
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
// 카카오페이 링크(https)는 카카오 웹 페이지를 먼저 받은 뒤 앱으로 넘어간다. 축제 현장처럼 느린 망에서
// 5초 안에 창을 닫으면 앱이 열리기 전에 끊길 수 있어, 웹 링크는 창을 더 오래 둔다.
const WEB_LINK_CLOSE_DELAY = 20000;

const getCloseDelay = (accountUrl: string, closeDelay: number) => (/^https?:\/\//.test(accountUrl) ? Math.max(closeDelay, WEB_LINK_CLOSE_DELAY) : closeDelay);

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
    const popup = isSafari ? createPopup() : null;

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
