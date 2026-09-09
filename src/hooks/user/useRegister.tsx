import useApi from '@hooks/useApi';
import { trackEvent } from '@utils/analytics';
import { GA_EVENT } from '@constants/analytics';
import { getApiErrorMessage } from '@utils/apiError';
import { AcquisitionChannel } from '@utils/acquisitionChannel';

interface AcquisitionSurveyPayload {
  channel: AcquisitionChannel | null;
  channelEtc: string | null;
  context: string | null;
}

function useRegister() {
  const { userApi, adminApi } = useApi();

  // 실패를 삼키지 않고 던진다. 이전에는 catch가 undefined를 돌려줘서 호출부가 "중복 아님 = 사용 가능"으로 오판했다.
  const checkDuplicateId = async (id: string): Promise<boolean> => {
    return userApi
      .post<boolean>('/user/duplicate', {
        id,
      })
      .then((res) => res.data);
  };

  const registerUser = async (id: string, password: string, name: string, email: string): Promise<true | string> => {
    return userApi
      .post('/register', {
        id,
        password,
        name,
        email,
      })
      .then(() => {
        trackEvent(GA_EVENT.SIGN_UP, {});
        return true as const;
      })
      .catch((error) => getApiErrorMessage(error, '회원가입 실패: 알 수 없는 오류가 발생했습니다.'));
  };

  // 유입 수집 실패로 가입을 막지 않는다. 가입은 이미 성공한 상태이므로 호출부가 그대로 진행한다.
  const saveAcquisitionSurvey = async (payload: AcquisitionSurveyPayload): Promise<void> => {
    return adminApi
      .post('/user/acquisition', payload)
      .then(() => undefined)
      .catch((error) => {
        console.warn('acquisition survey save failed', error);
      });
  };

  // 응답이 없는 실패(status 0)는 error.response가 undefined라 직접 접근하면 TypeError로 죽고 화면에 아무 안내도 안 남는다.
  const sendVerifyMail = async (email: string): Promise<boolean | string> => {
    return userApi
      .post('/user/email', {
        email,
      })
      .then(() => {
        alert('인증 코드가 이메일로 전송되었습니다.');
        return true;
      })
      .catch((error) => getApiErrorMessage(error, '인증 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.'));
  };

  interface VerifyUserResponse {
    isVerify: boolean;
    errorMessage: string;
  }

  const verifyUser = async (email: string, code: string): Promise<VerifyUserResponse> => {
    return userApi
      .post<boolean>('/user/verify', {
        email,
        code,
      })
      .then((res) => {
        return { isVerify: res.data, errorMessage: '틀린 인증 코드입니다.' };
      })
      .catch(() => {
        return { isVerify: false, errorMessage: '이메일 인증에 실패했습니다.' };
      });
  };

  return { checkDuplicateId, registerUser, saveAcquisitionSurvey, sendVerifyMail, verifyUser };
}

export default useRegister;
