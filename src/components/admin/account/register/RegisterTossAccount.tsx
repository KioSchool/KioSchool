import { ChangeEvent, useRef, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/admin/useAdminUser';
import { RiCameraFill } from '@remixicon/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { adminUserAccountAtom, externalSidebarAtom } from '@jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 58px 0;
  ${colFlex({ justify: 'space-between', align: 'center' })};
`;

const InputContainer = styled.div`
  width: 100%;
  gap: 10px;
  color: #464a4d;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const Title = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const UploadIconContainer = styled.div<{ valid: boolean }>`
  width: 220px;
  height: 220px;
  border-radius: 16px;
  cursor: ${(props) => (props.valid ? 'pointer' : 'not-allowed')};
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const UploadIcon = styled(RiCameraFill)`
  width: 26px;
  height: 26px;
  color: #e8eef2;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 22px;
  cursor: pointer;
`;

const SubmitContainer = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })};
`;

function RegisterTossAccount() {
  const { registerTossAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountInfo = useAtomValue(adminUserAccountAtom);

  const isAccountRegistered = !!accountInfo.accountNumber;

  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

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

  const registerHandler = () => {
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
      registerTossAccount(url).then(() => {
        closeSidebar();
      });
    };
  };

  const handleQRInput = () => {
    if (!isAccountRegistered) {
      return;
    }

    fileInputRef.current?.click();
  };

  return (
    <Container>
      <InputContainer>
        <Title>토스 QR</Title>
        {!fileURL && (
          <UploadIconContainer valid={isAccountRegistered} onClick={handleQRInput}>
            <UploadIcon />
          </UploadIconContainer>
        )}
        {fileURL && <ImagePreview src={fileURL} alt="QR Preview" onClick={handleQRInput} />}
      </InputContainer>
      <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={onImageChange} />
      <SubmitContainer>
        <NewCommonButton onClick={registerHandler} customSize={{ width: 106, height: 40 }} disabled={!isAccountRegistered}>
          QR 등록
        </NewCommonButton>
      </SubmitContainer>
    </Container>
  );
}

export default RegisterTossAccount;
