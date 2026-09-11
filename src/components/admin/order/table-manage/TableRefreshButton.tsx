import { useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { RiRefreshLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const REFRESH_BUTTON_SIZE_PX = 36;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Button = styled.button`
  width: ${REFRESH_BUTTON_SIZE_PX}px;
  height: ${REFRESH_BUTTON_SIZE_PX}px;
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background-color: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background-color: ${Color.HEAVY_GREY};
  }
`;

const RefreshIcon = styled(RiRefreshLine)<{ isSpinning: boolean }>`
  width: 18px;
  height: 18px;

  ${({ isSpinning }) =>
    isSpinning &&
    css`
      animation: ${spin} 0.5s ease-in-out;
    `}
`;

interface TableRefreshButtonProps {
  onClick: () => void;
}

function TableRefreshButton({ onClick }: TableRefreshButtonProps) {
  const [spinSeq, setSpinSeq] = useState(0);

  const handleClick = () => {
    setSpinSeq((previous) => previous + 1);
    onClick();
  };

  return (
    <Button type="button" aria-label="테이블 목록 새로고침" onClick={handleClick}>
      <RefreshIcon key={spinSeq} isSpinning={spinSeq > 0} />
    </Button>
  );
}

export default TableRefreshButton;
