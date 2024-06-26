import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  checked: boolean;
  onChange: () => void;
  uncheckedText?: string;
  checkedText?: string;
}

const Container = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: #dadada;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #c0c0c0;
  }
`;

const Circle = styled.div<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.checked ? '#eb6d09' : 'white')};
  color: ${(props) => (props.checked ? 'white' : 'black')};
  width: 38px;
  height: 38px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.checked &&
    css`
      transform: translate(50px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

function SwitchButton({ checked, onChange, uncheckedText, checkedText }: Props) {
  return (
    <Container onClick={onChange}>
      <Circle checked={checked}>{checked ? checkedText : uncheckedText}</Circle>
    </Container>
  );
}

export default SwitchButton;
