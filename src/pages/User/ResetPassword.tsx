import React, { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import AppInput from '@components/common/input/AppInput';
import AppButton from '@components/common/button/AppButton';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import useAuthentication from '@hooks/useAuthentication';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  ${colFlex({ align: 'center' })}
  gap: 24px;
`;

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { sendResetPasswordLink, resetPassword } = useAuthentication();

  const idInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const sendResetPasswordLinkHandler = () => {
    const id = idInputRef.current?.value;
    const email = emailInputRef.current?.value;
    if (!id || !email) {
      alert('아이디와 이메일을 입력해주세요');
      return;
    }

    sendResetPasswordLink(id, email)
      .then(() => {
        alert('비밀번호 재설정 링크를 전송했습니다.');
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (!code) {
    return (
      <AppContainer useFlex={colFlex({ justify: 'center' })}>
        <Container className={'reset-password-container'}>
          <AppInput placeholder={'아이디를 입력해주세요'} ref={idInputRef} />
          <AppInput placeholder={'이메일을 입력해주세요'} ref={emailInputRef} />
          <AppButton size={'large'} onClick={sendResetPasswordLinkHandler}>
            비밀번호 재설정 링크 전송하기
          </AppButton>
          <AppLabel size={'small'}>
            <Link to={'/login'}>로그인하기</Link>
          </AppLabel>
        </Container>
      </AppContainer>
    );
  }

  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [checkUserPasswordInput, setCheckUserPasswordInput] = useState('');
  const isSamePassword = userPasswordInputRef.current?.value === checkUserPasswordInput;
  const showCheckPasswordLabel = () => {
    if (!checkUserPasswordInput) return undefined;
    return isSamePassword ? '비밀번호가 동일합니다!' : '비밀번호가 서로 다릅니다.';
  };

  const resetPasswordHandler = () => {
    const password = userPasswordInputRef.current?.value;
    if (!password || !isSamePassword) {
      alert('비밀번호를 확인해주세요');
      return;
    }

    resetPassword(password, code)
      .then(() => {
        alert('비밀번호가 재설정되었습니다.');
        navigate('/login');
      })
      .catch(() => {
        alert('비밀번호는 8자 이상 20자 이하로 설정해주세요.');
      });
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })}>
      <Container>
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
        <AppButton size={'large'} type={'submit'} onClick={resetPasswordHandler}>
          비밀번호 재설정
        </AppButton>
      </Container>
    </AppContainer>
  );
}

export default ResetPassword;
