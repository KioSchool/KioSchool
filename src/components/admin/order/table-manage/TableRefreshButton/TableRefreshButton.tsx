import styled from '@emotion/styled';
import { RiRefreshLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const REFRESH_BUTTON_SIZE_PX = 36;

const Button = styled.button`
  width: ${REFRESH_BUTTON_SIZE_PX}px;
  height: ${REFRESH_BUTTON_SIZE_PX}px;
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background-color: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background-color: ${Color.HEAVY_GREY};
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`;

const RefreshIcon = styled(RiRefreshLine)`
  width: 18px;
  height: 18px;
  transition: transform 0.25s ease-in-out;
`;

interface TableRefreshButtonProps {
  onClick: () => void;
}

function TableRefreshButton({ onClick }: TableRefreshButtonProps) {
  return (
    <Button type="button" aria-label="테이블 목록 새로고침" onClick={onClick}>
      <RefreshIcon />
    </Button>
  );
}

export default TableRefreshButton;
