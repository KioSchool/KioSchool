import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { RiSearchLine } from '@remixicon/react';
import { ChangeEvent } from 'react';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${Color.WHITE};
  border-bottom: 0.5px solid #e8eef2;
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
  color: #464a4d;

  &::placeholder {
    color: #d1d5d8;
  }
`;

const IconSearch = styled(RiSearchLine)<{ $isActive: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ $isActive }) => ($isActive ? Color.KIO_ORANGE : '#d1d5d8')};
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
      <IconSearch $isActive={hasValue} />
      <Input type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </Container>
  );
}

export default SearchInput;
