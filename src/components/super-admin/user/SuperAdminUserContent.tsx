import styled from '@emotion/styled';
import { User } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Row = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f7f7f7;
  ${rowFlex({ align: 'center' })}
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const Sub = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

function SuperAdminUserContent(user: User) {
  return (
    <Row>
      <Info>
        <Name>{user.name}</Name>
        <Sub>{user.email}</Sub>
      </Info>
    </Row>
  );
}

export default SuperAdminUserContent;
