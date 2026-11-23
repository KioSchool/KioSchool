import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiQrCodeLine } from '@remixicon/react';
import { useSetAtom } from 'jotai';
import { Table } from '@@types/index';
import StatusBadge from '@components/admin/order/table-manage/common/StatusBadge';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TableStatus } from '@utils/tableStatus';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

const TopRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const TableName = styled.div`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${Color.GREY};
`;

const activeQrStyle = css`
  border-color: ${Color.KIO_ORANGE};
  color: ${Color.KIO_ORANGE};
`;

const QrButton = styled.button<{ isActive: boolean }>`
  height: 28px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 20px;
  background-color: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  color: ${Color.GREY};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  gap: 4px;
  transition: background-color 0.15s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};
  ${({ isActive }) => isActive && activeQrStyle}

  &:hover {
    background-color: ${Color.LIGHT_GREY};
  }
`;

interface DemoTableDetailHeaderProps {
  table: Table;
  status: TableStatus;
}

function DemoTableDetailHeader({ table, status }: DemoTableDetailHeaderProps) {
  const dispatch = useSetAtom(demoStateAtom);

  return (
    <Container>
      <TopRow>
        <TableName>{table.tableNumber}번 테이블</TableName>
        <QrButton type="button" isActive={Boolean(table.orderSession)} onClick={() => dispatch({ type: 'UNSUPPORTED' })}>
          <RiQrCodeLine size={14} />
          QR
        </QrButton>
      </TopRow>
      <StatusBadge status={status} />
    </Container>
  );
}

export default DemoTableDetailHeader;
