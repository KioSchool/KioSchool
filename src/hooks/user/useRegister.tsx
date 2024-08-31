import useApi from '@hooks/useApi';

function useRegister() {
  const { userApi } = useApi();

  const checkDuplicateId = async (id: string) => {
    const response = await userApi
      .post<boolean>('/user/duplicate', {
        id,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error + '동일한 ID가 존재합니다.');
      });

    return response;
  };

  const registerUser = async (id: string, password: string, userName: string, userEmail: string) => {
    const response = await userApi
      .post('/register', {
        id,
        password: password,
        name: userName,
        email: userEmail,
      })
      .then(() => true)
      .catch(() => false);

    return response;
  };

  const sendVerifyMail = async (userEmail: string) => {
    const response = await userApi
      .post('/user/email', {
        email: userEmail,
      })
      .then(() => true)
      .catch(() => false);

    return response;
  };

  interface VerifyUserResponse {
    isVerify: boolean;
    errorMessage: string;
  }

  const verifyUser = async (userEmail: string, inputCode: string): Promise<VerifyUserResponse> => {
    const response = await userApi
      .post<boolean>('/user/verify', {
        email: userEmail,
        code: inputCode,
      })
      .then((res) => {
        return { isVerify: res.data, errorMessage: '틀린 인증 코드입니다.' };
      })
      .catch(() => {
        return { isVerify: false, errorMessage: '이메일 인증에 실패했습니다.' };
      });

    return response;
  };

  return { checkDuplicateId, registerUser, sendVerifyMail, verifyUser };
}

export default useRegister;
