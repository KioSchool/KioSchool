import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RiSearchLine } from '@remixicon/react';

const SearchIcon = styled(RiSearchLine)<{
  isFocused: boolean;
}>`
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

function PaginationSearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchParams.get('name') || '';
    }
  }, [searchParams.toString()]);

  const fetchContentsByName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.key === 'Enter' && inputRef && typeof inputRef !== 'function')) return;

    searchParams.set('page', '0');

    if (inputRef.current?.value === '') {
      searchParams.delete('name');
    } else {
      searchParams.set('name', String(inputRef.current?.value));
    }

    setSearchParams(searchParams);
  };

  return (
    <SearchBarContainer className={'search-bar-container'}>
      <SearchIcon isFocused={isFocused} />
      <Input
        ref={inputRef}
        type="text"
        placeholder={`이름을 입력해주세요`}
        onKeyDown={fetchContentsByName}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchBarContainer>
  );
}

export default PaginationSearchBar;
