import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

// 대기 화면 카드 공통 틀(Figma 주문 대기 보드: 흰 바탕·#e8eef2 테두리·16px 둥글기)
export const WaitCard = styled.section`
  box-sizing: border-box;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  background: #ffffff;
  ${colFlex({ align: 'stretch' })}
`;

export const WaitCardTitle = styled.span`
  color: #25282b;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;
