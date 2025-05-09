import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { lineSeedKrFont } from '@styles/fonts';

const UncheckedStyle = css`
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1) inset;
`;

const Container = styled.div<{ checked: boolean }>`
  width: 87px;
  height: 36px;
  border-radius: 93px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? Color.KIO_ORANGE : Color.LIGHT_GREY)};
  position: relative;
  justify-content: ${(props) => (props.checked ? 'flex-start' : 'flex-end')};
  ${(props) => (props.checked ? '' : UncheckedStyle)}
  ${rowFlex({ align: 'center' })}
`;

const Circle = styled.div<{ checked: boolean }>`
  background-color: ${Color.WHITE};
  width: 32px;
  height: 32px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.checked &&
    css`
      transform: translate(48px, 0);
      transition: all 0.5s ease-in-out;
    `}
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TextStyle = css`
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  font-size: 13px;
  font-weight: 700;
  width: calc(100% - 32px);
  text-align: center;
  ${lineSeedKrFont};
`;

const CheckedText = styled.span`
  color: ${Color.WHITE};
  ${TextStyle};
`;

const UncheckedText = styled.span`
  color: #929292;
  ${TextStyle};
`;

interface Props {
  checked: boolean;
  onChange: () => void;
  uncheckedText?: string;
  checkedText?: string;
}

function SwitchButton({ checked, onChange, uncheckedText, checkedText }: Props) {
  return (
    <Container checked={checked} onClick={onChange}>
      {checked && <CheckedText>{checkedText}</CheckedText>}
      <Circle checked={checked} />
      {!checked && <UncheckedText>{uncheckedText}</UncheckedText>}
    </Container>
  );
}

export default SwitchButton;
