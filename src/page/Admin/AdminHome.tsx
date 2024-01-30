import React, { useEffect, useRef } from 'react';
import useAdminUser from '../../hook/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '../../recoil/atoms';
import useCustomNavigate from '../../hook/useCustomNavigate';
import { Link } from 'react-router-dom';

function AdminHome() {
  const { fetchWorkspaces, createWorkspaces, leaveWorkspaces } = useAdminUser();
  const { appendPath } = useCustomNavigate();
  const userInputRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = userInputRef.current?.value;
    if (!userInput) {
      alert('workspace 이름을 입력해주세요');
      return;
    }
    createWorkspaces(userInput);
  };

  const leaveHandler = (id: number) => {
    leaveWorkspaces(id);
  };

  return (
    <>
      <div>
        {workspaces.map((it) => (
          <div key={it.id}>
            {it.id} - {it.name}
            <button
              type={'button'}
              onClick={() => {
                appendPath(`/workspace/${it.id}`);
              }}
            >
              이동
            </button>
            <button onClick={() => leaveHandler(it.id)}>탈퇴하기</button>
          </div>
        ))}
      </div>

      <form onSubmit={createHandler}>
        <input ref={userInputRef} type="text"></input>
        <button type="submit">생성하기</button>
      </form>
      <Link to={'/register-account'}>계좌 연결하기</Link>
    </>
  );
}

export default AdminHome;
