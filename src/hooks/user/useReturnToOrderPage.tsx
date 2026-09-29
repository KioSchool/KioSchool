import { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ORDER_ROUTES } from '@constants/routes';
import { getOrderPageHistoryDistance } from '@utils/orderPageHistory';

// 새로고침하면 장바구니·상품 아톰이 초기화되므로, 비어 있으면 주문 화면으로 되돌린다.
function useReturnToOrderPage(isBasketEmpty: boolean) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isBasketEmpty) return;

    const distance = getOrderPageHistoryDistance();
    if (distance !== null) {
      navigate(distance);
      return;
    }

    navigate({ pathname: ORDER_ROUTES.ORDER, search: createSearchParams(searchParams).toString() }, { replace: true });
  }, [isBasketEmpty]);
}

export default useReturnToOrderPage;
