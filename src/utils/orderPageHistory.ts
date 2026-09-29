/**
 * 주문 화면이 이 탭 히스토리의 몇 번째 칸인지 기록하고, 장바구니·결제 화면에서 되돌아갈 거리를 계산한다.
 * 칸 번호는 React Router가 `history.state.idx`에 적는 값이고, 새로고침해도 유지되도록 sessionStorage에 둔다.
 * 확신할 수 없으면 null을 돌려주고, 호출하는 쪽은 주문 화면으로 교체(replace)한다.
 */
const ORDER_PAGE_HISTORY_INDEX_KEY = 'orderPageHistoryIndex';

const getCurrentHistoryIndex = (): number | null => {
  const index = window.history.state?.idx;
  return Number.isInteger(index) ? index : null;
};

export const saveOrderPageHistoryIndex = () => {
  const index = getCurrentHistoryIndex();
  if (index === null) return;

  try {
    sessionStorage.setItem(ORDER_PAGE_HISTORY_INDEX_KEY, String(index));
  } catch {
    // 저장이 막힌 브라우저에서는 거리 계산 없이 주문 화면으로 교체된다.
  }
};

const getSavedOrderPageHistoryIndex = (): number | null => {
  try {
    const saved = sessionStorage.getItem(ORDER_PAGE_HISTORY_INDEX_KEY);
    if (saved === null) return null;

    const index = Number(saved);
    return Number.isInteger(index) ? index : null;
  } catch {
    return null;
  }
};

export const getOrderPageHistoryDistance = (): number | null => {
  const current = getCurrentHistoryIndex();
  const saved = getSavedOrderPageHistoryIndex();
  if (current === null || saved === null) return null;

  const distance = saved - current;
  if (distance >= 0) return null;

  return distance;
};
