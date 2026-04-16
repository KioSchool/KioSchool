import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: #adb1ba;
  opacity: 0.8;
  font-size: 20px;
  animation: ${bounce} 2s ease-in-out infinite;
  user-select: none;
  pointer-events: none;
`;

const Chevron = styled.div`
  width: 12px;
  height: 12px;
  border-bottom: 2px solid #adb1ba;
  border-right: 2px solid #adb1ba;
  transform: rotate(45deg);
`;

function ScrollIndicator() {
  return (
    <Container>
      <Chevron />
    </Container>
  );
}

export default ScrollIndicator;
