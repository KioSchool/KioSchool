import { useEffect, useState } from 'react';
import { extractMinFromDate } from '@utils/FormatDate';

interface UseDelayTimeProps {
  date: string;
  intervalSecond?: number;
}

function useDelayTime({ date, intervalSecond = 10 }: UseDelayTimeProps) {
  const [delayMinutes, setDelayMinutes] = useState<number>(extractMinFromDate(date));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDelayMinutes = extractMinFromDate(date);

      setDelayMinutes((prevDelayMinutes) => (prevDelayMinutes !== updatedDelayMinutes ? updatedDelayMinutes : prevDelayMinutes));
    }, intervalSecond * 1000);

    return () => clearInterval(interval);
  }, []);

  return { delayMinutes };
}

export default useDelayTime;
