import styled from '@emotion/styled';
import LoadingSvg from '@resources/svg/LoadingSvg';
import { rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { isLoadingAtom } from 'src/jotai/atoms';

const Container = styled.div`
  z-index: 5002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: gray;
  opacity: 0.3;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Circle = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  position: absolute;
  width: 150px;
  height: 150px;
  padding: 40px;
  text-align: center;
  background: transparent;
  border-radius: 10px;
  animation: spin 1s ease infinite;
`;

function LoadingModal() {
  const isLoading = useAtomValue(isLoadingAtom);
  if (!isLoading) return null;

  return (
    <Container>
      <Circle>
        <LoadingSvg />
      </Circle>
    </Container>
  );
}

export default LoadingModal;
