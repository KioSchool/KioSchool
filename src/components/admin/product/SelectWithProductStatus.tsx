import styled from '@emotion/styled';

import { STATUS_OPTIONS } from '@constants/data/productData';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ProductStatus } from '@@types/index';

const Container = styled.div`
  width: 100%;
  padding: 3px;
  border-radius: 10px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  gap: 2px;
  ${rowFlex({ align: 'center' })}
`;

function getStatusColor(status: ProductStatus, isSelected: boolean) {
  if (!isSelected) return Color.TEXT_HINT;
  if (status === ProductStatus.SELLING) return Color.KIO_ORANGE_DARK;
  return Color.TEXT_DEFAULT;
}

const StatusButton = styled.button<{ status: ProductStatus; isSelected: boolean }>`
  flex: 1;
  min-width: 0;
  height: 30px;
  padding: 0 7px;
  border: none;
  border-radius: 8px;
  background: ${Color.WHITE};
  box-shadow: ${({ status, isSelected }) => (isSelected && status !== ProductStatus.SELLING ? '0 1px 4px rgba(37, 40, 43, 0.12)' : 'none')};
  font-size: 11px;
  font-weight: 700;
  color: ${({ status, isSelected }) => getStatusColor(status, isSelected)};
  white-space: nowrap;
  cursor: pointer;
`;

interface SelectWithProductStatusProps {
  currentStatus: ProductStatus;
  onStatusChange: (status: ProductStatus) => void;
}

function SelectWithProductStatus({ currentStatus, onStatusChange }: SelectWithProductStatusProps) {
  return (
    <Container>
      {STATUS_OPTIONS.map((option) => (
        <StatusButton
          type="button"
          key={option.value}
          status={option.value}
          isSelected={option.value === currentStatus}
          aria-pressed={option.value === currentStatus}
          onClick={() => onStatusChange(option.value)}
        >
          {option.label}
        </StatusButton>
      ))}
    </Container>
  );
}

export default SelectWithProductStatus;
