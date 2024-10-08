import { Table } from '@@types/index';
import TableOrderCard from '@components/admin/order/TableOrderCard';
import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Dispatch, SetStateAction } from 'react';

const Container = styled.div<{
  useFlex: SerializedStyles;
}>`
  width: 1000px;
  min-width: 1000px;
  height: auto;
  padding: 10px;
  gap: 10px;
  ${(props) => props.useFlex}
`;

const SubLabelContainer = styled.div`
  color: ${Color.HEAVY_GREY};
  ${rowFlex()}
`;

const TableOrderLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${Color.GREY};
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

interface OrderTableHistoryProps extends Table {
  isShowDetail?: boolean;
  setSelectedOrderId: Dispatch<SetStateAction<null | number>>;
}

function OrderTableHistoryContent(props: OrderTableHistoryProps) {
  const datePart = props.createdAt.split('T')[0];
  const timePart = props.createdAt.split('T')[1].split(':');
  const filteredCreatedDate = datePart.replace(/-/g, '.') + ' - ' + timePart[0] + ':' + timePart[1];

  const createdDateAndOwnerText = `${props.customerName} | ${filteredCreatedDate}`;

  const onClickTableOrderLabel = () => {
    if (props.isShowDetail) {
      props.setSelectedOrderId(null);
      return;
    }

    props.setSelectedOrderId(props.id);
  };

  return (
    <Container useFlex={colFlex({ justify: 'center', align: 'start' })}>
      <TableOrderLabel onClick={onClickTableOrderLabel} className={'table-order-label'}>
        {`주문번호 ${props.id}번`}
      </TableOrderLabel>
      <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
      {props.isShowDetail && <TableOrderCard {...props} />}
    </Container>
  );
}

export default OrderTableHistoryContent;
