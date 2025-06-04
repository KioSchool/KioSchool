import { ChangeEvent, useRef, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/admin/useAdminUser';
import { RiAddLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { adminUserAccountAtomSelector } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import TossAccountInfoTooltip from '@components/admin/account/TossAccountInfoTooltip';

const Container = styled.div`
  width: 30%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #f9f9f9;
  ${colFlex({ justify: 'space-between', align: 'center' })};
`;

const InfoIconContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'end', align: 'center' })};
`;

const TitleContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.div<{ valid: boolean }>`
  color: ${(props) => (props.valid ? Color.BLACK : Color.GREY)};
  font-size: 15px;
  font-weight: 500;
`;

const UploadIconContainer = styled.div<{ valid: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 22px;
  cursor: ${(props) => (props.valid ? 'pointer' : 'not-allowed')};
  background: ${Color.WHITE};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 22px;
  cursor: pointer;
`;

const SubmitButton = styled.button<{ valid: boolean }>`
  width: 90px;
  height: 23px;
  font-size: 12px;
  color: ${(props) => (props.valid ? Color.BLACK : Color.GREY)};
  background: ${Color.WHITE};
  border: 1px solid ${(props) => (props.valid ? Color.BLACK : Color.GREY)};
  border-radius: 20px;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function RegisterTossAccount() {
  const { registerTossAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);

  const isAccountRegistered = !!accountInfo.accountNumber;

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
      registerTossAccount(url);
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
      <InfoIconContainer>
        <TossAccountInfoTooltip />
      </InfoIconContainer>
      <TitleContainer>
        <Title valid={isAccountRegistered}>토스 QR 등록</Title>
      </TitleContainer>
      {!fileURL && (
        <UploadIconContainer valid={isAccountRegistered} onClick={handleQRInput}>
          <RiAddLine size={48} color={Color.GREY} />
        </UploadIconContainer>
      )}
      {fileURL && <ImagePreview src={fileURL} alt="QR Preview" onClick={handleQRInput} />}
      <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={onImageChange} />
      <SubmitButton valid={isAccountRegistered} onClick={registerHandler}>
        QR 등록
      </SubmitButton>
    </Container>
  );
}

export default RegisterTossAccount;
