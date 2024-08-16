import { Workspace } from '@@types/index';
import AppButton from '@components/common/button/AppButton';
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

interface WorkspaceProps extends Workspace {
  showDescribe: boolean;
  onSelect: (id: number) => void;
}

function SuperAdminWorkspaceContent({ id, name, owner, createdAt, showDescribe, onSelect }: WorkspaceProps) {
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const navigate = useNavigate();

  return (
    <SubContainer flexDirection={'column'} justifyValue={'center'} alignItems={'flex-start'} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <WorkspaceLabel
        onClick={() => {
          onSelect(id);
        }}
      >
        {name}
      </WorkspaceLabel>

      <SubLabelContainer>{`${filteredCreatedDate} | ${owner.name}`}</SubLabelContainer>
      {showDescribe && (
        <>
          <div>Detail Contents</div>
          <AppButton
            onClick={() => {
              navigate(`/admin/workspace/${id}`);
            }}
          >
            바로가기
          </AppButton>
        </>
      )}
    </SubContainer>
  );
}

export default SuperAdminWorkspaceContent;
