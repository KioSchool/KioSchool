import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { RiCloseLargeLine, RiArrowRightSLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDate } from '@utils/formatDate';
import { useAtomValue } from 'jotai';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { orderModalReadOnlyAtom } from '@jotai/admin/atoms';

const ModalHeader = styled.div`
  padding: 20px 30px 12px 30px;
  border-bottom: 1px solid #e8eef2;
  color: #464a4d;
  ${colFlex({ justify: 'space-between', align: 'start' })}
`;

const ModalHeaderTitle = styled.div`
  width: 100%;
  height: 24px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ModalDescription = styled.div`
  width: 100%;
  gap: 4px;
  height: 48px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ModalTableDescription = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const MainLabel = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const DescriptionLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const CloseIcon = styled(RiCloseLargeLine)`
  width: 16px;
  height: 16px;
  ${expandButtonStyle}
`;

const ArrowRightIcon = styled(RiArrowRightSLine)`
  width: 16px;
  height: 16px;
  ${expandButtonStyle}
`;

interface OrderModalHeaderContentsProps {
  order: Order;
  onClose: () => void;
}

function OrderModalHeaderContents({ onClose, order }: OrderModalHeaderContentsProps) {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const readOnly = useAtomValue(orderModalReadOnlyAtom);

  const handleNavigateToTable = () => {
    onClose();
    navigate({
      pathname: `/admin/workspace/${workspaceId}/order/table`,
      search: createSearchParams({
        tableNo: `${order.tableNumber}` || '',
      }).toString(),
    });
  };

  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <MainLabel>{`주문 번호  ${order.orderNumber}`}</MainLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <ModalDescription>
        <DescriptionLabel>{`${formatDate(order.createdAt)} · ${order.customerName}`}</DescriptionLabel>
        <ModalTableDescription>
          <DescriptionLabel>{`테이블 ${order.tableNumber}`}</DescriptionLabel>
          {!readOnly && <ArrowRightIcon onClick={handleNavigateToTable} />}
        </ModalTableDescription>
      </ModalDescription>
    </ModalHeader>
  );
}

export default OrderModalHeaderContents;
