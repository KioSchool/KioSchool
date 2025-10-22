import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';

export const CardContainer = styled.div<{ height: number }>`
  ${colFlex({
    justify: 'space-between',
    align: 'start',
  })}
  background-color: ${Color.WHITE};
  width: 150px;
  height: ${(props) => props.height}px;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  padding: 12px 15px;

  &:hover {
    background-color: ${Color.KIO_ORANGE};

    & * {
      background-color: ${Color.KIO_ORANGE};
      color: ${Color.WHITE} !important;
      stroke: ${Color.WHITE};
    }
  }
`;

export const OrderInfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  ${colFlex()}
`;

export const TitleContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: 24px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

export const CheckButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'end', align: 'end' })}
`;

export const CheckIcon = styled(RiCheckboxCircleFill)`
  width: 20px;
  height: 20px;
  color: ${Color.GREY};
  ${expandButtonStyle}
`;
