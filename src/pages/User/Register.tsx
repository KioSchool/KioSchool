import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import AppButton from '@components/common/button/AppButton';
import AppFooter from '@components/common/footer/AppFooter';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useRegister from '@hooks/user/useRegister';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center' })}
`;

const SubContainer = styled.div`
  width: 500px;
  flex-basis: 0;
  flex-wrap: wrap;
  height: inherit;
  ${colFlex({ justify: 'center', align: 'flex-start' })}
`;

const FormContainer = styled.form`
  flex-wrap: wrap;
  gap: 14px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;
const IdContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}
`;

const EmailContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}
`;

const CodeContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}
`;

const LoginLabelContainer = styled.div`
  width: 100%;
  padding: 20px 0 0;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CodeReSendStyle = { width: '90px' };

const RegisterStyle = { marginTop: '25px' };

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

function Register() {
  const { checkDuplicateId, registerUser, sendVerifyMail, verifyUser } = useRegister();
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

  const navigate = useNavigate();

  const isSamePassword = userPasswordInputRef.current?.value === checkUserPasswordInput;
  const showCheckPasswordLabel = () => {
    if (!checkUserPasswordInput) return undefined;
    return isSamePassword ? '비밀번호가 동일합니다!' : '비밀번호가 서로 다릅니다.';
  };

  const checkDuplicate = async () => {
    const userId = userIdInputRef.current?.value;
    if (!userId) {
      setErrorMessage('아이디가 입력되지 않았습니다.');
      return;
    }

    const isDuplicated = await checkDuplicateId(userId);
    if (isDuplicated) {
      setErrorMessage('이미 사용중인 ID입니다.');
      setIsAbleId(false);
      return;
    }

    setErrorMessage('');
    setIsAbleId(true);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAbleId) {
      setErrorMessage('아이디 중복체크를 해주세요.');
      return;
    }

    if (!isVerified) {
      setErrorMessage('이메일 인증을 해주세요.');
      return;
    }

    const userName = userNameInputRef.current?.value;
    if (!userName) {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }

    const userId = userIdInputRef.current?.value;
    if (!userId) {
      setErrorMessage('아이디를 입력해주세요.');
      return;
    }

    const password = userPasswordInputRef.current?.value;
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    const userEmail = userEmailInputRef.current?.value;
    if (!userEmail) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    const isSuccess = await registerUser(userId, password, userName, userEmail);
    if (!isSuccess) {
      setIsCodeSent(false);
      setErrorMessage('회원가입에 실패했습니다.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/admin/register-account');
  };

  const sendCode = async () => {
    setErrorMessage('');
    const userEmail = userEmailInputRef.current?.value;

    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }

    const isEmailSent = await sendVerifyMail(userEmail);
    if (!isEmailSent) {
      setErrorMessage('이메일 발송이 실패했습니다.');
      setIsCodeSent(false);
      return;
    }

    setIsCodeSent(true);
  };

  const checkCode = async () => {
    const userEmail = userEmailInputRef.current?.value;
    const inputCode = userCodeInputRef.current?.value;

    if (!userEmail || !inputCode) {
      alert('이메일 또는 입력코드가 올바른지 확인해주세요');
      return;
    }

    const response = await verifyUser(userEmail, inputCode);

    setIsVerified(response.isVerify);
    if (!response.isVerify) {
      setErrorMessage(response.errorMessage);
    }
  };

  return (
    <Container className={'register-container'}>
      <SubContainer className={'register-sub-container'}>
        <AppLabel size={'large'} style={{ padding: '0 0 30px' }}>
          회원가입
        </AppLabel>

        {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
        <FormContainer id={'form'} onSubmit={submitHandler}>
          <AppInputWithLabel titleLabel={'이름'} type={'text'} id={'name'} ref={userNameInputRef} placeholder="이름을 입력해주세요" required />
          <IdContainer className={'id-container'}>
            <AppInputWithLabel
              style={{ width: '330px' }}
              titleLabel={'아이디'}
              messageLabel={'영문, 숫자 조합 4~20자'}
              type={'text'}
              id={'userId'}
              ref={userIdInputRef}
              onChange={() => {
                setIsAbleId(false);
              }}
              placeholder="아이디를 입력해주세요."
              required
            />
            <AppButton size={'medium'} type={'button'} onClick={checkDuplicate} disabled={isAbleId}>
              {isAbleId ? '사용 가능 ID' : 'ID 중복체크'}
            </AppButton>
          </IdContainer>

          <AppInputWithLabel
            titleLabel={'비밀번호'}
            messageLabel={'영문, 숫자, 특수문자 조합 8~20자'}
            type={'password'}
            id={'userPassword'}
            onChange={() => {
              setCheckUserPasswordInput('');
            }}
            ref={userPasswordInputRef}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <AppInputWithLabel
            titleLabel={'비밀번호 확인'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCheckUserPasswordInput(event.target.value)}
            messageLabel={showCheckPasswordLabel()}
            type={'password'}
            value={checkUserPasswordInput}
            placeholder="입력한 비밀번호를 똑같이 입력해주세요"
            required
          ></AppInputWithLabel>

          <EmailContainer className={'email-container'}>
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
              <CodeContainer className={'code-container'}>
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
        <LoginLabelContainer className={'login-label-container'}>
          <AppLabel size={'small'}>
            <Link to={'/login'}>로그인하기</Link>
          </AppLabel>
        </LoginLabelContainer>
        <AppFooter />
      </SubContainer>
    </Container>
  );
}

export default Register;
