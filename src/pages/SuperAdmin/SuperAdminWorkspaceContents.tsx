import { WorkspaceList } from '@@types/index';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const EmptyLabel = styled.div`
  font-size: 40px;
  color: #d8d8d8;
`;

function SuperAdminWorkspaceContents({ workspaces }: { workspaces: WorkspaceList }) {
  if (workspaces.numberOfElements === 0) {
    return <EmptyLabel>찾고자 하는 워크스페이스가 없습니다.</EmptyLabel>;
  }

  return (
    <>
      {workspaces.content.map((item, index) => (
        <div key={item.id}>
          <SuperAdminWorkspaceContent {...item} />
          {index < workspaces.content.length - 1 && <HorizontalLine />}
        </div>
      ))}
    </>
  );
}

export default SuperAdminWorkspaceContents;
