import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { donationCardDismissedAtAtom } from '@jotai/user/atoms';
import { buildDonationTossUrl } from '@utils/donation';
import { reportDonationCardEvent } from '@utils/donationCardAnalytics';
import { DEFAULT_DONATION_AMOUNT, DonationCopy, pickCopyVariant } from '@constants/data/customerDonationCopy';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
const DISMISS_DURATION_MS = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND;

interface UseCustomerDonationCardParams {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
}

interface UseCustomerDonationCardResult {
  shouldRender: boolean;
  copy: DonationCopy;
  amount: number;
  donationUrl: string;
  selectAmount: (next: number) => void;
  reportDonateClick: () => void;
  dismiss: () => void;
}

function useCustomerDonationCard({ orderId, workspaceId, eligible }: UseCustomerDonationCardParams): UseCustomerDonationCardResult {
  const [dismissedAt, setDismissedAt] = useAtom(donationCardDismissedAtAtom);
  const [dismissedAtOnMount] = useState(() => dismissedAt);
  const [hidden, setHidden] = useState(false);
  const [amount, setAmount] = useState<number>(DEFAULT_DONATION_AMOUNT);
  const viewReportedRef = useRef(false);

  const copy = pickCopyVariant(orderId);
  const blockedByStorage = Date.now() - dismissedAtOnMount < DISMISS_DURATION_MS;
  const shouldRender = eligible && !blockedByStorage && !hidden;
  const workspaceIdParam = workspaceId ?? '';

  useEffect(() => {
    if (!shouldRender || viewReportedRef.current) return;
    viewReportedRef.current = true;
    reportDonationCardEvent('donation_card_view', { variant: copy.id, workspace_id: workspaceIdParam });
  }, [shouldRender, copy.id, workspaceIdParam]);

  const selectAmount = (next: number) => {
    setAmount(next);
  };

  // 앵커의 기본 동작으로 딥링크가 열린다. 여기서는 계측과 재노출 차단만 한다.
  const reportDonateClick = () => {
    reportDonationCardEvent('donation_card_click', { variant: copy.id, amount, workspace_id: workspaceIdParam });
    setDismissedAt(Date.now());
  };

  const dismiss = () => {
    reportDonationCardEvent('donation_card_dismiss', { variant: copy.id, workspace_id: workspaceIdParam });
    setDismissedAt(Date.now());
    setHidden(true);
  };

  return {
    shouldRender,
    copy,
    amount,
    donationUrl: buildDonationTossUrl(amount),
    selectAmount,
    reportDonateClick,
    dismiss,
  };
}

export default useCustomerDonationCard;
