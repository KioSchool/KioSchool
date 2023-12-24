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
  const [ableId, setAbleId] = useState<boolean | null>(null);
  const [isSendCode, setIsSendCode] = useState<boolean | null>(null);
  const [isVeryfied, setIsVeryfied] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameLength: number = userName.trim().length;
    if (ableId === true && isVeryfied === true && nameLength > 0) {
      // 사용가능한 id, 이메일 인증 완료, 이름이 공백이 아닌 경우 가입 진행
      try {
        const response = await userApi.post<any>('/register', {
          id: userId,
          password: userPassword,
          name: userName,
          email: userEmail,
        });

        console.log(response);
        //성공
        navigate('/login');
      } catch (error) {
        //실패
        setIsSendCode(false);
        setErrorMessage('send email error');
      }
    } else {
      setErrorMessage('Please check userId duplicate');
    }
  };

  const sendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    try {
      const response = await userApi.post<any>('/user/email', {
        email: userEmail,
      });

      console.log(response);
      //성공
      setIsSendCode(true);
    } catch (error) {
      //실패
      setIsSendCode(false);
      setErrorMessage('send email error');
    }
  };

  const checkCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    try {
      const response = await userApi.post<any>('/user/verify', {
        email: userEmail,
        code: inputCode,
      });

      console.log(response);
      //성공
      setIsVeryfied(true);
    } catch (error) {
      //실패
      setIsVeryfied(false);
      setErrorMessage('check email error');
    }
  };
  return (
    <Fragment>
      <h1>THIS IS REGISTER PAGE</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus />
        </div>

        <div>
          <label htmlFor="userId">userId:</label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button onClick={checkDuplicate}>ID 중복체크</button>
          {ableId === true && <div>사용가능한 ID입니다!</div>}
        </div>

        <div>
          <label htmlFor="userPassword">password:</label>
          <input type="text" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
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
