interface TossPopupOptions {
  tossAccountUrl?: string;
  amount: number;
  closeDelay?: number;
}

interface TossPopupWithPromiseOptions extends TossPopupOptions {
  promise: Promise<any>;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

function useTossPopup() {
  const createTossUrl = (tossAccountUrl: string, amount: number) => {
    return `${tossAccountUrl}&amount=${amount}`;
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

  const openTossPopupSync = ({ tossAccountUrl, amount, closeDelay = 5000 }: TossPopupOptions) => {
    if (!tossAccountUrl) {
      alert('토스 이체 정보를 가져올 수 없습니다.');
      return null;
    }

    const tossUrl = createTossUrl(tossAccountUrl, amount);
    const isSafari = isSafariBrowser();

    let popup: Window | null = null;

    if (isSafari) {
      popup = createPopup();
      if (popup) {
        popup.location.replace(tossUrl);
      }
    } else {
      popup = createPopup(tossUrl);
    }

    closePopupWithDelay(popup, closeDelay);
    return popup;
  };

  const openTossPopupWithPromise = ({ tossAccountUrl, amount, closeDelay = 5000, promise, onSuccess, onError }: TossPopupWithPromiseOptions) => {
    if (!tossAccountUrl) {
      alert('토스 이체 정보를 가져올 수 없습니다.');
      return;
    }

    const isSafari = isSafariBrowser();
    const popup = isSafari ? createPopup() : null;

    return promise
      .then((response) => {
        onSuccess?.(response);

        const tossUrl = createTossUrl(tossAccountUrl, amount);
        if (!isSafari) {
          createPopup(tossUrl);
        } else if (popup) {
          popup.location.replace(tossUrl);
        }
      })
      .catch((error) => {
        onError?.(error);
      })
      .finally(() => {
        closePopupWithDelay(popup, closeDelay);
      });
  };

  return {
    openTossPopupSync,
    openTossPopupWithPromise,
    createTossUrl,
    isSafariBrowser,
    createPopup,
    closePopupWithDelay,
  };
}

export default useTossPopup;
