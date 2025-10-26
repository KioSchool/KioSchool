import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { loadingCountAtom } from 'src/jotai/atoms';
import { Color } from '@resources/colors';

const Container = styled.div`
  z-index: 5002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
`;

const DotsContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 8px;
`;

const Dot = styled.div<{ delay: number }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${Color.KIO_ORANGE};
  animation: ${bounce} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;
`;

function LoadingModal() {
  const loadingCount = useAtomValue(loadingCountAtom);

  if (loadingCount === 0) return null;

  return (
    <Container>
      <DotsContainer>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
        <Dot delay={0.6} />
      </DotsContainer>
    </Container>
  );
}

export default LoadingModal;
