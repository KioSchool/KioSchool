import { ForwardedRef, forwardRef } from 'react';
import AppButton from '../button/AppButton';
import styled from '@emotion/styled';
import AppInput from './AppInput';

const CategoriesInputSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
`;

interface AppInputWithButtonProps {
  onclick: () => void;
}

const AppInputWithButton = forwardRef<HTMLInputElement, AppInputWithButtonProps>((props: AppInputWithButtonProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <CategoriesInputSubContainer>
      <AppInput placeholder="카테고리명" ref={ref} {...props} style={{ width: '230px', boxShadow: 'none' }} />
      <AppButton onClick={props.onclick} style={{ marginLeft: '20px' }}>
        카테고리 추가
      </AppButton>
    </CategoriesInputSubContainer>
  );
});

export default AppInputWithButton;
