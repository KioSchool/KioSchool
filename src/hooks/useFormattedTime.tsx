import { useEffect, useState } from 'react';

interface UseFormattedTimeProps<T> {
  date: string | undefined;
  formatter: (date: string | undefined) => T;
  intervalSeconds?: number;
}

function useFormattedTime<T>({ date, formatter, intervalSeconds = 10 }: UseFormattedTimeProps<T>): T | null {
  const [formattedValue, setFormattedValue] = useState<T>(() => {
    return formatter(date);
  });

  useEffect(() => {
    setFormattedValue(formatter(date));

    const interval = setInterval(() => {
      setFormattedValue(formatter(date));
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [date, intervalSeconds]);

  return formattedValue;
}

export default useFormattedTime;
