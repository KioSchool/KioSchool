import { ForwardedRef, forwardRef } from 'react';
import AppButton from '@components/common/button/AppButton';
import styled from '@emotion/styled';
import AppInput from '@components/common/input/AppInput';
import { rowFlex } from '@styles/flexStyles';

const AppInputWithButtonContainer = styled.div`
  height: 65px;
  width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface AppInputWithButtonProps {
  onButtonClick: () => void;
}

const AppInputWithButton = forwardRef<HTMLInputElement, AppInputWithButtonProps>((props: AppInputWithButtonProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <AppInputWithButtonContainer>
      <AppInput placeholder="카테고리명" ref={ref} {...props} style={{ width: '230px', boxShadow: 'none' }} />
      <AppButton onClick={props.onButtonClick} style={{ marginLeft: '20px' }}>
        카테고리 추가
      </AppButton>
    </AppInputWithButtonContainer>
  );
});

export default AppInputWithButton;
