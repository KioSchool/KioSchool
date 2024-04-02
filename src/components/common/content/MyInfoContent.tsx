import styled from '@emotion/styled';
import DeleteButtonSvg from '@resources/svg/DeleteButtonSvg';

const MyInfoContainer = styled.div`
  width: 1100px;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0px 4px 16.8px 0px rgba(0, 0, 0, 0.25);
`;
const MyInfoSubContainer = styled.div`
  border: 2px solid black;
  width: 880px;
  height: 215px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemContainer = styled.div`
  background: silver;
  border: 2px solid black;
  width: 160px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 156px;
  height: 70px;
`;

const DeleteButton = styled(DeleteButtonSvg)`
  position: absolute;
  width: 70px;
  height: 70px;
  right: 44px;
  left: 44px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const ItmeLabel = styled.div`
  width: 156px;
  height: 43px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
`;
function MyInfoContent() {
  return (
    <>
      <MyInfoContainer>
        <MyInfoSubContainer>
          <ItemContainer>
            <ButtonContainer>
              <DeleteButton />
            </ButtonContainer>
            <ItmeLabel>비밀번호 변경</ItmeLabel>
          </ItemContainer>
          <ItemContainer>
            <ButtonContainer>
              <DeleteButton />
            </ButtonContainer>
            <ItmeLabel>계좌 관리</ItmeLabel>
          </ItemContainer>
          <ItemContainer>
            <ButtonContainer>
              <DeleteButton />
            </ButtonContainer>
            <ItmeLabel>계정 탈퇴</ItmeLabel>
          </ItemContainer>
        </MyInfoSubContainer>
      </MyInfoContainer>
    </>
  );
}

export default MyInfoContent;
