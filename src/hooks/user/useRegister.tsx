import useApi from '@hooks/useApi';

function useRegister() {
  const { userApi } = useApi();

  const checkDuplicateId = async (id: string) => {
    return userApi
      .post<boolean>('/user/duplicate', {
        id,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error + '동일한 ID가 존재합니다.');
      });
  };

  const registerUser = async (id: string, password: string, name: string, email: string) => {
    return userApi
      .post('/register', {
        id,
        password,
        name,
        email,
      })
      .then(() => true)
      .catch(() => false);
  };

  const sendVerifyMail = async (email: string): Promise<boolean | string> => {
    return userApi
      .post('/user/email', {
        email,
      })
      .then(() => true)
      .catch((error) => error.response.data.message);
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

  return { checkDuplicateId, registerUser, sendVerifyMail, verifyUser };
}

export default useRegister;
