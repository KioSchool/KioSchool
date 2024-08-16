import { Workspace } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';

function SuperAdminWorkspaceContent({ name, owner, createdAt }: Workspace) {
  return (
    <SubContainer justifyValue="flex-start" customWidth="1000px" customHeight="80px">
      {name}
      {owner.name}
      {createdAt}
    </SubContainer>
  );
}

export default SuperAdminWorkspaceContent;
