import { WorkspaceImage } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import PlusIconSvg from '@resources/svg/PlusIconSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { rowFlex } from '@styles/flexStyles';

const ImageInput = styled.img`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  object-fit: cover;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageDummyInput = styled.div`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${rowFlex({ justify: 'center', align: 'center' })}
  cursor: pointer;
`;

const PlusIcon = styled(PlusIconSvg)`
  width: 30px;
  height: 30px;
  color: ${Color.GREY};
  ${expandButtonStyle};
`;

interface WorkspaceImageInputProps {
  images: Array<WorkspaceImage | null>;
  handleImageClick: (index: number) => void;
}

function WorkspaceImageInput({ images, handleImageClick }: WorkspaceImageInputProps) {
  const maxImageInputSize = 3;
  const validImages = images.filter((img): img is WorkspaceImage => img !== null);
  const dummyLength = maxImageInputSize - validImages.length;

  const renderDummyInputs = () => {
    const dummyArray = [];
    for (let i = 0; i < dummyLength; i++) {
      if (i === 0) {
        dummyArray.push(
          <ImageDummyInput key={`dummy-${validImages.length}`} onClick={() => handleImageClick(validImages.length)}>
            <PlusIcon />
          </ImageDummyInput>,
        );
      } else {
        dummyArray.push(<ImageDummyInput key={`dummy-${validImages.length + i}`} />);
      }
    }

    return dummyArray;
  };

  return (
    <>
      {validImages.map((image, index) => (
        <ImageInput key={image.id} src={image.url} onClick={() => handleImageClick(index)} />
      ))}
      {renderDummyInputs()}
    </>
  );
}

export default WorkspaceImageInput;
