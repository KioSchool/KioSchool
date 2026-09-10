import { useEffect, useRef, useState } from 'react';
import { buildDonationTossUrl, DONATION_ACCOUNT } from '@utils/donation';
import { DonationMethod } from './useCustomerDonationModal';
import useTossPopup from './useTossPopup';

const COPY_ERROR_MESSAGE = '계좌번호를 복사하지 못했어요. 위 계좌번호를 직접 입력하거나 다시 시도해 주세요.';
const TOSS_ERROR_MESSAGE = '토스를 열지 못했어요. 팝업 차단을 해제하거나 계좌이체를 선택해 주세요.';

interface UseCustomerDonationActionParams {
  isActive: boolean;
  method: DonationMethod;
  amount: number;
  onDonate: () => void;
}

function useCustomerDonationAction({ isActive, method, amount, onDonate }: UseCustomerDonationActionParams) {
  const { openTossPopupSync } = useTossPopup();
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const attemptRef = useRef(0);
  const copyingRef = useRef(false);

  useEffect(() => {
    setErrorMessage('');
    setIsCopying(false);
    copyingRef.current = false;

    return () => {
      attemptRef.current += 1;
    };
  }, [isActive, method]);

  const handleAccountDonate = async () => {
    if (!isActive || copyingRef.current) return;

    if (!navigator.clipboard?.writeText) {
      setErrorMessage(COPY_ERROR_MESSAGE);
      return;
    }

    const attempt = attemptRef.current;
    copyingRef.current = true;
    setIsCopying(true);
    setErrorMessage('');

    try {
      await navigator.clipboard.writeText(DONATION_ACCOUNT.accountNo);
    } catch {
      if (attempt === attemptRef.current) {
        copyingRef.current = false;
        setIsCopying(false);
        setErrorMessage(COPY_ERROR_MESSAGE);
      }
      return;
    }

    if (attempt !== attemptRef.current) return;
    copyingRef.current = false;
    setIsCopying(false);
    onDonate();
  };

  const handleTossDonate = () => {
    if (!isActive) return;

    setErrorMessage('');
    try {
      const popup = openTossPopupSync({ tossAccountUrl: buildDonationTossUrl(), amount });
      if (!popup) {
        setErrorMessage(TOSS_ERROR_MESSAGE);
        return;
      }
    } catch {
      setErrorMessage(TOSS_ERROR_MESSAGE);
      return;
    }
    onDonate();
  };

  return { errorMessage, isCopying, handleAccountDonate, handleTossDonate };
}

export default useCustomerDonationAction;
