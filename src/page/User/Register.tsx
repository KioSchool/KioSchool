import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';
import AppInputWithLabel from '../../component/common/input/AppInputWithLabel';
import AppButton from '../../component/common/button/AppButton';

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
`;

const CodeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReSendCodeStyle = { width: '90px' };

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
  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const inputCodeInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [ableId, setAbleId] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

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
          setAbleId(true);
          return;
        }
        setErrorMessage('The userId is already in use');
        setAbleId(false);
      })
      .catch((error) => {
        console.error('duplicate check error:', error);
      });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ableId) {
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

    const userPassword = userPasswordInputRef.current?.value;
    if (!userPassword) {
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
        password: userPassword,
        name: userName,
        email: userEmail,
      })
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setIsCodeSent(false);
        alert('send email error');
        setErrorMessage('send email error');
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
    const inputCode = inputCodeInputRef.current?.value;

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
    <Fragment>
      <Container>
        <SubContainer>
          <AppLabel size={'large'} style={{ padding: '0 0 10px' }}>
            회원가입
          </AppLabel>

          {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
          <FormContainer onSubmit={submitHandler}>
            <AppInputWithLabel label={'이름'} type={'text'} id={'name'} ref={userNameInputRef} required />
            <IdContainer>
              <AppInputWithLabel
                style={{ width: '330px' }}
                label={'아이디'}
                type={'text'}
                id={'userId'}
                ref={userIdInputRef}
                onChange={() => setAbleId(false)}
                required
              />
              <AppButton size={'medium'} type={'button'} onClick={checkDuplicate}>
                ID 중복체크
              </AppButton>
            </IdContainer>
            {ableId && <div>사용가능한 ID입니다!</div>}

            <AppInputWithLabel label={'비밀번호'} type={'password'} id={'userPassword'} ref={userPasswordInputRef} required />

            <EmailContainer>
              <AppInputWithLabel style={{ width: '330px' }} label={'이메일'} type={'email'} id={'userEmail'} ref={userEmailInputRef} required />
              <AppButton type={'button'} onClick={sendCode}>
                인증코드 전송
              </AppButton>
              {isCodeSent && (
                <CodeContainer>
                  <AppInputWithLabel style={{ width: '275px' }} label={'인증번호'} type={'text'} id={'code'} ref={inputCodeInputRef} required />
                  <AppButton style={ReSendCodeStyle} type={'button'} onClick={sendCode}>
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
        </SubContainer>
      </Container>
    </Fragment>
  );
}

export default Register;
