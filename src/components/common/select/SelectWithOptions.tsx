import { SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface Option {
  name: string;
  id: number | string;
}

export interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Container = styled.select`
  border: none;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.25) inset;
  width: 500px;
  height: 50px;
  padding: 0 18px;
  appearance: none;
`;

const SelectWithOptions = (props: SelectWithOptionsProps) => {
  const defaultOption = { name: '기본', id: 'null' };
  const allOptions = [defaultOption, ...props.options];

  return (
    <Container {...props}>
      {allOptions.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Container>
  );
};

export default SelectWithOptions;
