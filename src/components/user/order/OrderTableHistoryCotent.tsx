import { Table } from '@@types/index';
import TableOrderCard from '@components/admin/order/TableOrderCard';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Dispatch, SetStateAction } from 'react';

const SubLabelContainer = styled.div`
  color: #d8d8d8;
  ${rowFlex()}
`;

const TableOrderLabel = styled.div`
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

interface OrderTableHistoryProps extends Table {
  isShowDetail?: boolean;
  setSelectedOrderId: Dispatch<SetStateAction<null | number>>;
}

function OrderTableHistoryContent({ id, customerName, createdAt, isShowDetail, setSelectedOrderId, orderProducts, totalPrice }: OrderTableHistoryProps) {
  const datePart = createdAt.split('T')[0];
  const timePart = createdAt.split('T')[1].split(':');
  const filteredCreatedDate = datePart.replace(/-/g, '.') + ' - ' + timePart[0] + ':' + timePart[1];

  const createdDateAndOwnerText = `${customerName} | ${filteredCreatedDate}`;

  const onClickTableOrderLabel = () => {
    if (isShowDetail) {
      setSelectedOrderId(null);
      return;
    }

    setSelectedOrderId(id);
  };

  return (
    <SubContainer useFlex={colFlex({ justify: 'center', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <TableOrderLabel onClick={onClickTableOrderLabel} className={'table-order-label'}>
        {`주문번호 ${id}번`}
      </TableOrderLabel>
      <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
      {isShowDetail && <TableOrderCard id={id} customerName={customerName} createdAt={createdAt} orderProducts={orderProducts} totalPrice={totalPrice} />}
    </SubContainer>
  );
}

export default OrderTableHistoryContent;
