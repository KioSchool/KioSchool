import { User } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SubLabelContainer = styled.div`
  color: #d8d8d8;
  ${rowFlex()}
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

function SuperAdminUserContent({ name, email, createdAt }: User) {
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const createdDateAndOwnerText = `${filteredCreatedDate} | ${email}`;

  return (
    <SubContainer useFlex={colFlex({ justify: 'center', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <WorkspaceLabel className={'user-label'}>{name}</WorkspaceLabel>
      <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
    </SubContainer>
  );
}

export default SuperAdminUserContent;
