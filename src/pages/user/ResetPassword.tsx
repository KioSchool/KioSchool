import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAuthentication from '@hooks/useAuthentication';
import { colFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import NewRoundedButton from '@components/common/button/NewRoundedButton';
import LinkLabel from '@components/common/label/LinkLabel';
import { Color } from '@resources/colors';

const ErrorContainer = styled.div`
  height: 30px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
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
        alert('비밀번호 재설정 링크를 전송했습니다. 회원가입 하신 이메일을 확인해주세요.');
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (!code) {
    return (
      <AppContainer
        useFlex={colFlex({ justify: 'center', align: 'center' })}
        customGap={'20px'}
        titleNavBarProps={{ title: '비밀번호 찾기', useBackIcon: false }}
      >
        <>
          <NewAppInput placeholder={'아이디를 입력해주세요'} ref={idInputRef} label={'아이디'} />
          <NewAppInput placeholder={'이메일을 입력해주세요'} ref={emailInputRef} label={'이메일'} />
          <NewRoundedButton customSize={{ height: 45, width: 350 }} onClick={sendResetPasswordLinkHandler} style={{ marginTop: '50px' }}>
            비밀번호 재설정 링크 전송하기
          </NewRoundedButton>

          <LinkLabel text={'로그인하기'} href={'/login'} />
        </>
      </AppContainer>
    );
  }

  const [userPasswordInput, setUserPasswordInput] = useState<string>('');
  const [checkUserPasswordInput, setCheckUserPasswordInput] = useState<string>('');
  const [isAblePassword, setIsAblePassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validatePassword = () => {
    setIsAblePassword(false);

    if (userPasswordInput?.includes(' ')) {
      setErrorMessage('비밀번호에 공백이 포함되어 있습니다.');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;
    if (userPasswordInput && !passwordRegex.test(userPasswordInput)) {
      setErrorMessage('비밀번호는 영문, 숫자, 특수문자 조합 8~20자로 입력해주세요.');
      return;
    }

    const isSamePassword = userPasswordInput === checkUserPasswordInput;
    if (!isSamePassword) {
      setErrorMessage('비밀번호가 서로 다릅니다.');
      return;
    }

    setErrorMessage('');
    setIsAblePassword(true);
  };

  useEffect(() => {
    if (userPasswordInput || checkUserPasswordInput) {
      validatePassword();
    } else {
      setErrorMessage('');
    }
  }, [userPasswordInput, checkUserPasswordInput]);

  const resetPasswordHandler = () => {
    if (!userPasswordInput || !isAblePassword) {
      setErrorMessage('비밀번호를 확인해주세요');
      return;
    }

    resetPassword(userPasswordInput, code)
      .then(() => {
        alert('비밀번호가 재설정되었습니다.');
        navigate('/login');
      })
      .catch(() => {
        alert('비밀번호는 8자 이상 20자 이하로 설정해주세요.');
      });
  };

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center', align: 'center' })}
      customGap={'20px'}
      titleNavBarProps={{ title: '비밀번호 재설정', useBackIcon: false }}
    >
      <>
        <NewAppInput
          label={'비밀번호'}
          placeholder={'비밀번호를 입력해주세요'}
          type={'password'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserPasswordInput(event.target.value);
          }}
          value={userPasswordInput}
          required
        />
        <NewAppInput
          label={'비밀번호 확인'}
          placeholder={'입력한 비밀번호를 똑같이 입력해주세요'}
          type={'password'}
          value={checkUserPasswordInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCheckUserPasswordInput(event.target.value);
          }}
          required
        />
        <ErrorContainer>{errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}</ErrorContainer>
        <NewRoundedButton onClick={resetPasswordHandler}>비밀번호 재설정</NewRoundedButton>
      </>
    </AppContainer>
  );
}

export default ResetPassword;
