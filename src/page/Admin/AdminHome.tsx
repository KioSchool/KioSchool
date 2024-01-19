import React, { useEffect, useRef } from 'react';
import useUser from '../../hook/useUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '../../recoil/atoms';
import useCustomNavigate from '../../hook/useCustomNavigate';

function AdminHome() {
  const { fetchWorkspaces, createWorkspaces, leaveWorkspaces } = useUser();
  const { appendPath } = useCustomNavigate();
  const userInputRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const createHandler = () => {
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

  if (workspaces?.length === 0) {
    return (
      <>
        <div>워크스페이스가 없습니다.</div>
        <input ref={userInputRef} type="text"></input>
        <button onClick={createHandler}>생성하기</button>
      </>
    );
  }

  return (
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
  );
}

export default AdminHome;
