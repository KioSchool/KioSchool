import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import uploadPreview from '@resources/image/uploadPreview.png';

interface ProductImageInputProps {
  title: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  url?: string;
  width?: number;
  height?: number;
}

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const ImageLabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const ImageInputButton = styled.label`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: #eb6d09;
  color: white;
  &:hover {
    background: #ff7b2b;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '500px')};
  height: ${(props) => (props.height ? `${props.height}px` : '400px')};
  border: none;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.25) inset;
  object-fit: fill;
`;

function AppImageInput({ file, title, url, onImageChange, width, height }: ProductImageInputProps) {
  const getImageUrl = () => {
    if (file) {
      return URL.createObjectURL(file);
    }
    if (url) {
      return url;
    }
    return uploadPreview;
  };

  return (
    <ImageInputContainer>
      <ImageLabelContainer>
        <label>{title}</label>
        <ImageInputButton htmlFor="img">사진 업로드</ImageInputButton>
        <ImageInput type="file" id="img" accept="image/*" onChange={onImageChange} />
      </ImageLabelContainer>
      <Image src={getImageUrl()} alt="" width={width} height={height} />
    </ImageInputContainer>
  );
}

export default AppImageInput;
