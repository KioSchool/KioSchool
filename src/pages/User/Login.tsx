import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import AppButton from '@components/common/button/AppButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import Container from '@components/common/container/Container';

const LoginContainer = styled.div`
  display: grid;
  row-gap: 46px;
`;

const InputContainer = styled.div`
  display: grid;
  row-gap: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 13px;
  text-align: center;
`;

function Login() {
  const { login, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn()) navigate('/');

    setErrorMessage('');
  }, []);

  const handleSubmit = () => {
    const userId = userIdInputRef.current?.value;
    const userPassword = userPasswordInputRef.current?.value;
    if (!userId || !userPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    login(userId, userPassword);
  };
  const content = (
    <LoginContainer>
      <AppLabel size={'large'}>로그인</AppLabel>
      <InputContainer>
        <AppInputWithLabel titleLabel={'아이디'} type={'text'} id={'userId'} ref={userIdInputRef} />
        <AppInputWithLabel titleLabel={'비밀번호'} type={'password'} id={'password'} ref={userPasswordInputRef} enterHandler={handleSubmit} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </InputContainer>
      <ButtonContainer>
        <AppButton size={'large'} style={{ gridColumn: '1/3' }} type={'button'} onClick={handleSubmit}>
          로그인
        </AppButton>
        <AppLabel size={'small'}>
          <Link to={'/'}>비밀번호를 잊어버렸나요?</Link> <Link to={'/register'}>회원가입하기</Link>
        </AppLabel>
      </ButtonContainer>
    </LoginContainer>
  );

  return <Container content={content} justifyValue={'center'} />;
}

export default Login;
