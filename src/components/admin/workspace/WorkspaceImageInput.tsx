import { WorkspaceImage } from '@@types/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { rowFlex } from '@styles/flexStyles';
import React, { useEffect, useState, useMemo, forwardRef } from 'react';

const BaseImageStyle = css`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageContent = styled.img`
  object-fit: cover;
  ${BaseImageStyle}
  ${expandButtonStyle({ scaleSize: '1.03' })}
`;

const DummyContent = styled.div`
  ${BaseImageStyle}
  cursor: pointer;
`;

const PlusIcon = styled(RiAddLine)`
  width: 30px;
  height: 30px;
  color: ${Color.GREY};
`;

const HiddenInput = styled.input`
  display: none;
`;

interface WorkspaceImageInputProps {
  images: Array<WorkspaceImage | File | null>;
  handleImageClick: (index: number) => void;
  handleAddNewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkspaceImageInput = forwardRef<HTMLInputElement, WorkspaceImageInputProps>(({ images, handleImageClick, handleAddNewImage }, ref) => {
  const [previewURLs, setPreviewURLs] = useState<(string | null)[]>([]);

  useEffect(() => {
    const objectURLs: string[] = [];

    const newPreviews = images.map((img) => {
      if (img instanceof File) {
        const objectURL = URL.createObjectURL(img);
        objectURLs.push(objectURL);
        return objectURL;
      } else if (img && img.url) {
        return img.url;
      }
      return null;
    });

    setPreviewURLs(newPreviews);

    return () => {
      objectURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const maxImageInputSize = 3;
  const validImagesCount = images.filter((img) => img !== null).length;
  const dummyLength = maxImageInputSize - validImagesCount;

  const dummyInputs = useMemo(() => {
    const dummies = [];
    for (let i = 0; i < dummyLength; i++) {
      dummies.push(
        <DummyContent key={`dummy-${validImagesCount + i}`} onClick={() => i === 0 && handleImageClick(validImagesCount)}>
          {i === 0 && <PlusIcon />}
        </DummyContent>,
      );
    }
    return dummies;
  }, [validImagesCount, dummyLength, handleImageClick]);

  return (
    <>
      <HiddenInput type="file" accept="image/*" ref={ref} onChange={handleAddNewImage} />
      {previewURLs.map((url, index) => (url ? <ImageContent key={index} src={url} onClick={() => handleImageClick(index)} /> : null))}
      {dummyInputs}
    </>
  );
});

export default WorkspaceImageInput;
