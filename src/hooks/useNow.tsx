import { useEffect, useState } from 'react';

const MS_PER_SECOND = 1000;

function useNow(intervalSeconds = 10) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), intervalSeconds * MS_PER_SECOND);
    return () => clearInterval(interval);
  }, [intervalSeconds]);

  return now;
}

export default useNow;
