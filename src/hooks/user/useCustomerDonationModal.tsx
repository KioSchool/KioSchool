import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { donationCardDismissedAtAtom } from '@jotai/user/atoms';
import useApi from '@hooks/useApi';
import { buildDonationTossUrl } from '@utils/donation';
import { reportDonationCardEvent } from '@utils/donationCardAnalytics';
import { DEFAULT_DONATION_AMOUNT, DonationCopy, findDonationCopyById, pickCopyVariant } from '@constants/data/customerDonationCopy';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
const DISMISS_DURATION_MS = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND;

const TODAY_COUNT_ENDPOINT = '/donations/customer-clicks/today-count';
const RECORD_CLICK_ENDPOINT = '/donations/customer-clicks';

type DonationView = 'donate' | 'thanks';
export type DonationMethod = 'toss' | 'account';

const DEFAULT_DONATION_METHOD: DonationMethod = 'toss';

interface TodayCountResponse {
  todayCount: number;
}

interface UseCustomerDonationModalParams {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
  initialTodayCount?: number;
  copyId?: string;
}

interface UseCustomerDonationModalResult {
  shouldRender: boolean;
  view: DonationView;
  copy: DonationCopy;
  amount: number;
  todayCount: number | null;
  donationUrl: string;
  method: DonationMethod;
  selectAmount: (next: number) => void;
  selectMethod: (next: DonationMethod) => void;
  donate: () => void;
  dismiss: () => void;
}

function useCustomerDonationModal({
  orderId,
  workspaceId,
  eligible,
  initialTodayCount,
  copyId,
}: UseCustomerDonationModalParams): UseCustomerDonationModalResult {
  const { userApi } = useApi();
  const [dismissedAt, setDismissedAt] = useAtom(donationCardDismissedAtAtom);
  const [dismissedAtOnMount] = useState(() => dismissedAt);
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState<DonationView>('donate');
  const [amount, setAmount] = useState<number>(DEFAULT_DONATION_AMOUNT);
  const [method, setMethod] = useState<DonationMethod>(DEFAULT_DONATION_METHOD);
  const [todayCount, setTodayCount] = useState<number | null>(initialTodayCount ?? null);
  const viewReportedRef = useRef(false);
  const recordedRef = useRef(false);

  // copyId는 Storybook에서 특정 문구를 강제로 띄우기 위한 것. 프로덕션은 orderId 기반 배정을 쓴다.
  const copy = findDonationCopyById(copyId) ?? pickCopyVariant(orderId);
  const blockedByStorage = Date.now() - dismissedAtOnMount < DISMISS_DURATION_MS;
  const shouldRender = eligible && !blockedByStorage && !hidden;
  const workspaceIdParam = workspaceId ?? '';

  useEffect(() => {
    if (!shouldRender) return;

    document.body.style.overflow = 'hidden';

    if (!viewReportedRef.current) {
      viewReportedRef.current = true;
      reportDonationCardEvent('donation_card_view', { variant: copy.id, workspace_id: workspaceIdParam });
    }

    userApi
      .get<TodayCountResponse>(TODAY_COUNT_ENDPOINT)
      .then((res) => setTodayCount(res.data.todayCount))
      .catch(() => setTodayCount(initialTodayCount ?? null));

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldRender, copy.id, workspaceIdParam, userApi, initialTodayCount]);

  const selectAmount = (next: number) => {
    setAmount(next);
  };

  const selectMethod = (next: DonationMethod) => {
    setMethod(next);
  };

  // 토스 경로는 앵커 기본 동작으로 딥링크가 열린다. 계좌 경로는 복사 버튼에서 호출된다.
  // 세션당 1회만 POST하고, 어느 경로든 감사 뷰로 전환한다.
  const donate = () => {
    reportDonationCardEvent('donation_card_click', { variant: copy.id, amount, workspace_id: workspaceIdParam, method });
    setDismissedAt(Date.now());
    setView('thanks');

    if (recordedRef.current) return;
    recordedRef.current = true;

    userApi
      .post<TodayCountResponse>(RECORD_CLICK_ENDPOINT, {
        workspaceId: workspaceId ? Number(workspaceId) : null,
        variant: copy.id,
        amount,
      })
      .then((res) => setTodayCount(res.data.todayCount))
      .catch(() => undefined);
  };

  const dismiss = () => {
    reportDonationCardEvent('donation_card_dismiss', { variant: copy.id, workspace_id: workspaceIdParam });
    setDismissedAt(Date.now());
    setHidden(true);
  };

  return {
    shouldRender,
    view,
    copy,
    amount,
    todayCount,
    donationUrl: buildDonationTossUrl(amount),
    method,
    selectAmount,
    selectMethod,
    donate,
    dismiss,
  };
}

export default useCustomerDonationModal;
