import React, { useEffect, useRef } from 'react';
import useUser from '../../hook/useUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '../../recoil/atoms';
import useCustomNavigate from '../../hook/useCustomNavigate';

function AdminHome() {
  const { fetchWorkspaces, createWorkspaces } = useUser();
  const { appendPath } = useCustomNavigate();
  const userInputRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const onClickHandler = async () => {
    const userInput = userInputRef.current?.value;
    if (!userInput) {
      alert('Please enter a workspace name.');
      return;
    }
    createWorkspaces(userInput);
  };

  if (workspaces?.length === 0) {
    return (
      <>
        <div>워크스페이스가 없습니다.</div>
        <input ref={userInputRef} type="text"></input>
        <button onClick={onClickHandler}>생성하기</button>
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
        </div>
      ))}
    </div>
  );
}

export default AdminHome;
