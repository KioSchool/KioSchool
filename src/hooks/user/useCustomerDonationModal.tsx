import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { donationCardDismissedAtAtom, donationDonatedAtAtom } from '@jotai/user/atoms';
import useApi from '@hooks/useApi';
import { buildDonationTossUrl } from '@utils/donation';
import { reportDonationCardEvent } from '@utils/donationCardAnalytics';
import { DEFAULT_DONATION_AMOUNT, DONATION_NOTE_MESSAGES, DonationCopy, donationNoteIndex, pickCopyVariant } from '@constants/data/customerDonationCopy';

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

interface RecordClickBody {
  workspaceId: number | null;
  variant: string;
  amount: number | null;
}

interface UseCustomerDonationModalParams {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
  initialTodayCount?: number;
}

interface UseCustomerDonationModalResult {
  isOpen: boolean;
  hasDonated: boolean;
  view: DonationView;
  copy: DonationCopy;
  note: string;
  amount: number;
  todayCount: number | null;
  donationUrl: string;
  method: DonationMethod;
  selectAmount: (next: number) => void;
  selectMethod: (next: DonationMethod) => void;
  open: () => void;
  donate: () => void;
  dismiss: () => void;
}

function useCustomerDonationModal({ orderId, workspaceId, eligible, initialTodayCount }: UseCustomerDonationModalParams): UseCustomerDonationModalResult {
  const { userApi } = useApi();
  const [dismissedAt, setDismissedAt] = useAtom(donationCardDismissedAtAtom);
  const [donatedAt, setDonatedAt] = useAtom(donationDonatedAtAtom);
  const [dismissedAtOnMount] = useState(() => dismissedAt);
  const [hasDonatedOnMount] = useState(() => donatedAt > 0);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<DonationView>('donate');
  const [amount, setAmount] = useState<number>(DEFAULT_DONATION_AMOUNT);
  const [method, setMethod] = useState<DonationMethod>(DEFAULT_DONATION_METHOD);
  const [todayCount, setTodayCount] = useState<number | null>(initialTodayCount ?? null);
  const autoOpenedRef = useRef(false);
  const viewReportedRef = useRef(false);
  const recordedRef = useRef(false);

  const copy = pickCopyVariant(orderId);
  const noteIndex = donationNoteIndex(orderId);
  const note = DONATION_NOTE_MESSAGES[noteIndex];
  const hasDonated = donatedAt > 0;
  const workspaceIdParam = workspaceId ?? '';

  // 자동 오픈은 마운트 1회, 마운트 시점 스냅샷으로만 판단한다 — 세션 중 dismiss/donate가 재오픈을 유발하지 않게.
  useEffect(() => {
    if (autoOpenedRef.current) return;
    autoOpenedRef.current = true;

    const dismissedWithin24h = Date.now() - dismissedAtOnMount < DISMISS_DURATION_MS;
    if (eligible && !dismissedWithin24h && !hasDonatedOnMount) {
      setIsOpen(true);
    }
  }, [eligible, dismissedAtOnMount, hasDonatedOnMount]);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = 'hidden';

    if (!viewReportedRef.current) {
      viewReportedRef.current = true;
      reportDonationCardEvent('donation_card_view', { variant: copy.id, note_index: noteIndex, workspace_id: workspaceIdParam });
    }

    userApi
      .get<TodayCountResponse>(TODAY_COUNT_ENDPOINT)
      .then((res) => setTodayCount(res.data.todayCount))
      .catch(() => setTodayCount(initialTodayCount ?? null));

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, copy.id, noteIndex, workspaceIdParam, userApi, initialTodayCount]);

  const selectAmount = (next: number) => {
    setAmount(next);
  };

  const selectMethod = (next: DonationMethod) => {
    setMethod(next);
  };

  // 24h 차단·후원 이력과 무관하게 강제로 연다. 재후원을 위해 뷰를 'donate'로 되돌린다.
  const open = () => {
    setView('donate');
    setIsOpen(true);
  };

  // 토스 경로는 앵커 기본 동작으로 딥링크가 열린다. 계좌 경로는 복사 버튼에서 호출된다.
  // 세션당 1회만 POST하고, 어느 경로든 감사 뷰로 전환한다.
  const donate = () => {
    // 계좌이체는 손님이 자기 뱅킹 앱에서 금액을 직접 입력한다. 우리가 관측할 수 없으니 null로 기록한다.
    const recordedAmount = method === 'account' ? null : amount;

    reportDonationCardEvent('donation_card_click', { variant: copy.id, note_index: noteIndex, amount: recordedAmount, workspace_id: workspaceIdParam, method });
    setDonatedAt(Date.now());
    setDismissedAt(Date.now());
    setView('thanks');

    if (recordedRef.current) return;
    recordedRef.current = true;

    const body: RecordClickBody = {
      workspaceId: workspaceId ? Number(workspaceId) : null,
      variant: copy.id,
      amount: recordedAmount,
    };

    userApi
      .post<TodayCountResponse>(RECORD_CLICK_ENDPOINT, body)
      .then((res) => setTodayCount(res.data.todayCount))
      .catch(() => undefined);
  };

  const dismiss = () => {
    reportDonationCardEvent('donation_card_dismiss', { variant: copy.id, note_index: noteIndex, workspace_id: workspaceIdParam });
    setDismissedAt(Date.now());
    setIsOpen(false);
  };

  return {
    isOpen,
    hasDonated,
    view,
    copy,
    note,
    amount,
    todayCount,
    donationUrl: buildDonationTossUrl(amount),
    method,
    selectAmount,
    selectMethod,
    open,
    donate,
    dismiss,
  };
}

export default useCustomerDonationModal;
