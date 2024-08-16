import { Workspace } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';

const SubLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #d8d8d8;
`;

function SuperAdminWorkspaceContent({ name, owner, createdAt }: Workspace) {
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');

  return (
    <SubContainer style={{ gap: '5px' }} flexDirection="column" justifyValue="center" alignItems="flex-start" customWidth="1000px" customHeight="80px">
      <AppLabel size={20} style={{ fontWeight: 600 }}>
        {name}
      </AppLabel>
      <SubLabelContainer>{`${filteredCreatedDate} | ${owner.name}`}</SubLabelContainer>
    </SubContainer>
  );
}

export default SuperAdminWorkspaceContent;
