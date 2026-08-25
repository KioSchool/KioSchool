import { useEffect, useRef, useState } from 'react';
import { ORDER_FLASH_DURATION_MS } from '@constants/layout';

/**
 * 신규 주문이 들어온 테이블의 강조 시퀀스. 같은 테이블에 연달아 주문이 오면
 * 시퀀스를 올려 카드의 플래시 애니메이션이 매번 다시 재생되게 하고, 제거 타이머는 연장한다.
 */
function useTableFlash() {
  const [flashSeqByTableNumber, setFlashSeqByTableNumber] = useState<Map<number, number>>(new Map());
  const timeoutsRef = useRef(new Map<number, number>());

  const flashTable = (tableNumber: number) => {
    setFlashSeqByTableNumber((previous) => new Map(previous).set(tableNumber, (previous.get(tableNumber) ?? 0) + 1));

    const timeouts = timeoutsRef.current;
    window.clearTimeout(timeouts.get(tableNumber));
    timeouts.set(
      tableNumber,
      window.setTimeout(() => {
        setFlashSeqByTableNumber((previous) => {
          const next = new Map(previous);
          next.delete(tableNumber);
          return next;
        });
        timeouts.delete(tableNumber);
      }, ORDER_FLASH_DURATION_MS),
    );
  };

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => timeouts.forEach((id) => window.clearTimeout(id));
  }, []);

  return { flashSeqByTableNumber, flashTable };
}

export default useTableFlash;
