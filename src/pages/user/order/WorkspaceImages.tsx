import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useWorkspace from '@hooks/user/useWorkspace';
import { userWorkspaceAtom } from '@recoils/atoms';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  max-width: 48rem;
  margin: auto;
  --slide-height: 19rem;
  --slide-spacing: 1rem;
  --slide-size: 70%;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
`;

const ImageContainer = styled.div`
  ${rowFlex({ align: 'center' })}
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const WorkspaceImage = styled.img`
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  padding-left: var(--slide-spacing);
  height: var(--slide-height);
  width: 100%;
`;

function WorkspaceImages() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const { fetchWorkspace } = useWorkspace();
  const workspace = useRecoilValue(userWorkspaceAtom);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 3000 })]);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <Container>
      <EmblaViewport ref={emblaRef}>
        <ImageContainer>
          {workspace.images.map((img, index) => (img ? <WorkspaceImage key={index} src={img.url} alt={`Slide ${index + 1}`} /> : null))}
        </ImageContainer>
      </EmblaViewport>
    </Container>
  );
}

export default WorkspaceImages;
