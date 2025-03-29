import React, { ChangeEvent, useState, useRef } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppButton from '@components/common/button/AppButton';
import { RiAddLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const UploadIconContainer = styled.div`
  width: 170px;
  height: 170px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

function RegisterTossAccount() {
  const { registerTossAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    fileInputRef.current?.click();
  };

  return (
    <div>
      {!fileURL && (
        <UploadIconContainer onClick={handleQRInput}>
          <RiAddLine size={48} color={Color.GREY} />
        </UploadIconContainer>
      )}
      <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={onImageChange} />
      {fileURL && (
        <div>
          <img src={fileURL} alt="QR Preview" width={170} height={170} onClick={handleQRInput} />
        </div>
      )}
      {fileURL && <AppButton onClick={registerHandler}>등록하기</AppButton>}
    </div>
  );
}

export default RegisterTossAccount;
