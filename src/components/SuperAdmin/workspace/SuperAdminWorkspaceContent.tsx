import { Workspace } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { navBarLabelStyle } from '@styles/navBarStyles';
import { useNavigate } from 'react-router-dom';

const SubLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #d8d8d8;
`;

const WorkspaceLabel = styled.div`
  ${navBarLabelStyle}
`;

function SuperAdminWorkspaceContent({ id, name, owner, createdAt }: Workspace) {
  const navigate = useNavigate();
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const subLabelContents = `${filteredCreatedDate} | ${owner.name}`;

  return (
    <SubContainer flexDirection={'column'} justifyValue={'center'} alignItems={'flex-start'} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <WorkspaceLabel
        onClick={() => {
          navigate(`/admin/workspace/${id}`);
        }}
      >
        {name}
      </WorkspaceLabel>
      <SubLabelContainer>{subLabelContents}</SubLabelContainer>
    </SubContainer>
  );
}

export default SuperAdminWorkspaceContent;
