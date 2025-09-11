import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import useRegister from '@hooks/user/useRegister';
import AppContainer from '@components/common/container/AppContainer';
import NewAppInput from '@components/common/input/NewAppInput';
import NewRoundedButton from '@components/common/button/NewRoundedButton';
import { Color } from '@resources/colors';
import LinkLabel from '@components/common/label/LinkLabel';

const FormContainer = styled.form`
  flex-wrap: wrap;
  gap: 14px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const PasswordContainer = styled.div``;

const EmailContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ErrorMessageContainer = styled.div`
  width: 100%;
  height: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
`;

function Register() {
  const { checkDuplicateId, registerUser, sendVerifyMail, verifyUser } = useRegister();
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userIdInputRef = useRef<HTMLInputElement>(null);

  const [userPasswordInput, setUserPasswordInput] = useState<string>('');
  const [checkUserPasswordInput, setCheckUserPasswordInput] = useState<string>('');

  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const userCodeInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAbleId, setIsAbleId] = useState<boolean>(false);

  const [isAblePassword, setIsAblePassword] = useState<boolean>(false);

  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const validateId = async () => {
    const userId = userIdInputRef.current?.value;

    if (userId?.includes(' ')) {
      setErrorMessage('아이디에 공백이 포함되어 있습니다.');
      return;
    }

    if (!userId) {
      setErrorMessage('아이디가 입력되지 않았습니다.');
      return;
    }

    const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;
    if (!idRegex.test(userId)) {
      setErrorMessage('아이디는 영문, 숫자 조합 4~20자로 입력해주세요.');
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
    const userName = userNameInputRef.current?.value;
    const userId = userIdInputRef.current?.value;
    const password = userPasswordInput;
    const userEmail = userEmailInputRef.current?.value;

    if (!isAbleId || !userName || !userId || !password || !userEmail) {
      setErrorMessage('모두 올바르게 입력했는지 확인해주세요.');
      return;
    }

    if (!isVerified) {
      setErrorMessage('이메일 인증을 해주세요.');
      return;
    }

    const isSuccess = await registerUser(userId, password, userName, userEmail);
    if (!isSuccess) {
      setIsCodeSent(false);
      setErrorMessage('회원가입에 실패했습니다.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  const sendCode = async () => {
    setErrorMessage('');
    setIsVerified(false);

    const userEmail = userEmailInputRef.current?.value;

    if (!userEmail) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    if (userNameInputRef.current?.value === '') {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }

    if (!isAbleId) {
      setErrorMessage('아이디 중복체크를 해주세요.');
      return;
    }

    if (!isAblePassword) {
      setErrorMessage('비밀번호를 확인해주세요.');
      return;
    }

    const emailSentResult = await sendVerifyMail(userEmail);
    if (typeof emailSentResult === 'string') {
      setErrorMessage(emailSentResult);
      setIsCodeSent(false);
      return;
    }

    setIsCodeSent(true);
  };

  const checkCode = async () => {
    const userEmail = userEmailInputRef.current?.value;
    const inputCode = userCodeInputRef.current?.value;

    if (!userEmail || !inputCode) {
      setErrorMessage('이메일 또는 입력코드가 올바른지 확인해주세요.');
      return;
    }

    const response = await verifyUser(userEmail, inputCode);

    setIsVerified(response.isVerify);
    if (!response.isVerify) {
      setErrorMessage(response.errorMessage);
    } else {
      setErrorMessage('');
    }
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} titleNavBarProps={{ title: '회원가입', useBackIcon: false }}>
      <>
        <FormContainer id={'form'} onSubmit={submitHandler}>
          <NewAppInput label={'이름'} ref={userNameInputRef} placeholder={'이름을 입력해주세요.'} required />

          <NewAppInput
            id={'userId'}
            ref={userIdInputRef}
            onChange={() => {
              setIsAbleId(false);
            }}
            label={'아이디'}
            placeholder={'영문, 숫자 조합 4~20자'}
            buttonProps={{ text: isAbleId ? '사용 가능 ID' : 'ID 중복체크', disabled: isAbleId }}
            enterHandler={validateId}
            required
          />

          <PasswordContainer>
            <NewAppInput
              id={'userPassword'}
              label={'비밀번호'}
              placeholder={'영문, 숫자, 특수문자 조합 8~20자'}
              type={'password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserPasswordInput(event.target.value);
              }}
              value={userPasswordInput}
              required
            />
            <NewAppInput
              id={'userPassword'}
              placeholder={'입력한 비밀번호를 똑같이 입력해주세요.'}
              type={'password'}
              value={checkUserPasswordInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCheckUserPasswordInput(event.target.value);
              }}
              required
            />
          </PasswordContainer>

          <EmailContainer className={'email-container'}>
            <NewAppInput
              type={'email'}
              id={'userEmail'}
              ref={userEmailInputRef}
              label={'이메일 주소'}
              placeholder={'인증코드를 받을 이메일을 입력해주세요.'}
              linkProps={{ text: '회원가입 가능한 이메일 확인하기', url: '/email-domains' }}
              buttonProps={{ text: isCodeSent ? '인증코드 재전송' : '인증코드 발송', type: 'button' }}
              enterHandler={sendCode}
              required
            />

            {isCodeSent && (
              <NewAppInput
                id={'code'}
                ref={userCodeInputRef}
                label={'인증코드'}
                placeholder={'인증코드를 입력해주세요.'}
                buttonProps={{ text: !isVerified ? '인증하기' : '인증완료', type: 'button', disabled: isVerified }}
                enterHandler={checkCode}
                required
              />
            )}
          </EmailContainer>
          <ErrorMessageContainer>{errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}</ErrorMessageContainer>
          <NewRoundedButton size={'sm'}>회원가입</NewRoundedButton>
        </FormContainer>
        <LinkLabel text={'로그인하기'} href={'/login'} style={{ marginTop: '20px' }} />
      </>
    </AppContainer>
  );
}

export default Register;
