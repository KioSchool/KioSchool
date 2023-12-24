import React, { Fragment, useState } from 'react';
import { userApi } from '../../axios';

function Register() {
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [ableId, setAbleId] = useState<boolean | null>(null);
  const [sendCode, setSendCode] = useState<boolean | null>(null);

  const checkDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지
    if (!userId) {
      setErrorMessage('The userId is null');
      return;
    }
    try {
      const response = await userApi.post<any>('/user/duplicate', {
        id: userId,
      });

      console.log(response);
      if (response.data === true) {
        setErrorMessage('The userId is already in use');
        setAbleId(false);
      } else {
        setErrorMessage('');
        setAbleId(true);
      }
    } catch (error) {
      console.error('duplicate check error:', error);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (ableId) {
      // register logic
    } else {
      setErrorMessage('Please check userId duplicate');
    }
  };

  const verifyHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    try {
      const response = await userApi.post<any>('/user/email', {
        email: userEmail,
      });

      console.log(response);
      setSendCode(true);
    } catch (error) {
      console.error('duplicate check error:', error);
    }
  };
  return (
    <Fragment>
      <h1>THIS IS REGISTER PAGE</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div>
          <label htmlFor="userId">userId:</label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button onClick={checkDuplicate}>ID 중복체크</button>
          {ableId === true && <div>사용가능한 ID입니다!</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
        <div>
          <button onClick={verifyHandler}>이메일 인증 코드 받기</button>
        </div>
        {sendCode && (
          <div>
            <label htmlFor="number">인증번호</label>
            <input type="number" />
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </Fragment>
  );
}

export default Register;
