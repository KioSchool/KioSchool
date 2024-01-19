import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../../hook/useAuthentication';
import AppInputWithLabel from '../../component/common/input/AppInputWithLabel';
import AppButton from '../../component/common/button/AppButton';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';

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
  height: inherit;
`;

const LoginContainer = styled.div`
  display: block;
  position: relative;
`;

function Login() {
  const { login } = useAuthentication();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userId = userIdInputRef.current?.value;
    const userPassword = userPasswordInputRef.current?.value;
    if (!userId || !userPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    login(userId, userPassword);
  };

  return (
    <Container>
      <SubContainer>
        <LoginContainer>
          <AppLabel size={'large'}>로그인</AppLabel>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <AppInputWithLabel label={'아이디'} type={'text'} id={'userId'} ref={userIdInputRef} required />
              <AppInputWithLabel label={'비밀번호'} type={'password'} id={'password'} ref={userPasswordInputRef} required />
            </div>
            <AppButton type={'submit'}>로그인</AppButton>
          </form>
          <Link to={'/'}>Go Home</Link>
        </LoginContainer>
      </SubContainer>
    </Container>
  );
}

export default Login;
