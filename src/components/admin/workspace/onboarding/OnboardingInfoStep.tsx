import styled from '@emotion/styled';
import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Workspace, WorkspaceImage } from '@@types/index';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OnboardingStepLayout from './OnboardingStepLayout';

const CONTENT_IMAGE_MAX_SIZE = 1024 * 1024 * 2;

const FormContainer = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex({ align: 'start' })}
`;

const UploadBox = styled.button<{ hasImage: boolean; isDragging: boolean }>`
  width: 100%;
  min-height: 220px;
  border-radius: 24px;
  border: 1px dashed ${({ hasImage, isDragging }) => (hasImage || isDragging ? Color.KIO_ORANGE : '#d8e0e5')};
  background: ${({ hasImage }) => (hasImage ? '#fff7f0' : '#f9fbfc')};
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
`;

const UploadInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const UploadPlaceholder = styled.div`
  width: 100%;
  min-height: 220px;
  color: #7d858c;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const UploadTitle = styled.div`
  color: #25282b;
  font-size: 16px;
  font-weight: 700;
`;

const UploadDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
`;

const ImageActions = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

interface OnboardingInfoStepProps {
  workspace: Workspace;
  isSubmitting: boolean;
  onSubmit: (draft: { name: string; description: string; notice: string }, imageFile: File | null, imageId: number | null) => void;
}

function OnboardingInfoStep({ workspace, isSubmitting, onSubmit }: OnboardingInfoStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description);
  const [notice, setNotice] = useState(workspace.notice);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<WorkspaceImage | null>(workspace.images[0] ?? null);
  const [isDragging, setIsDragging] = useState(false);

  const previewUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    return existingImage?.url ?? '';
  }, [existingImage, imageFile]);

  useEffect(() => {
    setName(workspace.name);
    setDescription(workspace.description);
    setNotice(workspace.notice);
    setExistingImage(workspace.images[0] ?? null);
    setImageFile(null);
  }, [workspace]);

  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile, previewUrl]);

  const handleSelectImage = (file: File) => {
    if (file.size > CONTENT_IMAGE_MAX_SIZE) {
      alert('대표 이미지는 2MB 이하로 업로드 가능합니다.');
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('대표 이미지는 png 또는 jpeg 형식만 지원합니다.');
      return;
    }

    setImageFile(file);
    setExistingImage(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    handleSelectImage(file);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    handleSelectImage(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setExistingImage(null);
  };

  const handleSubmit = () => {
    onSubmit(
      {
        name,
        description,
        notice,
      },
      imageFile,
      existingImage?.id ?? null,
    );
  };

  return (
    <OnboardingStepLayout
      stepLabel="STEP 1"
      title="주점의 첫인상을 먼저 정리합니다"
      description="주점 이름은 필수이며, 설명과 공지사항, 대표 이미지는 지금 간단히 적어두고 나중에 더 다듬을 수 있습니다."
      tip="대표 이미지는 드래그 앤 드롭 또는 클릭 업로드를 지원합니다. 이미지를 등록하지 않아도 다음 단계로 넘어갈 수 있습니다."
    >
      <FormContainer>
        <NewAppInput label="주점 이름" placeholder="예: 공대포차" value={name} onChange={(event) => setName(event.target.value)} width="100%" />
        <NewAppTextarea
          label="주점 설명"
          placeholder="예: 오늘의 메뉴와 분위기를 짧게 소개해보세요."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          width="100%"
          height={120}
        />
        <NewAppTextarea
          label="공지사항"
          placeholder="예: 마지막 주문은 23:30까지 가능합니다."
          value={notice}
          onChange={(event) => setNotice(event.target.value)}
          width="100%"
          height={120}
        />

        <UploadInput ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleInputChange} />
        <UploadBox
          type="button"
          hasImage={Boolean(previewUrl)}
          isDragging={isDragging}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="주점 대표 이미지 미리보기" />
          ) : (
            <UploadPlaceholder>
              <UploadTitle>대표 이미지를 올려주세요</UploadTitle>
              <UploadDescription>클릭해서 업로드하거나 이미지를 이 영역에 드래그해서 놓아주세요.</UploadDescription>
            </UploadPlaceholder>
          )}
        </UploadBox>

        {previewUrl && (
          <ImageActions>
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleRemoveImage}>
              이미지 제거
            </NewCommonButton>
          </ImageActions>
        )}
      </FormContainer>

      <Footer>
        <NewCommonButton type="button" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
          다음 단계
        </NewCommonButton>
      </Footer>
    </OnboardingStepLayout>
  );
}

export default OnboardingInfoStep;
