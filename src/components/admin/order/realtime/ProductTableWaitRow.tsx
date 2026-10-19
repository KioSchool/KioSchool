import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ELAPSED_LEVEL_COLOR, getElapsedLevel } from '@utils/orderElapsed';
import { TableWait } from '@utils/productQueue';

const TABLE_NUMBER_MIN_WIDTH_PX = 36;

const Row = styled.button`
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const TableInfo = styled.span`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const TableNumber = styled.b`
  min-width: ${TABLE_NUMBER_MIN_WIDTH_PX}px;
  font-weight: 800;
  text-align: left;
`;

const Quantity = styled.span`
  color: ${Color.MUTED_GREY};
`;

const Elapsed = styled.span<{ minutes: number }>`
  font-weight: 800;
  color: ${({ minutes }) => ELAPSED_LEVEL_COLOR[getElapsedLevel(minutes)]};
`;

interface ProductTableWaitRowProps {
  wait: TableWait;
  onClick: (orderId: number) => void;
}

function ProductTableWaitRow({ wait, onClick }: ProductTableWaitRowProps) {
  const handleClick = () => {
    onClick(wait.oldestOrderId);
  };

  return (
    <Row onClick={handleClick}>
      <TableInfo>
        <TableNumber>{`${wait.tableNumber}번`}</TableNumber>
        <Quantity>{`${wait.remaining}개`}</Quantity>
      </TableInfo>
      <Elapsed minutes={wait.waitMinutes}>{`${wait.waitMinutes}분 전`}</Elapsed>
    </Row>
  );
}

export default ProductTableWaitRow;
