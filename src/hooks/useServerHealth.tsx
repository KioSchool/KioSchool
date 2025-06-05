import { useEffect, useState } from 'react';
import axios from 'axios';

interface ServerHealthStatus {
  isServerHealthy: boolean;
  isChecking: boolean;
  error: string | null;
}

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const API_BASE_URL = ENVIRONMENT === 'development' ? 'http://localhost:8080' : 'https://api.kio-school.com';

function useServerHealth() {
  const [status, setStatus] = useState<ServerHealthStatus>({
    isServerHealthy: true,
    isChecking: true,
    error: null,
  });

  const checkServerHealth = async (): Promise<boolean> => {
    try {
      setStatus((prev) => ({ ...prev, isChecking: true }));

      await axios.get(`${API_BASE_URL}/favicon.ico`, {
        timeout: 10000,
        validateStatus: (statusCode) => statusCode < 500,
      });

      setStatus((prev) => ({
        ...prev,
        isServerHealthy: true,
        isChecking: false,
        error: null,
      }));

      return true;
    } catch (error: any) {
      const errorMessage =
        error.code === 'ECONNABORTED'
          ? '서버 응답 시간이 초과되었습니다.'
          : error.code === 'ERR_NETWORK'
          ? '네트워크 연결에 문제가 있습니다.'
          : error.response?.status >= 500
          ? '서버에 일시적인 문제가 발생했습니다.'
          : '서버에 연결할 수 없습니다.';

      setStatus((prev) => ({
        ...prev,
        isServerHealthy: false,
        isChecking: false,
        error: errorMessage,
      }));

      return false;
    }
  };

  const manualRetry = () => {
    checkServerHealth();
  };

  useEffect(() => {
    checkServerHealth();
  }, []);

  return {
    ...status,
    checkServerHealth,
    manualRetry,
  };
}

export default useServerHealth;
