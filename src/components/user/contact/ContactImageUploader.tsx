import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { RiAddLine, RiCloseLine, RiImageAddLine } from '@remixicon/react';
import {
  INQUIRY_ACCEPTED_IMAGE_TYPES,
  INQUIRY_IMAGE_ACCEPT_ATTRIBUTE,
  INQUIRY_IMAGE_MAX_COUNT,
  INQUIRY_IMAGE_MAX_SIZE_BYTES,
  INQUIRY_IMAGE_MAX_SIZE_MB,
} from '@constants/data/inquiryData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { FieldLabel } from './contactInquiryFormStyles';

const Container = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex()};
`;

const Header = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const LimitText = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

const ImageInput = styled.input`
  display: none;
`;

const PreviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: 100%;
  gap: 10px;

  ${mobileMediaQuery} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PreviewItem = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid #e5e8eb;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  color: ${Color.WHITE};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const AddButton = styled.button`
  min-height: 96px;
  border: 1px dashed #c9c9c9;
  border-radius: 14px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  gap: 6px;
  ${colFlex({ justify: 'center', align: 'center' })};

  &:hover:not(:disabled) {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const AddButtonText = styled.span`
  font-size: 13px;
`;

const HelpText = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.5;
`;

interface ContactImageUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onValidationError: (message: string) => void;
}

function ContactImageUploader({ files, onFilesChange, onValidationError }: ContactImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  const canAddImage = files.length < INQUIRY_IMAGE_MAX_COUNT;

  useEffect(
    () => () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    },
    [previewUrls],
  );

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (files.length + selectedFiles.length > INQUIRY_IMAGE_MAX_COUNT) {
      onValidationError(`이미지는 최대 ${INQUIRY_IMAGE_MAX_COUNT}장까지 첨부할 수 있습니다.`);
      return;
    }

    const invalidTypeFile = selectedFiles.find((file) => !INQUIRY_ACCEPTED_IMAGE_TYPES.includes(file.type as typeof INQUIRY_ACCEPTED_IMAGE_TYPES[number]));
    if (invalidTypeFile) {
      onValidationError('JPEG, PNG, WebP 형식의 이미지만 첨부할 수 있습니다.');
      return;
    }

    const oversizedFile = selectedFiles.find((file) => file.size > INQUIRY_IMAGE_MAX_SIZE_BYTES);
    if (oversizedFile) {
      onValidationError(`이미지는 장당 ${INQUIRY_IMAGE_MAX_SIZE_MB}MB 이하로 첨부해 주세요.`);
      return;
    }

    onValidationError('');
    onFilesChange([...files, ...selectedFiles]);
  };

  const handleRemove = (index: number) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  const handleAddClick = () => {
    inputRef.current?.click();
  };

  return (
    <Container>
      <Header>
        <FieldLabel htmlFor="inquiry-images">관련 이미지 (선택)</FieldLabel>
        <LimitText>
          {files.length}/{INQUIRY_IMAGE_MAX_COUNT}
        </LimitText>
      </Header>
      <ImageInput
        id="inquiry-images"
        ref={inputRef}
        type="file"
        accept={INQUIRY_IMAGE_ACCEPT_ATTRIBUTE}
        multiple
        onChange={handleImageSelect}
        aria-label="문의 이미지 선택"
      />
      {files.length > 0 && (
        <PreviewList>
          {files.map((file, index) => (
            <PreviewItem key={`${file.name}-${file.lastModified}-${index}`}>
              <PreviewImage src={previewUrls[index]} alt={`${file.name} 미리보기`} />
              <RemoveButton type="button" onClick={() => handleRemove(index)} aria-label={`${file.name} 삭제`}>
                <RiCloseLine size={16} />
              </RemoveButton>
            </PreviewItem>
          ))}
        </PreviewList>
      )}
      <AddButton type="button" onClick={handleAddClick} disabled={!canAddImage}>
        {files.length === 0 ? <RiImageAddLine size={24} /> : <RiAddLine size={22} />}
        <AddButtonText>{files.length === 0 ? '이미지 첨부하기' : '이미지 더 추가하기'}</AddButtonText>
      </AddButton>
      <HelpText>화면이나 결제 캡처에 비밀번호, 전체 계좌번호 등 민감한 정보가 포함되지 않도록 확인해 주세요.</HelpText>
    </Container>
  );
}

export default ContactImageUploader;
