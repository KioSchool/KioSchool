import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewRoundedButton from '../button/NewRoundedButton';
import { RiCamera2Fill } from '@remixicon/react';

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
  color: #5c5c5c;
  font-size: 20px;
  font-weight: 500;
  padding-left: 10px;
`;

const UploadImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 30px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  background: rgba(255, 255, 255, 0.1);
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const UploadImage = styled(RiCamera2Fill)`
  width: 50px;
  height: 50px;
  color: #5c5c5c;
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
   *
   * 버튼 클릭 시 숨겨진 파일 입력(<ImageInput />)을 프로그래밍적으로 클릭하여
   * 이미지 선택 다이얼로그를 열고, 이미지 파일만 선택 가능하며 선택 시 onImageChange가 호출됩니다.
   */
  const uploadImage = () => {
    document.getElementById('img')?.click();
  };

  return (
    <ImageInputContainer className={'app-image-input'}>
      <ImageLabelContainer className={'image-label-container'}>
        <StyledLabel>{title}</StyledLabel>
        <NewRoundedButton className={'image-input-button'} size={'xs'} onClick={uploadImage}>
          사진 업로드
        </NewRoundedButton>
        <ImageInput type="file" id="img" accept="image/*" onChange={onImageChange} className={'image-input'} />
      </ImageLabelContainer>
      {file || url ? (
        <Image src={getImageUrl()} alt="" width={width} height={height} className={'image'} />
      ) : (
        <UploadImageWrapper className={'upload-image-wrapper'}>
          <UploadImage />
        </UploadImageWrapper>
      )}
    </ImageInputContainer>
  );
}

export default AppImageInput;
