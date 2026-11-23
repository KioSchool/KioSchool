import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { landingFrameStyle } from '@styles/landingStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

type ProductVideoShape = 'screen' | 'phone';

const PHONE_SHAPE_STYLE = css`
  border-radius: 28px;

  ${mobileMediaQuery} {
    border-radius: 16px;
  }
`;

const FRAME_ONLY_PROPS = ['ratio', 'shape', 'maxWidth'];

const Frame = styled('div', { shouldForwardProp: (prop) => !FRAME_ONLY_PROPS.includes(prop) })<{ ratio: number; shape: ProductVideoShape; maxWidth?: number }>`
  ${landingFrameStyle}
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}
  ${({ shape }) => shape === 'phone' && PHONE_SHAPE_STYLE}
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top left;
`;

interface ProductVideoProps {
  src: string;
  poster: string;
  label: string;
  ratio: number;
  shape?: ProductVideoShape;
  maxWidth?: number;
}

function ProductVideo({ src, poster, label, ratio, shape = 'screen', maxWidth }: ProductVideoProps) {
  return (
    <Frame ratio={ratio} shape={shape} maxWidth={maxWidth}>
      <Video src={src} poster={poster} aria-label={label} autoPlay muted loop playsInline preload="metadata" />
    </Frame>
  );
}

export default ProductVideo;
