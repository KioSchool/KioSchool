import { Workspace } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SubLabelContainer = styled.div`
  color: ${Color.HEAVY_GREY};
  ${rowFlex()}
`;

const WorkspaceLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: ${Color.GREY};
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

function SuperAdminWorkspaceContent({ id, name, owner, createdAt }: Workspace) {
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const createdDateAndOwnerText = `${filteredCreatedDate} | ${owner.name}`;

  return (
    <SubContainer useFlex={colFlex({ justify: 'center', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <WorkspaceLabel
        onClick={() => {
          window.open(`${window.location.origin}/admin/workspace/${id}`, '_blank', 'rel=noopener noreferrer popup=false');
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
