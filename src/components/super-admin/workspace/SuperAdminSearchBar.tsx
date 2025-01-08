import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import ActivatedSearchSvg from '@resources/svg/ActivatedSearchSvg';
import DeactivatedSearchSvg from '@resources/svg/DeactivatedSearchSvg';
import { rowFlex } from '@styles/flexStyles';
import React, { forwardRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
interface SuperAdminSearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fetchContents: (page: number, size: number, name: string | undefined) => Promise<void> | void;
}

const SuperAdminSearchBar = forwardRef<HTMLInputElement, SuperAdminSearchBarProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchContentsByName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.key === 'Enter' && ref && typeof ref !== 'function')) return;

    if (ref.current?.value === '') {
      searchParams.delete('name');
    } else {
      searchParams.set('page', '0');
      searchParams.set('name', String(ref.current?.value));
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <SearchBarContainer className={'search-bar-container'}>
      {isFocused ? <ActivatedSearchSvg /> : <DeactivatedSearchSvg />}
      <Input
        {...props}
        ref={ref}
        type="text"
        placeholder={`이름을 입력해주세요`}
        onKeyDown={fetchContentsByName}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchBarContainer>
  );
});

export default SuperAdminSearchBar;
