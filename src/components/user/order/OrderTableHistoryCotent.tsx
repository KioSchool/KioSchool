import { Table } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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

function OrderTableHistoryContent(props: Table) {
  const datePart = props.createdAt.split('T')[0];
  const timePart = props.createdAt.split('T')[1].split(':');
  const filteredCreatedDate = datePart.replace(/-/g, '.') + ' - ' + timePart[0] + ':' + timePart[1];

  const createdDateAndOwnerText = `${props.customerName} | ${filteredCreatedDate}`;

  return (
    <SubContainer useFlex={colFlex({ justify: 'center', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <TableOrderLabel onClick={() => {}} className={'table-order-label'}>
        {`주문번호 ${props.id}번`}
      </TableOrderLabel>
      <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
    </SubContainer>
  );
}

export default OrderTableHistoryContent;
