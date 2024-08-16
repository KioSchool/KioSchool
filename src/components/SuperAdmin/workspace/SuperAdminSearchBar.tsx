import styled from '@emotion/styled';

const SearchBarContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.5px solid #d8d8d8;
  color: #d8d8d8;

  &:focus-within {
    color: black;
    border-bottom: 0.5px solid black;
  }
`;

const Input = styled.input`
  width: 50%;
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

function SuperAdminSearchBar() {
  return (
    <SearchBarContainer>
      <Input type="text" placeholder="사용자 이름, 워크스페이스 이름 등을 입력해주세요" />
    </SearchBarContainer>
  );
}

export default SuperAdminSearchBar;
