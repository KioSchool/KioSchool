import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import AppLabel from '@components/common/label/AppLabel';
import AppButton from '@components/common/button/AppButton';

interface AccountState {
  decodedBank: string;
  accountNo: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

type AccountAction = { type: 'SET_ACCOUNT_INFO'; payload: { decodedBank: string; accountNo: string } };

const accountReducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case 'SET_ACCOUNT_INFO':
      return { ...state, decodedBank: action.payload.decodedBank, accountNo: action.payload.accountNo };
    default:
      return state;
  }
};

const extractAccountInfo = (url: string): { decodedBank: string; accountNo: string } | null => {
  const bankRegex = /bank=([^&]+)/;
  const accountNoRegex = /accountNo=([^&]+)/;
  const bankMatch = url.match(bankRegex);
  const accountNoMatch = url.match(accountNoRegex);

  if (!bankMatch || !accountNoMatch) return null;

  const [, bank] = bankMatch;
  const [, accountNo] = accountNoMatch;
  const decodedBank = decodeURIComponent(bank);

  return { decodedBank, accountNo };
};

function AdminAccount() {
  const { registerAccount, fetchAdminUser } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const adminUser = useRecoilValue(adminUserAtom);
  const [accountState, dispatchAccount] = useReducer(accountReducer, {
    decodedBank: '',
    accountNo: '',
  });

  useEffect(() => {
    if (!adminUser.accountUrl) fetchAdminUser();

    if (!adminUser || !adminUser.accountUrl) return;

    const accountInfo = extractAccountInfo(adminUser.accountUrl);

    if (!accountInfo) return;

    const { decodedBank, accountNo } = accountInfo;

    dispatchAccount({ type: 'SET_ACCOUNT_INFO', payload: { decodedBank, accountNo } });
  }, [adminUser.accountUrl]);

  const registerAccountInfo = accountState.decodedBank && accountState.accountNo ? `${accountState.decodedBank} | ${accountState.accountNo}` : 'NONE';

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFileURL('');
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);

    setFileURL(newFileURL);
  };

  const removeImage = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('');
  };

  const removeAmountQuery = (url: string): string => {
    const regex = new RegExp(/&?amount=\d+&?/g);
    return url.replace(regex, '');
  };

  const submitHandler = async () => {
    if (!fileURL) {
      alert('업로드할 이미지가 없습니다');
      return;
    }

    const image = new Image();
    image.src = fileURL;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    image.onload = () => {
      if (!context) return;

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (!code) {
        alert('QR코드가 인식되지 않았습니다.\n다시 업로드 바랍니다.');
        return;
      }

      const decodedUrl: string = code.data;
      const url = removeAmountQuery(decodedUrl);
      registerAccount(url);
    };
  };

  return (
    <AppContainer justifyValue={'center'}>
      <Container>
        <TitleNavBar title={`${adminUser.name} 님의 마이페이지`} subTitle={'계좌 관리'} useBackIcon={true} />
        <ContentContainer>
          <AppLabel size={35}>현재 등록된 계좌</AppLabel>
          <AppLabel size={25}>{registerAccountInfo}</AppLabel>
          <AppLabel size={16}>토스 QR에 대한 설명</AppLabel>
          {!fileURL ? (
            <input type="file" id="img" accept="image/*" onChange={onImageChange} />
          ) : (
            <>
              <img src={fileURL} alt={fileURL} style={{ width: '300px', height: '300px' }} />
              <AppButton onClick={removeImage}>이미지 제거</AppButton>
            </>
          )}
          <AppButton onClick={submitHandler}>계좌 등록</AppButton>
        </ContentContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminAccount;
