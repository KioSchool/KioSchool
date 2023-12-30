import React, { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';

function Register() {
  const { userApi } = useApi();
  const navigate = useNavigate();
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [ableId, setAbleId] = useState<boolean | null>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean | null>(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(false);

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

  const submitHandler = () => {
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

    const nameLength = userName.trim().length;
    if (ableId === true && isVerified === true && nameLength && nameLength > 0) {
      // 사용가능한 id, 이메일 인증 완료, 이름이 공백이 아닌 경우 가입 진행
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
    } else {
      if (ableId === false) {
        setErrorMessage('Please check userId duplicate');
      } else if (isVerified === false) {
        setErrorMessage('Please verify your email address');
      }
    }
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
      <h1>THIS IS REGISTER PAGE</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={userNameInputRef} autoFocus required />
        </div>

        <div>
          <label htmlFor="userId">userId:</label>
          <input type="text" id="userId" ref={userIdInputRef} onChange={() => setAbleId(false)} required />
          <button onClick={checkDuplicate}>ID 중복체크</button>
          {ableId === true && <div>사용가능한 ID입니다!</div>}
        </div>

        <div>
          <label htmlFor="userPassword">password:</label>
          <input type="password" id="userPassword" ref={userPasswordInputRef} required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={userEmailInputRef} required />
        </div>

        <div>
          <button onClick={sendCode}>이메일 인증 코드 받기</button>
        </div>

        {isCodeSent && (
          <div>
            <label htmlFor="code">인증번호</label>
            <input id="code" type="text" onChange={(e) => setInputCode(e.target.value)} />

            <button onClick={sendCode}>재전송</button>
            <button onClick={checkCode}>코드 확인</button>
          </div>
        )}

        {isVerified && isVerified ? '인증 성공' : '인증 실패'}
        <button type="submit">Register</button>
      </form>
    </Fragment>
  );
}

export default Register;
