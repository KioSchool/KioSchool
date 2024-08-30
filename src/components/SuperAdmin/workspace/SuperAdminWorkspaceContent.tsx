import { Workspace } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const SubLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #d8d8d8;
`;

const WorkspaceLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: #5c5c5c;
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: #eb6d09;
    text-decoration: underline;
  }
`;

function SuperAdminWorkspaceContent({ id, name, owner, createdAt }: Workspace) {
  const navigate = useNavigate();
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const createdDateAndOwnerText = `${filteredCreatedDate} | ${owner.name}`;

  return (
    <SubContainer
      contentsDirection={'column'}
      contentsJustify={'center'}
      contentsAlign={'flex-start'}
      customWidth={'1000px'}
      customHeight={'80px'}
      customGap={'5px'}
    >
      <WorkspaceLabel
        onClick={() => {
          navigate(`/admin/workspace/${id}`);
        }}
        className={'workspace-label'}
      >
        {name}
      </WorkspaceLabel>
      <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
    </SubContainer>
  );
}

export default SuperAdminWorkspaceContent;
