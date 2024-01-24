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
  const { login } = useAuthentication();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
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

  return (
    <Container>
      <SubContainer>
        <LoginContainer>
          <AppLabel size={'large'}>로그인</AppLabel>
          <InputContainer>
            <AppInputWithLabel label={'아이디'} type={'text'} id={'userId'} ref={userIdInputRef} />
            <AppInputWithLabel label={'비밀번호'} type={'password'} id={'password'} ref={userPasswordInputRef} enterHandler={handleSubmit} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </InputContainer>
          <ButtonContainer>
            <AppButton style={{ gridColumn: '1/3' }} type={'button'} onClick={handleSubmit}>
              로그인
            </AppButton>
            <AppLabel size={'small'}>
              <Link to={'/'}>비밀번호를 잊어버렸나요?</Link> <Link to={'/register'}>회원가입하기</Link>
            </AppLabel>
          </ButtonContainer>
        </LoginContainer>
      </SubContainer>
    </Container>
  );
}

export default Login;
