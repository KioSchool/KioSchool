import styled from '@emotion/styled';
import DeleteButtonSvg from '@resources/svg/DeleteButtonSvg';

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
  cursor: pointer;
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

interface MyInfoContentItmeProps {
  label: string;
}

function MyInfoItemContent({ label }: MyInfoContentItmeProps) {
  return (
    <ItemContainer>
      <ButtonContainer>
        <DeleteButton />
      </ButtonContainer>
      <ItmeLabel>{label}</ItmeLabel>
    </ItemContainer>
  );
}

export default MyInfoItemContent;
