import { SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

interface Option {
  name: string;
  id: number | string;
}

const Container = styled.select<{ width?: string; variant?: 'pill' | 'rectangular' }>`
  border: none;
  border-radius: ${({ variant }) => (variant === 'rectangular' ? '8px' : '45px')};
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : '100%')};
  height: 50px;
  padding: ${({ variant }) => (variant === 'rectangular' ? '0 16px' : '0 40px')};

  border: 1px solid rgba(201, 201, 201, 0.5);
  cursor: pointer;

  appearance: none;

  color: #c9c9c9;

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #c9c9c9;
  }

  &:valid {
    color: #464a4d;
  }

  option {
    color: #464a4d;
  }
`;

export interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  isUseDefaultOption?: boolean;
  width?: string;
  variant?: 'pill' | 'rectangular';
}

function SelectWithOptions({ options, isUseDefaultOption = true, width, variant = 'pill', ...otherProps }: SelectWithOptionsProps) {
  const defaultOption = { name: '기본메뉴', id: 'null' };
  const allOptions = isUseDefaultOption ? [defaultOption, ...options] : [...options];

  const isControlled = otherProps.value !== undefined;
  const useDefaultOption = !isControlled && allOptions.length > 0;
  const defaultValueProp = useDefaultOption ? { defaultValue: allOptions[0].id } : {};

  return (
    <Container {...defaultValueProp} {...otherProps} width={width} required variant={variant}>
      {allOptions.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Container>
  );
}

export default SelectWithOptions;
