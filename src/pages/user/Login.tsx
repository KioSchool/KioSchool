import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import LinkLabel from '@components/common/label/LinkLabel';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { USER_ROUTES } from '@constants/routes';

const ErrorContainer = styled.div`
  height: 30px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
`;

const LinkContainer = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

function Login() {
  const { login, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn()) navigate(USER_ROUTES.HOME);
  }, []);

  const handleSubmit = () => {
    const userId = userIdInputRef.current?.value;
    const userPassword = userPasswordInputRef.current?.value;
    if (!userId || !userPassword) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    login(userId, userPassword);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'20px'} useTitle={false} useFullHeight={true}>
      <>
        <NewAppInput id={'userId'} ref={userIdInputRef} label={'아이디'} placeholder={'아이디를 입력해주세요.'} autoFocus={true} />
        <NewAppInput
          id={'password'}
          ref={userPasswordInputRef}
          label={'비밀번호'}
          type={'password'}
          enterHandler={handleSubmit}
          placeholder={'비밀번호를 입력해주세요.'}
        />
        <ErrorContainer>{errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}</ErrorContainer>
        <NewCommonButton onClick={handleSubmit}>로그인</NewCommonButton>
        <LinkContainer className={'button-container'}>
          <LinkLabel text={'비밀번호 찾기'} href={USER_ROUTES.RESET_PASSWORD} />
          <LinkLabel text={'회원가입 하기'} href={USER_ROUTES.REGISTER} />
        </LinkContainer>
      </>
    </AppContainer>
  );
}

export default Login;
