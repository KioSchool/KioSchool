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

  const createPrePopupForSafari = () => (isSafariBrowser() ? createPopup() : null);

  const navigatePopupToToss = (popup: Window | null, tossAccountUrl: string, amount: number) => {
    if (popup && tossAccountUrl) {
      const tossUrl = createTossUrl(tossAccountUrl, amount);
      popup.location.replace(tossUrl);
    }
  };

  return {
    createPrePopupForSafari,
    navigatePopupToToss,
    closePopupWithDelay,
    createTossUrl,
    isSafariBrowser,
    createPopup,
  };
}

export default useTossPopup;
