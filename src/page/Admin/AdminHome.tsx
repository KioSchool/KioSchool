import React, { useEffect } from 'react';
import useUser from '../../hook/useUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '../../recoil/atoms';
import useCustomNavigate from '../../hook/useCustomNavigate';

function AdminHome() {
  const { fetchWorkspaces } = useUser();
  const { appendPath } = useCustomNavigate();
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (workspaces?.length === 0) {
    return <div>워크스페이스가 없습니다.</div>;
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
