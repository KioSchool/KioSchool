import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '@hooks/useApi';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import AppButton from '@components/common/button/AppButton';
import AppInput from '@components/common/input/AppInput';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
`;

const SubContainer = styled.div`
  width: 500px;
  display: flex;
  flex-basis: 0;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: inherit;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 14px;
`;
const IdContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const CodeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LoginLabelContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 0 0;
`;

const CodeReSendStyle = { width: '90px' };

const RegisterStyle = { marginTop: '25px' };

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

function Register() {
  const { userApi } = useApi();
  const navigate = useNavigate();

  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [checkUserPasswordInput, setCheckUserPasswordInput] = useState('');
  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const userCodeInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAbleId, setIsAbleId] = useState<boolean>(false);

  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const isSamePassword = userPasswordInputRef.current?.value === checkUserPasswordInput;
  const showCheckPasswordLabel = () => {
    if (!checkUserPasswordInput) return undefined;
    return isSamePassword ? '비밀번호가 동일합니다!' : '비밀번호가 서로 다릅니다.';
  };

  const checkDuplicate = () => {
    const userId = userIdInputRef.current?.value;
    if (!userId) {
      setErrorMessage('The userId is null');
      return;
    }

    userApi
      .post<any>('/user/duplicate', {
        id: userId,
      })
      .then((response) => {
        if (response.data !== true) {
          setErrorMessage('');
          setIsAbleId(true);
          return;
        }
        setErrorMessage('The userId is already in use');
        setIsAbleId(false);
      })
      .catch((error) => {
        console.error('duplicate check error:', error);
      });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAbleId) {
      setErrorMessage('Please check userId duplicate');
      return;
    }

    if (!isVerified) {
      setErrorMessage('Please verify your email address');
      return;
    }

    const userName = userNameInputRef.current?.value;
    if (!userName) {
      setErrorMessage('The userName is null');
      return;
    }

    const userId = userIdInputRef.current?.value;
    if (!userId) {
      setErrorMessage('The userId is null');
      return;
    }
    const password = userPasswordInputRef.current?.value;
    if (!password) {
      setErrorMessage('The userPassword is null');
      return;
    }

    const userEmail = userEmailInputRef.current?.value;
    if (!userEmail) {
      setErrorMessage('The userEmail is null');
      return;
    }

    userApi
      .post<any>('/register', {
        id: userId,
        password: password,
        name: userName,
        email: userEmail,
      })
      .then(() => {
        navigate('/admin/register-account');
      })
      .catch((error) => {
        const validationErrorMessage = error.response.data.errors?.[0].message || error.response.data.message;

        setIsCodeSent(false);
        setErrorMessage(validationErrorMessage);
      });
  };

  const sendCode = () => {
    setErrorMessage('');
    const userEmail = userEmailInputRef.current?.value;

    userApi
      .post<any>('/user/email', {
        email: userEmail,
      })
      .catch(() => {
        alert('send email error');
        setErrorMessage('send email error! please check your email address');
      });
    setIsCodeSent(true);
  };

  const checkCode = () => {
    const userEmail = userEmailInputRef.current?.value;
    const inputCode = userCodeInputRef.current?.value;

    userApi
      .post<any>('/user/verify', {
        email: userEmail,
        code: inputCode,
      })
      .then((res) => {
        setIsVerified(res.data);
        if (res.data === false) setErrorMessage('틀린 인증 코드입니다.');
      })
      .catch(() => {
        setIsVerified(false);
        setErrorMessage('check code error');
      });
  };

  return (
    <Container>
      <SubContainer>
        <AppLabel size={'large'} style={{ padding: '0 0 30px' }}>
          회원가입
        </AppLabel>

        {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
        <FormContainer id={'form'} onSubmit={submitHandler}>
          <AppInputWithLabel titleLabel={'이름'} type={'text'} id={'name'} ref={userNameInputRef} placeholder="이름을 입력해주세요" required />
          <IdContainer>
            <AppInputWithLabel
              style={{ width: '330px' }}
              titleLabel={'아이디'}
              messageLabel={isAbleId ? '사용가능한 ID입니다!' : undefined}
              type={'text'}
              id={'userId'}
              ref={userIdInputRef}
              onChange={() => setIsAbleId(false)}
              placeholder="아이디를 입력해주세요"
              required
            />
            <AppButton size={'medium'} type={'button'} onClick={checkDuplicate}>
              ID 중복체크
            </AppButton>
          </IdContainer>

          <AppInputWithLabel
            titleLabel={'비밀번호'}
            messageLabel={showCheckPasswordLabel()}
            type={'password'}
            id={'userPassword'}
            onChange={() => {
              setCheckUserPasswordInput('');
            }}
            ref={userPasswordInputRef}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <AppInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCheckUserPasswordInput(event.target.value)}
            type={'password'}
            value={checkUserPasswordInput}
            placeholder="입력한 비밀번호를 똑같이 입력해주세요"
            required
          ></AppInput>

          <EmailContainer>
            <AppInputWithLabel
              style={{ width: '330px' }}
              titleLabel={'이메일'}
              type={'email'}
              id={'userEmail'}
              ref={userEmailInputRef}
              placeholder="인증코드를 받을 이메일을 입력해주세요"
              required
            />
            <AppButton type={'button'} onClick={sendCode}>
              인증코드 전송
            </AppButton>
            {isCodeSent && (
              <CodeContainer>
                <AppInputWithLabel
                  style={{ width: '275px' }}
                  titleLabel={'인증코드'}
                  type={'text'}
                  id={'code'}
                  ref={userCodeInputRef}
                  placeholder="받은 인증코드를 입력해주세요"
                  required
                />
                <AppButton style={CodeReSendStyle} type={'button'} onClick={sendCode}>
                  재전송
                </AppButton>
                <AppButton size={'small'} type={'button'} onClick={checkCode}>
                  확인
                </AppButton>
              </CodeContainer>
            )}
          </EmailContainer>

          {isVerified && isCodeSent ? '인증 성공' : ''}
          <AppButton size={'large'} style={RegisterStyle} type={'submit'}>
            회원가입
          </AppButton>
        </FormContainer>
        <LoginLabelContainer>
          <AppLabel size={'small'}>
            <Link to={'/login'}>로그인하기</Link>
          </AppLabel>
        </LoginLabelContainer>
      </SubContainer>
    </Container>
  );
}

export default Register;
