import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import AppImageInput from '@components/common/input/AppImageInput';
import AppButton from '@components/common/button/AppButton';
import AppLabel from '@components/common/label/AppLabel';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import AppFooter from '@components/common/footer/AppFooter';
import { colFlex, rowFlex } from '@styles/flexStyles';

interface AccountState {
  decodedBank: string;
  accountNo: string;
}

const Container = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ContentContainer = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const AccountContentContainer = styled.div`
  width: 700px;
  height: 300px;
  box-shadow: 0 15px 32px -8px rgba(0, 0, 0, 0.07), 0 3px 32px 0 rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 40px 60px;
  ${rowFlex({ justify: 'space-around' })}
`;

const AccountInfoContainer = styled.div`
  gap: 10px;
  padding-top: 10px;
  ${colFlex()}
`;

const AccountRegisterInputContainer = styled.div`
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const QRCodeDescriptionContainer = styled.div`
  height: 60%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
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
    if (!adminUser || !adminUser.accountUrl) {
      fetchAdminUser();
      return;
    }

    const accountInfo = extractAccountInfo(adminUser.accountUrl);

    if (!accountInfo) return;

    const { decodedBank, accountNo } = accountInfo;
    dispatchAccount({ type: 'SET_ACCOUNT_INFO', payload: { decodedBank, accountNo } });
  }, [adminUser.accountUrl]);

  const registerAccountInfo =
    accountState.decodedBank && accountState.accountNo ? `${accountState.decodedBank} | ${accountState.accountNo}` : '등록된 계좌가 없습니다.';

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFileURL('');
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);
    setFileURL(newFileURL);
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
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (!qrCode) {
        alert('QR코드가 인식되지 않았습니다.\n다시 업로드 바랍니다.');
        return;
      }

      const decodedUrl: string = qrCode.data;
      const url = removeAmountQuery(decodedUrl);
      registerAccount(url);
    };
  };

  const titleNavBarProps = { title: `${adminUser.name} 님의 마이페이지`, subTitle: '계좌 관리', useBackIcon: true };

  return (
    <AppContainer contentsJustify={'center'} titleNavBarProps={titleNavBarProps}>
      <Container className={'admin-account-container'}>
        <ContentContainer className={'content-container'}>
          <AccountContentContainer className={'account-content-container'}>
            <AccountInfoContainer className={'account-info-container'}>
              <AppLabel size={24} style={{ fontWeight: 700 }}>
                등록된 계좌 정보
              </AppLabel>
              <AppLabel size={20}>{registerAccountInfo}</AppLabel>
              <HorizontalDivider />
              <QRCodeDescriptionContainer className={'qr-code-description-container'}>
                <AppLabel size={14} style={{ fontWeight: 600 }}>
                  {'토스 -> 전체 -> 사진으로 송금 -> QR 코드 발급 -> 받을 금액 설정 X'}
                </AppLabel>
                <AppLabel size={12} style={{ fontWeight: 400 }}>
                  {'위 방식대로 발급받은 QR 코드를 업로드해주세요.'}
                </AppLabel>
              </QRCodeDescriptionContainer>
            </AccountInfoContainer>
            <AccountRegisterInputContainer className={'account-register-input-container'}>
              <AppImageInput title={'토스 QR 등록'} onImageChange={onImageChange} url={fileURL} width={170} height={170} />
              <AppButton onClick={submitHandler} disabled={!fileURL}>
                등록하기
              </AppButton>
            </AccountRegisterInputContainer>
          </AccountContentContainer>
        </ContentContainer>
        <AppFooter />
      </Container>
    </AppContainer>
  );
}

export default AdminAccount;
