import styled from '@emotion/styled';
import SettingSvg from '@resources/svg/SettingIconSvg';
import { useNavigate } from 'react-router-dom';

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

const SettingButton = styled(SettingSvg)`
  cursor: pointer;
  position: absolute;
  width: 70px;
  height: 70px;
  right: 44px;
  left: 44px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
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
  url: string;
}

function MyInfoItemContent({ label, url }: MyInfoContentItmeProps) {
  const navigate = useNavigate();
  return (
    <ItemContainer>
      <ButtonContainer>
        <SettingButton
          onClick={() => {
            navigate(`${url}`);
          }}
        />
      </ButtonContainer>
      <ItmeLabel>{label}</ItmeLabel>
    </ItemContainer>
  );
}

export default MyInfoItemContent;
