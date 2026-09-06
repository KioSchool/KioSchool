import styled from '@emotion/styled';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { rowFlex } from '@styles/flexStyles';
import { WorkspaceImage } from '@@types/index';
import SelectedSnapDisplay from '@components/common/slider/SliderSelectedSnapDisplay';
import useSelectedSnapDisplay from '@hooks/useSelectedSnapDisplay';
import defaultWorkspaceImage from '@resources/image/defaultWorkspaceImage.png';
import { DEFAULT_FOCAL_POINT, ORDER_IMAGE_HEIGHT_PX } from '@constants/data/workspaceImageData';
import { toObjectPosition } from '@utils/imageFocalPoint';

const Container = styled.div`
  max-width: 48rem;
  width: 100%;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  ${rowFlex({ align: 'center' })}
  touch-action: pan-y pinch-zoom;
`;

const ImageContent = styled.img<{ objectPosition: string }>`
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition};
  transform: translate3d(0, 0, 0);
  flex: 0 0 100%;
  width: 100%;
  height: ${ORDER_IMAGE_HEIGHT_PX}px;
`;

interface OrderImageSliderProps {
  images: WorkspaceImage[];
}

function OrderImageSlider({ images }: OrderImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false })]);
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  if (!images.length) {
    return (
      <Container>
        <EmblaViewport ref={emblaRef}>
          <ImageContainer>
            <ImageContent src={defaultWorkspaceImage} alt={'kioLogo'} objectPosition={toObjectPosition(DEFAULT_FOCAL_POINT)} />
          </ImageContainer>
          <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
        </EmblaViewport>
      </Container>
    );
  }

  return (
    <Container>
      <EmblaViewport ref={emblaRef}>
        <ImageContainer>
          {images.map((img, index) =>
            img ? <ImageContent key={img.id} src={img.url} alt={`Slide ${index + 1}`} objectPosition={toObjectPosition(img.focalPoint)} /> : null,
          )}
        </ImageContainer>
        <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
      </EmblaViewport>
    </Container>
  );
}

export default OrderImageSlider;
