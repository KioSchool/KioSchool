import React from 'react';
import styled from '@emotion/styled';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { rowFlex } from '@styles/flexStyles';
import { WorkspaceImage } from '@@types/index';
import SelectedSnapDisplay from '@components/common/slider/SliderSelectedSnapDisplay';
import useSelectedSnapDisplay from '@hooks/useSelectedSnapDisplay';
import defaultWorkspaceImage from '@resources/image/defaultWorkspaceImage.png';

const Container = styled.div`
  max-width: 48rem;
  width: 100%;
  --slide-height: 19rem;
  --slide-spacing: 1rem;
  --slide-size: 100%;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  ${rowFlex({ align: 'center' })}
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const ImageContent = styled.img`
  object-fit: cover;
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  width: 100%;
  height: 200px;
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
            <ImageContent src={defaultWorkspaceImage} alt={'kioLogo'} />
          </ImageContainer>
          <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
        </EmblaViewport>
      </Container>
    );
  }

  return (
    <Container>
      <EmblaViewport ref={emblaRef}>
        <ImageContainer>{images.map((img, index) => (img ? <ImageContent key={img.id} src={img.url} alt={`Slide ${index + 1}`} /> : null))}</ImageContainer>
        <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
      </EmblaViewport>
    </Container>
  );
}

export default OrderImageSlider;
