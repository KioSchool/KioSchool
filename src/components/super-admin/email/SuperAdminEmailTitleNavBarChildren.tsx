import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import RoundedAppButton from '@components/common/button/RoundedAppButton';

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function SuperAdminEmailTitleNavBarChildren() {
  return (
    <ButtonContainer className={'button-container'}>
      <RoundedAppButton>도메인 추가하기</RoundedAppButton>
    </ButtonContainer>
  );
}

export default SuperAdminEmailTitleNavBarChildren;
