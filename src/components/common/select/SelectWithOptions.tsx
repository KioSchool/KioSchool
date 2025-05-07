import { SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

interface Option {
  name: string;
  id: number | string;
}

const Container = styled.select<{ width?: string }>`
  border: none;
  border-radius: 45px;
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : '100%')};
  height: 50px;
  padding: 0 40px;

  border: 1px solid rgba(201, 201, 201, 0.5);
  cursor: pointer;

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #c9c9c9;
  }
`;

export interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  isUseDefaultOption?: boolean;
  width?: string;
}

const SelectWithOptions = ({ options, isUseDefaultOption = true, width, ...otherProps }: SelectWithOptionsProps) => {
  const defaultOption = { name: '기본메뉴', id: 'null' };
  const allOptions = isUseDefaultOption ? [defaultOption, ...options] : [...options];

  return (
    <Container {...otherProps} width={width}>
      {allOptions.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Container>
  );
};

export default SelectWithOptions;
