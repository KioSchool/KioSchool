import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { expandButtonStyle } from '@styles/buttonStyles';
import { Color } from '@resources/colors';

const cardBaseStyle = (height: number) => css`
  ${colFlex({
    justify: 'flex-start',
    align: 'start',
  })}
  background-color: ${Color.WHITE};
  min-width: 150px;
  height: ${height}px;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  padding: 12px 15px;
`;

export const CardContainer = styled.div<{ height: number }>`
  ${({ height }) => cardBaseStyle(height)}

  &:hover {
    background-color: ${Color.KIO_ORANGE};

    & * {
      background-color: ${Color.KIO_ORANGE};
      color: ${Color.WHITE};
      stroke: ${Color.WHITE};
    }
  }
`;

// 카드 안에 결제 확인 버튼이 따로 있는 카드용. 공용 hover 반전(& *)은 버튼까지 같은 색으로 덮어 두 클릭 영역이 하나처럼 보인다
export const PlainCardContainer = styled.div<{ height: number }>`
  transition: background-color 0.12s ease-in-out, border-color 0.12s ease-in-out;
  ${({ height }) => cardBaseStyle(height)}

  &:hover {
    background-color: ${Color.LIGHT_GREY};
    border-color: ${Color.HEAVY_GREY};
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

export const CheckIcon = styled(RiCheckboxCircleFill)`
  width: 20px;
  height: 20px;
  color: ${Color.GREY};
  ${expandButtonStyle}
`;
