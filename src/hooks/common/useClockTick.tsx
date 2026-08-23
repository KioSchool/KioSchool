import { useEffect, useState } from 'react';

/**
 * intervalMs 간격으로 리렌더를 일으키는 시계 틱.
 * 잔여 시간처럼 렌더 시점의 Date.now()로 계산되는 값은, 데이터 갱신(폴링)이 멈춰 있어도 시간이 흐르면 다시 그려져야 한다.
 */
function useClockTick(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

export default useClockTick;
