import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { PHONE_INNER_HEIGHT, PHONE_INNER_WIDTH, PREVIEW_SCALE, SCREEN_HEIGHT, SCREEN_WIDTH } from './previewConstants';

const Phone = styled.div`
  box-sizing: border-box;
  width: 219px;
  height: 459px;
  padding: 3px;
  border-radius: 28px;
  border: 3px solid #d1d5d8;
  background: ${Color.WHITE};
  overflow: hidden;
`;

const PhoneScreen = styled.div`
  width: ${PHONE_INNER_WIDTH}px;
  height: ${PHONE_INNER_HEIGHT}px;
  border-radius: 22px;
  overflow: hidden;
`;

const Scaled = styled.div`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  transform: scale(${PREVIEW_SCALE});
  transform-origin: top left;
  background: ${Color.WHITE};
  ${colFlex({ justify: 'space-between' })}
`;

interface ScaledPhoneProps {
  children: ReactNode;
}

function ScaledPhone({ children }: ScaledPhoneProps) {
  return (
    <Phone>
      <PhoneScreen>
        <Scaled>{children}</Scaled>
      </PhoneScreen>
    </Phone>
  );
}

export default ScaledPhone;
