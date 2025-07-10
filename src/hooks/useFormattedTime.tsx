import { useEffect, useState } from 'react';

interface UseFormattedTimeProps<T> {
  date: string | undefined;
  formatter: (date: string) => T;
  intervalSeconds?: number;
}

function useFormattedTime<T>({ date, formatter, intervalSeconds = 10 }: UseFormattedTimeProps<T>): T | null {
  const [formattedValue, setFormattedValue] = useState<T | null>(() => (date ? formatter(date) : null));

  useEffect(() => {
    if (!date) {
      setFormattedValue(null);
      return;
    }

    setFormattedValue(formatter(date));

    const interval = setInterval(() => {
      setFormattedValue(formatter(date));
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [date, formatter, intervalSeconds]);

  return formattedValue;
}

export default useFormattedTime;
