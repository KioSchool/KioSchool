import styled from '@emotion/styled';
import { RiQrCodeLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useModal from '@hooks/useModal';
import StatusBadge from '@components/admin/order/table-manage/common/StatusBadge/StatusBadge';
import TableQrModal from '@components/admin/order/table-manage/qrcode/TableQrModal/TableQrModal';
import { TableStatus } from '@utils/tableStatus';
import { Table } from '@@types/index';

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
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const QrButton = styled.button<{ isActive: boolean }>`
  height: 28px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 20px;
  background-color: ${Color.WHITE};
  border: 1px solid ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.GREY)};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface TableDetailHeaderProps {
  table: Table;
  status: TableStatus;
  workspaceId: string | undefined;
  workspaceName: string;
}

function TableDetailHeader({ table, status, workspaceId, workspaceName }: TableDetailHeaderProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const isActive = Boolean(table.orderSession);

  return (
    <Container>
      <TopRow>
        <TableName>{table.tableNumber}번 테이블</TableName>
        <QrButton type="button" isActive={isActive} onClick={openModal}>
          <RiQrCodeLine size={14} />
          QR
        </QrButton>
      </TopRow>
      <StatusBadge status={status} />
      {isModalOpen && <TableQrModal workspaceId={workspaceId} workspaceName={workspaceName} table={table} onClose={closeModal} />}
    </Container>
  );
}

export default TableDetailHeader;
