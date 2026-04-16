import { ChangeEvent, useRef } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCameraFill } from '@remixicon/react';

const ImageInputContainer = styled.div`
  gap: 8px;
  ${colFlex({ align: 'center' })}
`;

const ImageLabelContainer = styled.div`
  width: 100%;
  font-size: 14px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StyledLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #464a4d;
`;

const UploadImageWrapper = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '500px')};
  height: ${(props) => (props.height ? `${props.height}px` : '500px')};
  border-radius: 30px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const UploadImage = styled(RiCameraFill)`
  width: 26px;
  height: 26px;
  color: #e8eef2;
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '500px')};
  height: ${(props) => (props.height ? `${props.height}px` : '500px')};
  border-radius: 30px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.25) inset;
  object-fit: fill;
  cursor: pointer;
  display: block;
`;

const ImageWrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;
  width: ${(props) => (props.width ? `${props.width}px` : '500px')};
  height: ${(props) => (props.height ? `${props.height}px` : '500px')};
  cursor: pointer;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const Overlay = styled.div<{ width?: number; height?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => (props.width ? `${props.width}px` : '500px')};
  height: ${(props) => (props.height ? `${props.height}px` : '500px')};
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s;
  ${rowFlex({ justify: 'center', align: 'center' })};
  
  svg {
    color: white;
    width: 32px;
    height: 32px;
  }
`;

interface ProductImageInputProps {
  title: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  url?: string;
  width?: number;
  height?: number;
}

function AppImageInput({ file, title, url, onImageChange, width, height }: ProductImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const getImageUrl = () => {
    if (file) {
      return URL.createObjectURL(file);
    }

    if (url) {
      return url;
    }

    return '';
  };

  /**
   * “사진 업로드” 기능을 수행합니다.
   * 이미지 영역 클릭 시 숨겨진 파일 입력을 프로그래밍적으로 클릭합니다.
   */
  const uploadImage = () => {
    inputRef.current?.click();
  };

  return (
    <ImageInputContainer className={'app-image-input'}>
      <ImageLabelContainer className={'image-label-container'}>
        <StyledLabel>{title}</StyledLabel>
        <ImageInput type="file" accept="image/*" onChange={onImageChange} className={'image-input'} ref={inputRef} />
      </ImageLabelContainer>
      {file || url ? (
        <ImageWrapper width={width} height={height} onClick={uploadImage}>
          <Image src={getImageUrl()} alt="" width={width} height={height} className={'image'} />
          <Overlay className={'overlay'} width={width} height={height}>
            <RiCameraFill />
          </Overlay>
        </ImageWrapper>
      ) : (
        <UploadImageWrapper className={'upload-image-wrapper'} width={width} height={height} onClick={uploadImage}>
          <UploadImage />
        </UploadImageWrapper>
      )}
    </ImageInputContainer>
  );
}

export default AppImageInput;
