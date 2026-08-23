import { useEffect, useRef, useState } from 'react';
import { ORDER_FLASH_DURATION_MS } from '@constants/layout';

/**
 * 신규 주문이 들어온 테이블을 잠깐 강조하기 위한 집합.
 * 같은 테이블에 연달아 주문이 오면 타이머만 연장한다.
 */
function useTableFlash() {
  const [flashingTableNumbers, setFlashingTableNumbers] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef(new Map<number, number>());

  const flashTable = (tableNumber: number) => {
    setFlashingTableNumbers((previous) => new Set(previous).add(tableNumber));

    const timeouts = timeoutsRef.current;
    window.clearTimeout(timeouts.get(tableNumber));
    timeouts.set(
      tableNumber,
      window.setTimeout(() => {
        setFlashingTableNumbers((previous) => {
          const next = new Set(previous);
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

  return { flashingTableNumbers, flashTable };
}

export default useTableFlash;
