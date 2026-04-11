import { useState, useCallback, RefObject } from 'react';
import styled from '@emotion/styled';
import { mobileMediaQuery } from '@styles/globalStyles';

const GLOW_RADIUS = 400;

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

export const MouseGlow = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 145, 66, 0.12) 0%, rgba(255, 145, 66, 0.04) 35%, transparent 65%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  ${mobileMediaQuery} {
    display: none;
  }
`;

function useMouseGlow(containerRef: RefObject<HTMLDivElement | null>, targetRef: RefObject<HTMLElement | null>) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [intensity, setIntensity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (targetRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const centerX = targetRect.left + targetRect.width / 2 - rect.left;
        const centerY = targetRect.top + targetRect.height / 2 - rect.top;
        const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        setIntensity(smoothstep(1 - dist / GLOW_RADIUS));
      }
    },
    [containerRef, targetRef],
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setIntensity(0);
  }, []);

  return { mousePos, isHovering, intensity, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

export default useMouseGlow;
