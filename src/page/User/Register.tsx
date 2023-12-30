import React, { Fragment, useState } from 'react';
import { userApi } from '../../axios';
import { useNavigate } from 'react-router-dom';
// input에 관한거 ref로 바꾸는게 좋음
function Register() {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [ableId, setAbleId] = useState<boolean | null>(false);
  const [isSendCode, setIsSendCode] = useState<boolean | null>(false);
  const [isVeryfied, setIsVeryfied] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const checkDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지
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

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const nameLength: number = userName.trim().length;

    if (ableId === true && isVeryfied === true && nameLength > 0) {
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
          setIsSendCode(false);
          setErrorMessage('send email error');
        });
    } else {
      if (ableId === false) {
        setErrorMessage('Please check userId duplicate');
      } else if (isVeryfied === false) {
        setErrorMessage('Please verify your email address');
      }
    }
  };

  const sendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');
    userApi
      .post<any>('/user/email', {
        email: userEmail,
      })
      .then(() => {
        setIsSendCode(true);
      })
      .catch((err) => {
        setErrorMessage('send email error! please check your email address');
        console.error(err);
      });
  };

  const checkCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    userApi
      .post<any>('/user/verify', {
        email: userEmail,
        code: inputCode,
      })
      .then(() => {
        setIsVeryfied(true);
      })
      .catch(() => {
        setIsVeryfied(false);
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
          <input type="text" id="name" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus required />
        </div>

        <div>
          <label htmlFor="userId">userId:</label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          <button onClick={checkDuplicate}>ID 중복체크</button>
          {ableId === true && <div>사용가능한 ID입니다!</div>}
        </div>

        <div>
          <label htmlFor="userPassword">password:</label>
          <input type="password" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        </div>

        <div>
          <button onClick={sendCode}>이메일 인증 코드 받기</button>
        </div>

        {isSendCode && (
          <div>
            <label htmlFor="code">인증번호</label>
            <input id="code" type="text" onChange={(e) => setInputCode(e.target.value)} />

            <button onClick={sendCode}>재전송</button>
            <button onClick={checkCode}>코드 확인</button>
          </div>
        )}

        {isVeryfied && isVeryfied ? '인증 성공' : '인증 실패'}
        <button type="submit">Register</button>
      </form>
    </Fragment>
  );
}

export default Register;
