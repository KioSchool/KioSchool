import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

export const WaitCard = styled.section`
  box-sizing: border-box;
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  ${colFlex({ align: 'stretch' })}
`;

export const WaitCardTitle = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;
