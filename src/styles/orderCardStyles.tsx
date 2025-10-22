import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';

export const CardContainer = styled.div<{ height: number }>`
  ${colFlex({
    justify: 'flex-start',
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
      color: ${Color.WHITE};
      stroke: ${Color.WHITE};
    }
  }
`;

export const OrderInfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  flex-grow: 1;
  min-height: 0;
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

interface CardTextProps {
  size: number;
  weight?: string | number;
  height?: number;
}

export const CardText = styled.span<CardTextProps>`
  height: ${(props) => props.height || 'auto'};
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight || 400};
  color: #464a4d;
  cursor: pointer;
  background-color: transparent;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.8px solid #e8eef2;
`;

export const HeaderContainer = styled.div``;
