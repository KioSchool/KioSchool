import { WorkspaceImage } from '@@types/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import PlusIconSvg from '@resources/svg/PlusIconSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { rowFlex } from '@styles/flexStyles';
import { useEffect, useState, useMemo } from 'react';

const BaseImageStyle = css`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageInput = styled.img`
  object-fit: cover;
  ${BaseImageStyle}
  ${expandButtonStyle({ scaleSize: '1.03' })};
`;

const ImageDummyInput = styled.div`
  ${BaseImageStyle}
`;

const PlusIcon = styled(PlusIconSvg)`
  width: 30px;
  height: 30px;
  color: ${Color.GREY};
  ${expandButtonStyle};
`;

interface WorkspaceImageInputProps {
  images: Array<WorkspaceImage | File | null>;
  handleImageClick: (index: number) => void;
}

function WorkspaceImageInput({ images, handleImageClick }: WorkspaceImageInputProps) {
  const [previews, setPreviews] = useState<(string | null)[]>([]);

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

    setPreviews(newPreviews);

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
        <ImageDummyInput key={`dummy-${validImagesCount + i}`}>
          {i === 0 && <PlusIcon onClick={() => i === 0 && handleImageClick(validImagesCount)} />}
        </ImageDummyInput>,
      );
    }
    return dummies;
  }, [dummyLength, validImagesCount, handleImageClick]);

  return (
    <>
      {previews.map((url, index) => (url ? <ImageInput key={index} src={url} onClick={() => handleImageClick(index)} /> : null))}
      {dummyInputs}
    </>
  );
}

export default WorkspaceImageInput;
