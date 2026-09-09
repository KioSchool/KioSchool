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

interface DonationCountResponse {
  todayCount: number;
  totalCount: number;
}

interface RecordClickBody {
  orderId: number | null;
  workspaceId: number | null;
  variant: string;
  method: DonationMethod;
  noteIndex: number;
  amount: number | null;
}

interface UseCustomerDonationModalParams {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
  initialTodayCount?: number;
  initialTotalCount?: number;
}

interface UseCustomerDonationModalResult {
  isOpen: boolean;
  hasDonated: boolean;
  view: DonationView;
  justDonated: boolean;
  copy: DonationCopy;
  note: string;
  amount: number;
  todayCount: number | null;
  totalCount: number | null;
  donationUrl: string;
  method: DonationMethod;
  selectAmount: (next: number) => void;
  selectMethod: (next: DonationMethod) => void;
  open: () => void;
  donate: () => void;
  donateAgain: () => void;
  dismiss: () => void;
}

function useCustomerDonationModal({
  orderId,
  workspaceId,
  eligible,
  initialTodayCount,
  initialTotalCount,
}: UseCustomerDonationModalParams): UseCustomerDonationModalResult {
  const { userApi } = useApi();
  const [dismissedAt, setDismissedAt] = useAtom(donationCardDismissedAtAtom);
  const [donatedAt, setDonatedAt] = useAtom(donationDonatedAtAtom);
  const [dismissedAtOnMount] = useState(() => dismissedAt);
  const [hasDonatedOnMount] = useState(() => donatedAt > 0);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<DonationView>('donate');
  const [justDonated, setJustDonated] = useState(false);
  const [amount, setAmount] = useState<number>(DEFAULT_DONATION_AMOUNT);
  const [method, setMethod] = useState<DonationMethod>(DEFAULT_DONATION_METHOD);
  const [todayCount, setTodayCount] = useState<number | null>(initialTodayCount ?? null);
  const [totalCount, setTotalCount] = useState<number | null>(initialTotalCount ?? null);
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
      .get<DonationCountResponse>(TODAY_COUNT_ENDPOINT)
      .then((res) => {
        setTodayCount(res.data.todayCount);
        setTotalCount(res.data.totalCount);
      })
      .catch(() => {
        setTodayCount(initialTodayCount ?? null);
        setTotalCount(initialTotalCount ?? null);
      });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, copy.id, noteIndex, workspaceIdParam, userApi, initialTodayCount, initialTotalCount]);

  const selectAmount = (next: number) => {
    setAmount(next);
  };

  const selectMethod = (next: DonationMethod) => {
    setMethod(next);
  };

  // 24h 차단·후원 이력과 무관하게 강제로 연다. 이미 후원한 재방문자는 폼이 아니라 감사 recap으로 보낸다.
  const open = () => {
    setJustDonated(false);
    setView(hasDonated ? 'thanks' : 'donate');
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
    setJustDonated(true);
    setView('thanks');

    if (recordedRef.current) return;
    recordedRef.current = true;

    const body: RecordClickBody = {
      orderId: orderId ? Number(orderId) : null,
      workspaceId: workspaceId ? Number(workspaceId) : null,
      variant: copy.id,
      method,
      noteIndex,
      amount: recordedAmount,
    };

    userApi
      .post<DonationCountResponse>(RECORD_CLICK_ENDPOINT, body)
      .then((res) => {
        setTodayCount(res.data.todayCount);
        setTotalCount(res.data.totalCount);
      })
      .catch(() => undefined);
  };

  // 감사 화면에서 "더 응원하기". 세션 내 두 번째 후원도 별도 클릭으로 집계되도록 recordedRef를 푼다.
  const donateAgain = () => {
    setJustDonated(false);
    recordedRef.current = false;
    setView('donate');
  };

  // GA donation_card_dismiss는 '요청' 화면을 닫을 때만 이탈로 본다. 감사 화면 닫기는 이탈이 아니다.
  const dismiss = () => {
    if (view === 'donate') {
      reportDonationCardEvent('donation_card_dismiss', { variant: copy.id, note_index: noteIndex, workspace_id: workspaceIdParam });
    }
    setDismissedAt(Date.now());
    setIsOpen(false);
  };

  return {
    isOpen,
    hasDonated,
    view,
    justDonated,
    copy,
    note,
    amount,
    todayCount,
    totalCount,
    donationUrl: buildDonationTossUrl(amount),
    method,
    selectAmount,
    selectMethod,
    open,
    donate,
    donateAgain,
    dismiss,
  };
}

export default useCustomerDonationModal;
