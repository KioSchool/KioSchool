import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import React, { useRef, useState } from 'react';
import { RiSearchLine } from '@remixicon/react';

const SearchIcon = styled(RiSearchLine, {
  shouldForwardProp: (prop) => prop !== 'isFocused',
})<{ isFocused: boolean }>`
  color: ${({ isFocused }) => (isFocused ? Color.BLACK : Color.HEAVY_GREY)};
`;

const Input = styled.input`
  width: 100%;
  font-size: 25px;
  border: none;
  color: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${Color.HEAVY_GREY};
  }
`;

const SearchBarContainer = styled.div`
  gap: 20px;
  width: 100%;
  height: 50px;
  border-bottom: 0.5px solid ${Color.HEAVY_GREY};
  color: ${Color.HEAVY_GREY};
  transition: 0.1s ease-in;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}

  &:focus-within {
    color: black;
    border-bottom: 0.5px solid black;
  }
`;

interface SearchBarProps {
  placeholder?: string;
  fetchContents: (keyword?: string) => void;
}

function SearchBar({ placeholder, fetchContents }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const fetchContentsByKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.key === 'Enter' && inputRef && typeof inputRef !== 'function')) return;

    fetchContents(keyword);
  };

  return (
    <SearchBarContainer className={'search-bar-container'}>
      <SearchIcon isFocused={isFocused} />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder || `이름을 입력해주세요`}
        onKeyDown={fetchContentsByKeyword}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchBarContainer>
  );
}

export default SearchBar;
