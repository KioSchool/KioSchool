import { useEffect, useRef, useState } from 'react';
import { ORDER_FLASH_DURATION_MS } from '@constants/layout';

function useNewOrderFlash() {
  const [flashSeqByTableNumber, setFlashSeqByTableNumber] = useState<Map<number, number>>(new Map());
  const timeoutsRef = useRef(new Map<number, number>());

  const flashNewOrder = (tableNumber: number) => {
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

  return { flashSeqByTableNumber, flashNewOrder };
}

export default useNewOrderFlash;
