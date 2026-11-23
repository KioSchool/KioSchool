import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { landingFrameStyle } from '@styles/landingStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

type ProductShotShape = 'screen' | 'phone';

const PHONE_SHAPE_STYLE = css`
  border-radius: 28px;

  ${mobileMediaQuery} {
    border-radius: 16px;
  }
`;

const FRAME_ONLY_PROPS = ['ratio', 'shape', 'maxWidth'];

const Frame = styled('div', { shouldForwardProp: (prop) => !FRAME_ONLY_PROPS.includes(prop) })<{ ratio: number; shape: ProductShotShape; maxWidth?: number }>`
  ${landingFrameStyle}
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}
  ${({ shape }) => shape === 'phone' && PHONE_SHAPE_STYLE}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top left;
`;

interface ProductShotProps {
  src: string;
  alt: string;
  ratio: number;
  shape?: ProductShotShape;
  maxWidth?: number;
}

function ProductShot({ src, alt, ratio, shape = 'screen', maxWidth }: ProductShotProps) {
  return (
    <Frame ratio={ratio} shape={shape} maxWidth={maxWidth}>
      <Image src={src} alt={alt} loading="lazy" />
    </Frame>
  );
}

export default ProductShot;
