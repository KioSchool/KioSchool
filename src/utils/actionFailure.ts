import { toast } from 'react-toastify';
import { getApiErrorMessage, isAxiosCancel, requiresGlobalLogout } from './apiError';

// 요청 취소는 화면을 떠난 경우이고, 로그인 만료는 AuthErrorListener가 따로 알린다
export function notifyActionFailure(error: unknown, fallback: string) {
  if (isAxiosCancel(error) || requiresGlobalLogout(error)) return;

  const message = getApiErrorMessage(error, fallback);
  // 같은 버튼을 연달아 눌러 같은 실패가 나면 토스트가 쌓이지 않도록 문구를 id로 쓴다
  toast.error(message, { toastId: message });
}
