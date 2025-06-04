import { adminUserTossAccountAtomSelector } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';

const Container = styled.div`
  width: 30%;
  height: 100%;
  ${colFlex({ justify: 'space-between', align: 'center' })};
`;

const Title = styled.div`
  color: ${Color.BLACK};
  font-size: 15px;
  font-weight: 500;
`;

function TossAccountInfo() {
  const tossAccountInfo = useRecoilValue(adminUserTossAccountAtomSelector);
  const text = tossAccountInfo ? '등록됨 ✅' : '미등록 ❌';

  return (
    <Container>
      <Title>토스 QR 등록 여부</Title>
      <AppLabel size={15}>{text}</AppLabel>
    </Container>
  );
}

export default TossAccountInfo;
