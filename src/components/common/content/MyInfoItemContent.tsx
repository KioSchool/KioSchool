import styled from '@emotion/styled';
import AccountIconSvg from '@resources/svg/AccountIconSvg';
import DeleteUserSvg from '@resources/svg/DeleteUserSvg';
import SettingSvg from '@resources/svg/SettingIconSvg';

const ItemContainer = styled.div`
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
const AccountButton = styled(AccountIconSvg)`
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
const DeleteUserButton = styled(DeleteUserSvg)`
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
  onClickFunc: (url: string) => void;
  iconString: string;
}

function MyInfoItemContent({ label, onClickFunc, iconString }: MyInfoContentItmeProps) {
  let buttonComponent;
  if (iconString === 'setting') {
    buttonComponent = <SettingButton onClick={() => onClickFunc('/setting')} />;
  } else if (iconString === 'account') {
    buttonComponent = <AccountButton onClick={() => onClickFunc('/register-account')} />;
  } else {
    buttonComponent = (
      <DeleteUserButton
        onClick={() => {
          onClickFunc('delete-user');
        }}
      />
    );
  }
  return (
    <ItemContainer>
      <ButtonContainer>{buttonComponent}</ButtonContainer>
      <ItmeLabel>{label}</ItmeLabel>
    </ItemContainer>
  );
}

export default MyInfoItemContent;
