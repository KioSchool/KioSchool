import { ChangeEvent, useEffect, useState, useReducer } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/useAdminUser';
import uploadPreview from '@resources/image/uploadPreview.png';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';

interface AccountState {
  decodedBank: string;
  accountNo: string;
}

type AccountAction = { type: 'SET_DECODED_BANK'; decodedBank: string } | { type: 'SET_ACCOUNT_NO'; accountNo: string };

const accountReducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case 'SET_DECODED_BANK':
      return { ...state, decodedBank: action.decodedBank };
    case 'SET_ACCOUNT_NO':
      return { ...state, accountNo: action.accountNo };
    default:
      return state;
  }
};

const extractAccountInfo = (url: string): { decodedBank: string; accountNo: string } | null => {
  const bankRegex = /bank=([^&]+)/;
  const accountNoRegex = /accountNo=([^&]+)/;
  const bankMatch = url.match(bankRegex);
  const accountNoMatch = url.match(accountNoRegex);

  if (bankMatch && accountNoMatch) {
    const [, bank] = bankMatch;
    const [, accountNo] = accountNoMatch;
    const decodedBank = decodeURIComponent(bank);

    return { decodedBank, accountNo };
  }

  return null;
};

function AdminAccount() {
  const { registerAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const adminUser = useRecoilValue(adminUserAtom);
  const [accountState, dispatchAccount] = useReducer(accountReducer, {
    decodedBank: '',
    accountNo: '',
  });

  useEffect(() => {
    if (adminUser) {
      const accountInfo = extractAccountInfo(adminUser.accountUrl);
      if (accountInfo) {
        const { decodedBank, accountNo } = accountInfo;
        dispatchAccount({ type: 'SET_DECODED_BANK', decodedBank });
        dispatchAccount({ type: 'SET_ACCOUNT_NO', accountNo });
      }
    }
  }, [adminUser]);

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
    <>
      <div>ADD ACCOUNT</div>
      <img src={fileURL || uploadPreview} alt={fileURL} style={{ width: '300px', height: '300px' }} />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <button type="button" onClick={removeImage}>
        제거 버튼
      </button>
      {adminUser && (
        <div>
          은행: {accountState.decodedBank}
          <br></br>
          계좌번호: {accountState.accountNo}
        </div>
      )}
      <button onClick={submitHandler}>submit</button>
    </>
  );
}

export default AdminAccount;
