import styled from '@emotion/styled';
import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import ActivatedSearchSvg from '@resources/svg/ActivatedSearchSvg';
import DeactivatedSearchSvg from '@resources/svg/DeactivatedSearchSvg';
import React, { forwardRef, useState } from 'react';

const Input = styled.input`
  width: 100%;
  font-size: 25px;
  border: none;
  color: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #d8d8d8;
  }
`;

const SearchBarContainer = styled.div`
  gap: 20px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.5px solid #d8d8d8;
  color: #d8d8d8;
  transition: 0.1s ease-in;
  &:focus-within {
    color: black;
    border-bottom: 0.5px solid black;
  }
`;

const SuperAdminSearchBar = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  const fetchWorkspacesByName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && ref && typeof ref !== 'function') {
      if (ref.current?.value) {
        fetchAllWorkspaces(1, 6, ref.current.value);
      } else {
        fetchAllWorkspaces(1, 6);
      }
    }
  };

  return (
    <SearchBarContainer>
      {isFocused ? <ActivatedSearchSvg /> : <DeactivatedSearchSvg />}
      <Input
        {...props}
        ref={ref}
        type="text"
        placeholder="워크스페이스 이름을 입력해주세요"
        onKeyDown={fetchWorkspacesByName}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchBarContainer>
  );
});

export default SuperAdminSearchBar;
