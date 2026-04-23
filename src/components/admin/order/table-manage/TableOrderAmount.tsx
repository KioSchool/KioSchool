import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  min-width: 188px;
  height: 188px;
  flex: 1;
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: #f0f5f8;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 700;
  color: ${Color.GREY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

interface TableOrderAmountProps {
  totalOrderAmount: number;
}

function TableOrderAmount({ totalOrderAmount }: TableOrderAmountProps) {
  return (
    <Container>
      <Header>총 주문금액</Header>
      <Content>{totalOrderAmount.toLocaleString()}원</Content>
    </Container>
  );
}

export default TableOrderAmount;
