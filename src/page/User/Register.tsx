import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';
import AppInputWithLabel from '../../component/common/input/AppInputWithLabel';

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

const SubContainer = styled.div`
  display: flex;
  flex-basis: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: inherit;
`;

const RegisterContainer = styled.div``;

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
      .then(() => {
        setIsCodeSent(true);
      })
      .catch((err) => {
        setErrorMessage('send email error! please check your email address');
        console.error(err);
      });
  };

  const checkCode = () => {
    const userEmail = userEmailInputRef.current?.value;
    const inputCode = inputCodeInputRef.current?.value;

    userApi
      .post<any>('/user/verify', {
        email: userEmail,
        code: inputCode,
      })
      .then(() => {
        setIsVerified(true);
      })
      .catch(() => {
        setIsVerified(false);
        setErrorMessage('check email error');
      });
  };

  return (
    <Fragment>
      <Container>
        <SubContainer>
          <AppLabel size={'large'}>회원가입</AppLabel>
          <RegisterContainer>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={submitHandler}>
              <div>
                <AppInputWithLabel label={'이름'} type={'text'} id={'name'} ref={userNameInputRef} required />
              </div>

              <div>
                <AppInputWithLabel label={'아이디'} type={'text'} id={'userId'} ref={userIdInputRef} onChange={() => setAbleId(false)} required />
                <button type={'button'} onClick={checkDuplicate}>
                  ID 중복체크
                </button>
                {ableId && <div>사용가능한 ID입니다!</div>}
              </div>

              <div>
                <AppInputWithLabel label={'비밀번호'} type={'password'} id={'userPassword'} ref={userPasswordInputRef} required />
              </div>

              <div>
                <AppInputWithLabel label={'이메일'} type={'email'} id={'userEmail'} ref={userEmailInputRef} required />
              </div>

              <div>
                <button type={'button'} onClick={sendCode}>
                  이메일 인증 코드 받기
                </button>
              </div>

              {isCodeSent && (
                <div>
                  <label htmlFor="code">인증번호</label>
                  <input id="code" type="text" ref={inputCodeInputRef} />

                  <button type={'button'} onClick={sendCode}>
                    재전송
                  </button>
                  <button type={'button'} onClick={checkCode}>
                    코드 확인
                  </button>
                </div>
              )}

              {isVerified && isCodeSent ? '인증 성공' : ''}
              <button type="submit">Register</button>
            </form>
          </RegisterContainer>
        </SubContainer>
      </Container>
    </Fragment>
  );
}

export default Register;
