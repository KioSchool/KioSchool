import styled from '@emotion/styled';
import { RiSearchLine } from '@remixicon/react';
import { ChangeEvent } from 'react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${Color.WHITE};
  border-bottom: 0.5px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
  padding: 0 20px;
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${Color.TEXT_DEFAULT};

  &::placeholder {
    color: ${Color.DISABLED_GREY};
  }
`;

const IconSearch = styled(RiSearchLine, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.DISABLED_GREY)};
  transition: color 0.2s ease;
`;

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder = '검색어를 입력해주세요.' }: SearchInputProps) {
  const hasValue = value.trim().length > 0;

  return (
    <Container>
      <IconSearch isActive={hasValue} />
      <Input type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </Container>
  );
}

export default SearchInput;
